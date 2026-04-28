"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const PER_PART = 1500;
const REFILL = 1200;

interface Part {
  id: number;
  x: number;
  y: number;
  rot: number;
  color: string;
  label: string;
  confidence: number;
}

const PARTS: Part[] = [
  { id: 0, x: 32, y: 30, rot: 18,  color: "#22c55e", label: "part_A", confidence: 97 },
  { id: 1, x: 60, y: 26, rot: -28, color: "#3b82f6", label: "part_B", confidence: 94 },
  { id: 2, x: 46, y: 50, rot: 42,  color: "#f59e0b", label: "part_C", confidence: 91 },
  { id: 3, x: 28, y: 66, rot: -14, color: "#22c55e", label: "part_A", confidence: 96 },
  { id: 4, x: 66, y: 60, rot: 8,   color: "#3b82f6", label: "part_B", confidence: 92 },
  { id: 5, x: 52, y: 76, rot: -52, color: "#f59e0b", label: "part_C", confidence: 89 },
];

const CYCLE = PARTS.length * PER_PART + REFILL;

function ease(t: number) {
  const k = Math.max(0, Math.min(1, t));
  return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
}

export default function BinPicking() {
  const [phase, setPhase] = useState<"idle" | "running">("idle");
  const [t, setT] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (phase !== "running") {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const start = performance.now();
    const loop = (now: number) => {
      setT((now - start) % CYCLE);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Determine state for each part:
  //   visible: still in bin
  //   target: currently being picked
  //   prevTarget: just got picked (used for reticle origin)
  // Refill phase: all parts visible (fading in)
  const inRefill = t >= PARTS.length * PER_PART;
  const refillProgress = inRefill ? (t - PARTS.length * PER_PART) / REFILL : 1;

  const activeIndex = inRefill ? -1 : Math.floor(t / PER_PART);
  const localT = inRefill ? 0 : t - activeIndex * PER_PART;

  // Within a part's window:
  //   0..400: reticle moves toward target
  //   400..900: locked, "TARGET" indicator
  //   900..1200: pick (part fades out)
  //   1200..1500: idle
  const reticleMove = Math.min(localT / 400, 1);
  const isLocked = localT >= 400 && localT < 900;
  const pickProgress = localT >= 900 && localT < 1200 ? (localT - 900) / 300 : localT >= 1200 ? 1 : 0;

  const targetPart = activeIndex >= 0 ? PARTS[activeIndex] : null;
  const prevPart = activeIndex > 0 ? PARTS[activeIndex - 1] : PARTS[PARTS.length - 1];

  // Reticle position lerps from prev pick to current target during reticleMove
  const reticleX = targetPart
    ? prevPart.x + (targetPart.x - prevPart.x) * ease(reticleMove)
    : 50;
  const reticleY = targetPart
    ? prevPart.y + (targetPart.y - prevPart.y) * ease(reticleMove)
    : 50;

  function partOpacity(p: Part): number {
    if (inRefill) return ease(refillProgress);
    if (activeIndex < 0) return 1;
    // Already picked
    if (p.id < activeIndex) return 0;
    // Currently being picked
    if (p.id === activeIndex) return 1 - ease(pickProgress);
    return 1;
  }

  const remaining = inRefill ? PARTS.length : PARTS.length - activeIndex - (pickProgress >= 1 ? 1 : 0);

  let status = "Tap to start";
  if (phase === "running") {
    if (inRefill) status = "Bin refilling…";
    else if (targetPart) {
      if (localT < 400) status = `Targeting ${targetPart.label}`;
      else if (localT < 900) status = `Locked · pose ${targetPart.rot.toFixed(0)}°`;
      else status = `Picked · ${remaining} remaining`;
    }
  }

  return (
    <div
      className="relative w-full aspect-square select-none cursor-pointer"
      onClick={() => setPhase((p) => (p === "idle" ? "running" : "idle"))}
      onMouseEnter={() => setPhase("running")}
      onMouseLeave={() => setPhase("idle")}
    >
      {/* Camera frame */}
      <div className="absolute inset-[5%] rounded-md border border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="absolute top-1.5 left-2 font-mono text-[8px] text-neutral-400 dark:text-neutral-600">
          CAM_01 · TOP-DOWN
        </div>
        <div className="absolute top-1.5 right-2 font-mono text-[8px] text-neutral-400 dark:text-neutral-600 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          REC
        </div>

        {/* Camera corner brackets */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-neutral-400/40 dark:border-neutral-500/40" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-neutral-400/40 dark:border-neutral-500/40" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-neutral-400/40 dark:border-neutral-500/40" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-neutral-400/40 dark:border-neutral-500/40" />
      </div>

      {/* Bin */}
      <div className="absolute inset-[14%] rounded-md bg-neutral-100 dark:bg-neutral-900/60 border-2 border-neutral-300 dark:border-neutral-700 shadow-inner">
        {/* Inner shadow ring to suggest bin walls */}
        <div className="absolute inset-[3%] rounded-sm border border-neutral-200 dark:border-neutral-800/60" />

        {/* Parts */}
        {PARTS.map((p) => {
          const opacity = partOpacity(p);
          if (opacity <= 0.01) return null;

          const isTarget = phase === "running" && targetPart?.id === p.id;
          const isPicked = phase === "running" && activeIndex > p.id;

          return (
            <div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
                opacity,
                transition: "opacity 100ms linear",
              }}
            >
              {/* Part body */}
              <div
                className="rounded-[2px]"
                style={{
                  width: "44px",
                  height: "20px",
                  maxWidth: "16cqw",
                  maxHeight: "7cqw",
                  backgroundColor: p.color,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              />

              {/* Bbox + label, only when not picked yet and animation running */}
              {phase === "running" && !isPicked && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "calc(44px + 8px)",
                    height: "calc(20px + 8px)",
                    maxWidth: "calc(16cqw + 8px)",
                    maxHeight: "calc(7cqw + 8px)",
                    border: `1.5px solid ${p.color}`,
                    backgroundColor: `${p.color}10`,
                    borderRadius: "3px",
                    boxShadow: isTarget && isLocked ? `0 0 0 2px ${p.color}40` : "none",
                  }}
                >
                  <div
                    className="absolute font-mono text-[7px] sm:text-[8px] px-1 py-[1px] rounded-sm whitespace-nowrap"
                    style={{
                      backgroundColor: p.color,
                      color: "#fff",
                      transform: `rotate(${-p.rot}deg)`,
                      top: "-12px",
                      left: "0",
                      transformOrigin: "left bottom",
                    }}
                  >
                    {isTarget && isLocked ? `TARGET · ${p.rot.toFixed(0)}°` : `${p.label} ${p.confidence}%`}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reticle (target tracker) */}
      {phase === "running" && targetPart && !inRefill && (
        <div
          className="absolute pointer-events-none"
          style={{
            // Reticle sits at bin coordinate space : bin is inset 14%, span 72%
            left: `${14 + (reticleX / 100) * 72}%`,
            top: `${14 + (reticleY / 100) * 72}%`,
            transform: "translate(-50%, -50%)",
            transition: "opacity 200ms linear",
            opacity: pickProgress > 0.5 ? 1 - (pickProgress - 0.5) * 2 : 1,
          }}
        >
          {/* Outer ring : pulses when locked */}
          <div
            className="rounded-full border-2"
            style={{
              width: "44px",
              height: "44px",
              borderColor: targetPart.color,
              boxShadow: isLocked ? `0 0 0 4px ${targetPart.color}25` : "none",
              animation: isLocked ? "binTargetPulse 800ms ease-in-out infinite" : "none",
            }}
          />
          {/* Crosshair lines */}
          <div
            className="absolute top-1/2 left-[-10px] right-[-10px] h-[1.5px]"
            style={{ backgroundColor: targetPart.color, transform: "translateY(-50%)" }}
          />
          <div
            className="absolute left-1/2 top-[-10px] bottom-[-10px] w-[1.5px]"
            style={{ backgroundColor: targetPart.color, transform: "translateX(-50%)" }}
          />
          <style>{`
            @keyframes binTargetPulse {
              0%, 100% { box-shadow: 0 0 0 0 ${targetPart.color}40; }
              50% { box-shadow: 0 0 0 8px ${targetPart.color}10; }
            }
          `}</style>
        </div>
      )}

      {/* Idle play button */}
      {phase === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
          </div>
        </div>
      )}

      {/* Status */}
      <div className="absolute bottom-[1.5%] left-[6%] right-[6%] flex items-center justify-between gap-1.5 pointer-events-none">
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {phase === "running" ? `${remaining}/${PARTS.length} in bin` : ""}
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
            style={{
              backgroundColor:
                phase === "running"
                  ? isLocked
                    ? "#22c55e"
                    : "#3b82f6"
                  : "#a3a3a3",
            }}
          />
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
