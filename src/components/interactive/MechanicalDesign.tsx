"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#2563eb";
const IDLE = "#a3a3a3";

export default function MechanicalDesign() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(-1);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const STEPS = 6;
  const STEP_MS = 340;

  const clear = () => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
  };
  const activate = () => {
    clear();
    setOn(true);
    setStep(-1);
    for (let i = 0; i < STEPS; i++) {
      tRef.current.push(setTimeout(() => setStep(i), 250 + i * STEP_MS));
    }
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setStep(-1);
  };
  useEffect(() => () => clear(), []);

  const shown = (i: number) => on && step >= i;
  const colorAt = (i: number) => (shown(i) ? ACCENT : IDLE);
  const dimColor = (i: number) => (shown(i) ? ACCENT : "#737373");

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <pattern id="dotgrid-md" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" className="fill-neutral-300 dark:fill-neutral-700" />
          </pattern>
        </defs>
        <rect x="20" y="20" width="360" height="360" fill="url(#dotgrid-md)" opacity="0.5" />

        {/* Drawing frame */}
        <rect x="12" y="12" width="376" height="376" fill="none" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
        <rect x="20" y="20" width="360" height="360" fill="none" className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.5" />

        <text
          x={32}
          y={42}
          className="fill-neutral-500 dark:fill-neutral-400"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.18em" }}
        >
          MACHINE FRAME — FRONT VIEW
        </text>
        <line x1={32} y1={50} x2={368} y2={50} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* STEP 0 — Base plate + feet */}
        <g style={{ opacity: shown(0) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <rect x={96} y={296} width="208" height="16" fill="none" stroke={colorAt(0)} strokeWidth="2.4" style={{ transition: "stroke 0.35s" }} />
          {/* feet */}
          <rect x={108} y={312} width="26" height="10" fill="none" stroke={colorAt(0)} strokeWidth="1.8" style={{ transition: "stroke 0.35s" }} />
          <rect x={266} y={312} width="26" height="10" fill="none" stroke={colorAt(0)} strokeWidth="1.8" style={{ transition: "stroke 0.35s" }} />
          <text x={200} y={290} textAnchor="middle" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: dimColor(0), transition: "fill 0.35s" }}>
            BASE PLATE
          </text>
        </g>

        {/* STEP 1 — Uprights */}
        <g style={{ opacity: shown(1) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <rect x={120} y={138} width="20" height="158" fill="none" stroke={colorAt(1)} strokeWidth="2.4" style={{ transition: "stroke 0.35s" }} />
          <rect x={260} y={138} width="20" height="158" fill="none" stroke={colorAt(1)} strokeWidth="2.4" style={{ transition: "stroke 0.35s" }} />
        </g>

        {/* STEP 2 — Top beam + linear rail */}
        <g style={{ opacity: shown(2) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <rect x={110} y={120} width="180" height="18" fill="none" stroke={colorAt(2)} strokeWidth="2.4" style={{ transition: "stroke 0.35s" }} />
          {/* linear rail on beam */}
          <line x1={120} y1={114} x2={280} y2={114} stroke={colorAt(2)} strokeWidth="3" style={{ transition: "stroke 0.35s" }} />
          {/* carriage */}
          <rect x={186} y={106} width="28" height="10" fill="none" stroke={colorAt(2)} strokeWidth="1.8" style={{ transition: "stroke 0.35s" }} />
          <text x={295} y={113} style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: dimColor(2), transition: "fill 0.35s" }}>
            RAIL
          </text>
        </g>

        {/* STEP 3 — Centerlines + hole pattern */}
        <g style={{ opacity: shown(3) ? 0.9 : 0, transition: "opacity 0.35s" }}>
          <line x1={200} y1={96} x2={200} y2={336} stroke={dimColor(3)} strokeWidth="0.8" strokeDasharray="8 3 2 3" style={{ transition: "stroke 0.35s" }} />
          {[121, 279].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy={317} r="3" fill="none" stroke={dimColor(3)} strokeWidth="1.2" style={{ transition: "stroke 0.35s" }} />
              <line x1={cx - 6} y1={317} x2={cx + 6} y2={317} stroke={dimColor(3)} strokeWidth="0.6" />
              <line x1={cx} y1={311} x2={cx} y2={323} stroke={dimColor(3)} strokeWidth="0.6" />
            </g>
          ))}
        </g>

        {/* STEP 4 — Dimension lines */}
        <g style={{ opacity: shown(4) ? 1 : 0, transition: "opacity 0.35s" }}>
          {/* width dim (top) */}
          <line x1={110} y1={78} x2={290} y2={78} stroke={dimColor(4)} strokeWidth="0.9" style={{ transition: "stroke 0.35s" }} />
          <line x1={110} y1={72} x2={110} y2={120} stroke={dimColor(4)} strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1={290} y1={72} x2={290} y2={120} stroke={dimColor(4)} strokeWidth="0.6" strokeDasharray="2 2" />
          <path d={`M114 75 L110 78 L114 81`} fill="none" stroke={dimColor(4)} strokeWidth="0.9" />
          <path d={`M286 75 L290 78 L286 81`} fill="none" stroke={dimColor(4)} strokeWidth="0.9" />
          <rect x={183} y={70} width="34" height="14" className="fill-background" />
          <text x={200} y={81} textAnchor="middle" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: dimColor(4), transition: "fill 0.35s" }}>
            900
          </text>
          {/* height dim (left) */}
          <line x1={74} y1={120} x2={74} y2={312} stroke={dimColor(4)} strokeWidth="0.9" style={{ transition: "stroke 0.35s" }} />
          <line x1={68} y1={120} x2={120} y2={120} stroke={dimColor(4)} strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1={68} y1={312} x2={96} y2={312} stroke={dimColor(4)} strokeWidth="0.6" strokeDasharray="2 2" />
          <path d={`M71 124 L74 120 L77 124`} fill="none" stroke={dimColor(4)} strokeWidth="0.9" />
          <path d={`M71 308 L74 312 L77 308`} fill="none" stroke={dimColor(4)} strokeWidth="0.9" />
          <g transform="rotate(-90 74 216)">
            <rect x={57} y={209} width="34" height="14" className="fill-background" />
            <text x={74} y={220} textAnchor="middle" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: dimColor(4), transition: "fill 0.35s" }}>
              1100
            </text>
          </g>
        </g>

        {/* STEP 5 — Title block */}
        <g style={{ opacity: shown(5) ? 1 : 0, transition: "opacity 0.35s" }}>
          <line x1={20} y1={344} x2={380} y2={344} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.7" />
          <line x1={150} y1={344} x2={150} y2={380} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.7" />
          <line x1={250} y1={344} x2={250} y2={380} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.7" />
          <line x1={20} y1={362} x2={380} y2={362} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" />

          <text x={28} y={356} className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>PART</text>
          <text x={28} y={376} className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>FRM-220</text>

          <text x={158} y={356} className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>MATERIAL</text>
          <text x={158} y={376} className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>S235 / ALU</text>

          <text x={258} y={356} className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>SCALE</text>
          <text x={258} y={376} className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>1:10</text>
        </g>
      </svg>

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
