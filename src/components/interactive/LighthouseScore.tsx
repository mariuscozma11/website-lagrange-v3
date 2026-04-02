"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const metrics = [
  { label: "Performance", score: 98, color: "#22c55e" },
  { label: "Accessibility", score: 95, color: "#22c55e" },
  { label: "Best Practices", score: 100, color: "#22c55e" },
  { label: "SEO", score: 97, color: "#22c55e" },
];

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Circle math: r=40, circumference=251.3
const radius = 40;
const circumference = 2 * Math.PI * radius;

export default function LighthouseScore() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const animRef = useRef(0);
  const startRef = useRef(0);
  const duration = 1400;

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
  const mainScore = Math.round(metrics[0].score * progress);
  const dashOffset = circumference - (circumference * (metrics[0].score / 100) * progress);

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={() => { if (isIdle) play(); }}
      onMouseLeave={resetToIdle}
      onClick={() => {
        if (isIdle) play();
        else if (isDone) resetToIdle();
      }}
    >
      {/* Main gauge */}
      <div className="relative w-[45%] max-w-[160px]">
        <svg viewBox="0 0 100 100" className="w-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-700"
            strokeWidth="6"
          />
          {/* Score arc */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isActive ? dashOffset : circumference}
          />
        </svg>
        {/* Center score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl sm:text-4xl font-bold font-mono transition-colors duration-300"
            style={{ color: isActive ? "#22c55e" : "rgb(163 163 163)" }}
          >
            {isActive ? mainScore : "--"}
          </span>
        </div>
      </div>

      {/* Sub-metrics */}
      <div className="w-[75%] max-w-[280px] grid grid-cols-4 gap-2 mt-6">
        {metrics.map((metric, i) => {
          const score = Math.round(metric.score * progress);
          const delayed = Math.max(0, Math.min(1, (progress - i * 0.08) / 0.7));
          const miniDash = 44; // circumference for r=7
          const miniOffset = miniDash - (miniDash * (metric.score / 100) * delayed);

          return (
            <div key={metric.label} className="flex flex-col items-center gap-1.5">
              {/* Mini gauge */}
              <div className="relative w-9 h-9">
                <svg viewBox="0 0 24 24" className="w-full h-full -rotate-90">
                  <circle
                    cx="12" cy="12" r="7"
                    fill="none"
                    stroke="currentColor"
                    className="text-neutral-200 dark:text-neutral-700"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="12" cy="12" r="7"
                    fill="none"
                    stroke={isActive ? metric.color : "transparent"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={miniDash}
                    strokeDashoffset={isActive ? miniOffset : miniDash}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[8px] font-bold font-mono"
                    style={{ color: isActive ? metric.color : "rgb(163 163 163)" }}
                  >
                    {isActive ? score : "--"}
                  </span>
                </div>
              </div>
              {/* Label */}
              <span className="text-[7px] sm:text-[8px] text-neutral-400 dark:text-neutral-500 text-center leading-tight font-medium">
                {metric.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone ? "#22c55e" : isActive ? "hsl(var(--primary))" : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "Audit complete"
            : isActive
            ? "Running audit..."
            : "Hover to audit"}
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
