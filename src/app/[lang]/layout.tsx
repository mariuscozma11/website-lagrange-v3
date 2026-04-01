import { notFound } from "next/navigation";

const supportedLanguages = ["en", "ro"] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

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
