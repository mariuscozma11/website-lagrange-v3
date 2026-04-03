"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

interface FAQProps {
  headingKey1: string;
  headingKey2: string;
  items: FAQItem[];
}

export default function FAQ({ headingKey1, headingKey2, items }: FAQProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
      {/* Left - Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t(headingKey1)}{" "}
          <span className="text-primary">{t(headingKey2)}</span>
        </h2>
      </motion.div>

      {/* Right - Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:w-3/5"
      >
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-base">
                {t(item.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 dark:text-neutral-400">
                {t(item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
