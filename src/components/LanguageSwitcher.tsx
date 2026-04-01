"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", name: "EN" },
    { code: "ro", name: "RO" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (langCode: "en" | "ro") => {
    // Set cookie for middleware to read on future visits (1 year expiry)
    document.cookie = `preferred-language=${langCode};path=/;max-age=${60 * 60 * 24 * 365}`;

    // Update context
    setLanguage(langCode);

    // Navigate to the same page in the new language
    const newPath = pathname.replace(/^\/(en|ro)/, `/${langCode}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 h-9">
          <Globe className="h-4 w-4" />
          <span>{currentLanguage?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as "en" | "ro")}
            className={
              language === lang.code ? "bg-primary/10 text-primary" : ""
            }
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
