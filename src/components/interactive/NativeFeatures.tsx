"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Camera, MapPin, Fingerprint, Bell, Bluetooth, Nfc } from "lucide-react";

const features = [
  { Icon: Camera, label: "Camera", color: "#3b82f6" },
  { Icon: MapPin, label: "GPS", color: "#22c55e" },
  { Icon: Fingerprint, label: "Biometrics", color: "#8b5cf6" },
  { Icon: Bell, label: "Push", color: "#f59e0b" },
  { Icon: Bluetooth, label: "Bluetooth", color: "#06b6d4" },
  { Icon: Nfc, label: "NFC", color: "#ef4444" },
];

export default function NativeFeatures() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  function clearTimeouts() {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }

  function resetToIdle() {
    clearTimeouts();
    setPhase("idle");
    setActiveIndex(-1);
  }

  function play() {
    if (phase !== "idle") return;
    setPhase("playing");
    setActiveIndex(-1);

    features.forEach((_, i) => {
      const t = setTimeout(() => setActiveIndex(i), 200 + i * 250);
      timeoutRefs.current.push(t);
    });

    const tDone = setTimeout(() => setPhase("done"), 200 + features.length * 250 + 200);
    timeoutRefs.current.push(tDone);
  }

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";

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
      {/* Feature grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-[75%] max-w-[260px]">
        {features.map((feat, i) => {
          const isLit = activeIndex >= i;
          const isCurrentlyLighting = activeIndex === i;

          return (
            <div
              key={feat.label}
              className="aspect-square rounded-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center gap-2 transition-all duration-400"
              style={{
                borderColor: isLit ? `${feat.color}40` : undefined,
                backgroundColor: isLit ? `${feat.color}08` : undefined,
                transform: isCurrentlyLighting ? "scale(1.05)" : "scale(1)",
                boxShadow: isLit ? `0 0 20px ${feat.color}15` : "none",
              }}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-400 ${!isLit ? "bg-neutral-100 dark:bg-neutral-700/40" : ""}`}
                style={{
                  backgroundColor: isLit ? `${feat.color}15` : undefined,
                }}
              >
                <feat.Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-400 ${!isLit ? "text-neutral-400 dark:text-neutral-500" : ""}`}
                  style={{ color: isLit ? feat.color : undefined }}
                />
              </div>
              <span
                className={`text-[9px] sm:text-[10px] font-medium transition-colors duration-400 ${!isLit ? "text-neutral-400 dark:text-neutral-500" : ""}`}
                style={{ color: isLit ? feat.color : undefined }}
              >
                {feat.label}
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
            backgroundColor: isDone
              ? "#22c55e"
              : activeIndex >= 0
              ? features[Math.min(activeIndex, features.length - 1)].color
              : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? `${features.length} APIs available`
            : activeIndex >= 0
            ? `Accessing ${features[Math.min(activeIndex, features.length - 1)].label}...`
            : "Hover to discover"}
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
