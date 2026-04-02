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
    "services.ai.page.title": "AI & Machine Learning Solutions",
    "services.ai.page.description": "We build intelligent systems that solve real business problems. From computer vision and natural language processing to predictive analytics, we help you leverage AI where it actually matters.",
    "services.ai.cv.title": "Computer Vision",
    "services.ai.cv.description": "Automated visual inspection, defect detection, object recognition, and real-time video analysis. We build systems that see and understand what humans can't scale to monitor.",
    "services.ai.ocr.title": "Optical Character Recognition",
    "services.ai.ocr.description": "Extract text from documents, invoices, IDs, and handwritten notes with high accuracy. Automate data entry and document processing workflows.",
    "services.ai.asr.title": "Automatic Speech Recognition",
    "services.ai.asr.description": "Transcribe calls, meetings, and consultations automatically. Build voice interfaces and analyze spoken content at scale.",
    "services.ai.llm.title": "Large Language Models",
    "services.ai.llm.description": "Custom AI assistants, document analysis, content generation, and intelligent automation powered by state-of-the-art language models.",
    "services.ai.relatedStudies": "See related case studies",
    "services.ai.technologies": "Battle-tested stack",
    "services.ai.faq.heading1": "Frequently asked",
    "services.ai.faq.heading2": "questions",
    "services.ai.faq.q1": "How long does a typical AI project take?",
    "services.ai.faq.a1": "It depends on scope. A proof of concept usually takes 2-4 weeks. Production-ready systems with integration, testing, and deployment typically take 2-6 months depending on complexity and data availability.",
    "services.ai.faq.q2": "Do we need a large dataset to get started?",
    "services.ai.faq.a2": "Not necessarily. We can work with small datasets using transfer learning and pre-trained models. For some use cases, we can also help you build a data collection strategy before training custom models.",
    "services.ai.faq.q3": "Can AI models be integrated into our existing systems?",
    "services.ai.faq.a3": "Yes. We deploy models as APIs, microservices, or edge solutions that integrate with your current infrastructure. We work with your engineering team to ensure smooth integration and minimal disruption.",
    "services.ai.faq.q4": "What happens after deployment?",
    "services.ai.faq.a4": "Models need monitoring and occasional retraining as data patterns change. We offer ongoing support packages that include performance monitoring, model updates, and scaling adjustments.",
    "services.ai.faq.q5": "How do you handle data privacy and security?",
    "services.ai.faq.a5": "All data is processed in secure environments. We can deploy models on-premise or in your private cloud. We follow industry best practices for data handling and can work within your compliance requirements.",
    "services.web.title": "Web Applications",
    "services.web.description": "Scalable, performant web platforms built with modern technologies.",
    "services.web.page.title": "Web Application Development",
    "services.web.page.description": "From internal tools to customer-facing platforms, we build web applications that handle real workloads. Clean architecture, solid performance, and code you can maintain long after launch.",
    "services.web.apps.title": "Purpose-Built Web Applications",
    "services.web.apps.description": "Internal dashboards, SaaS products, client portals, and workflow tools designed around your specific processes. We focus on getting the architecture right so the application scales with your business.",
    "services.web.commerce.title": "Online Stores & Marketplaces",
    "services.web.commerce.description": "End-to-end ecommerce solutions with secure payments, inventory management, and checkout flows that convert. Whether you need a single storefront or a multi-vendor marketplace.",
    "services.web.cms.title": "Content Platforms",
    "services.web.cms.description": "Custom WordPress builds, headless CMS setups, or fully bespoke content management systems. We give your team the tools to manage content without calling a developer every time.",
    "services.web.learning.title": "E-Learning & Training Systems",
    "services.web.learning.description": "Course platforms, assessment engines, and training portals with progress tracking, certifications, and interactive content delivery. Built for both internal teams and public audiences.",
    "services.web.sites.title": "Performance-Driven Websites",
    "services.web.sites.description": "Fast-loading, SEO-optimized websites that actually generate leads. We build with performance budgets in mind and ship sites that score well where it counts.",
    "services.web.desktop.title": "Desktop Applications",
    "services.web.desktop.description": "Cross-platform desktop apps built with Electron. When your users need offline access, native OS integration, or a dedicated workspace that goes beyond what a browser tab can offer.",
    "services.web.relatedStudies": "See related case studies",
    "services.web.technologies": "Battle-tested stack",
    "services.web.faq.heading1": "Frequently asked",
    "services.web.faq.heading2": "questions",
    "services.web.faq.q1": "Which tech stack do you typically recommend?",
    "services.web.faq.a1": "It depends on the project. For most modern web apps we use React with Next.js on the frontend and NestJS or FastAPI on the backend. For content-heavy sites, WordPress or a headless CMS often makes more sense. We also work with Laravel and Django for projects that benefit from those ecosystems.",
    "services.web.faq.q2": "Can you work with our existing codebase?",
    "services.web.faq.a2": "Absolutely. A significant portion of our work involves improving, extending, or migrating existing applications. We start with a codebase audit to understand what we're working with before making any changes.",
    "services.web.faq.q3": "How do you handle projects with tight deadlines?",
    "services.web.faq.a3": "We scope aggressively and ship in iterations. The first milestone is always a working version of the core functionality. From there we add features incrementally so you always have something usable, even if the timeline gets compressed.",
    "services.web.faq.q4": "Do you provide hosting and maintenance after launch?",
    "services.web.faq.a4": "Yes. We offer ongoing maintenance packages that cover hosting, security updates, performance monitoring, and feature development. We can also set things up for your team to manage independently if you prefer.",
    "services.web.faq.q5": "What about legacy PHP or WordPress projects?",
    "services.web.faq.a5": "We actively work with PHP, WordPress, and Laravel. Whether you need to modernize an aging codebase, migrate to a newer stack, or simply maintain and extend what you have, we can help.",
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
    "services.ai.page.title": "Soluții AI & Machine Learning",
    "services.ai.page.description": "Construim sisteme inteligente care rezolvă probleme reale de business. De la computer vision și procesarea limbajului natural la analiză predictivă, te ajutăm să folosești AI acolo unde contează cu adevărat.",
    "services.ai.cv.title": "Computer Vision",
    "services.ai.cv.description": "Inspecție vizuală automată, detectarea defectelor, recunoașterea obiectelor și analiză video în timp real. Construim sisteme care văd și înțeleg ce oamenii nu pot scala să monitorizeze.",
    "services.ai.ocr.title": "Recunoaștere Optică a Caracterelor",
    "services.ai.ocr.description": "Extrage text din documente, facturi, acte de identitate și note scrise de mână cu precizie ridicată. Automatizează introducerea datelor și procesarea documentelor.",
    "services.ai.asr.title": "Recunoaștere Automată a Vorbirii",
    "services.ai.asr.description": "Transcrie automat apeluri, întâlniri și consultații. Construiește interfețe vocale și analizează conținut vorbit la scară.",
    "services.ai.llm.title": "Modele de Limbaj",
    "services.ai.llm.description": "Asistenți AI personalizați, analiză de documente, generare de conținut și automatizare inteligentă bazată pe modele de limbaj de ultimă generație.",
    "services.ai.relatedStudies": "Vezi studii de caz relevante",
    "services.ai.technologies": "Stack verificat în producție",
    "services.ai.faq.heading1": "Întrebări",
    "services.ai.faq.heading2": "frecvente",
    "services.ai.faq.q1": "Cât durează un proiect AI tipic?",
    "services.ai.faq.a1": "Depinde de complexitate. Un proof of concept durează de obicei 2-4 săptămâni. Sistemele ready de producție cu integrare, testare și deployment durează de obicei 2-6 luni, în funcție de complexitate și disponibilitatea datelor.",
    "services.ai.faq.q2": "Avem nevoie de un set mare de date pentru a începe?",
    "services.ai.faq.a2": "Nu neapărat. Putem lucra cu seturi mici de date folosind transfer learning și modele pre-antrenate. Pentru unele cazuri, vă putem ajuta să construiți o strategie de colectare a datelor înainte de antrenarea modelelor personalizate.",
    "services.ai.faq.q3": "Modelele AI pot fi integrate în sistemele noastre existente?",
    "services.ai.faq.a3": "Da. Implementăm modele ca API-uri, microservicii sau soluții edge care se integrează cu infrastructura curentă. Lucrăm cu echipa voastră de inginerie pentru a asigura o integrare lină și perturbări minime.",
    "services.ai.faq.q4": "Ce se întâmplă după deployment?",
    "services.ai.faq.a4": "Modelele necesită monitorizare și re-antrenare ocazională pe măsură ce tiparele datelor se schimbă. Oferim pachete de suport continuu care includ monitorizarea performanței, actualizări ale modelelor și ajustări de scalare.",
    "services.ai.faq.q5": "Cum gestionați confidențialitatea și securitatea datelor?",
    "services.ai.faq.a5": "Toate datele sunt procesate în medii securizate. Putem implementa modele on-premise sau în cloud-ul vostru privat. Urmăm cele mai bune practici din industrie pentru gestionarea datelor și putem lucra în cadrul cerințelor voastre de conformitate.",
    "services.web.title": "Aplicații Web",
    "services.web.description": "Platforme web scalabile și performante, construite cu tehnologii moderne.",
    "services.web.page.title": "Dezvoltare Aplicații Web",
    "services.web.page.description": "De la instrumente interne la platforme pentru clienți, construim aplicații web care gestionează sarcini reale. Arhitectură curată, performanță solidă și cod pe care îl poți menține mult după lansare.",
    "services.web.apps.title": "Aplicații Web Personalizate",
    "services.web.apps.description": "Dashboard-uri interne, produse SaaS, portaluri pentru clienți și instrumente de workflow proiectate în jurul proceselor tale specifice. Ne concentrăm pe arhitectura corectă ca aplicația să scaleze odată cu afacerea ta.",
    "services.web.commerce.title": "Magazine Online și Marketplace-uri",
    "services.web.commerce.description": "Soluții ecommerce complete cu plăți securizate, gestionarea stocurilor și fluxuri de checkout care convertesc. Fie că ai nevoie de un singur magazin sau de un marketplace multi-vendor.",
    "services.web.cms.title": "Platforme de Conținut",
    "services.web.cms.description": "Build-uri WordPress personalizate, configurări headless CMS sau sisteme de gestionare a conținutului complet personalizate. Oferim echipei tale instrumentele necesare pentru a gestiona conținutul fără a suna un programator de fiecare dată.",
    "services.web.learning.title": "Sisteme E-Learning și Training",
    "services.web.learning.description": "Platforme de cursuri, motoare de evaluare și portaluri de training cu urmărirea progresului, certificări și livrare interactivă de conținut. Construite atât pentru echipe interne, cât și pentru audiențe publice.",
    "services.web.sites.title": "Website-uri Orientate pe Performanță",
    "services.web.sites.description": "Website-uri rapide, optimizate SEO, care chiar generează lead-uri. Construim cu bugete de performanță în minte și livrăm site-uri care au scoruri bune acolo unde contează.",
    "services.web.desktop.title": "Aplicații Desktop",
    "services.web.desktop.description": "Aplicații desktop cross-platform construite cu Electron. Când utilizatorii tăi au nevoie de acces offline, integrare nativă cu sistemul de operare sau un spațiu de lucru dedicat care depășește ce poate oferi un tab de browser.",
    "services.web.relatedStudies": "Vezi studii de caz relevante",
    "services.web.technologies": "Stack verificat în producție",
    "services.web.faq.heading1": "Întrebări",
    "services.web.faq.heading2": "frecvente",
    "services.web.faq.q1": "Ce stack tehnologic recomandați de obicei?",
    "services.web.faq.a1": "Depinde de proiect. Pentru majoritatea aplicațiilor web moderne folosim React cu Next.js pe frontend și NestJS sau FastAPI pe backend. Pentru site-uri cu mult conținut, WordPress sau un headless CMS are adesea mai mult sens. Lucrăm și cu Laravel și Django pentru proiecte care beneficiază de acele ecosisteme.",
    "services.web.faq.q2": "Puteți lucra cu codebase-ul nostru existent?",
    "services.web.faq.a2": "Absolut. O parte semnificativă din munca noastră implică îmbunătățirea, extinderea sau migrarea aplicațiilor existente. Începem cu un audit al codebase-ului pentru a înțelege cu ce lucrăm înainte de a face orice modificare.",
    "services.web.faq.q3": "Cum gestionați proiectele cu termene strânse?",
    "services.web.faq.a3": "Definim scope-ul agresiv și livrăm în iterații. Primul milestone este întotdeauna o versiune funcțională a funcționalității de bază. De acolo adăugăm funcționalități incremental, astfel încât să ai mereu ceva utilizabil, chiar dacă timeline-ul se comprimă.",
    "services.web.faq.q4": "Oferiți hosting și mentenanță după lansare?",
    "services.web.faq.a4": "Da. Oferim pachete de mentenanță continuă care acoperă hosting, actualizări de securitate, monitorizarea performanței și dezvoltare de funcționalități. Putem configura totul și pentru ca echipa ta să gestioneze independent, dacă preferi.",
    "services.web.faq.q5": "Ce facem cu proiectele legacy PHP sau WordPress?",
    "services.web.faq.a5": "Lucrăm activ cu PHP, WordPress și Laravel. Fie că trebuie să modernizezi un codebase care a îmbătrânit, să migrezi la un stack mai nou sau pur și simplu să menții și extinzi ce ai, te putem ajuta.",
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
