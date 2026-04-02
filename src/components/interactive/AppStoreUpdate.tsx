"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

export default function AppStoreUpdate() {
  const [phase, setPhase] = useState<"idle" | "updating" | "installing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const animRef = useRef(0);
  const startRef = useRef(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  function clearAll() {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
    }
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }

  function resetToIdle() {
    clearAll();
    setPhase("idle");
    setProgress(0);
  }

  function play() {
    if (phase !== "idle") return;
    setPhase("updating");
    setProgress(0);
    startRef.current = performance.now();

    function loop(now: number) {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / 1200);
      setProgress(p);

      if (p < 1) {
        animRef.current = requestAnimationFrame(loop);
      } else {
        animRef.current = 0;
        setPhase("installing");
        const t = setTimeout(() => setPhase("done"), 600);
        timeoutRefs.current.push(t);
      }
    }

    animRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    return () => clearAll();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";
  const isUpdating = phase === "updating";
  const isInstalling = phase === "installing";

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
      {/* Store listing card */}
      <div className="w-[75%] max-w-[280px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm p-4">
        <div className="flex items-start gap-3">
          {/* App icon */}
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <div className="w-7 h-7 rounded-lg bg-primary/30" />
          </div>

          {/* App info */}
          <div className="flex-1 min-w-0">
            <div className="h-2 w-24 rounded bg-neutral-300 dark:bg-neutral-600 mb-1.5" />
            <div className="h-1.5 w-16 rounded bg-neutral-200 dark:bg-neutral-700 mb-1" />
            {/* Stars */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`w-1.5 h-1.5 rounded-sm ${s <= 4 ? "bg-yellow-400" : "bg-neutral-200 dark:bg-neutral-700"}`}
                />
              ))}
            </div>
          </div>

          {/* Update button */}
          <div className="shrink-0 mt-1">
            {isIdle && (
              <div className="px-4 py-1.5 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                Update
              </div>
            )}
            {isUpdating && (
              <div className="w-10 h-10 relative">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle
                    cx="18" cy="18" r="15"
                    fill="none"
                    className="stroke-neutral-200 dark:stroke-neutral-700"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18" cy="18" r="15"
                    fill="none"
                    className="stroke-primary"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={94.25}
                    strokeDashoffset={94.25 - 94.25 * progress}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-mono font-bold text-primary">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>
            )}
            {isInstalling && (
              <div className="w-10 h-10 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            )}
            {isDone && (
              <div className="px-4 py-1.5 rounded-full bg-green-500 text-[10px] font-semibold text-white">
                Open
              </div>
            )}
          </div>
        </div>

        {/* What's new section */}
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
              What&apos;s New
            </span>
            <span
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded transition-all duration-300"
              style={{
                backgroundColor: isDone ? "rgb(34 197 94 / 0.1)" : "rgb(163 163 163 / 0.1)",
                color: isDone ? "#22c55e" : "rgb(163 163 163)",
              }}
            >
              {isDone ? "v2.1.0" : "v2.0.3"}
            </span>
          </div>
          <div className="space-y-1">
            <div className="h-1 w-[90%] rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-1 w-[70%] rounded bg-neutral-200 dark:bg-neutral-700" />
          </div>

          {/* OTA badge */}
          <div
            className="mt-3 flex items-center gap-1.5 transition-all duration-300"
            style={{ opacity: isDone ? 1 : 0 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-medium text-green-600 dark:text-green-400">
              OTA update delivered instantly
            </span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone
              ? "#22c55e"
              : isUpdating || isInstalling
              ? "hsl(var(--primary))"
              : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "Update shipped"
            : isInstalling
            ? "Installing..."
            : isUpdating
            ? "Downloading..."
            : "Hover to update"}
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
