"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#2563eb";
const IDLE = "#a3a3a3";

const RAIL_TOP_Y = 122;
const RAIL_BOT_Y = 292;

const COL_1 = 180;
const COL_2 = 255;
const COL_3 = 330;

export default function SchematicDraw() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(-1);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const STEPS = 6;
  const STEP_MS = 320;

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

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Subtle dot grid */}
        <defs>
          <pattern id="dotgrid2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" className="fill-neutral-300 dark:fill-neutral-700" />
          </pattern>
        </defs>
        <rect x="20" y="20" width="360" height="360" fill="url(#dotgrid2)" opacity="0.5" />

        {/* Outer drawing frame (double border) */}
        <rect x="12" y="12" width="376" height="376" fill="none" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
        <rect x="20" y="20" width="360" height="360" fill="none" className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.5" />

        {/* Header (always visible) */}
        <text
          x={32}
          y={42}
          className="fill-neutral-500 dark:fill-neutral-400"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.18em" }}
        >
          24V DC CONTROL CIRCUIT
        </text>
        <line x1={32} y1={50} x2={368} y2={50} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* STEP 0 — Power supply (AC source + F1 + PSU) */}
        <g style={{ opacity: shown(0) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          {/* AC source bracket */}
          <text
            x={50}
            y={68}
            textAnchor="middle"
            style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(0) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            230 VAC
          </text>
          <line x1={40} y1={76} x2={60} y2={76} stroke={colorAt(0)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <line x1={40} y1={76} x2={40} y2={180} stroke={colorAt(0)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <line x1={60} y1={76} x2={60} y2={180} stroke={colorAt(0)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />

          {/* F1 fuse on L1 */}
          <rect x={34} y={100} width="12" height="22" fill="none" stroke={colorAt(0)} strokeWidth="1.5" style={{ transition: "stroke 0.35s" }} />
          <text
            x={70}
            y={115}
            style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(0) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            -F1
          </text>

          {/* PSU block */}
          <rect x={20} y={180} width="80" height="70" fill="none" stroke={colorAt(0)} strokeWidth="1.8" style={{ transition: "stroke 0.35s" }} />
          <text
            x={60}
            y={206}
            textAnchor="middle"
            style={{ fontSize: "13px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: shown(0) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            PSU
          </text>
          <text
            x={60}
            y={222}
            textAnchor="middle"
            className="fill-neutral-500 dark:fill-neutral-500"
            style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace" }}
          >
            230~ → 24=
          </text>
          <text
            x={60}
            y={240}
            textAnchor="middle"
            style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(0) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            -T1
          </text>
        </g>

        {/* STEP 1 — Rails + DC feeder wires */}
        <g style={{ opacity: shown(1) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          {/* +24V output → top rail */}
          <line x1={100} y1={200} x2={125} y2={200} stroke={colorAt(1)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <line x1={125} y1={200} x2={125} y2={RAIL_TOP_Y} stroke={colorAt(1)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <text
            x={106}
            y={195}
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(1) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            +24
          </text>
          {/* 0V output → bottom rail */}
          <line x1={100} y1={230} x2={125} y2={230} stroke={colorAt(1)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <line x1={125} y1={230} x2={125} y2={RAIL_BOT_Y} stroke={colorAt(1)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <text
            x={106}
            y={244}
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(1) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            0V
          </text>

          {/* Top rail L+ */}
          <line x1={125} y1={RAIL_TOP_Y} x2={368} y2={RAIL_TOP_Y} stroke={colorAt(1)} strokeWidth="2.5" style={{ transition: "stroke 0.35s" }} />
          <text
            x={132}
            y={RAIL_TOP_Y - 5}
            style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(1) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            L+
          </text>

          {/* Bottom rail M */}
          <line x1={125} y1={RAIL_BOT_Y} x2={368} y2={RAIL_BOT_Y} stroke={colorAt(1)} strokeWidth="2.5" style={{ transition: "stroke 0.35s" }} />
          <text
            x={132}
            y={RAIL_BOT_Y + 13}
            style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(1) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            M (0V)
          </text>
        </g>

        {/* STEP 2 — Branch 1: S1 push button + K1 coil */}
        <g style={{ opacity: shown(2) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          {/* Top wire from rail */}
          <line x1={COL_1} y1={RAIL_TOP_Y} x2={COL_1} y2={144} stroke={colorAt(2)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <PushButton x={COL_1} centerY={165} tag="-S1" color={colorAt(2)} on={shown(2)} />
          {/* Wire to coil */}
          <line x1={COL_1} y1={185} x2={COL_1} y2={222} stroke={colorAt(2)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <Coil cx={COL_1} cy={237} tag="K1" color={colorAt(2)} on={shown(2)} />
          {/* Wire to rail */}
          <line x1={COL_1} y1={252} x2={COL_1} y2={RAIL_BOT_Y} stroke={colorAt(2)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
        </g>

        {/* STEP 3 — Branch 2: K1 NO contact + H1 running lamp */}
        <g style={{ opacity: shown(3) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <line x1={COL_2} y1={RAIL_TOP_Y} x2={COL_2} y2={150} stroke={colorAt(3)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <Contact x={COL_2} centerY={165} kind="NO" tag="-K1" color={colorAt(3)} on={shown(3)} />
          <line x1={COL_2} y1={180} x2={COL_2} y2={222} stroke={colorAt(3)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <Lamp cx={COL_2} cy={237} tag="-H1" sub="RUN" color={colorAt(3)} on={shown(3)} />
          <line x1={COL_2} y1={252} x2={COL_2} y2={RAIL_BOT_Y} stroke={colorAt(3)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
        </g>

        {/* STEP 4 — Branch 3: K1 NO contact + Y1 valve solenoid */}
        <g style={{ opacity: shown(4) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <line x1={COL_3} y1={RAIL_TOP_Y} x2={COL_3} y2={150} stroke={colorAt(4)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <Contact x={COL_3} centerY={165} kind="NO" tag="-K1" color={colorAt(4)} on={shown(4)} />
          <line x1={COL_3} y1={180} x2={COL_3} y2={220} stroke={colorAt(4)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <Solenoid cx={COL_3} cy={237} tag="-Y1" color={colorAt(4)} on={shown(4)} />
          <line x1={COL_3} y1={254} x2={COL_3} y2={RAIL_BOT_Y} stroke={colorAt(4)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
        </g>

        {/* Cross-reference under K1 coil (col 1) — always after step 2 */}
        <g style={{ opacity: shown(2) ? 0.7 : 0, transition: "opacity 0.35s" }}>
          <text
            x={COL_1}
            y={272}
            textAnchor="middle"
            className="fill-neutral-500 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
          >
            /2 · /3
          </text>
        </g>

        {/* STEP 5 — Title block */}
        <g style={{ opacity: shown(5) ? 1 : 0, transition: "opacity 0.35s" }}>
          <line x1={20} y1={320} x2={380} y2={320} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.7" />
          <line x1={150} y1={320} x2={150} y2={380} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.7" />
          <line x1={250} y1={320} x2={250} y2={380} className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.7" />
          <line x1={20} y1={348} x2={380} y2={348} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" />

          <text x={28} y={338} className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>DRAWING</text>
          <text x={28} y={368} className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "12px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>SCH-014</text>

          <text x={158} y={338} className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>REV / DATE</text>
          <text x={158} y={368} className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "12px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>02 · 2026</text>

          <text x={258} y={338} className="fill-neutral-400 dark:fill-neutral-500" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", letterSpacing: "0.1em" }}>STANDARD</text>
          <text x={258} y={368} className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: "12px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}>EN 60204-1</text>
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

/* ---------- Contact (NO/NC) ---------- */

function Contact({ x, centerY, kind, tag, color, on }: { x: number; centerY: number; kind: "NO" | "NC"; tag: string; color: string; on: boolean }) {
  const h = 13;
  return (
    <g>
      <line x1={x - 8} y1={centerY - h} x2={x - 8} y2={centerY + h} stroke={color} strokeWidth="2.3" style={{ transition: "stroke 0.35s" }} />
      <line x1={x + 8} y1={centerY - h} x2={x + 8} y2={centerY + h} stroke={color} strokeWidth="2.3" style={{ transition: "stroke 0.35s" }} />
      {kind === "NC" && (
        <line x1={x - 10} y1={centerY + h} x2={x + 10} y2={centerY - h} stroke={color} strokeWidth="1.5" style={{ transition: "stroke 0.35s" }} />
      )}
      <text
        x={x + 14}
        y={centerY + 4}
        style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        {tag}
      </text>
    </g>
  );
}

/* ---------- Push button (operator + contact) ---------- */

function PushButton({ x, centerY, tag, color, on }: { x: number; centerY: number; tag: string; color: string; on: boolean }) {
  const h = 13;
  const actuatorY = centerY - 26;
  return (
    <g>
      {/* Actuator bar */}
      <line x1={x - 11} y1={actuatorY} x2={x + 11} y2={actuatorY} stroke={color} strokeWidth="2.3" style={{ transition: "stroke 0.35s" }} />
      {/* Dashed link to contact */}
      <line x1={x} y1={actuatorY + 2} x2={x} y2={centerY - h - 2} stroke={color} strokeWidth="1.3" strokeDasharray="2 2" style={{ transition: "stroke 0.35s" }} />
      {/* Contact bars */}
      <line x1={x - 8} y1={centerY - h} x2={x - 8} y2={centerY + h} stroke={color} strokeWidth="2.3" style={{ transition: "stroke 0.35s" }} />
      <line x1={x + 8} y1={centerY - h} x2={x + 8} y2={centerY + h} stroke={color} strokeWidth="2.3" style={{ transition: "stroke 0.35s" }} />
      <text
        x={x + 14}
        y={centerY + 4}
        style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        {tag}
      </text>
    </g>
  );
}

/* ---------- Coil ---------- */

function Coil({ cx, cy, tag, color, on }: { cx: number; cy: number; tag: string; color: string; on: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="15" fill="none" stroke={color} strokeWidth="2.2" style={{ transition: "stroke 0.35s" }} />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        style={{ fontSize: "12px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        {tag}
      </text>
    </g>
  );
}

/* ---------- Lamp ---------- */

function Lamp({ cx, cy, tag, sub, color, on }: { cx: number; cy: number; tag: string; sub: string; color: string; on: boolean }) {
  const r = 15;
  const d = r * 0.7;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="2.2" style={{ transition: "stroke 0.35s" }} />
      <line x1={cx - d} y1={cy - d} x2={cx + d} y2={cy + d} stroke={color} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
      <line x1={cx - d} y1={cy + d} x2={cx + d} y2={cy - d} stroke={color} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
      <text
        x={cx + 21}
        y={cy - 1}
        style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        {tag}
      </text>
      <text
        x={cx + 21}
        y={cy + 11}
        className="fill-neutral-500 dark:fill-neutral-500"
        style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
      >
        {sub}
      </text>
    </g>
  );
}

/* ---------- Solenoid ---------- */

function Solenoid({ cx, cy, tag, color, on }: { cx: number; cy: number; tag: string; color: string; on: boolean }) {
  return (
    <g>
      <rect x={cx - 14} y={cy - 14} width="28" height="28" fill="none" stroke={color} strokeWidth="2.2" style={{ transition: "stroke 0.35s" }} />
      <line x1={cx - 14} y1={cy + 14} x2={cx + 14} y2={cy - 14} stroke={color} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
      <text
        x={cx + 20}
        y={cy - 1}
        style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        {tag}
      </text>
      <text
        x={cx + 20}
        y={cy + 11}
        className="fill-neutral-500 dark:fill-neutral-500"
        style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
      >
        VALVE
      </text>
    </g>
  );
}
