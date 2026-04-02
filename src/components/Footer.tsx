"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import { services } from "@/config/services";
import { companyLinks } from "@/config/company";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="max-w-[1440px] mx-auto pt-16 xl:pt-24 pb-6 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Column 1: Logo, Motto, Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          <Link href="/">
            <Image
              src="/lagrange-black.png"
              alt="Lagrange Engineering"
              width={160}
              height={40}
              className="block dark:hidden"
            />
            <Image
              src="/lagrange-white.png"
              alt="Lagrange Engineering"
              width={160}
              height={40}
              className="hidden dark:block"
            />
          </Link>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {t("footer.motto")}
          </p>

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Column 2: Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {t("footer.services")}
          </h3>
          <ul className="flex flex-col gap-2">
            {services.map((service) => (
              <li key={service.titleKey}>
                <Link
                  href={`/${language}${service.href}`}
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  {t(service.titleKey)}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Company */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {t("footer.company")}
          </h3>
          <ul className="flex flex-col gap-2">
            {companyLinks.map((link) => (
              <li key={link.titleKey}>
                <a
                  href={link.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  {t(link.titleKey)}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {t("footer.legal")}
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
                {t("footer.terms")}
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
                {t("footer.privacy")}
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
                {t("footer.cookies")}
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800"
      >
        <p className="text-sm text-neutral-500 dark:text-neutral-500 text-center">
          © 2026 Lagrange Engineering. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
