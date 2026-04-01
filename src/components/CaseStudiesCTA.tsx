"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { caseStudies } from "@/config/caseStudies";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesCTA() {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-sm font-bold text-primary">
          {t("caseStudies.title")}
        </h2>

        <Link
          href={`/${language}/case-studies`}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 transition-colors"
        >
          {t("caseStudies.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          >
            <CardContainer containerClassName="w-full">
              <CardBody className="relative group/card w-full h-auto rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                {/* Cover Image */}
                <CardItem translateZ="100" className="w-full">
                  <img
                    src={study.image}
                    alt={t(study.titleKey)}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                </CardItem>

                {/* Title */}
                <CardItem
                  translateZ="50"
                  className="text-base font-semibold text-neutral-800 dark:text-white mt-4"
                >
                  {t(study.titleKey)}
                </CardItem>

                {/* Description */}
                <CardItem
                  as="p"
                  translateZ="40"
                  className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2"
                >
                  {t(study.excerptKey)}
                </CardItem>

                {/* Learn More Link */}
                <CardItem
                  translateZ="30"
                  as={Link}
                  href={`/${language}${study.href}`}
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mt-4 group/link"
                >
                  {t("caseStudies.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
