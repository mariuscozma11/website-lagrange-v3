"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#2563eb";
const STALE = "#a3a3a3";
const REPLACE = "#dc2626";

const RAIL_1 = 110;
const RAIL_2 = 190;
const RAIL_3 = 270;
const TERMS_Y = 332;

type Phase = "before" | "after";

export default function PanelRetrofit() {
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState<Phase>("before");
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const clear = () => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
  };
  const activate = () => {
    clear();
    setOn(true);
    setPhase("before");
    tRef.current = [
      setTimeout(() => setPhase("after"), 1800),
      setTimeout(() => setPhase("before"), 4000),
      setTimeout(() => setPhase("after"), 5800),
    ];
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setPhase("before");
  };
  useEffect(() => () => clear(), []);

  const isAfter = phase === "after";
  const beforeOpacity = on ? (isAfter ? 0 : 1) : 0.15;
  const afterOpacity = on ? (isAfter ? 1 : 0) : 0;

  const phaseColor = on ? (isAfter ? ACCENT : REPLACE) : STALE;

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <pattern id="retroDotGrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" className="fill-neutral-300 dark:fill-neutral-700" />
          </pattern>
        </defs>

        {/* Background dot grid */}
        <rect x="20" y="20" width="360" height="360" fill="url(#retroDotGrid)" opacity="0.5" />

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
          PNL-009 · {on ? (isAfter ? "AFTER · 2026" : "BEFORE · 1998") : "RETROFIT"}
        </text>
        <line x1={32} y1={48} x2={368} y2={48} className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Cabinet + rails + vertical wire ducts (always visible) */}
        <g style={{ opacity: on ? 1 : 0.2, transition: "opacity 0.45s" }}>
          <rect x={26} y={56} width="348" height="310" fill="none" stroke={STALE} strokeWidth="2" />
          <circle cx={26} cy={72} r="2.5" fill="none" stroke={STALE} strokeWidth="1" />
          <circle cx={26} cy={350} r="2.5" fill="none" stroke={STALE} strokeWidth="1" />

          {[RAIL_1, RAIL_2, RAIL_3].map((y) => (
            <line
              key={`rail-${y}`}
              x1={108}
              y1={y}
              x2={356}
              y2={y}
              stroke={STALE}
              strokeWidth="1.2"
              strokeDasharray="6 2"
              opacity="0.55"
            />
          ))}

          {/* Vertical wire ducts */}
          {[100, 364].map((x) => (
            <g key={x}>
              <rect x={x - 5} y={64} width="10" height="296" className="fill-background" stroke={STALE} strokeWidth="1" />
              {Array.from({ length: 21 }).map((_, i) => (
                <line
                  key={i}
                  x1={x - 4}
                  y1={70 + i * 14}
                  x2={x + 4}
                  y2={70 + i * 14}
                  stroke={STALE}
                  strokeWidth="0.5"
                  opacity="0.45"
                />
              ))}
            </g>
          ))}
        </g>

        {/* BEFORE state */}
        <g style={{ opacity: beforeOpacity, transition: "opacity 0.45s" }}>
          {/* Old chunky linear PSU */}
          <rect x={36} y={76} width="56" height="120" className="fill-background" stroke={REPLACE} strokeWidth="1.8" />
          <text x={64} y={108} textAnchor="middle" style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: REPLACE }}>
            TRAFO
          </text>
          <text x={64} y={122} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>
            230 → 24V
          </text>
          {/* Coil winding indicator (old transformer style) */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={50} y1={140 + i * 8} x2={78} y2={140 + i * 8} stroke={REPLACE} strokeWidth="0.7" opacity="0.6" />
          ))}
          <text x={64} y={188} textAnchor="middle" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: REPLACE }}>
            -T0 · 1998
          </text>

          {/* Old MCBs on rail 1 - only 3, oversized */}
          {[
            { x: 130, tag: "Q1·OLD" },
            { x: 170, tag: "Q2·OLD" },
            { x: 210, tag: "Q3·OLD" },
          ].map((m) => (
            <OldMCB key={m.tag} x={m.x} cy={RAIL_1} tag={m.tag} />
          ))}
          {/* Remaining space empty / "SPARE" */}
          <rect x={250} y={RAIL_1 - 14} width="106" height="28" fill="none" stroke={STALE} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={303} y={RAIL_1 + 4} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}>
            EMPTY · NO ROOM
          </text>
          <text x={120} y={88} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: REPLACE }}>
            MCB · UNDERSIZED · REPLACE
          </text>

          {/* Old oversized contactors on rail 2 */}
          <OldContactor x={140} cy={RAIL_2} tag="KM1" />
          <OldContactor x={200} cy={RAIL_2} tag="KM2" />
          {/* Mechanical timer */}
          <rect x={236} y={RAIL_2 - 22} width="34" height="44" className="fill-background" stroke={REPLACE} strokeWidth="1.5" />
          <circle cx={253} cy={RAIL_2 - 6} r="9" fill="none" stroke={REPLACE} strokeWidth="1.2" />
          <line x1={253} y1={RAIL_2 - 6} x2={258} y2={RAIL_2 - 11} stroke={REPLACE} strokeWidth="1.5" />
          <text x={253} y={RAIL_2 + 12} textAnchor="middle" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: REPLACE }}>
            TIMER
          </text>
          <text x={253} y={RAIL_2 + 32} textAnchor="middle" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: REPLACE }}>
            -K·T1
          </text>

          {/* Mixed relays bank */}
          <rect x={282} y={RAIL_2 - 18} width="74" height="36" className="fill-background" stroke={REPLACE} strokeWidth="1.4" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={286 + i * 18} y={RAIL_2 - 14} width="14" height="28" fill="none" stroke={REPLACE} strokeWidth="0.6" />
              <circle cx={293 + i * 18} cy={RAIL_2 - 7} r="1.4" fill={REPLACE} />
            </g>
          ))}
          <text x={319} y={RAIL_2 + 30} textAnchor="middle" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: REPLACE }}>
            RELAYS·MIX
          </text>

          <text x={120} y={166} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: REPLACE }}>
            CONTACTORS · OVERSIZED · REPLACE
          </text>

          {/* Bare wiring zone (no PLC) */}
          <rect x={120} y={RAIL_3 - 22} width="236" height="44" fill="none" stroke={REPLACE} strokeWidth="1" strokeDasharray="4 3" />
          <text x={238} y={RAIL_3 - 2} textAnchor="middle" style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: REPLACE }}>
            NO PLC · HARD-WIRED LOGIC
          </text>
          <text x={238} y={RAIL_3 + 14} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>
            relay logic, jumpers, no comms
          </text>
          <text x={120} y={244} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: REPLACE }}>
            CONTROL · NONE · ADD PLC
          </text>

          {/* Old terminal block - kept */}
          <rect x={120} y={TERMS_Y - 12} width="196" height="24" className="fill-background" stroke={STALE} strokeWidth="1.5" />
          {Array.from({ length: 10 }).map((_, i) => {
            const cellX = 120 + i * 20;
            const cellCenter = cellX + 10;
            return (
              <g key={i}>
                {i > 0 && (
                  <line x1={cellX} y1={TERMS_Y - 12} x2={cellX} y2={TERMS_Y + 12} stroke={STALE} strokeWidth="0.4" opacity="0.45" />
                )}
                <circle cx={cellCenter} cy={TERMS_Y - 5} r="1.3" fill={STALE} />
                <circle cx={cellCenter} cy={TERMS_Y + 5} r="1.3" fill={STALE} />
              </g>
            );
          })}
          <text x={120} y={314} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: STALE }}>
            -X1 · KEPT · RE-LABELLED
          </text>

          {/* Status footer */}
          <text x={32} y={378} className="font-mono" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: REPLACE }}>
            ● WORN · NO COMMS · NO DOCS
          </text>
          <text x={368} y={378} textAnchor="end" className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: REPLACE }}>
            AUDIT · 7/12 REPLACE
          </text>
        </g>

        {/* AFTER state */}
        <g style={{ opacity: afterOpacity, transition: "opacity 0.45s" }}>
          {/* Modern compact SMPS */}
          <rect x={36} y={76} width="56" height="108" className="fill-background" stroke={ACCENT} strokeWidth="1.8" />
          <circle cx={42} cy={82} r="1.5" fill={ACCENT} />
          <circle cx={86} cy={82} r="1.5" fill={ACCENT} />
          <circle cx={42} cy={178} r="1.5" fill={ACCENT} />
          <circle cx={86} cy={178} r="1.5" fill={ACCENT} />
          <text x={64} y={114} textAnchor="middle" style={{ fontSize: "13px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
            PSU
          </text>
          <text x={64} y={130} textAnchor="middle" className="fill-neutral-500 dark:fill-neutral-500" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}>
            24V · 60W
          </text>
          <text x={64} y={148} textAnchor="middle" style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: ACCENT }}>
            -T1
          </text>

          {/* 8 modern MCBs */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 128 + i * 18;
            return <NewMCB key={i} x={x} cy={RAIL_1} tag={`Q${i + 1}`} />;
          })}
          <text x={120} y={88} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: ACCENT }}>
            MCB · 8× C16 · NEW
          </text>

          {/* Modern contactors */}
          <NewContactor x={132} cy={RAIL_2} tag="KM1" />
          <NewContactor x={180} cy={RAIL_2} tag="KM2" />
          <NewContactor x={228} cy={RAIL_2} tag="KM3" />
          {/* Safety relays */}
          <NewSafetyRelay x={278} cy={RAIL_2} tag="K1" />
          <NewSafetyRelay x={312} cy={RAIL_2} tag="K2" />
          <text x={120} y={166} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: ACCENT }}>
            CONTACTORS · COMPACT + SAFETY
          </text>

          {/* PLC + ETH switch + IO-Link */}
          <NewPLC x={120} cy={RAIL_3} />
          <rect x={240} y={RAIL_3 - 20} width="40" height="40" className="fill-background" stroke={ACCENT} strokeWidth="1.5" />
          <text x={260} y={RAIL_3 - 4} textAnchor="middle" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
            ETH SW
          </text>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={245 + i * 8} y={RAIL_3 + 5} width="6" height="7" fill={ACCENT} />
          ))}
          <rect x={290} y={RAIL_3 - 20} width="48" height="40" className="fill-background" stroke={ACCENT} strokeWidth="1.5" />
          {Array.from({ length: 4 }).map((_, i) => (
            <circle key={i} cx={298 + i * 10} cy={RAIL_3 + 10} r="1.4" fill={ACCENT} />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <circle key={`d-${i}`} cx={298 + i * 10} cy={RAIL_3 - 9} r="0.9" fill={ACCENT} opacity="0.7" />
          ))}
          <text x={314} y={RAIL_3 + 1} textAnchor="middle" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
            IO-L
          </text>
          <text x={120} y={244} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: ACCENT }}>
            CONTROL · PLC + ETH + IO-LINK
          </text>

          {/* New terminal block */}
          <rect x={120} y={TERMS_Y - 12} width="196" height="24" className="fill-background" stroke={ACCENT} strokeWidth="1.5" />
          {Array.from({ length: 14 }).map((_, i) => {
            const cellX = 120 + i * 14;
            const cellCenter = cellX + 7;
            return (
              <g key={i}>
                {i > 0 && (
                  <line x1={cellX} y1={TERMS_Y - 12} x2={cellX} y2={TERMS_Y + 12} stroke={ACCENT} strokeWidth="0.4" opacity="0.45" />
                )}
                <circle cx={cellCenter} cy={TERMS_Y - 5} r="1.3" fill={ACCENT} />
                <circle cx={cellCenter} cy={TERMS_Y + 5} r="1.3" fill={ACCENT} />
              </g>
            );
          })}
          <text x={120} y={314} className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: ACCENT }}>
            -X1 · TAGGED · DRESSED · 14P
          </text>

          {/* Status footer */}
          <text x={32} y={378} className="font-mono" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: ACCENT }}>
            ● MODERNISED · DOCUMENTED · READY
          </text>
          <text x={368} y={378} textAnchor="end" className="font-mono" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", fill: ACCENT }}>
            CE · EN 60204-1
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

/* ---------- BEFORE components (red, oversized, old) ---------- */

function OldMCB({ x, cy, tag }: { x: number; cy: number; tag: string }) {
  return (
    <g>
      <rect x={x - 14} y={cy - 18} width="28" height="36" className="fill-background" stroke={REPLACE} strokeWidth="1.5" />
      <line x1={x - 4} y1={cy - 4} x2={x - 4} y2={cy + 4} stroke={REPLACE} strokeWidth="2" />
      <circle cx={x - 4} cy={cy + 4} r="2.2" fill={REPLACE} />
      <line x1={x + 6} y1={cy - 4} x2={x + 6} y2={cy + 4} stroke={REPLACE} strokeWidth="2" />
      <circle cx={x + 6} cy={cy + 4} r="2.2" fill={REPLACE} />
      <text x={x} y={cy + 28} textAnchor="middle" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: REPLACE }}>
        -{tag}
      </text>
    </g>
  );
}

function OldContactor({ x, cy, tag }: { x: number; cy: number; tag: string }) {
  return (
    <g>
      <rect x={x - 22} y={cy - 22} width="44" height="44" className="fill-background" stroke={REPLACE} strokeWidth="1.7" />
      {[-12, 0, 12].map((dx) => (
        <circle key={`t-${dx}`} cx={x + dx} cy={cy - 17} r="1.8" fill={REPLACE} />
      ))}
      {[-12, 0, 12].map((dx) => (
        <circle key={`b-${dx}`} cx={x + dx} cy={cy + 17} r="1.8" fill={REPLACE} />
      ))}
      <text x={x} y={cy + 5} textAnchor="middle" style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: REPLACE }}>
        {tag}
      </text>
      <text x={x} y={cy + 32} textAnchor="middle" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: REPLACE }}>
        -{tag} · 1998
      </text>
    </g>
  );
}

/* ---------- AFTER components (green, modern, compact) ---------- */

function NewMCB({ x, cy, tag }: { x: number; cy: number; tag: string }) {
  return (
    <g>
      <rect x={x - 7} y={cy - 17} width="14" height="34" className="fill-background" stroke={ACCENT} strokeWidth="1.5" />
      <line x1={x} y1={cy - 8} x2={x} y2={cy + 2} stroke={ACCENT} strokeWidth="2.3" />
      <circle cx={x} cy={cy + 2} r="2" fill={ACCENT} />
      <circle cx={x} cy={cy - 13} r="1.4" fill={ACCENT} />
      <circle cx={x} cy={cy + 13} r="1.4" fill={ACCENT} />
      <text x={x} y={cy + 27} textAnchor="middle" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
        -{tag}
      </text>
    </g>
  );
}

function NewContactor({ x, cy, tag }: { x: number; cy: number; tag: string }) {
  return (
    <g>
      <rect x={x - 16} y={cy - 19} width="32" height="38" className="fill-background" stroke={ACCENT} strokeWidth="1.6" />
      {[-9, 0, 9].map((dx) => (
        <circle key={`t-${dx}`} cx={x + dx} cy={cy - 14} r="1.5" fill={ACCENT} />
      ))}
      {[-9, 0, 9].map((dx) => (
        <circle key={`b-${dx}`} cx={x + dx} cy={cy + 14} r="1.5" fill={ACCENT} />
      ))}
      <text x={x} y={cy + 3} textAnchor="middle" style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
        {tag}
      </text>
      <text x={x} y={cy + 30} textAnchor="middle" style={{ fontSize: "7px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: ACCENT }}>
        -{tag}
      </text>
    </g>
  );
}

function NewSafetyRelay({ x, cy, tag }: { x: number; cy: number; tag: string }) {
  return (
    <g>
      <rect x={x - 11} y={cy - 17} width="22" height="34" className="fill-background" stroke={ACCENT} strokeWidth="1.4" />
      <circle cx={x - 5} cy={cy - 11} r="1.3" fill={ACCENT} />
      <circle cx={x + 5} cy={cy - 11} r="1.3" fill={ACCENT} />
      <text x={x} y={cy + 5} textAnchor="middle" style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
        {tag}
      </text>
      <text x={x} y={cy + 28} textAnchor="middle" style={{ fontSize: "6.5px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: ACCENT }}>
        -{tag}
      </text>
    </g>
  );
}

function NewPLC({ x, cy }: { x: number; cy: number }) {
  const w = 110;
  const h = 42;
  return (
    <g>
      <rect x={x} y={cy - h / 2} width={w} height={h} className="fill-background" stroke={ACCENT} strokeWidth="1.6" />
      <rect x={x + 4} y={cy - h / 2 + 4} width="24" height={h - 8} fill="none" stroke={ACCENT} strokeWidth="0.8" />
      {Array.from({ length: 4 }).map((_, i) => (
        <circle key={i} cx={x + 10 + (i % 2) * 8} cy={cy - 8 + Math.floor(i / 2) * 6} r="1.1" fill={ACCENT} />
      ))}
      <text x={x + 16} y={cy + 14} textAnchor="middle" style={{ fontSize: "6px", fontFamily: "ui-monospace, monospace", fontWeight: 700, fill: ACCENT }}>
        CPU
      </text>
      {Array.from({ length: 5 }).map((_, i) => {
        const sx = x + 32 + i * 15;
        return (
          <g key={i}>
            <rect x={sx} y={cy - h / 2 + 4} width="13" height={h - 8} fill="none" stroke={ACCENT} strokeWidth="0.7" />
            {Array.from({ length: 6 }).map((_, j) => (
              <circle key={j} cx={sx + 3.5 + (j % 2) * 6} cy={cy - h / 2 + 9 + Math.floor(j / 2) * 6} r="0.9" fill={ACCENT} />
            ))}
          </g>
        );
      })}
      <text x={x + w / 2} y={cy + 31} textAnchor="middle" style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 800, fill: ACCENT }}>
        -A1 · PLC OMRON CP1L
      </text>
    </g>
  );
}
