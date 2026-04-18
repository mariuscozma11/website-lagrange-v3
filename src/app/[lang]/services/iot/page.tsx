"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import TechGrid, { type Technology } from "@/components/TechGrid";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import ContactCTA from "@/components/ContactCTA";

const technologies: Technology[] = [
  { name: "MQTT", image: "/tech/mqtt.svg" },
  { name: "Kubernetes", image: "/tech/kubernetes.svg" },
  { name: "Grafana", image: "/tech/grafana.svg" },
  { name: "InfluxDB", image: "/tech/influxdb.svg" },
  { name: "PostgreSQL", image: "/tech/postgresql.svg" },
  { name: "Raspberry Pi", image: "/tech/raspberrypi.svg" },
  { name: "Python", image: "/tech/python.svg" },
  { name: "Node.js", image: "/tech/nodejs.svg" },
  { name: "Docker", image: "/tech/docker.svg" },
  { name: "AWS", image: "/tech/aws.svg" },
  { name: "FastAPI", image: "/tech/fastapi.svg" },
  { name: "Kafka", image: "/tech/kafka.svg" },
];

const faqItems = [
  { questionKey: "services.iot.faq.q1", answerKey: "services.iot.faq.a1" },
  { questionKey: "services.iot.faq.q2", answerKey: "services.iot.faq.a2" },
  { questionKey: "services.iot.faq.q3", answerKey: "services.iot.faq.a3" },
  { questionKey: "services.iot.faq.q4", answerKey: "services.iot.faq.a4" },
  { questionKey: "services.iot.faq.q5", answerKey: "services.iot.faq.a5" },
];

const iotServices = [
  {
    titleKey: "services.iot.predictive.title",
    descriptionKey: "services.iot.predictive.description",
    tag: "iot",
  },
  {
    titleKey: "services.iot.oee.title",
    descriptionKey: "services.iot.oee.description",
    tag: "iot",
  },
  {
    titleKey: "services.iot.energy.title",
    descriptionKey: "services.iot.energy.description",
    tag: "iot",
  },
  {
    titleKey: "services.iot.retrofit.title",
    descriptionKey: "services.iot.retrofit.description",
    tag: "iot",
  },
  {
    titleKey: "services.iot.scada.title",
    descriptionKey: "services.iot.scada.description",
    tag: "iot",
  },
];

export default function IoTServicePage() {
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
          {t("services.iot.page.title")}{" "}
          <span className="text-primary">{t("services.iot.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.iot.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <ServicesList
          services={iotServices}
          caseStudiesLinkKey="services.iot.relatedStudies"
        />
      </section>

      {/* Technologies Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <TechGrid technologies={technologies} title={t("services.iot.technologies")} />
      </section>

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.iot.faq.heading1"
          headingKey2="services.iot.faq.heading2"
          items={faqItems}
        />
      </section>

      <ContactCTA />
    </>
  );
}
