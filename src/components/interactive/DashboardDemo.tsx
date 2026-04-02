"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const stats = [
  { label: "Revenue", value: 84200, prefix: "$", suffix: "" },
  { label: "Users", value: 1247, prefix: "", suffix: "" },
  { label: "Growth", value: 23, prefix: "", suffix: "%" },
];

const barValues = [35, 55, 44, 70, 58, 80, 65, 88];

function formatNumber(n: number, prefix: string, suffix: string) {
  const formatted = n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
  return `${prefix}${formatted}${suffix}`;
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function DashboardDemo() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const animRef = useRef(0);
  const startRef = useRef(0);
  const duration = 1800;

  function stopAnimation() {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
    }
  }

  function resetToIdle() {
    stopAnimation();
    setPhase("idle");
    setProgress(0);
  }

  function play() {
    stopAnimation();
    setPhase("playing");
    setProgress(0);
    startRef.current = performance.now();

    function loop(now: number) {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / duration);
      setProgress(easeOut(p));

      if (p < 1) {
        animRef.current = requestAnimationFrame(loop);
      } else {
        animRef.current = 0;
        setPhase("done");
      }
    }

    animRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    return () => stopAnimation();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";
  const isActive = !isIdle;

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={() => { if (isIdle) play(); }}
      onMouseLeave={resetToIdle}
      onClick={() => {
        if (isIdle) play();
        else if (isDone) resetToIdle();
      }}
    >
      {/* Single dashboard card */}
      <div className="w-[88%] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden flex flex-col">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-700/50">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
            <div className="w-2 h-2 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 h-2 rounded-full bg-neutral-100 dark:bg-neutral-700 mx-6" />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat, i) => {
              const currentValue = Math.round(stat.value * progress);
              return (
                <div
                  key={stat.label}
                  className="rounded-lg bg-neutral-50 dark:bg-neutral-700/30 px-2 sm:px-3 py-2 sm:py-2.5 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 1 : 0.4,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <p className="text-[8px] sm:text-[9px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                  <p className="text-xs sm:text-base font-bold text-neutral-800 dark:text-neutral-200 mt-0.5 font-mono">
                    {isActive ? formatNumber(currentValue, stat.prefix, stat.suffix) : "--"}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Charts - 3 in a row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* 1: Bar chart */}
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-700/30 p-2 sm:p-3 aspect-square flex flex-col">
              <div className="h-1 w-[45%] rounded bg-neutral-200 dark:bg-neutral-600 mb-2" />
              <div className="flex-1 overflow-hidden">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className={isActive ? "text-primary" : "text-primary/15"}
                >
                  {barValues.map((maxH, i) => {
                    const bp = Math.max(0, Math.min(1, (progress - i * 0.05) / 0.6));
                    const h = isActive ? maxH * easeOut(bp) : 6;
                    const barW = 100 / barValues.length;
                    const x = i * barW + barW * 0.1;
                    const w = barW * 0.8;
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={100 - h}
                        width={w}
                        height={h}
                        rx="2"
                        fill="currentColor"
                        opacity={isActive ? 0.3 + bp * 0.7 : 1}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* 2: Donut chart */}
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-700/30 p-2 sm:p-3 aspect-square flex flex-col items-center">
              <div className="h-1 w-[40%] rounded bg-neutral-200 dark:bg-neutral-600 mb-1 self-start" />
              <div className="flex-1 flex items-center justify-center w-full">
                <svg viewBox="0 0 36 36" className="w-[75%]">
                  {/* Background */}
                  <circle cx="18" cy="18" r="13" fill="none" stroke="currentColor" className="text-neutral-200 dark:text-neutral-600" strokeWidth="3.5" />
                  {/* Segment 1 - 62% */}
                  <circle
                    cx="18" cy="18" r="13"
                    fill="none"
                    className="text-primary"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray={`${51 * progress} ${82 - 51 * progress}`}
                    strokeDashoffset="20"
                    strokeLinecap="round"
                  />
                  {/* Segment 2 - 24% */}
                  <circle
                    cx="18" cy="18" r="13"
                    fill="none"
                    className="text-primary/30"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray={`${20 * progress} ${82 - 20 * progress}`}
                    strokeDashoffset={`${20 - 51 * progress}`}
                    strokeLinecap="round"
                  />
                  {/* Center value */}
                  <text
                    x="18" y="19.5"
                    textAnchor="middle"
                    className="fill-neutral-700 dark:fill-neutral-300"
                    style={{ fontSize: "6.5px", fontWeight: 700, fontFamily: "ui-monospace, monospace" }}
                  >
                    {isActive ? `${Math.round(62 * progress)}%` : "--"}
                  </text>
                </svg>
              </div>
            </div>

            {/* 3: Sparkline / area chart */}
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-700/30 p-2 sm:p-3 aspect-square flex flex-col">
              <div className="flex items-baseline justify-between mb-1">
                <div className="h-1 w-[40%] rounded bg-neutral-200 dark:bg-neutral-600" />
                <span
                  className="text-[8px] sm:text-[9px] font-mono font-bold text-primary transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  +18%
                </span>
              </div>
              <div className="flex-1 relative">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 60"
                  preserveAspectRatio="none"
                  className="absolute inset-0"
                >
                  {/* Area */}
                  <path
                    d={`M0,${60 - 10 * progress} C20,${60 - 22 * progress} 30,${60 - 18 * progress} 40,${60 - 30 * progress} C50,${60 - 42 * progress} 60,${60 - 35 * progress} 70,${60 - 45 * progress} C80,${60 - 50 * progress} 90,${60 - 48 * progress} 100,${60 - 52 * progress} L100,60 L0,60 Z`}
                    className="text-primary"
                    fill="currentColor"
                    opacity={isActive ? 0.12 : 0.03}
                  />
                  {/* Line */}
                  <path
                    d={`M0,${60 - 10 * progress} C20,${60 - 22 * progress} 30,${60 - 18 * progress} 40,${60 - 30 * progress} C50,${60 - 42 * progress} 60,${60 - 35 * progress} 70,${60 - 45 * progress} C80,${60 - 50 * progress} 90,${60 - 48 * progress} 100,${60 - 52 * progress}`}
                    fill="none"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={isActive ? 1 : 0.15}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="absolute bottom-[12%] left-0 right-0 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone
              ? "#22c55e"
              : isActive
              ? "hsl(var(--primary))"
              : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "Dashboard loaded"
            : isActive
            ? "Loading data..."
            : "Hover to load"}
        </span>
      </div>

      {/* Touch play overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{ opacity: isIdle ? 1 : 0, pointerEvents: isIdle ? "auto" : "none" }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
