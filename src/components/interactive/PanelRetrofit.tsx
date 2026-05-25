"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ACCENT = "#16a34a";
const STALE = "#a8a29e";

type Comp = { x: number; y: number; w: number; h: number; label: string; status: "keep" | "replace" | "new" };

const before: Comp[] = [
  { x: 30, y: 90, w: 30, h: 30, label: "Q1", status: "keep" },
  { x: 68, y: 90, w: 70, h: 30, label: "KM1·old", status: "replace" },
  { x: 146, y: 90, w: 70, h: 30, label: "KM2·old", status: "replace" },
  { x: 224, y: 90, w: 70, h: 30, label: "TIMER", status: "replace" },
  { x: 302, y: 90, w: 68, h: 30, label: "X1", status: "keep" },
  { x: 30, y: 170, w: 340, h: 50, label: "RELAYS · MIX · 1998", status: "replace" },
  { x: 30, y: 240, w: 340, h: 50, label: "WIRES · UNTAGGED", status: "replace" },
];

const after: Comp[] = [
  { x: 30, y: 90, w: 30, h: 30, label: "Q1", status: "keep" },
  { x: 68, y: 90, w: 48, h: 30, label: "KM1", status: "new" },
  { x: 124, y: 90, w: 48, h: 30, label: "KM2", status: "new" },
  { x: 180, y: 90, w: 80, h: 30, label: "PLC · OMRON", status: "new" },
  { x: 268, y: 90, w: 50, h: 30, label: "SAFETY", status: "new" },
  { x: 326, y: 90, w: 44, h: 30, label: "X1", status: "keep" },
  { x: 30, y: 170, w: 200, h: 50, label: "I/O · 32ch · IO-Link", status: "new" },
  { x: 238, y: 170, w: 132, h: 50, label: "POWER · 24V", status: "new" },
  { x: 30, y: 240, w: 340, h: 50, label: "WIRES · TAGGED · DRESSED", status: "new" },
];

export default function PanelRetrofit() {
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState<"before" | "after">("before");
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
      setTimeout(() => setPhase("after"), 1400),
      setTimeout(() => setPhase("before"), 3200),
      setTimeout(() => setPhase("after"), 4600),
    ];
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setPhase("before");
  };
  useEffect(() => () => clear(), []);

  const data = phase === "before" ? before : after;
  const isAfter = phase === "after";

  const colorFor = (s: Comp["status"]) => {
    if (s === "new") return ACCENT;
    if (s === "replace") return "#dc2626";
    return STALE;
  };

  return (
    <div
      className="relative w-full aspect-square select-none flex items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Header */}
        <text
          x={20}
          y={28}
          className="fill-neutral-400 dark:fill-neutral-500"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          PNL-009 · {isAfter ? "AFTER" : "BEFORE"}
        </text>
        <text
          x={380}
          y={28}
          textAnchor="end"
          className="fill-neutral-400 dark:fill-neutral-500"
          style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em" }}
        >
          {isAfter ? "2025" : "1998"}
        </text>
        <line
          x1={20}
          y1={36}
          x2={380}
          y2={36}
          className="stroke-neutral-300 dark:stroke-neutral-700"
          strokeWidth="0.5"
          strokeDasharray="3 2"
        />

        {/* Cabinet outline */}
        <rect
          x={20}
          y={50}
          width="360"
          height="310"
          fill="none"
          className="stroke-neutral-300 dark:stroke-neutral-700"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Components */}
        {data.map((c, i) => {
          const color = colorFor(c.status);
          return (
            <g
              key={`${phase}-${i}`}
              style={{ opacity: on ? 1 : 0.4, transition: "opacity 0.3s" }}
            >
              <rect
                x={c.x}
                y={c.y}
                width={c.w}
                height={c.h}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray={c.status === "replace" ? "3 2" : undefined}
                style={{ transition: "stroke 0.4s" }}
              />
              <text
                x={c.x + c.w / 2}
                y={c.y + c.h / 2 + 4}
                textAnchor="middle"
                fill={color}
                style={{
                  fontSize: c.label.length > 12 ? "9px" : "10px",
                  fontFamily: "ui-monospace, monospace",
                  fontWeight: 700,
                  transition: "fill 0.4s",
                }}
              >
                {c.label}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g>
          <rect x={20} y={368} width="10" height="10" fill="none" stroke={isAfter ? ACCENT : "#dc2626"} strokeWidth="1.5" style={{ transition: "stroke 0.4s" }} />
          <text
            x={36}
            y={377}
            className="fill-neutral-500 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
          >
            {isAfter ? "NEW" : "REPLACE"}
          </text>
          <rect x={120} y={368} width="10" height="10" fill="none" stroke={STALE} strokeWidth="1.5" />
          <text
            x={136}
            y={377}
            className="fill-neutral-500 dark:fill-neutral-500"
            style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 700 }}
          >
            KEEP
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
