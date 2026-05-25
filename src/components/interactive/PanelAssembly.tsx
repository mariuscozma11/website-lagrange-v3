"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#16a34a";
const RAIL = "#525252";

type Comp = { x: number; w: number; label: string; sub: string };

const components: Comp[] = [
  { x: 30, w: 40, label: "Q1", sub: "MCB" },
  { x: 78, w: 56, label: "KM1", sub: "Contactor" },
  { x: 142, w: 56, label: "KM2", sub: "Contactor" },
  { x: 206, w: 72, label: "PLC", sub: "OMRON" },
  { x: 286, w: 84, label: "X1", sub: "Terminals" },
];

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
    components.forEach((_, i) => {
      tRef.current.push(setTimeout(() => setStep(i), 300 + i * 350));
    });
    tRef.current.push(setTimeout(() => setStep(components.length), 300 + components.length * 350));
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setStep(-1);
  };
  useEffect(() => () => clear(), []);

  const shown = (i: number) => on && step >= i;

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Cabinet outline */}
        <rect
          x={20}
          y={50}
          width="360"
          height="300"
          fill="none"
          className="stroke-neutral-300 dark:stroke-neutral-700"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Title */}
        <text
          x={20}
          y={36}
          className="fill-neutral-400 dark:fill-neutral-500"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          ENC-01 · DIN RAIL ASSEMBLY
        </text>

        {/* DIN rails (3 rows) */}
        {[120, 200, 280].map((y, idx) => (
          <g key={idx}>
            <line x1={30} y1={y} x2={370} y2={y} stroke={RAIL} strokeWidth="3" />
            <line x1={30} y1={y + 4} x2={370} y2={y + 4} stroke={RAIL} strokeWidth="1" opacity="0.5" />
          </g>
        ))}

        {/* Top row: power components */}
        {components.slice(0, 3).map((c, i) => (
          <g
            key={`top-${i}`}
            style={{
              opacity: shown(i) ? 1 : 0,
              transform: shown(i) ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.4s, transform 0.4s",
            }}
          >
            <rect x={c.x} y={88} width={c.w} height="34" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            <text
              x={c.x + c.w / 2}
              y={108}
              textAnchor="middle"
              className="fill-neutral-700 dark:fill-neutral-300"
              style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
            >
              {c.label}
            </text>
            <text
              x={c.x + c.w / 2}
              y={140}
              textAnchor="middle"
              className="fill-neutral-400 dark:fill-neutral-500"
              style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}
            >
              {c.sub}
            </text>
          </g>
        ))}

        {/* Middle row: PLC */}
        <g
          style={{
            opacity: shown(3) ? 1 : 0,
            transform: shown(3) ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 0.4s, transform 0.4s",
          }}
        >
          <rect x={components[3].x} y={168} width={components[3].w} height="34" fill="none" stroke={ACCENT} strokeWidth="1.5" />
          <text
            x={components[3].x + components[3].w / 2}
            y={188}
            textAnchor="middle"
            className="fill-neutral-700 dark:fill-neutral-300"
            style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
          >
            {components[3].label}
          </text>
          <text
            x={components[3].x + components[3].w / 2}
            y={220}
            textAnchor="middle"
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}
          >
            {components[3].sub}
          </text>
        </g>

        {/* Bottom row: terminal block */}
        <g
          style={{
            opacity: shown(4) ? 1 : 0,
            transform: shown(4) ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 0.4s, transform 0.4s",
          }}
        >
          <rect x={components[4].x} y={248} width={components[4].w} height="34" fill="none" stroke={ACCENT} strokeWidth="1.5" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1={components[4].x + 6 + i * 12}
              y1={250}
              x2={components[4].x + 6 + i * 12}
              y2={280}
              stroke={ACCENT}
              strokeWidth="0.6"
            />
          ))}
          <text
            x={components[4].x + components[4].w / 2}
            y={300}
            textAnchor="middle"
            className="fill-neutral-400 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace" }}
          >
            {components[4].sub}
          </text>
        </g>

        {/* Status footer */}
        <text
          x={20}
          y={376}
          className="fill-neutral-400 dark:fill-neutral-500"
          style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.05em" }}
        >
          {step >= components.length ? "READY · WIRED · LABELLED" : "ASSEMBLING…"}
        </text>
        <text
          x={380}
          y={376}
          textAnchor="end"
          className="fill-neutral-400 dark:fill-neutral-500"
          style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace" }}
        >
          {Math.min(Math.max(step + 1, 0), components.length)}/{components.length}
        </text>
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
