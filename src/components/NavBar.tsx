"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {/* Logo */}
          <Link href="/">
            <Image
              src="/lg-black.svg"
              alt="Lagrange Engineering"
              width={48}
              height={48}
              className="block dark:hidden"
            />
            <Image
              src="/lg-white.svg"
              alt="Lagrange Engineering"
              width={48}
              height={48}
              className="hidden dark:block"
            />
          </Link>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-6">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="group flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors outline-none">
                {t("nav.services")}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {services.map((service) => (
                  <DropdownMenuItem key={service.titleKey} asChild>
                    <a href={service.href} className="flex items-center gap-2 cursor-pointer">
                      <service.Icon className="h-4 w-4" />
                      {t(service.titleKey)}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile/Tablet Hamburger */}
          <Sheet>
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="services" className="border-b-0">
                    <AccordionTrigger className="text-sm font-medium py-0 hover:no-underline">
                      {t("nav.services")}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-0">
                      <ul className="flex flex-col gap-3">
                        {services.map((service) => (
                          <li key={service.titleKey}>
                            <a
                              href={service.href}
                              className="flex items-center gap-3 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                            >
                              <service.Icon className="h-4 w-4" />
                              {t(service.titleKey)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
