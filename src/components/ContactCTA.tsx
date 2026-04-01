"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export default function ContactCTA() {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-[1440px] mx-auto py-24 xl:py-32 px-6">
      <div className="flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-3xl font-medium tracking-tight text-neutral-800 sm:text-4xl md:text-5xl xl:text-6xl dark:text-neutral-200"
        >
          {t("contact.cta.title.before")}
          <span className="text-primary">{t("contact.cta.title.highlight")}</span>
          {t("contact.cta.title.after")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-6 max-w-xl text-neutral-600 dark:text-neutral-400 text-base md:text-lg"
        >
          {t("contact.cta.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-10"
        >
          <Button
            asChild
            className="h-12 bg-primary text-primary-foreground hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-primary dark:hover:text-primary-foreground transition-colors text-base px-8"
          >
            <Link href={`/${language}/contact`}>
              {t("contact.cta.button")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
