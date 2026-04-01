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
    "hero.title.before": "Your ",
    "hero.title.highlight": "custom software",
    "hero.title.after": " development partner",
    "hero.subtitle": "We help businesses solve real problems through digital solutions, automation, and technology that scales with you.",
    "hero.cta": "Let's Talk",
    "hero.cta.secondary": "Case Studies",
    "nav.settings": "Settings",
    "nav.language": "Language",
    "nav.theme": "Theme",
    "nav.services": "Services",
    "services.ai.title": "AI & Machine Learning",
    "services.ai.description": "Custom AI solutions, from intelligent automation to predictive analytics.",
    "services.web.title": "Web Applications",
    "services.web.description": "Scalable, performant web platforms built with modern technologies.",
    "services.mobile.title": "Mobile Applications",
    "services.mobile.description": "Native and cross-platform mobile apps for iOS and Android.",
    "services.consulting.title": "Technical Consulting",
    "services.consulting.description": "Strategic guidance on architecture and technology choices.",
    "services.cta": "Learn more",
    "footer.motto": "Building technology that scales with your ambitions.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.blog": "Blog",
    "footer.caseStudies": "Case Studies",
    "footer.demos": "Technical Demos",
    "footer.about": "About",
    "footer.legal": "Legal",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookie Policy",
  } as Record<string, string>,
  ro: {
    "hero.title.before": "Partenerul tău în dezvoltare ",
    "hero.title.highlight": "software la comandă",
    "hero.title.after": "",
    "hero.subtitle": "Ajutăm companiile să rezolve probleme reale prin soluții digitale, automatizare și tehnologie care crește odată cu tine.",
    "hero.cta": "Hai să discutăm",
    "hero.cta.secondary": "Studii de caz",
    "nav.settings": "Setări",
    "nav.language": "Limbă",
    "nav.theme": "Temă",
    "nav.services": "Servicii",
    "services.ai.title": "AI & Machine Learning",
    "services.ai.description": "Soluții AI personalizate, de la automatizare inteligentă la analiză predictivă.",
    "services.web.title": "Aplicații Web",
    "services.web.description": "Platforme web scalabile și performante, construite cu tehnologii moderne.",
    "services.mobile.title": "Aplicații Mobile",
    "services.mobile.description": "Aplicații mobile native și cross-platform pentru iOS și Android.",
    "services.consulting.title": "Consultanță Tehnică",
    "services.consulting.description": "Ghidare strategică în arhitectură și alegeri tehnologice.",
    "services.cta": "Află mai multe",
    "footer.motto": "Construim tehnologie care crește odată cu ambițiile tale.",
    "footer.services": "Servicii",
    "footer.company": "Companie",
    "footer.blog": "Blog",
    "footer.caseStudies": "Studii de Caz",
    "footer.demos": "Demo-uri Tehnice",
    "footer.about": "Despre Noi",
    "footer.legal": "Legal",
    "footer.terms": "Termeni și Condiții",
    "footer.privacy": "Politica de Confidențialitate",
    "footer.cookies": "Politica de Cookie-uri",
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
    const value = translations[language][key as keyof (typeof translations)[typeof language]];
    return value !== undefined ? value : key;
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
