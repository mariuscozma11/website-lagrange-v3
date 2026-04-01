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
    "nav.company": "Company",
    "nav.contact": "Contact",
    "services.ai.title": "AI & Machine Learning",
    "services.ai.description": "Custom AI solutions, from intelligent automation to predictive analytics.",
    "services.web.title": "Web Applications",
    "services.web.description": "Scalable, performant web platforms built with modern technologies.",
    "services.mobile.title": "Mobile Applications",
    "services.mobile.description": "Native and cross-platform mobile apps for iOS and Android.",
    "services.consulting.title": "Technical Consulting",
    "services.consulting.description": "Strategic guidance on architecture and technology choices.",
    "services.cta": "Learn more",
    "caseStudies.title": "Featured case studies",
    "caseStudies.cta": "Learn more",
    "caseStudies.viewAll": "See all",
    "caseStudies.visualInspection.title": "40% Fewer Defects with AI Visual Inspection",
    "caseStudies.visualInspection.excerpt": "How a furniture manufacturer reduced rejects by 40% using automated visual inspection on the production line.",
    "caseStudies.medicalTranscription.title": "Medical Transcription for 15 Physicians",
    "caseStudies.medicalTranscription.excerpt": "Automated consultation transcription for a private clinic, saving doctors 2 hours of documentation daily.",
    "caseStudies.callCenterQA.title": "70% Faster QA for 30-Agent Call Center",
    "caseStudies.callCenterQA.excerpt": "How automatic call transcription and analysis reduced quality assurance time from hours to minutes.",
    "contact.title.before": "Let's start a ",
    "contact.title.highlight": "conversation",
    "contact.title.after": "",
    "contact.description": "Reach out and expect a reply within 24 hours. Skip the slides and formalities, we prefer real conversations about your challenges and whether we're the right fit to solve them.",
    "contact.location.label": "Location",
    "contact.email.label": "Email",
    "contact.phone.label": "Phone",
    "contact.socials": "Socials",
    "contact.cta.title.before": "Ready to ",
    "contact.cta.title.highlight": "build something",
    "contact.cta.title.after": " great?",
    "contact.cta.subtitle": "Let's discuss your project and see how we can help bring your vision to life.",
    "contact.cta.button": "Get in Touch",
    "contact.form.title": "Send us a message",
    "contact.form.subtitle": "Fill out the form and we'll get back to you shortly.",
    "contact.form.fullname": "Full name",
    "contact.form.fullname.placeholder": "John Doe",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "john@company.com",
    "contact.form.company": "Company",
    "contact.form.company.placeholder": "Acme Inc. (optional)",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Tell us about your project...",
    "contact.form.submit": "Send message",
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
    "nav.company": "Companie",
    "nav.contact": "Contact",
    "services.ai.title": "AI & Machine Learning",
    "services.ai.description": "Soluții AI personalizate, de la automatizare inteligentă la analiză predictivă.",
    "services.web.title": "Aplicații Web",
    "services.web.description": "Platforme web scalabile și performante, construite cu tehnologii moderne.",
    "services.mobile.title": "Aplicații Mobile",
    "services.mobile.description": "Aplicații mobile native și cross-platform pentru iOS și Android.",
    "services.consulting.title": "Consultanță Tehnică",
    "services.consulting.description": "Ghidare strategică în arhitectură și alegeri tehnologice.",
    "services.cta": "Află mai multe",
    "caseStudies.title": "Studii de caz",
    "caseStudies.cta": "Află mai multe",
    "caseStudies.viewAll": "Vezi toate",
    "caseStudies.visualInspection.title": "40% Mai Puține Rebuturi cu Inspecție Vizuală AI",
    "caseStudies.visualInspection.excerpt": "Cum a redus o fabrică de mobilă rebuturile cu 40% folosind inspecție vizuală automată pe linia de producție.",
    "caseStudies.medicalTranscription.title": "Transcriere Medicală pentru 15 Medici",
    "caseStudies.medicalTranscription.excerpt": "Transcriere automată a consultațiilor pentru o clinică privată, economisind medicilor 2 ore de documentare zilnic.",
    "caseStudies.callCenterQA.title": "QA cu 70% Mai Rapid pentru Call Center cu 30 Agenți",
    "caseStudies.callCenterQA.excerpt": "Cum a redus transcrierea și analiza automată a apelurilor timpul de quality assurance de la ore la minute.",
    "contact.title.before": "Hai să începem o ",
    "contact.title.highlight": "conversație",
    "contact.title.after": "",
    "contact.description": "Scrie-ne și primești răspuns în 24 de ore. Lasă slide-urile deoparte, preferăm conversații reale despre provocările tale și dacă suntem echipa potrivită să le rezolvăm.",
    "contact.location.label": "Locație",
    "contact.email.label": "Email",
    "contact.phone.label": "Telefon",
    "contact.socials": "Rețele sociale",
    "contact.cta.title.before": "Pregătit să ",
    "contact.cta.title.highlight": "construim ceva",
    "contact.cta.title.after": " grozav?",
    "contact.cta.subtitle": "Hai să discutăm despre proiectul tău și să vedem cum îți putem aduce viziunea la viață.",
    "contact.cta.button": "Contactează-ne",
    "contact.form.title": "Trimite-ne un mesaj",
    "contact.form.subtitle": "Completează formularul și revenim cu un răspuns în curând.",
    "contact.form.fullname": "Nume complet",
    "contact.form.fullname.placeholder": "Ion Popescu",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "ion@companie.ro",
    "contact.form.company": "Companie",
    "contact.form.company.placeholder": "Acme SRL (opțional)",
    "contact.form.message": "Mesaj",
    "contact.form.message.placeholder": "Spune-ne despre proiectul tău...",
    "contact.form.submit": "Trimite mesaj",
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
