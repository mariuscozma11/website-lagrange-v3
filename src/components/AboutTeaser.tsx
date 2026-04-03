"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutTeaser() {
  const { t, language } = useLanguage();

  const points = [
    { numberKey: "about.teaser.point1.number", textKey: "about.teaser.point1.text" },
    { numberKey: "about.teaser.point2.number", textKey: "about.teaser.point2.text" },
    { numberKey: "about.teaser.point3.number", textKey: "about.teaser.point3.text" },
    { numberKey: "about.teaser.point4.number", textKey: "about.teaser.point4.text" },
  ];

  return (
    <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left - heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:w-2/5"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
            {t("about.teaser.title")}{" "}
            <span className="text-primary">{t("about.teaser.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            {t("about.teaser.description")}
          </p>
          <Link
            href={`/${language}/about`}
            className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 transition-colors group text-sm font-medium"
          >
            {t("about.teaser.cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Right - process steps */}
        <div className="lg:w-3/5">
          <div className="border-l border-dashed border-neutral-300 dark:border-neutral-700">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative pl-8 pb-8 last:pb-0"
              >
                {/* Dot on the line */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-primary bg-background" />

                <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                  {t(point.numberKey)}
                </span>
                <p className="mt-1 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  {t(point.textKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
