import { notFound } from "next/navigation";
import type { Metadata } from "next";

const supportedLanguages = ["en", "ro"] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const otherLang = lang === "ro" ? "en" : "ro";

  return {
    alternates: {
      canonical: `https://lagrangeengineering.ro/${lang}`,
      languages: {
        [lang]: `https://lagrangeengineering.ro/${lang}`,
        [otherLang]: `https://lagrangeengineering.ro/${otherLang}`,
      },
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
