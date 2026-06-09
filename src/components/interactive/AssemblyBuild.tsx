"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#2563eb";
const IDLE = "#a3a3a3";

function Part({
  active,
  dx,
  dy,
  children,
}: {
  active: boolean;
  dx: number;
  dy: number;
  children: React.ReactNode;
}) {
  return (
    <g
      style={{
        transform: active ? "translate(0px, 0px)" : `translate(${dx}px, ${dy}px)`,
        opacity: active ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s",
      }}
    >
      {children}
    </g>
  );
}

export default function AssemblyBuild() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(-1);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const STEPS = 6;
  const STEP_MS = 420;

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
  const stroke = (i: number) => (shown(i) ? ACCENT : IDLE);

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <pattern id="dotgrid-ab" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" className="fill-neutral-300 dark:fill-neutral-700" />
          </pattern>
        </defs>
        <rect x="20" y="20" width="360" height="360" fill="url(#dotgrid-ab)" opacity="0.5" />
        <rect x="12" y="12" width="376" height="376" fill="none" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />

        <text
          x={32}
          y={42}
          className="fill-neutral-500 dark:fill-neutral-400"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.18em" }}
        >
          MECHANICAL ASSEMBLY
        </text>
        <line x1={32} y1={50} x2={368} y2={50} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* part counter */}
        <text
          x={368}
          y={42}
          textAnchor="end"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? ACCENT : "#737373", transition: "fill 0.35s" }}
        >
          {`${Math.max(0, Math.min(STEPS, step + 1))}/${STEPS} PARTS`}
        </text>

        {/* 0 — Base plate (drops from below) */}
        <Part active={shown(0)} dx={0} dy={70}>
          <rect x={96} y={296} width="208" height="16" fill="none" stroke={stroke(0)} strokeWidth="2.4" />
          <rect x={108} y={312} width="26" height="10" fill="none" stroke={stroke(0)} strokeWidth="1.8" />
          <rect x={266} y={312} width="26" height="10" fill="none" stroke={stroke(0)} strokeWidth="1.8" />
        </Part>

        {/* 1 — Left upright (slides from left) */}
        <Part active={shown(1)} dx={-90} dy={0}>
          <rect x={120} y={138} width="20" height="158" fill="none" stroke={stroke(1)} strokeWidth="2.4" />
        </Part>

        {/* 2 — Right upright (slides from right) */}
        <Part active={shown(2)} dx={90} dy={0}>
          <rect x={260} y={138} width="20" height="158" fill="none" stroke={stroke(2)} strokeWidth="2.4" />
        </Part>

        {/* 3 — Top beam (drops from top) */}
        <Part active={shown(3)} dx={0} dy={-80}>
          <rect x={110} y={120} width="180" height="18" fill="none" stroke={stroke(3)} strokeWidth="2.4" />
        </Part>

        {/* 4 — Linear rail + carriage (drops from top) */}
        <Part active={shown(4)} dx={0} dy={-110}>
          <line x1={120} y1={114} x2={280} y2={114} stroke={stroke(4)} strokeWidth="3" />
          <rect x={186} y={104} width="28" height="12" fill="none" stroke={stroke(4)} strokeWidth="1.8" />
        </Part>

        {/* 5 — Gearmotor + drive (slides from right) */}
        <Part active={shown(5)} dx={120} dy={0}>
          <rect x={282} y={196} width="40" height="34" fill="none" stroke={stroke(5)} strokeWidth="2.2" />
          <circle cx={282} cy={213} r="9" fill="none" stroke={stroke(5)} strokeWidth="2" />
          <text x={302} y={246} textAnchor="middle" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(5) ? ACCENT : "#737373" }}>
            SERVO
          </text>
        </Part>

        {/* Bolt markers appear once fully assembled */}
        <g style={{ opacity: shown(5) ? 0.85 : 0, transition: "opacity 0.4s" }}>
          {[[130, 138], [270, 138], [130, 296], [270, 296]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="3.4" fill="none" stroke={ACCENT} strokeWidth="1.2" />
              <line x1={cx - 2.4} y1={cy - 2.4} x2={cx + 2.4} y2={cy + 2.4} stroke={ACCENT} strokeWidth="1" />
              <line x1={cx - 2.4} y1={cy + 2.4} x2={cx + 2.4} y2={cy - 2.4} stroke={ACCENT} strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* status footer */}
        <g style={{ opacity: shown(5) ? 1 : 0, transition: "opacity 0.4s" }}>
          <line x1={20} y1={350} x2={380} y2={350} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" />
          <text x={32} y={372} style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: ACCENT }}>
            ASSEMBLED ✓
          </text>
          <text x={368} y={372} textAnchor="end" className="fill-neutral-500 dark:fill-neutral-500" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace" }}>
            TORQUE TO SPEC
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
