"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function DesktopApp() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const animRef = useRef(0);
  const startRef = useRef(0);
  const duration = 1000;

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
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={() => { if (isIdle) play(); }}
      onMouseLeave={resetToIdle}
      onClick={() => {
        if (isIdle) play();
        else if (isDone) resetToIdle();
      }}
    >
      {/* App window */}
      <div
        className="w-[85%] max-w-[320px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg overflow-hidden transition-all duration-700"
        style={{
          opacity: isActive ? 1 : 0.4,
          transform: isActive ? "scale(1) translateY(0)" : "scale(0.92) translateY(12px)",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[9px] font-medium text-neutral-400 dark:text-neutral-500">
              MyApp — Electron
            </span>
          </div>
          <div className="w-[42px]" />
        </div>

        {/* App body */}
        <div className="flex" style={{ height: "200px" }}>
          {/* Sidebar */}
          <div className="w-[30%] border-r border-neutral-100 dark:border-neutral-700/50 bg-neutral-50 dark:bg-neutral-900/50 p-2 flex flex-col gap-1.5">
            {["Dashboard", "Projects", "Settings"].map((item, i) => {
              const active = i === 0;
              const barProgress = Math.max(0, Math.min(1, (progress - i * 0.1) / 0.5));
              return (
                <div
                  key={item}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all duration-300"
                  style={{
                    backgroundColor: active && isActive ? "hsl(var(--primary) / 0.1)" : "transparent",
                    opacity: isActive ? 0.3 + barProgress * 0.7 : 0.3,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-sm bg-neutral-300 dark:bg-neutral-600 transition-colors duration-300"
                    style={{
                      backgroundColor: active && isActive ? "hsl(var(--primary))" : undefined,
                    }}
                  />
                  <span
                    className="text-[8px] font-medium text-neutral-400 dark:text-neutral-500 transition-colors duration-300"
                    style={{
                      color: active && isActive ? "hsl(var(--primary))" : undefined,
                    }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 flex flex-col gap-2.5">
            {/* Header */}
            <div
              className="h-2 w-[50%] rounded bg-neutral-300 dark:bg-neutral-600 transition-opacity duration-500"
              style={{ opacity: isActive ? 1 : 0.3 }}
            />

            {/* Stat row */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { w: "65%", h: "1.5" },
                { w: "55%", h: "1.5" },
              ].map((item, i) => {
                const cardProgress = Math.max(0, Math.min(1, (progress - 0.2 - i * 0.1) / 0.5));
                return (
                  <div
                    key={i}
                    className="rounded-md bg-neutral-50 dark:bg-neutral-700/30 p-2 transition-opacity duration-400"
                    style={{ opacity: isActive ? 0.3 + cardProgress * 0.7 : 0.2 }}
                  >
                    <div className="h-1 w-[40%] rounded bg-neutral-200 dark:bg-neutral-600 mb-1.5" />
                    <div className="h-1.5 rounded bg-neutral-300 dark:bg-neutral-500" style={{ width: item.w }} />
                  </div>
                );
              })}
            </div>

            {/* Content area */}
            <div
              className="flex-1 rounded-md bg-neutral-50 dark:bg-neutral-700/30 p-2 flex flex-col gap-1.5 transition-opacity duration-500"
              style={{ opacity: isActive ? 0.3 + Math.max(0, (progress - 0.3) / 0.7) * 0.7 : 0.2 }}
            >
              <div className="h-1 w-[70%] rounded bg-neutral-200 dark:bg-neutral-600" />
              <div className="h-1 w-[55%] rounded bg-neutral-200 dark:bg-neutral-600" />
              <div className="h-1 w-[40%] rounded bg-neutral-200 dark:bg-neutral-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform badges */}
      <div
        className="flex items-center gap-3 mt-4 transition-opacity duration-500"
        style={{ opacity: isActive ? 1 : 0.3 }}
      >
        {["Windows", "macOS", "Linux"].map((os, i) => (
          <span
            key={os}
            className="text-[9px] font-medium px-2 py-0.5 rounded-full border transition-all duration-400"
            style={{
              borderColor: isActive ? "hsl(var(--primary) / 0.3)" : "hsl(var(--muted-foreground) / 0.3)",
              color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
              opacity: isActive ? Math.max(0.3, Math.min(1, (progress - i * 0.15) / 0.5)) : 0.5,
            }}
          >
            {os}
          </span>
        ))}
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone ? "#22c55e" : isActive ? "hsl(var(--primary))" : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "App launched"
            : isActive
            ? "Launching..."
            : "Hover to launch"}
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
