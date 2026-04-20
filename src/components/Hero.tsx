"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Spotlight } from "./ui/spotlight-new";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Hero() {
  const { t, language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 xl:h-[560px] relative px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl text-3xl font-medium tracking-tight text-neutral-800 sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl dark:text-neutral-200"
        >
          {t("hero.title.before")}
          <span className="text-primary">{t("hero.title.highlight")}</span>
          {t("hero.title.after")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 md:mt-10 max-w-xl text-base text-neutral-600 md:text-lg dark:text-neutral-400"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() => setShowSpotlight(true)}
          className="flex flex-row flex-wrap items-center gap-3 xl:gap-4 mt-10 md:mt-12 xl:absolute xl:bottom-24 xl:right-6"
        >
          <Button asChild className="h-10 lg:h-10 bg-primary text-primary-foreground hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-primary dark:hover:text-primary-foreground transition-colors text-base px-6">
            <Link href={`/${language}/contact`}>{t("hero.cta")}</Link>
          </Button>

          <Button asChild variant="secondary" className="h-10 lg:h-10 text-base px-6 border border-transparent hover:border-border dark:hover:bg-primary dark:hover:text-primary-foreground transition-colors">
            <Link href={`/${language}/case-studies`}>{t("hero.cta.secondary")}</Link>
          </Button>
        </motion.div>
      </section>

      {mounted && showSpotlight && isDark && createPortal(
        <Spotlight />,
        document.body
      )}
    </>
  );
}
