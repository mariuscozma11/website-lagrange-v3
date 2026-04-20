"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion } from "motion/react";
import { services } from "@/config/services";
import { companyLinks } from "@/config/company";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { t, language } = useLanguage();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSrc = resolvedTheme === "dark" ? "/lg-white.svg" : "/lg-black.svg";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ opacity: 0 }}
      className={`text-sm z-50 xl:sticky xl:transition-[top] xl:duration-700 xl:ease-in-out ${
        scrolled ? "xl:top-4" : "xl:top-1"
      }`}
    >
      <div className="relative mx-auto max-w-[1440px] px-6">
        {/* Background pill - fades in on scroll (desktop only) */}
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 rounded-full transition-all duration-300 ease-in-out hidden xl:block ${
            scrolled
              ? "opacity-100 backdrop-blur-md bg-background/80 border border-border shadow-sm"
              : "opacity-0"
          }`}
        />

        {/* Content - stays in place */}
        <div className="relative flex items-center justify-between py-4">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="relative block w-12 h-12">
              {(!mounted || !logoLoaded) && (
                <div className="absolute inset-0 rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              )}
              {mounted && (
                <Image
                  src={logoSrc}
                  alt="Lagrange Engineering"
                  width={48}
                  height={48}
                  priority
                  onLoad={() => setLogoLoaded(true)}
                  className={`transition-opacity duration-200 ${logoLoaded ? "opacity-100" : "opacity-0"}`}
                />
              )}
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="group flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors outline-none">
                  {t("nav.services")}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {services.map((service) => (
                    <DropdownMenuItem key={service.titleKey} asChild>
                      <Link href={`/${language}${service.href}`} className="flex items-center gap-2 cursor-pointer">
                        <service.Icon className="h-4 w-4" />
                        {t(service.titleKey)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="group flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors outline-none">
                  {t("nav.company")}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {companyLinks.map((link) => (
                    <DropdownMenuItem key={link.titleKey} asChild>
                      <Link href={`/${language}${link.href}`} className="flex items-center gap-2 cursor-pointer">
                        <link.Icon className="h-4 w-4" />
                        {t(link.titleKey)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href={`/${language}/contact`}
                className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-6">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile/Tablet Hamburger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{t("nav.settings")}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-4">
                  <Link
                    href={`/${language}`}
                    onClick={() => setSheetOpen(false)}
                    className="text-sm font-medium text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-100 transition-colors"
                  >
                    {t("nav.home")}
                  </Link>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger className="text-sm font-medium py-0 hover:no-underline">
                        {t("nav.services")}
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-0">
                        <ul className="flex flex-col gap-3">
                          {services.map((service) => (
                            <li key={service.titleKey}>
                              <Link
                                href={`/${language}${service.href}`}
                                onClick={() => setSheetOpen(false)}
                                className="flex items-center gap-3 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                              >
                                <service.Icon className="h-4 w-4" />
                                {t(service.titleKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="company" className="border-b-0">
                      <AccordionTrigger className="text-sm font-medium py-0 hover:no-underline">
                        {t("nav.company")}
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-0">
                        <ul className="flex flex-col gap-3">
                          {companyLinks.map((link) => (
                            <li key={link.titleKey}>
                              <Link
                                href={`/${language}${link.href}`}
                                onClick={() => setSheetOpen(false)}
                                className="flex items-center gap-3 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                              >
                                <link.Icon className="h-4 w-4" />
                                {t(link.titleKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link
                    href={`/${language}/contact`}
                    onClick={() => setSheetOpen(false)}
                    className="text-sm font-medium text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-100 transition-colors"
                  >
                    {t("nav.contact")}
                  </Link>
                </div>

                <div className="border-t border-border" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t("nav.language")}</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t("nav.theme")}</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
