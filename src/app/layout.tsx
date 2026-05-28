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
  metadataBase: new URL("https://lagrangeengineering.ro"),
  title: {
    default: "Lagrange Engineering | Industrial Automation & IIoT",
    template: "%s - Lagrange Engineering",
  },
  description: "Full-stack industrial automation, manufacturer and integrator. Control panels, PLC and robotics, plus IIoT, edge, and vision. From the control cabinet to the dashboard. Based in Timișoara, Romania.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Lagrange",
    locale: "en",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
              name: "Lagrange Engineering",
              legalName: "Lagrange Engineering SRL",
              url: "https://lagrangeengineering.ro",
              logo: "https://lagrangeengineering.ro/lg-black.svg",
              email: "office@lagrangeengineering.ro",
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
