"use client";

import { useState, useEffect, useRef } from "react";
import { Play, FileText, Clock, Eye, CheckCircle2 } from "lucide-react";

const stages = [
  { label: "Draft", color: "#a3a3a3", Icon: FileText },
  { label: "In Review", color: "#f59e0b", Icon: Clock },
  { label: "Preview", color: "#3b82f6", Icon: Eye },
  { label: "Published", color: "#22c55e", Icon: CheckCircle2 },
];

export default function CMSPublish() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [stageIndex, setStageIndex] = useState(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  function clearTimeouts() {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }

  function resetToIdle() {
    clearTimeouts();
    setPhase("idle");
    setStageIndex(0);
  }

  function play() {
    if (phase !== "idle") return;
    setPhase("playing");
    setStageIndex(0);

    const t1 = setTimeout(() => setStageIndex(1), 600);
    const t2 = setTimeout(() => setStageIndex(2), 1400);
    const t3 = setTimeout(() => setStageIndex(3), 2200);
    const t4 = setTimeout(() => setPhase("done"), 2800);

    timeoutRefs.current = [t1, t2, t3, t4];
  }

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";
  const isActive = !isIdle;
  const current = stages[stageIndex];

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
      <div className="w-[80%] flex flex-col gap-4">
        {/* Document */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
          {/* Document toolbar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-700/50">
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
              <div className="h-1.5 w-20 sm:w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
            {/* Status badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all duration-400"
              style={{
                backgroundColor: `${current.color}18`,
                color: current.color,
                border: `1px solid ${current.color}40`,
              }}
            >
              <current.Icon className="w-3 h-3" />
              {current.label}
            </div>
          </div>

          {/* Document content */}
          <div className="p-3 sm:p-4 space-y-3">
            {/* Title line */}
            <div className="h-2.5 w-[60%] rounded bg-neutral-300 dark:bg-neutral-600" />

            {/* Paragraph */}
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-1.5 w-[75%] rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>

            {/* Image placeholder */}
            <div className="h-14 sm:h-16 rounded-lg bg-neutral-100 dark:bg-neutral-700/40" />
          </div>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-0 px-2">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center flex-1 last:flex-initial">
              {/* Step dot */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-400"
                  style={{
                    backgroundColor: i <= stageIndex && isActive ? stage.color : "transparent",
                    border: `2px solid ${i <= stageIndex && isActive ? stage.color : "rgb(212 212 212)"}`,
                  }}
                >
                  {i <= stageIndex && isActive && (
                    <stage.Icon className="w-2.5 h-2.5 text-white" />
                  )}
                </div>
                <span
                  className="text-[8px] sm:text-[9px] font-medium whitespace-nowrap transition-colors duration-300"
                  style={{
                    color: i <= stageIndex && isActive ? stage.color : "rgb(163 163 163)",
                  }}
                >
                  {stage.label}
                </span>
              </div>
              {/* Connector line */}
              {i < stages.length - 1 && (
                <div className="flex-1 h-[2px] mx-1 sm:mx-2 -mt-5 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: i < stageIndex && isActive ? "100%" : "0%",
                      backgroundColor: stages[i + 1].color,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone ? "#22c55e" : isActive ? current.color : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "Content published"
            : isActive
            ? `${current.label}...`
            : "Hover to publish"}
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
