"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import TechGrid, { type Technology } from "@/components/TechGrid";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import CVDetection from "@/components/interactive/CVDetection";
import OCRScan from "@/components/interactive/OCRScan";
import ASRTranscribe from "@/components/interactive/ASRTranscribe";
import LLMChat from "@/components/interactive/LLMChat";
import ContactCTA from "@/components/ContactCTA";

const technologies: Technology[] = [
  { name: "TensorFlow", image: "/tech/tensorflow.svg" },
  { name: "PyTorch", image: "/tech/pytorch.svg" },
  { name: "OpenCV", image: "/tech/opencv.svg" },
  { name: "Hugging Face", image: "/tech/huggingface.svg" },
  { name: "OpenAI", image: "/tech/openai.svg" },
  { name: "scikit-learn", image: "/tech/scikit-learn.svg" },
  { name: "ONNX", image: "/tech/onnx.svg" },
  { name: "FastAPI", image: "/tech/fastapi.svg" },
  { name: "Docker", image: "/tech/docker.svg" },
  { name: "Python", image: "/tech/python.svg" },
  { name: "NumPy", image: "/tech/numpy.svg" },
  { name: "Kubernetes", image: "/tech/kubernetes.svg" },
];

const faqItems = [
  { questionKey: "services.ai.faq.q1", answerKey: "services.ai.faq.a1" },
  { questionKey: "services.ai.faq.q2", answerKey: "services.ai.faq.a2" },
  { questionKey: "services.ai.faq.q3", answerKey: "services.ai.faq.a3" },
  { questionKey: "services.ai.faq.q4", answerKey: "services.ai.faq.a4" },
  { questionKey: "services.ai.faq.q5", answerKey: "services.ai.faq.a5" },
];

const aiServices = [
  {
    titleKey: "services.ai.cv.title",
    descriptionKey: "services.ai.cv.description",
    tag: "computer-vision",
    element: <CVDetection />,
  },
  {
    titleKey: "services.ai.ocr.title",
    descriptionKey: "services.ai.ocr.description",
    tag: "ocr",
    element: <OCRScan />,
  },
  {
    titleKey: "services.ai.asr.title",
    descriptionKey: "services.ai.asr.description",
    tag: "asr",
    element: <ASRTranscribe />,
  },
  {
    titleKey: "services.ai.llm.title",
    descriptionKey: "services.ai.llm.description",
    tag: "llm",
    element: <LLMChat />,
  },
];

export default function AIServicePage() {
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
          {t("services.ai.page.title")}{" "}
          <span className="text-primary">{t("services.ai.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.ai.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <ServicesList
          services={aiServices}
          caseStudiesLinkKey="services.ai.relatedStudies"
        />
      </section>

      {/* Technologies Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <TechGrid technologies={technologies} title={t("services.ai.technologies")} />
      </section>

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.ai.faq.heading1"
          headingKey2="services.ai.faq.heading2"
          items={faqItems}
        />
      </section>

      <ContactCTA />
    </>
  );
}
