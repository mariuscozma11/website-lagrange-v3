import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";

const supportedLanguages = ["en", "ro"] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

const baseUrl = "https://lagrangeengineering.ro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") || `/${lang}`;
  // Strip the lang prefix so we can build mirror URLs for the other language
  const stripped = pathname.replace(/^\/(en|ro)/, "");
  const otherLang = lang === "ro" ? "en" : "ro";

  return {
    alternates: {
      canonical: `${baseUrl}${pathname}`,
      languages: {
        [lang]: `${baseUrl}/${lang}${stripped}`,
        [otherLang]: `${baseUrl}/${otherLang}${stripped}`,
        "x-default": `${baseUrl}/${lang}${stripped}`,
      },
    },
    openGraph: {
      locale: lang === "ro" ? "ro_RO" : "en_US",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const langTyped = lang as SupportedLanguage;

  if (!supportedLanguages.includes(langTyped)) {
    notFound();
  }

  return <>{children}</>;
}
