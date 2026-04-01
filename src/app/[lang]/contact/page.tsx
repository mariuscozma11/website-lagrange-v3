"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, Instagram, Facebook, Github, Linkedin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const contactDetails = [
  {
    icon: MapPin,
    labelKey: "contact.location.label",
    value: "Timișoara, Romania",
  },
  {
    icon: Mail,
    labelKey: "contact.email.label",
    value: "office@lagrangeengineering.ro",
    href: "mailto:office@lagrangeengineering.ro",
  },
  {
    icon: Phone,
    labelKey: "contact.phone.label",
    value: "+40 756 109 881",
    href: "tel:+40756109881",
  },
];

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen max-w-[1440px] mx-auto px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 h-full">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl md:text-6xl dark:text-neutral-200"
          >
            {t("contact.title.before")}
            <span className="text-primary">{t("contact.title.highlight")}</span>
            {t("contact.title.after")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-lg"
          >
            {t("contact.description")}
          </motion.p>

          {/* Contact Details */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-10 flex flex-col gap-4"
          >
            {contactDetails.map((detail) => (
              <li key={detail.labelKey} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <detail.icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-500 dark:text-neutral-500">
                    {t(detail.labelKey)}
                  </span>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="text-sm text-neutral-800 dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-800 dark:text-neutral-200">
                      {detail.value}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </motion.ul>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mt-10 flex flex-col gap-3"
          >
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              {t("contact.socials")}
            </span>
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
