"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import { Terminal } from "@/components/ui/terminal";

const processSteps = [
  {
    numberKey: "about.process.step1.number",
    titleKey: "about.process.step1.title",
    descriptionKey: "about.process.step1.description",
  },
  {
    numberKey: "about.process.step2.number",
    titleKey: "about.process.step2.title",
    descriptionKey: "about.process.step2.description",
  },
  {
    numberKey: "about.process.step3.number",
    titleKey: "about.process.step3.title",
    descriptionKey: "about.process.step3.description",
  },
  {
    numberKey: "about.process.step4.number",
    titleKey: "about.process.step4.title",
    descriptionKey: "about.process.step4.description",
  },
  {
    numberKey: "about.process.step5.number",
    titleKey: "about.process.step5.title",
    descriptionKey: "about.process.step5.description",
  },
];

const principles = [
  { titleKey: "about.principle1.title", textKey: "about.principle1.text" },
  { titleKey: "about.principle2.title", textKey: "about.principle2.text" },
  { titleKey: "about.principle3.title", textKey: "about.principle3.text" },
];

const founders = [
  {
    initials: "MC",
    nameKey: "about.team.founder1.name",
    roleKey: "about.team.founder1.role",
    bioKey: "about.team.founder1.bio",
  },
  {
    initials: "AB",
    nameKey: "about.team.founder2.name",
    roleKey: "about.team.founder2.role",
    bioKey: "about.team.founder2.bio",
  },
];

const partners = [
  {
    initials: "IW",
    nameKey: "about.team.partner1.name",
    specializationKey: "about.team.partner1.specialization",
    descriptionKey: "about.team.partner1.description",
  },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto pt-8 pb-12 px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          <div className="lg:flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl md:text-6xl dark:text-neutral-200"
            >
              {t("about.hero.title")}{" "}
              <span className="text-primary">{t("about.hero.titleAccent")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 max-w-lg text-lg text-neutral-600 dark:text-neutral-400"
            >
              {t("about.hero.description")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:flex-1"
          >
            <Terminal
              commands={[
                'mosquitto_sub -h broker.local -t "plant/+/state" -v',
                "influx query 'from(bucket:\"oee\") |> range(start: -1h)'",
                "journalctl -u node-red -f",
              ]}
              outputs={{
                0: [
                  "plant/line-03/state {\"run\":1,\"speed\":42.7,\"ts\":1714312805}",
                  "plant/line-01/state {\"run\":1,\"speed\":38.2,\"ts\":1714312806}",
                  "plant/line-03/state {\"run\":0,\"reason\":\"micro_stop\",\"ts\":1714312811}",
                  "plant/line-02/state {\"run\":1,\"speed\":40.1,\"ts\":1714312813}",
                ],
                1: [
                  "_time                line     availability  performance  quality",
                  "2026-04-28T08:00:00Z line-01  0.94          0.88         0.99",
                  "2026-04-28T08:00:00Z line-02  0.91          0.85         0.98",
                  "2026-04-28T08:00:00Z line-03  0.78          0.92         0.99",
                ],
                2: [
                  "node-red[1842]: [info] Started flow \"oee-aggregator\"",
                  "node-red[1842]: [info] OPC UA client connected: opc.tcp://plc-03:4840",
                  "node-red[1842]: [info] MQTT publish plant/line-03/state",
                  "node-red[1842]: [warn] Reconnecting historian: timeout 2s",
                ],
              }}
              username="lagrange"
              typingSpeed={40}
              enableSound={false}
            />
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200"
        >
          {t("about.team.title")}{" "}
          <span className="text-primary">{t("about.team.titleAccent")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400"
        >
          {t("about.team.description")}
        </motion.p>

        {/* Co-founder cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {founders.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 sm:p-7 rounded-md border border-dashed border-neutral-300 dark:border-neutral-700"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 rounded-md border border-dashed border-primary/40 flex items-center justify-center font-mono text-base font-bold text-primary">
                  {f.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    {t(f.nameKey)}
                  </h3>
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-primary">
                    {t(f.roleKey)}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t(f.bioKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partner network */}
      <section className="max-w-[1440px] mx-auto pt-4 pb-16 xl:pb-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200"
        >
          {t("about.team.partners.title")}{" "}
          <span className="text-primary">{t("about.team.partners.titleAccent")}</span>
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative p-6 sm:p-7 rounded-md border border-dashed border-neutral-300 dark:border-neutral-700"
            >
              <span className="absolute top-3 right-3 px-1.5 py-0.5 rounded-sm font-mono text-[9px] font-bold tracking-wider text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700">
                {t("about.team.partnerTag")}
              </span>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 rounded-md border border-dashed border-neutral-400/60 dark:border-neutral-500/60 flex items-center justify-center font-mono text-base font-bold text-neutral-600 dark:text-neutral-300">
                  {p.initials}
                </div>
                <div className="min-w-0 pr-16">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    {t(p.nameKey)}
                  </h3>
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {t(p.specializationKey)}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {t(p.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 mb-8"
          >
            {t("about.principles.title")}{" "}
            <span className="text-primary">{t("about.principles.titleAccent")}</span>
          </motion.h2>
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`py-6 ${i > 0 ? "border-t border-dashed border-neutral-300 dark:border-neutral-700" : ""}`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                  className="shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-neutral-800 dark:text-neutral-200 leading-snug">
                    {t(p.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {t(p.textKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How we deliver - Process */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 mb-12"
        >
          {t("about.process.title")}{" "}
          <span className="text-primary">{t("about.process.titleAccent")}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-l border-dashed border-neutral-300 dark:border-neutral-700 ml-1"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative pl-10 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-primary bg-background" />

              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                {t(step.numberKey)}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {t(step.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                {t(step.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <ContactCTA />
    </>
  );
}
