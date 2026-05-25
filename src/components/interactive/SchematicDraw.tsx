"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#16a34a";
const LINE = "#525252";

export default function SchematicDraw() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(0);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const clear = () => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
  };
  const activate = () => {
    clear();
    setOn(true);
    setStep(0);
    tRef.current = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1000),
      setTimeout(() => setStep(4), 1400),
      setTimeout(() => setStep(5), 1800),
    ];
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setStep(0);
  };
  useEffect(() => () => clear(), []);

  const shown = (s: number) => on && step >= s;

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Title bar */}
        <text
          x={20}
          y={28}
          className="fill-neutral-400 dark:fill-neutral-500"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          SCH-001 · POWER FEED
        </text>
        <line x1={20} y1={36} x2={380} y2={36} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="3 2" />

        {/* L1/L2/L3 source */}
        <g style={{ opacity: shown(1) ? 1 : 0.15, transition: "opacity 0.3s" }}>
          <text x={20} y={70} className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>L1 L2 L3</text>
          <line x1={70} y1={66} x2={120} y2={66} stroke={shown(1) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <line x1={70} y1={80} x2={120} y2={80} stroke={shown(1) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <line x1={70} y1={94} x2={120} y2={94} stroke={shown(1) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
        </g>

        {/* Main breaker Q1 */}
        <g style={{ opacity: shown(2) ? 1 : 0.15, transition: "opacity 0.3s" }}>
          <rect x={120} y={50} width="60" height="60" fill="none" stroke={shown(2) ? ACCENT : LINE} strokeWidth="1.5" style={{ transition: "stroke 0.3s" }} />
          <text x={150} y={84} textAnchor="middle" className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>Q1</text>
          <text x={150} y={130} textAnchor="middle" className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>25A · C-curve</text>
        </g>

        {/* Contactor KM1 */}
        <g style={{ opacity: shown(3) ? 1 : 0.15, transition: "opacity 0.3s" }}>
          <line x1={180} y1={66} x2={220} y2={66} stroke={shown(3) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <line x1={180} y1={80} x2={220} y2={80} stroke={shown(3) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <line x1={180} y1={94} x2={220} y2={94} stroke={shown(3) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <rect x={220} y={50} width="50" height="60" fill="none" stroke={shown(3) ? ACCENT : LINE} strokeWidth="1.5" style={{ transition: "stroke 0.3s" }} />
          <text x={245} y={84} textAnchor="middle" className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>KM1</text>
          <text x={245} y={130} textAnchor="middle" className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>3P contactor</text>
        </g>

        {/* Motor M */}
        <g style={{ opacity: shown(4) ? 1 : 0.15, transition: "opacity 0.3s" }}>
          <line x1={270} y1={66} x2={320} y2={66} stroke={shown(4) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <line x1={270} y1={80} x2={320} y2={80} stroke={shown(4) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <line x1={270} y1={94} x2={320} y2={94} stroke={shown(4) ? ACCENT : LINE} strokeWidth="2" style={{ transition: "stroke 0.3s" }} />
          <circle cx={345} cy={80} r="22" fill="none" stroke={shown(4) ? ACCENT : LINE} strokeWidth="1.5" style={{ transition: "stroke 0.3s" }} />
          <text x={345} y={84} textAnchor="middle" className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "12px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>M</text>
          <text x={345} y={130} textAnchor="middle" className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>3~ 5.5kW</text>
        </g>

        {/* Terminal block at bottom */}
        <g style={{ opacity: shown(5) ? 1 : 0.15, transition: "opacity 0.3s" }}>
          <line x1={20} y1={210} x2={380} y2={210} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="3 2" />
          <text
            x={20}
            y={232}
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            X1 · TERMINAL BLOCK
          </text>

          {Array.from({ length: 8 }).map((_, i) => {
            const x = 40 + i * 40;
            return (
              <g key={i}>
                <rect x={x} y={250} width="28" height="40" fill="none" stroke={shown(5) ? ACCENT : LINE} strokeWidth="1" style={{ transition: "stroke 0.3s" }} />
                <circle cx={x + 14} cy={260} r="2" fill={shown(5) ? ACCENT : LINE} style={{ transition: "fill 0.3s" }} />
                <circle cx={x + 14} cy={280} r="2" fill={shown(5) ? ACCENT : LINE} style={{ transition: "fill 0.3s" }} />
                <text
                  x={x + 14}
                  y={306}
                  textAnchor="middle"
                  className="fill-neutral-400 dark:fill-neutral-500"
                  style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </g>

        {/* Footer info */}
        <g style={{ opacity: shown(5) ? 1 : 0, transition: "opacity 0.3s" }}>
          <text
            x={20}
            y={360}
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}
          >
            REV: 02 · DRAWN: AutoCAD Electrical
          </text>
          <text
            x={380}
            y={360}
            textAnchor="end"
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}
          >
            EN 60204-1
          </text>
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
