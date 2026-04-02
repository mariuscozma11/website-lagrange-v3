"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function CrossPlatform() {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((a) => !a)}
    >
      {/* Phone frame */}
      <div className="relative w-[55%] max-w-[220px] aspect-[9/18] rounded-[24px] border-[3px] border-neutral-300 dark:border-neutral-600 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[14px] bg-neutral-300 dark:bg-neutral-600 rounded-b-xl z-10" />

        {/* Split divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-neutral-200 dark:bg-neutral-700 z-10" />

        {/* iOS side */}
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white dark:bg-neutral-800">
          <div className="pt-6 px-2 space-y-2">
            {/* iOS nav */}
            <div className="h-1.5 w-[55%] rounded bg-neutral-800 dark:bg-neutral-200" />

            {/* iOS toggle row */}
            <div className="flex items-center justify-between">
              <div className="h-1 w-[45%] rounded bg-neutral-200 dark:bg-neutral-600" />
              <div
                className={`w-5 h-3 rounded-full transition-colors duration-500 ${active ? "" : "bg-neutral-300 dark:bg-neutral-600"}`}
                style={{ backgroundColor: active ? "#22c55e" : undefined }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full bg-white mt-[1px] shadow-sm transition-transform duration-500"
                  style={{ transform: active ? "translateX(9px)" : "translateX(1px)" }}
                />
              </div>
            </div>

            {/* iOS cards that slide in */}
            {[0.7, 0.5].map((w, i) => (
              <div
                key={i}
                className="rounded-lg bg-neutral-100 dark:bg-neutral-700/40 p-1.5 transition-all duration-500"
                style={{
                  transform: active ? "translateX(0)" : `translateX(-${(i + 1) * 4}px)`,
                  opacity: active ? 1 : 0.5,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="h-1 rounded bg-neutral-300 dark:bg-neutral-600 mb-1" style={{ width: `${w * 100}%` }} />
                <div className="h-0.5 w-[80%] rounded bg-neutral-200 dark:bg-neutral-700" />
              </div>
            ))}

            {/* iOS progress bar */}
            <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: active ? "72%" : "0%" }}
              />
            </div>

            {/* iOS button (rounded rect) */}
            <div
              className={`rounded-lg py-1.5 transition-colors duration-500 ${active ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-700"}`}
            >
              <div
                className={`h-1 w-[40%] mx-auto rounded transition-colors duration-500 ${active ? "bg-white/80" : "bg-neutral-400 dark:bg-neutral-500"}`}
              />
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-3 left-0 w-full text-center">
            <span className="text-[7px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">iOS</span>
          </div>
        </div>

        {/* Android side */}
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-white dark:bg-neutral-800">
          <div className="pt-6 px-2 space-y-2">
            {/* Android nav */}
            <div className="h-1.5 w-[50%] rounded bg-neutral-800 dark:bg-neutral-200" />

            {/* Android switch row */}
            <div className="flex items-center justify-between">
              <div className="h-1 w-[45%] rounded bg-neutral-200 dark:bg-neutral-600" />
              <div className={`relative w-6 h-3 flex items-center`}>
                <div className={`absolute w-full h-[6px] rounded-full transition-colors duration-500 ${active ? "bg-primary/40" : "bg-neutral-300 dark:bg-neutral-500"}`} />
                <div
                  className={`absolute w-[10px] h-[10px] rounded-full shadow transition-all duration-500 ${active ? "bg-primary left-[14px]" : "bg-white dark:bg-neutral-300 left-0"}`}
                />
              </div>
            </div>

            {/* Android cards that slide in */}
            {[0.65, 0.5].map((w, i) => (
              <div
                key={i}
                className="rounded-md bg-neutral-100 dark:bg-neutral-700/40 p-1.5 shadow-sm transition-all duration-500"
                style={{
                  transform: active ? "translateX(0)" : `translateX(${(i + 1) * 4}px)`,
                  opacity: active ? 1 : 0.5,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="h-1 rounded bg-neutral-300 dark:bg-neutral-600 mb-1" style={{ width: `${w * 100}%` }} />
                <div className="h-0.5 w-[75%] rounded bg-neutral-200 dark:bg-neutral-700" />
              </div>
            ))}

            {/* Android progress bar */}
            <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out delay-100"
                style={{ width: active ? "72%" : "0%" }}
              />
            </div>

            {/* Android button (pill / FAB style) */}
            <div
              className={`rounded-full py-1.5 transition-colors duration-500 ${active ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-700"}`}
            >
              <div
                className={`h-1 w-[40%] mx-auto rounded transition-colors duration-500 ${active ? "bg-white/80" : "bg-neutral-400 dark:bg-neutral-500"}`}
              />
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-3 left-0 w-full text-center">
            <span className="text-[7px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wider uppercase">Android</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: active ? "#22c55e" : "#a3a3a3" }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {active ? "Same code, both platforms" : "Hover to compare"}
        </span>
      </div>

      {/* Touch play overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{ opacity: !active ? 1 : 0, pointerEvents: !active ? "auto" : "none" }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
