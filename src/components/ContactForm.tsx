"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-6 md:p-8 dark:bg-neutral-900">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {t("contact.form.title")}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        {t("contact.form.subtitle")}
      </p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fullname">
            {t("contact.form.fullname")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullname"
            placeholder={t("contact.form.fullname.placeholder")}
            type="text"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">
            {t("contact.form.email")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            placeholder={t("contact.form.email.placeholder")}
            type="email"
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="company">{t("contact.form.company")}</Label>
          <Input
            id="company"
            placeholder={t("contact.form.company.placeholder")}
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">
            {t("contact.form.message")} <span className="text-red-500">*</span>
          </Label>
          <textarea
            id="message"
            placeholder={t("contact.form.message.placeholder")}
            required
            rows={4}
            className={cn(
              "flex w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition-colors",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
              "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none dark:focus-visible:ring-neutral-600",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:bg-neutral-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040]",
              "resize-none"
            )}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
          type="submit"
        >
          {t("contact.form.submit")} &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
