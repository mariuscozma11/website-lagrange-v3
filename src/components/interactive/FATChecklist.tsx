"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Check } from "lucide-react";

type Item = { label: string; value: string };

const items: Item[] = [
  { label: "Continuity test", value: "PASS · 0.12 Ω" },
  { label: "Insulation resistance", value: "PASS · 520 MΩ" },
  { label: "Dielectric strength", value: "PASS · 1500V / 60s" },
  { label: "Earth bonding", value: "PASS · 0.08 Ω" },
  { label: "Wire tag verification", value: "PASS · 142/142" },
  { label: "Functional · START / STOP", value: "PASS" },
  { label: "Functional · E-Stop", value: "PASS · <300 ms" },
];

export default function FATChecklist() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(-1);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const clear = () => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
  };
  const activate = () => {
    clear();
    setOn(true);
    setStep(-1);
    items.forEach((_, i) => {
      tRef.current.push(setTimeout(() => setStep(i), 200 + i * 350));
    });
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setStep(-1);
  };
  useEffect(() => () => clear(), []);

  const done = (i: number) => on && step >= i;

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      {/* Header */}
      <div className="border border-dashed border-neutral-300 dark:border-neutral-700 px-4 py-3 flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
          FAT REPORT · PNL-014
        </span>
        <span
          className="text-[10px] font-mono font-bold"
          style={{
            color: done(items.length - 1) ? "#2563eb" : "#737373",
            transition: "color 0.3s",
          }}
        >
          {done(items.length - 1) ? "● ALL PASS" : on ? "● TESTING" : "○ READY"}
        </span>
      </div>

      {/* Rows */}
      <div className="flex-1 border-x border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex-1 flex items-center gap-3 px-4 border-b border-dashed border-neutral-300 dark:border-neutral-700 last:border-b-0"
            style={{
              opacity: on ? 1 : 0.4,
              transition: "opacity 0.3s",
            }}
          >
            <div
              className="w-5 h-5 rounded-sm border border-dashed flex items-center justify-center shrink-0"
              style={{
                borderColor: done(i) ? "#2563eb" : undefined,
                backgroundColor: done(i) ? "rgba(22,163,74,0.12)" : undefined,
                transition: "border-color 0.3s, background-color 0.3s",
              }}
            >
              <Check
                className="w-3 h-3"
                style={{
                  color: "#2563eb",
                  opacity: done(i) ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
            <span
              className="text-xs sm:text-sm font-medium flex-1 truncate"
              style={{
                color: done(i) ? undefined : "#a3a3a3",
                transition: "color 0.3s",
              }}
            >
              {it.label}
            </span>
            <span
              className="text-[9px] sm:text-[10px] font-mono"
              style={{
                color: done(i) ? "#2563eb" : "#a3a3a3",
                transition: "color 0.3s",
              }}
            >
              {done(i) ? it.value : "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border border-dashed border-neutral-300 dark:border-neutral-700 px-4 py-2 flex items-center justify-between">
        <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500">
          EN 60204-1 · EN 61439
        </span>
        <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500">
          {Math.max(step + 1, 0)}/{items.length}
        </span>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{ opacity: !on ? 1 : 0, pointerEvents: !on ? "auto" : "none" }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
