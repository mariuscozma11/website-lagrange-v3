import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novaworks.ro"),
  title: {
    default: "NovaWorks | Industrial Automation Manufacturer & Integrator",
    template: "%s - NovaWorks",
  },
  description: "Full-stack industrial automation manufacturer and integrator in Timișoara, Romania. We design, build and commission complete systems in-house: mechanical CAD and fabrication, control panels, PLC and robotics, machine vision, plus IIoT and edge. From the control cabinet to the dashboard.",
  keywords: [
    "industrial automation",
    "automation integrator",
    "control panels",
    "PLC programming",
    "industrial robotics",
    "machine vision",
    "IIoT",
    "edge computing",
    "turnkey automation",
    "automatizări industriale",
    "tablouri de automatizare",
    "integrator automatizări",
    "Timișoara",
    "Romania",
  ],
  authors: [{ name: "NovaWorks" }],
  creator: "NovaWorks",
  publisher: "NovaWorks",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "NovaWorks",
    title: "NovaWorks | Industrial Automation Manufacturer & Integrator",
    description: "We design, build and commission complete automation systems in-house. Control panels, PLC and robotics, machine vision, IIoT and edge. Based in Timișoara, Romania.",
    url: "https://novaworks.ro",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NovaWorks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaWorks | Industrial Automation Manufacturer & Integrator",
    description: "We design, build and commission complete automation systems in-house. Control panels, PLC and robotics, machine vision, IIoT and edge. Timișoara, Romania.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const lang = hdrs.get("x-lang") || "ro";
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NovaWorks",
              legalName: "Inovaworks SRL",
              url: "https://novaworks.ro",
              logo: "https://novaworks.ro/novaworks-color.png",
              email: "office@novaworks.ro",
              telephone: "+40756109881",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Str. Ioan Alexandru, Nr. 20, Etaj POD, Ap. POD 2",
                addressLocality: "Timisoara",
                addressRegion: "Timis",
                postalCode: "300323",
                addressCountry: "RO",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <NavBar />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
