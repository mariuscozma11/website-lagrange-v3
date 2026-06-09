"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

type Badge = { tag: string; lines: string[] };

const badges: Badge[] = [
  { tag: "CE", lines: ["CONFORMITY", "MARKING"] },
  { tag: "EN 60204-1", lines: ["MACHINERY", "ELECTRICAL SAFETY"] },
  { tag: "EN 61439", lines: ["LV SWITCHGEAR", "ASSEMBLY"] },
  { tag: "IP54", lines: ["DUST + SPLASH", "PROTECTED"] },
];

const docs = [
  "schematic-rev02.dwg",
  "single-line.pdf",
  "bom-final.xlsx",
  "FAT-report.pdf",
  "ip-rating-cert.pdf",
  "as-built-drawings.zip",
  "label-book.pdf",
  "CE-conformity-dossier.pdf",
];

export default function ComplianceBadge() {
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
    const total = badges.length + docs.length;
    for (let i = 0; i < total; i++) {
      tRef.current.push(setTimeout(() => setStep(i), 200 + i * 220));
    }
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setStep(-1);
  };
  useEffect(() => () => clear(), []);

  const badgeShown = (i: number) => on && step >= i;
  const docShown = (i: number) => on && step >= badges.length + i;

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      {/* Badges grid (top half) */}
      <div className="grid grid-cols-2 gap-2 p-3 border border-dashed border-neutral-300 dark:border-neutral-700">
        {badges.map((b, i) => (
          <div
            key={i}
            className="aspect-[2/1] border border-dashed flex flex-col items-center justify-center"
            style={{
              borderColor: badgeShown(i) ? "#2563eb" : undefined,
              backgroundColor: badgeShown(i) ? "rgba(22,163,74,0.06)" : undefined,
              opacity: badgeShown(i) ? 1 : 0.25,
              transition: "border-color 0.3s, background-color 0.3s, opacity 0.3s",
            }}
          >
            <span
              className="font-mono font-bold text-sm sm:text-base"
              style={{
                color: badgeShown(i) ? "#2563eb" : "#737373",
                transition: "color 0.3s",
              }}
            >
              {b.tag}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-neutral-500 dark:text-neutral-500 leading-tight">
              {b.lines[0]}
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-neutral-500 dark:text-neutral-500 leading-tight">
              {b.lines[1]}
            </span>
          </div>
        ))}
      </div>

      {/* Doc list (bottom half) */}
      <div className="flex-1 border-x border-b border-dashed border-neutral-300 dark:border-neutral-700 p-3 overflow-hidden">
        <div className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
          HANDOVER PACKAGE
        </div>
        <div className="flex flex-col gap-0.5">
          {docs.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono"
              style={{
                opacity: docShown(i) ? 1 : 0.2,
                transition: "opacity 0.3s",
              }}
            >
              <span
                style={{
                  color: docShown(i) ? "#2563eb" : "#a3a3a3",
                  transition: "color 0.3s",
                }}
              >
                ✓
              </span>
              <span className="text-neutral-700 dark:text-neutral-300 truncate">{d}</span>
            </div>
          ))}
        </div>
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
