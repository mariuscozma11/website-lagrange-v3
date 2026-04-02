"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const detections = [
  { label: "Person", confidence: 97, x: 6, y: 8, w: 30, h: 55, color: "#22c55e", image: "/computer-vision/running-2-svgrepo-com.svg" },
  { label: "Box", confidence: 94, x: 55, y: 10, w: 28, h: 30, color: "#3b82f6", image: "/computer-vision/box-svgrepo-com.svg" },
  { label: "Chair", confidence: 89, x: 58, y: 52, w: 28, h: 38, color: "#f59e0b", image: "/computer-vision/chair-svgrepo-com.svg" },
  { label: "Cup", confidence: 91, x: 20, y: 70, w: 16, h: 22, color: "#ef4444", image: "/computer-vision/cup-svgrepo-com.svg" },
];

export default function CVDetection() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "detected">("idle");

  const handleHover = () => {
    if (phase !== "idle") return;
    setPhase("scanning");
    setTimeout(() => setPhase("detected"), 1200);
  };

  const handleLeave = () => {
    setPhase("idle");
  };

  const handleTap = () => {
    if (phase === "idle") {
      setPhase("scanning");
      setTimeout(() => setPhase("detected"), 1200);
    } else if (phase === "detected") {
      setPhase("idle");
    }
  };

  return (
    <div
      className="relative w-full aspect-square cursor-crosshair select-none"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleTap}
    >
      {/* SVG objects */}
      <div className="absolute inset-[10%]">
        {detections.map((det) => (
          <div
            key={det.label}
            className="absolute"
            style={{
              left: `${det.x}%`,
              top: `${det.y}%`,
              width: `${det.w}%`,
              height: `${det.h}%`,
            }}
          >
            <Image
              src={det.image}
              alt={det.label}
              fill
              className="object-contain opacity-60"
            />
          </div>
        ))}
      </div>

      {/* Viewfinder square with + (idle state) */}
      <div
        className="absolute inset-[10%] transition-opacity duration-500"
        style={{ opacity: phase === "idle" ? 1 : 0 }}
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neutral-400 dark:border-neutral-500 rounded-tl-sm" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neutral-400 dark:border-neutral-500 rounded-tr-sm" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neutral-400 dark:border-neutral-500 rounded-bl-sm" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neutral-400 dark:border-neutral-500 rounded-br-sm" />

        {/* Crosshair + */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-[1.5px] bg-neutral-400 dark:bg-neutral-500" />
          <div className="absolute w-[1.5px] h-6 bg-neutral-400 dark:bg-neutral-500" />
        </div>
      </div>

      {/* Scan line */}
      {phase === "scanning" && (
        <>
          <div
            className="absolute left-[10%] right-[10%] h-[2px] pointer-events-none z-10 animate-[scanDown_1.2s_ease-in-out_forwards]"
            style={{
              background: "linear-gradient(to right, transparent, #22c55e, transparent)",
            }}
          />
          <div
            className="absolute left-[10%] right-[10%] h-8 pointer-events-none z-10 animate-[scanDown_1.2s_ease-in-out_forwards]"
            style={{
              background: "linear-gradient(to bottom, rgb(34 197 94 / 0.15), transparent)",
            }}
          />
          <style>{`
            @keyframes scanDown {
              0% { top: 10%; opacity: 1; }
              40% { opacity: 0.8; }
              70% { opacity: 0.5; }
              100% { top: 90%; opacity: 0; }
            }
          `}</style>
        </>
      )}

      {/* Detection boxes */}
      <div className="absolute inset-[10%]">
        {detections.map((det, i) => (
          <div
            key={det.label}
            className="absolute pointer-events-none"
            style={{
              left: `${det.x}%`,
              top: `${det.y}%`,
              width: `${det.w}%`,
              height: `${det.h}%`,
              opacity: phase === "detected" ? 1 : 0,
              transform: phase === "detected" ? "scale(1)" : "scale(0.92)",
              transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: phase === "detected" ? `${i * 120}ms` : "0ms",
            }}
          >
            {/* Box border */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                border: `2px solid ${det.color}`,
                boxShadow: `0 0 12px ${det.color}30`,
              }}
            />

            {/* Corner markers */}
            {[
              "top-0 left-0 border-t-2 border-l-2 rounded-tl-sm",
              "top-0 right-0 border-t-2 border-r-2 rounded-tr-sm",
              "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-sm",
              "bottom-0 right-0 border-b-2 border-r-2 rounded-br-sm",
            ].map((pos, j) => (
              <div
                key={j}
                className={`absolute w-[20%] h-[20%] ${pos}`}
                style={{ borderColor: det.color }}
              />
            ))}

            {/* Label */}
            <div
              className="absolute -top-6 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold whitespace-nowrap"
              style={{ backgroundColor: det.color, color: "#fff" }}
            >
              {det.label}
              <span className="opacity-75">{det.confidence}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile play button */}
      <div
        className="absolute inset-0 flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{ opacity: phase === "idle" ? 1 : 0, pointerEvents: phase === "idle" ? "auto" : "none" }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-neutral-900/20 dark:hover:bg-white/20 transition-colors">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-2 right-[12%] flex items-center gap-1.5 pointer-events-none">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor:
              phase === "detected" ? "#22c55e" : phase === "scanning" ? "hsl(var(--primary))" : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {phase === "detected"
            ? `${detections.length} detected`
            : phase === "scanning"
            ? "Scanning..."
            : "Tap to detect"}
        </span>
      </div>
    </div>
  );
}
