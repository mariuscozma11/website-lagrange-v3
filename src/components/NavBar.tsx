"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { motion } from "motion/react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ opacity: 0 }}
      className={`sticky text-sm z-40 transition-[top] duration-700 ease-in-out ${
        scrolled ? "top-4" : "top-1"
      }`}
    >
      <div className="relative mx-auto max-w-[1440px] px-6">
        {/* Background pill - fades in and compacts on scroll */}
        <div
          className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 ease-in-out ${
            scrolled
              ? "left-0 right-0 opacity-100 backdrop-blur-md bg-background/80 border border-border shadow-sm"
              : "-left-12 -right-12 opacity-0"
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
          <div className="hidden sm:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <button className="p-2 text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Language</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
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
