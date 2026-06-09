"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#2563eb";
const IDLE = "#a3a3a3";

const NODES = [
  { label: "HMI", x: 200, y: 80 },
  { label: "VISION", x: 320, y: 140 },
  { label: "ROBOT", x: 320, y: 262 },
  { label: "DRIVES", x: 200, y: 322 },
  { label: "SAFETY", x: 80, y: 262 },
  { label: "I/O", x: 80, y: 140 },
];

const CX = 200;
const CY = 201;

export default function Commissioning() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(-1);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const STEPS = NODES.length + 1; // nodes + ready
  const STEP_MS = 360;

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
  const ready = shown(NODES.length);

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <pattern id="dotgrid-cm" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" className="fill-neutral-300 dark:fill-neutral-700" />
          </pattern>
        </defs>
        <rect x="20" y="20" width="360" height="360" fill="url(#dotgrid-cm)" opacity="0.5" />
        <rect x="12" y="12" width="376" height="376" fill="none" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />

        <text
          x={32}
          y={42}
          className="fill-neutral-500 dark:fill-neutral-400"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.18em" }}
        >
          COMMISSIONING — SYSTEM BRING-UP
        </text>
        <line x1={32} y1={50} x2={368} y2={50} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Links (behind boxes) */}
        {NODES.map((n, i) => (
          <line
            key={`l-${i}`}
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            stroke={shown(i) ? ACCENT : IDLE}
            strokeWidth={shown(i) ? 2 : 1.2}
            strokeDasharray={shown(i) ? "0" : "4 3"}
            style={{ transition: "stroke 0.35s, stroke-width 0.35s" }}
          />
        ))}

        {/* Central controller */}
        <g>
          <rect x={CX - 34} y={CY - 26} width="68" height="52" className="fill-background" stroke={on ? ACCENT : "#737373"} strokeWidth="2.4" style={{ transition: "stroke 0.35s" }} />
          <text x={CX} y={CY - 4} textAnchor="middle" style={{ fontSize: "13px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: on ? ACCENT : "#737373", transition: "fill 0.35s" }}>
            PLC
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>
            MASTER
          </text>
        </g>

        {/* Nodes */}
        {NODES.map((n, i) => {
          const live = shown(i);
          const col = live ? ACCENT : "#737373";
          return (
            <g key={`n-${i}`}>
              <rect
                x={n.x - 34}
                y={n.y - 17}
                width="68"
                height="34"
                className="fill-background"
                stroke={live ? ACCENT : IDLE}
                strokeWidth="2"
                style={{ transition: "stroke 0.35s" }}
              />
              <text
                x={n.x - 6}
                y={n.y + 4}
                textAnchor="middle"
                style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: col, transition: "fill 0.35s" }}
              >
                {n.label}
              </text>
              {/* status dot / check */}
              <circle cx={n.x + 22} cy={n.y} r="6" fill="none" stroke={live ? ACCENT : IDLE} strokeWidth="1.4" style={{ transition: "stroke 0.35s" }} />
              <path
                d={`M${n.x + 19} ${n.y} l2.2 2.4 l4 -4.6`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: live ? 1 : 0, transition: "opacity 0.3s" }}
              />
            </g>
          );
        })}

        {/* Ready badge */}
        <g style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s" }}>
          <line x1={20} y1={352} x2={380} y2={352} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" />
          <text x={32} y={374} style={{ fontSize: "12px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
            SYSTEM READY ✓
          </text>
          <text x={368} y={374} textAnchor="end" className="fill-neutral-500 dark:fill-neutral-500" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace" }}>
            HANDED OVER COMPLETE
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
