"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import {
  Code2,
  Cable,
  BookOpen,
  Users,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

const items = [
  { Icon: Code2,           titleKey: "deliverables.code.title",       descriptionKey: "deliverables.code.description" },
  { Icon: Cable,           titleKey: "deliverables.schematics.title", descriptionKey: "deliverables.schematics.description" },
  { Icon: BookOpen,        titleKey: "deliverables.docs.title",       descriptionKey: "deliverables.docs.description" },
  { Icon: Users,           titleKey: "deliverables.training.title",   descriptionKey: "deliverables.training.description" },
  { Icon: ClipboardCheck,  titleKey: "deliverables.acceptance.title", descriptionKey: "deliverables.acceptance.description" },
  { Icon: ShieldCheck,     titleKey: "deliverables.warranty.title",   descriptionKey: "deliverables.warranty.description" },
];

export default function Deliverables() {
  const { t } = useLanguage();

  return (
    <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200"
      >
        {t("deliverables.title")}{" "}
        <span className="text-primary">{t("deliverables.titleAccent")}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400"
      >
        {t("deliverables.subtitle")}
      </motion.p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-300/60 dark:bg-neutral-700/60 border border-neutral-300/60 dark:border-neutral-700/60 rounded-md overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className="bg-background p-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-start gap-4"
            >
              <div className="shrink-0 mt-0.5 w-9 h-9 rounded-md border border-dashed border-primary/40 flex items-center justify-center">
                <item.Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
