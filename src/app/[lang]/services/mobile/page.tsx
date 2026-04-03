"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import CrossPlatform from "@/components/interactive/CrossPlatform";
import OfflineSync from "@/components/interactive/OfflineSync";
import NativeFeatures from "@/components/interactive/NativeFeatures";
import AppStoreUpdate from "@/components/interactive/AppStoreUpdate";
import ContactCTA from "@/components/ContactCTA";

const mobileServices = [
  {
    titleKey: "services.mobile.crossplatform.title",
    descriptionKey: "services.mobile.crossplatform.description",
    tag: "mobile-apps",
    element: <CrossPlatform />,
  },
  {
    titleKey: "services.mobile.offline.title",
    descriptionKey: "services.mobile.offline.description",
    tag: "mobile-apps",
    element: <OfflineSync />,
  },
  {
    titleKey: "services.mobile.native.title",
    descriptionKey: "services.mobile.native.description",
    tag: "mobile-apps",
    element: <NativeFeatures />,
  },
  {
    titleKey: "services.mobile.deployment.title",
    descriptionKey: "services.mobile.deployment.description",
    tag: "mobile-apps",
    element: <AppStoreUpdate />,
  },
];

const faqItems = [
  { questionKey: "services.mobile.faq.q1", answerKey: "services.mobile.faq.a1" },
  { questionKey: "services.mobile.faq.q2", answerKey: "services.mobile.faq.a2" },
  { questionKey: "services.mobile.faq.q3", answerKey: "services.mobile.faq.a3" },
  { questionKey: "services.mobile.faq.q4", answerKey: "services.mobile.faq.a4" },
  { questionKey: "services.mobile.faq.q5", answerKey: "services.mobile.faq.a5" },
];

export default function MobileServicePage() {
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
          {t("services.mobile.page.title")}{" "}
          <span className="text-primary">{t("services.mobile.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.mobile.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <ServicesList
          services={mobileServices}
          caseStudiesLinkKey="services.mobile.relatedStudies"
        />
      </section>

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.mobile.faq.heading1"
          headingKey2="services.mobile.faq.heading2"
          items={faqItems}
        />
      </section>

      <ContactCTA />
    </>
  );
}
