"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type Language = "en" | "ro";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    "hero.title": "Your custom software development partner",
    "hero.subtitle": "We help businesses solve real problems through digital solutions, automation, and technology that scales with you.",
    "hero.cta": "Let's Talk",
    "hero.cta.secondary": "Case Studies",
  } as Record<string, string>,
  ro: {
    "hero.title": "Partenerul tău în dezvoltare software la comandă",
    "hero.subtitle": "Ajutăm companiile să rezolve probleme reale prin soluții digitale, automatizare și tehnologie care crește odată cu tine.",
    "hero.cta": "Hai să discutăm",
    "hero.cta.secondary": "Studii de caz",
  } as Record<string, string>,
};

function getLanguageFromPathname(pathname: string): Language {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ro")) return "ro";
  return "ro"; // default
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>(() =>
    getLanguageFromPathname(pathname)
  );

  // Sync language state with URL changes
  useEffect(() => {
    const urlLanguage = getLanguageFromPathname(pathname);
    if (urlLanguage !== language) {
      setLanguageState(urlLanguage);
    }
  }, [pathname, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Store preference for future visits
    localStorage.setItem("preferred-language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)[typeof language]] ||
      key
    );
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
