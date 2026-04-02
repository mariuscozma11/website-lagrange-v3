"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import TechGrid, { type Technology } from "@/components/TechGrid";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import DashboardDemo from "@/components/interactive/DashboardDemo";
import EcommerceDemo from "@/components/interactive/EcommerceDemo";
import CMSPublish from "@/components/interactive/CMSPublish";
import LMSQuiz from "@/components/interactive/LMSQuiz";
import LighthouseScore from "@/components/interactive/LighthouseScore";
import DesktopApp from "@/components/interactive/DesktopApp";

const technologies: Technology[] = [
  { name: "Vite", image: "/tech/vite.svg" },
  { name: "Next.js", image: "/tech/nextjs.svg" },
  { name: "TypeScript", image: "/tech/typescript.svg" },
  { name: "Node.js", image: "/tech/nodejs.svg" },
  { name: "NestJS", image: "/tech/nestjs.svg" },
  { name: "Electron", image: "/tech/electron.svg" },
  { name: "PHP", image: "/tech/php.svg" },
  { name: "WordPress", image: "/tech/wordpress.svg" },
  { name: "Laravel", image: "/tech/laravel.svg" },
  { name: "Django", image: "/tech/django.svg" },
  { name: "FastAPI", image: "/tech/fastapi.svg" },
  { name: "Docker", image: "/tech/docker.svg" },
];

const faqItems = [
  { questionKey: "services.web.faq.q1", answerKey: "services.web.faq.a1" },
  { questionKey: "services.web.faq.q2", answerKey: "services.web.faq.a2" },
  { questionKey: "services.web.faq.q3", answerKey: "services.web.faq.a3" },
  { questionKey: "services.web.faq.q4", answerKey: "services.web.faq.a4" },
  { questionKey: "services.web.faq.q5", answerKey: "services.web.faq.a5" },
];

const webServices = [
  {
    titleKey: "services.web.apps.title",
    descriptionKey: "services.web.apps.description",
    tag: "web-applications",
    element: <DashboardDemo />,
  },
  {
    titleKey: "services.web.commerce.title",
    descriptionKey: "services.web.commerce.description",
    tag: "ecommerce",
    element: <EcommerceDemo />,
  },
  {
    titleKey: "services.web.cms.title",
    descriptionKey: "services.web.cms.description",
    tag: "cms",
    element: <CMSPublish />,
  },
  {
    titleKey: "services.web.learning.title",
    descriptionKey: "services.web.learning.description",
    tag: "lms",
    element: <LMSQuiz />,
  },
  {
    titleKey: "services.web.sites.title",
    descriptionKey: "services.web.sites.description",
    tag: "marketing-sites",
    element: <LighthouseScore />,
  },
  {
    titleKey: "services.web.desktop.title",
    descriptionKey: "services.web.desktop.description",
    tag: "desktop-applications",
    element: <DesktopApp />,
  },
];

export default function WebServicePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto pt-8 pb-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl md:text-6xl dark:text-neutral-200"
        >
          {t("services.web.page.title")}{" "}
          <span className="text-primary">{t("services.web.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.web.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 px-6">
        <ServicesList
          services={webServices}
          caseStudiesLinkKey="services.web.relatedStudies"
        />
      </section>

      {/* Technologies Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <TechGrid technologies={technologies} title={t("services.web.technologies")} />
      </section>

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.web.faq.heading1"
          headingKey2="services.web.faq.heading2"
          items={faqItems}
        />
      </section>
    </>
  );
}
