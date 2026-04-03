"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import { Shield, Eye, Rocket, FileText, Users, MessageSquare, Check } from "lucide-react";
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

const guarantees = [
  { titleKey: "about.guarantee1.title", descriptionKey: "about.guarantee1.description", Icon: Shield },
  { titleKey: "about.guarantee2.title", descriptionKey: "about.guarantee2.description", Icon: Eye },
  { titleKey: "about.guarantee3.title", descriptionKey: "about.guarantee3.description", Icon: Rocket },
  { titleKey: "about.guarantee4.title", descriptionKey: "about.guarantee4.description", Icon: FileText },
  { titleKey: "about.guarantee5.title", descriptionKey: "about.guarantee5.description", Icon: MessageSquare },
  { titleKey: "about.guarantee6.title", descriptionKey: "about.guarantee6.description", Icon: Users },
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
                "lagrange init --project client-mvp",
                "lagrange deploy --env production",
                "lagrange status",
              ]}
              outputs={{
                0: [
                  "✓ Project scaffolded",
                  "✓ CI/CD pipeline configured",
                  "✓ Staging environment ready",
                  "→ Run 'lagrange deploy' when ready",
                ],
                1: [
                  "Building...",
                  "✓ Tests passed (42/42)",
                  "✓ Deployed to production",
                  "→ https://client-mvp.lagrange.dev",
                ],
                2: [
                  "Project: client-mvp",
                  "Status: live",
                  "Uptime: 99.98%",
                  "Last deploy: 2 minutes ago",
                ],
              }}
              username="lagrange"
              typingSpeed={40}
              enableSound={false}
            />
          </motion.div>
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
          {[
            "about.principle1",
            "about.principle2",
            "about.principle3",
            "about.principle4",
          ].map((key, i) => (
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
                <p className="text-lg sm:text-xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {t(key)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How we work - Process */}
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

      {/* Guarantees */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 mb-12"
        >
          {t("about.guarantees.title")}{" "}
          <span className="text-primary">{t("about.guarantees.titleAccent")}</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((g, i) => {
            const isLastCol3 = (i + 1) % 3 === 0;
            const isLastRow3 = i >= guarantees.length - 3;
            const isLastCol2 = (i + 1) % 2 === 0;
            const isLastRow2 = i >= guarantees.length - 2;

            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`p-6 border-dashed border-neutral-300 dark:border-neutral-700 ${
                !isLastCol3 ? "lg:border-r" : ""
              } ${!isLastRow3 ? "lg:border-b" : ""} ${
                !isLastCol2 ? "sm:max-lg:border-r" : ""
              } ${!isLastRow2 ? "sm:max-lg:border-b" : ""} ${
                i < guarantees.length - 1 ? "max-sm:border-b" : ""
              }`}
            >
              <g.Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {t(g.titleKey)}
              </h3>
              <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {t(g.descriptionKey)}
              </p>
            </motion.div>
            );
          })}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
