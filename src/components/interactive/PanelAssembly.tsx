"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#16a34a";
const IDLE = "#a3a3a3";

const STEPS = 6;
const STEP_MS = 360;

const RAIL_1 = 110;
const RAIL_2 = 190;
const RAIL_3 = 270;
const TERMS_Y = 332;

export default function PanelAssembly() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(-1);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const clear = () => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
  };
  const activate = () => {
    clear();
    setOn(true);
    setStep(-1);
    for (let i = 0; i < STEPS; i++) {
      tRef.current.push(setTimeout(() => setStep(i), 200 + i * STEP_MS));
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
        <defs>
          <pattern id="panelDotGrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" className="fill-neutral-300 dark:fill-neutral-700" />
          </pattern>
        </defs>

        {/* Background dot grid */}
        <rect x="20" y="20" width="360" height="360" fill="url(#panelDotGrid)" opacity="0.5" />

        {/* Outer double frame */}
        <rect x="12" y="12" width="376" height="376" fill="none" className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1" />
        <rect x="20" y="20" width="360" height="360" fill="none" className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.5" />

        {/* Header */}
        <text
          x={32}
          y={40}
          className="fill-neutral-500 dark:fill-neutral-400"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.18em" }}
        >
          PNL-014 · BACK PLATE LAYOUT
        </text>
        <line x1={32} y1={48} x2={368} y2={48} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* STEP 0 — Cabinet + DIN rails + vertical wire ducts */}
        <g style={{ opacity: shown(0) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          {/* Cabinet outline */}
          <rect x={26} y={56} width="348" height="310" fill="none" stroke={colorAt(0)} strokeWidth="2" style={{ transition: "stroke 0.35s" }} />
          <circle cx={26} cy={72} r="2.5" fill="none" stroke={colorAt(0)} strokeWidth="1" />
          <circle cx={26} cy={350} r="2.5" fill="none" stroke={colorAt(0)} strokeWidth="1" />

          {/* DIN rails — subtle dashed lines (hidden behind components) */}
          {[RAIL_1, RAIL_2, RAIL_3].map((y) => (
            <line
              key={`rail-${y}`}
              x1={108}
              y1={y}
              x2={356}
              y2={y}
              stroke={colorAt(0)}
              strokeWidth="1.2"
              strokeDasharray="6 2"
              opacity="0.55"
            />
          ))}

          {/* Rail labels */}
          {[
            { y: RAIL_1, label: "R1" },
            { y: RAIL_2, label: "R2" },
            { y: RAIL_3, label: "R3" },
          ].map((r) => (
            <text
              key={r.label}
              x={102}
              y={r.y + 3}
              textAnchor="end"
              className="fill-neutral-400 dark:fill-neutral-500"
              style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
            >
              {r.label}
            </text>
          ))}

          {/* Vertical wire ducts (only — no horizontal ones) */}
          {[100, 364].map((x) => (
            <g key={x}>
              <rect x={x - 5} y={64} width="10" height="296" className="fill-background" stroke={colorAt(0)} strokeWidth="1" />
              {Array.from({ length: 21 }).map((_, i) => (
                <line
                  key={i}
                  x1={x - 4}
                  y1={70 + i * 14}
                  x2={x + 4}
                  y2={70 + i * 14}
                  stroke={colorAt(0)}
                  strokeWidth="0.5"
                  opacity="0.45"
                />
              ))}
            </g>
          ))}
        </g>

        {/* STEP 1 — PSU */}
        <g style={{ opacity: shown(1) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <rect x={36} y={76} width="56" height="108" className="fill-background" stroke={colorAt(1)} strokeWidth="1.8" style={{ transition: "stroke 0.35s" }} />
          <circle cx={42} cy={82} r="1.5" fill={colorAt(1)} />
          <circle cx={86} cy={82} r="1.5" fill={colorAt(1)} />
          <circle cx={42} cy={178} r="1.5" fill={colorAt(1)} />
          <circle cx={86} cy={178} r="1.5" fill={colorAt(1)} />
          <text
            x={64}
            y={114}
            textAnchor="middle"
            style={{ fontSize: "13px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: shown(1) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            PSU
          </text>
          <text
            x={64}
            y={130}
            textAnchor="middle"
            className="fill-neutral-500 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}
          >
            24V · 60W
          </text>
          <text
            x={64}
            y={148}
            textAnchor="middle"
            style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: shown(1) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            -T1
          </text>
          {/* Output terminal stubs on right edge */}
          <line x1={92} y1={160} x2={98} y2={160} stroke={colorAt(1)} strokeWidth="1.2" />
          <line x1={92} y1={166} x2={98} y2={166} stroke={colorAt(1)} strokeWidth="1.2" />
        </g>

        {/* STEP 2 — MCBs on Rail 1 */}
        <g style={{ opacity: shown(2) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 128 + i * 18;
            return <MCB key={i} x={x} cy={RAIL_1} tag={`Q${i + 1}`} color={colorAt(2)} on={shown(2)} />;
          })}
          <text
            x={120}
            y={88}
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            MCB DISTRIBUTION · C16
          </text>
        </g>

        {/* STEP 3 — Contactors + safety relays on Rail 2 */}
        <g style={{ opacity: shown(3) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <Contactor x={132} cy={RAIL_2} tag="KM1" color={colorAt(3)} on={shown(3)} />
          <Contactor x={180} cy={RAIL_2} tag="KM2" color={colorAt(3)} on={shown(3)} />
          <Contactor x={228} cy={RAIL_2} tag="KM3" color={colorAt(3)} on={shown(3)} />
          <SafetyRelay x={278} cy={RAIL_2} tag="K1" color={colorAt(3)} on={shown(3)} />
          <SafetyRelay x={312} cy={RAIL_2} tag="K2" color={colorAt(3)} on={shown(3)} />
          <text
            x={120}
            y={166}
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            CONTACTORS · AUX
          </text>
        </g>

        {/* STEP 4 — PLC + HMI + IO-Link on Rail 3 */}
        <g style={{ opacity: shown(4) ? 1 : 0.15, transition: "opacity 0.35s" }}>
          <PLC x={120} cy={RAIL_3} color={colorAt(4)} on={shown(4)} />
          {/* Ethernet switch (industrial, DIN-mounted) */}
          <rect x={240} y={RAIL_3 - 20} width="40" height="40" className="fill-background" stroke={colorAt(4)} strokeWidth="1.5" style={{ transition: "stroke 0.35s" }} />
          <text
            x={260}
            y={RAIL_3 - 4}
            textAnchor="middle"
            style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: shown(4) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            ETH SW
          </text>
          {/* 4 RJ45 ports */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={245 + i * 8} y={RAIL_3 + 5} width="6" height="7" fill={colorAt(4)} />
          ))}

          {/* IO-Link master */}
          <rect x={290} y={RAIL_3 - 20} width="48" height="40" className="fill-background" stroke={colorAt(4)} strokeWidth="1.5" style={{ transition: "stroke 0.35s" }} />
          {Array.from({ length: 4 }).map((_, i) => (
            <circle key={i} cx={298 + i * 10} cy={RAIL_3 + 10} r="1.4" fill={colorAt(4)} />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <circle key={`d-${i}`} cx={298 + i * 10} cy={RAIL_3 - 9} r="0.9" fill={colorAt(4)} opacity="0.7" />
          ))}
          <text
            x={314}
            y={RAIL_3 + 1}
            textAnchor="middle"
            style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: shown(4) ? ACCENT : "#737373", transition: "fill 0.35s" }}
          >
            IO-L
          </text>

          <text
            x={120}
            y={244}
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            CONTROL · I/O · COMMS
          </text>
        </g>

        {/* STEP 5 — Terminal blocks */}
        <g style={{ opacity: shown(5) ? 1 : 0, transition: "opacity 0.35s" }}>
          <rect x={120} y={TERMS_Y - 12} width="196" height="24" className="fill-background" stroke={colorAt(5)} strokeWidth="1.5" style={{ transition: "stroke 0.35s" }} />
          {Array.from({ length: 14 }).map((_, i) => {
            const cellX = 120 + i * 14;
            const cellCenter = cellX + 7;
            return (
              <g key={i}>
                {i > 0 && (
                  <line x1={cellX} y1={TERMS_Y - 12} x2={cellX} y2={TERMS_Y + 12} stroke={colorAt(5)} strokeWidth="0.4" opacity="0.45" />
                )}
                <circle cx={cellCenter} cy={TERMS_Y - 5} r="1.3" fill={colorAt(5)} />
                <circle cx={cellCenter} cy={TERMS_Y + 5} r="1.3" fill={colorAt(5)} />
              </g>
            );
          })}
          <text
            x={120}
            y={314}
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            -X1 TERMINAL BLOCKS · 14P
          </text>

          {/* Status footer */}
          <text
            x={32}
            y={378}
            className="fill-neutral-500 dark:fill-neutral-400"
            style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            ● WIRED · LABELLED · READY FOR FAT
          </text>
        </g>

        {/* Progress (during assembly) */}
        {on && step < STEPS - 1 && (
          <text
            x={368}
            y={378}
            textAnchor="end"
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            ASSEMBLING · {Math.max(step + 1, 0)}/{STEPS}
          </text>
        )}
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

/* ---------- MCB ---------- */

function MCB({ x, cy, tag, color, on }: { x: number; cy: number; tag: string; color: string; on: boolean }) {
  return (
    <g>
      <rect x={x - 7} y={cy - 17} width="14" height="34" className="fill-background" stroke={color} strokeWidth="1.5" style={{ transition: "stroke 0.35s" }} />
      <line x1={x} y1={cy - 8} x2={x} y2={cy + 2} stroke={color} strokeWidth="2.3" style={{ transition: "stroke 0.35s" }} />
      <circle cx={x} cy={cy + 2} r="2" fill={color} style={{ transition: "fill 0.35s" }} />
      <circle cx={x} cy={cy - 13} r="1.4" fill={color} />
      <circle cx={x} cy={cy + 13} r="1.4" fill={color} />
      <text
        x={x}
        y={cy + 27}
        textAnchor="middle"
        style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        -{tag}
      </text>
    </g>
  );
}

/* ---------- Contactor ---------- */

function Contactor({ x, cy, tag, color, on }: { x: number; cy: number; tag: string; color: string; on: boolean }) {
  return (
    <g>
      <rect x={x - 16} y={cy - 19} width="32" height="38" className="fill-background" stroke={color} strokeWidth="1.6" style={{ transition: "stroke 0.35s" }} />
      {[-9, 0, 9].map((dx) => (
        <circle key={`t-${dx}`} cx={x + dx} cy={cy - 14} r="1.5" fill={color} />
      ))}
      {[-9, 0, 9].map((dx) => (
        <circle key={`b-${dx}`} cx={x + dx} cy={cy + 14} r="1.5" fill={color} />
      ))}
      <text
        x={x}
        y={cy + 3}
        textAnchor="middle"
        style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        {tag}
      </text>
      <text
        x={x}
        y={cy + 30}
        textAnchor="middle"
        style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        -{tag}
      </text>
    </g>
  );
}

/* ---------- Safety relay ---------- */

function SafetyRelay({ x, cy, tag, color, on }: { x: number; cy: number; tag: string; color: string; on: boolean }) {
  return (
    <g>
      <rect x={x - 11} y={cy - 17} width="22" height="34" className="fill-background" stroke={color} strokeWidth="1.4" style={{ transition: "stroke 0.35s" }} />
      <circle cx={x - 5} cy={cy - 11} r="1.3" fill={color} />
      <circle cx={x + 5} cy={cy - 11} r="1.3" fill={color} />
      <text
        x={x}
        y={cy + 5}
        textAnchor="middle"
        style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        {tag}
      </text>
      <text
        x={x}
        y={cy + 28}
        textAnchor="middle"
        style={{ fontSize: "6.5px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        -{tag}
      </text>
    </g>
  );
}

/* ---------- PLC ---------- */

function PLC({ x, cy, color, on }: { x: number; cy: number; color: string; on: boolean }) {
  const w = 110;
  const h = 42;
  return (
    <g>
      <rect x={x} y={cy - h / 2} width={w} height={h} className="fill-background" stroke={color} strokeWidth="1.6" style={{ transition: "stroke 0.35s" }} />
      <rect x={x + 4} y={cy - h / 2 + 4} width="24" height={h - 8} fill="none" stroke={color} strokeWidth="0.8" />
      {Array.from({ length: 4 }).map((_, i) => (
        <circle key={i} cx={x + 10 + (i % 2) * 8} cy={cy - 8 + Math.floor(i / 2) * 6} r="1.1" fill={color} />
      ))}
      <text
        x={x + 16}
        y={cy + 14}
        textAnchor="middle"
        style={{ fontSize: "6px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        CPU
      </text>
      {Array.from({ length: 5 }).map((_, i) => {
        const sx = x + 32 + i * 15;
        return (
          <g key={i}>
            <rect x={sx} y={cy - h / 2 + 4} width="13" height={h - 8} fill="none" stroke={color} strokeWidth="0.7" />
            {Array.from({ length: 6 }).map((_, j) => (
              <circle key={j} cx={sx + 3.5 + (j % 2) * 6} cy={cy - h / 2 + 9 + Math.floor(j / 2) * 6} r="0.9" fill={color} />
            ))}
          </g>
        );
      })}
      <text
        x={x + w / 2}
        y={cy + 31}
        textAnchor="middle"
        style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: on ? color : "#737373", transition: "fill 0.35s" }}
      >
        -A1 · PLC OMRON CP1L
      </text>
    </g>
  );
}
