"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ReactNode } from "react";

export interface ServiceItem {
  titleKey: string;
  descriptionKey: string;
  tag: string;
  element?: ReactNode;
}

interface ServicesListProps {
  services: ServiceItem[];
  caseStudiesLinkKey: string;
}

function DefaultPlaceholder() {
  return (
    <div className="w-full aspect-square rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <span className="text-neutral-400 dark:text-neutral-600 text-sm">
        Interactive element
      </span>
    </div>
  );
}

export default function ServicesList({ services, caseStudiesLinkKey }: ServicesListProps) {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {services.map((service, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={service.titleKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-16`}
          >
            {/* Interactive Element */}
            <div className="w-full lg:flex-1 flex justify-center order-2 lg:order-none">
              <div className="w-full max-w-md lg:max-w-none">
                {service.element || <DefaultPlaceholder />}
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:flex-1 order-1 lg:order-none">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-neutral-800 dark:text-neutral-200">
                {t(service.titleKey)}
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-lg">
                {t(service.descriptionKey)}
              </p>
              <Link
                href={`/${language}/case-studies?tag=${service.tag}`}
                className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 transition-colors group"
              >
                {t(caseStudiesLinkKey)}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
