"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      fullname: (form.elements.namedItem("fullname") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || t("contact.form.error"));
        setStatus("error");
        return;
      }

      setStatus("success");
      setErrorMessage("");
      form.reset();
    } catch {
      setErrorMessage(t("contact.form.error"));
      setStatus("error");
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-6 md:p-8 dark:bg-neutral-900">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {t("contact.form.title")}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        {t("contact.form.subtitle")}
      </p>

      {status === "success" ? (
        <div className="mt-8 text-center py-8">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {t("contact.form.success")}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {t("contact.form.sendAnother")}
          </button>
        </div>
      ) : (
        <form className="mt-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="fullname">
              {t("contact.form.fullname")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullname"
              name="fullname"
              placeholder={t("contact.form.fullname.placeholder")}
              type="text"
              required
              disabled={status === "sending"}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">
              {t("contact.form.email")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              placeholder={t("contact.form.email.placeholder")}
              type="email"
              required
              disabled={status === "sending"}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">{t("contact.form.phone")}</Label>
            <Input
              id="phone"
              name="phone"
              placeholder={t("contact.form.phone.placeholder")}
              type="tel"
              disabled={status === "sending"}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="company">{t("contact.form.company")}</Label>
            <Input
              id="company"
              name="company"
              placeholder={t("contact.form.company.placeholder")}
              type="text"
              disabled={status === "sending"}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="message">
              {t("contact.form.message")} <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="message"
              name="message"
              placeholder={t("contact.form.message.placeholder")}
              required
              rows={4}
              disabled={status === "sending"}
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

          {status === "error" && (
            <p className="mb-4 text-sm text-red-500 text-center">
              {errorMessage || t("contact.form.error")}
            </p>
          )}

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("contact.form.sending")}
              </span>
            ) : (
              <>{t("contact.form.submit")} &rarr;</>
            )}
            <BottomGradient />
          </button>
        </form>
      )}
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
