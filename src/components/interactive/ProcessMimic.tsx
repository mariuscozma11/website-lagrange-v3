"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const ON = "#16a34a";
const IDLE = "#9ca3af";
const PIPE = "#6b7280";
const FLUID = "#3b82f6";

export default function ProcessMimic() {
  const [on, setOn] = useState(false);
  const [level, setLevel] = useState(0); // 0..100
  const [valveOpen, setValveOpen] = useState(false);
  const [pumpRun, setPumpRun] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clear = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const activate = () => {
    clear();
    setOn(true);
    setValveOpen(false);
    setPumpRun(false);
    setLevel(0);

    timeoutsRef.current.push(setTimeout(() => setValveOpen(true), 400));
    timeoutsRef.current.push(setTimeout(() => setPumpRun(true), 2400));
  };

  const deactivate = () => {
    clear();
    setOn(false);
    setValveOpen(false);
    setPumpRun(false);
    setLevel(0);
  };

  // Level simulation
  useEffect(() => {
    if (!on) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setLevel((l) => {
        const inflow = valveOpen ? 35 : 0;
        const outflow = pumpRun ? 30 : 0;
        const next = l + (inflow - outflow) * dt;
        return Math.max(0, Math.min(100, next));
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [on, valveOpen, pumpRun]);

  useEffect(() => () => clear(), []);

  // Geometry
  const tankX = 140;
  const tankY = 110;
  const tankW = 120;
  const tankH = 150;
  const fluidH = (tankH - 8) * (level / 100);

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <div className="w-[96%] max-w-[440px]">
        <div className="relative aspect-square rounded-xl bg-neutral-200 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-900 shadow-lg p-3 flex flex-col gap-2">
          {/* Top bezel strip */}
          <div className="flex items-center justify-between h-4 px-1">
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                title="power"
                style={{ backgroundColor: on ? ON : "#9ca3af" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                title="comm"
                style={{
                  backgroundColor: on ? "#f59e0b" : "#9ca3af",
                  opacity: on ? 1 : 0.4,
                }}
              />
            </div>
            <div className="flex items-center">
              <img
                src="/lg-black.svg"
                alt=""
                className="h-5 opacity-70 dark:hidden"
              />
              <img
                src="/lg-white.svg"
                alt=""
                className="h-5 opacity-70 hidden dark:block"
              />
            </div>
          </div>

          {/* Screen */}
          <div className="flex-1 relative rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-500 dark:border-black shadow-inner overflow-hidden">
            {/* Screws */}
            <span className="absolute top-1 left-1 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-700" />
            <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-700" />
            <span className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-700" />
            <span className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-700" />
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full p-1"
              preserveAspectRatio="xMidYMid meet"
            >
            {/* Inlet pipe: top → valve → tank */}
            <line
              x1={tankX + tankW / 2}
              y1={40}
              x2={tankX + tankW / 2}
              y2={tankY}
              stroke={PIPE}
              strokeWidth="6"
            />
            {/* Inlet flow animation */}
            {valveOpen && on && (
              <line
                x1={tankX + tankW / 2}
                y1={40}
                x2={tankX + tankW / 2}
                y2={tankY}
                stroke={FLUID}
                strokeWidth="2"
                strokeDasharray="6 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-24"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </line>
            )}

            {/* Valve (inlet) */}
            <Valve
              cx={tankX + tankW / 2}
              cy={72}
              open={valveOpen}
              label="XV-01"
            />

            {/* Tank */}
            <rect
              x={tankX}
              y={tankY}
              width={tankW}
              height={tankH}
              rx="6"
              fill="none"
              stroke={PIPE}
              strokeWidth="2.5"
            />
            {/* Fluid */}
            <rect
              x={tankX + 4}
              y={tankY + (tankH - 4 - fluidH)}
              width={tankW - 8}
              height={fluidH}
              fill={FLUID}
              opacity="0.35"
            />
            {/* Fluid top surface ripple */}
            {fluidH > 2 && (
              <line
                x1={tankX + 4}
                y1={tankY + (tankH - 4 - fluidH)}
                x2={tankX + tankW - 4}
                y2={tankY + (tankH - 4 - fluidH)}
                stroke={FLUID}
                strokeWidth="1.5"
                opacity="0.8"
              />
            )}
            {/* Tick marks */}
            {[25, 50, 75].map((p) => (
              <g key={p}>
                <line
                  x1={tankX - 4}
                  y1={tankY + tankH * (1 - p / 100)}
                  x2={tankX}
                  y2={tankY + tankH * (1 - p / 100)}
                  stroke={PIPE}
                  strokeWidth="1"
                />
                <text
                  x={tankX - 7}
                  y={tankY + tankH * (1 - p / 100) + 3}
                  textAnchor="end"
                  className="fill-neutral-400 dark:fill-neutral-500"
                  style={{
                    fontSize: "7px",
                    fontFamily: "ui-monospace, monospace",
                  }}
                >
                  {p}
                </text>
              </g>
            ))}

            {/* Outlet pipe: tank bottom → pump → right exit */}
            <line
              x1={tankX + tankW}
              y1={tankY + tankH - 20}
              x2={320}
              y2={tankY + tankH - 20}
              stroke={PIPE}
              strokeWidth="6"
            />
            <line
              x1={320}
              y1={tankY + tankH - 20}
              x2={320}
              y2={340}
              stroke={PIPE}
              strokeWidth="6"
            />
            {pumpRun && on && (
              <>
                <line
                  x1={tankX + tankW}
                  y1={tankY + tankH - 20}
                  x2={320}
                  y2={tankY + tankH - 20}
                  stroke={FLUID}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-24"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1={320}
                  y1={tankY + tankH - 20}
                  x2={320}
                  y2={340}
                  stroke={FLUID}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-24"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </line>
              </>
            )}

            {/* Pump */}
            <Pump cx={290} cy={tankY + tankH - 20} running={pumpRun && on} label="P-101" />

            {/* Level readout */}
            <g>
              <rect
                x={40}
                y={tankY}
                width={78}
                height={46}
                rx="3"
                className="fill-neutral-50 dark:fill-neutral-800"
                stroke={PIPE}
                strokeWidth="0.5"
              />
              <text
                x={79}
                y={tankY + 14}
                textAnchor="middle"
                className="fill-neutral-500 dark:fill-neutral-400"
                style={{
                  fontSize: "7px",
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.1em",
                }}
              >
                LEVEL
              </text>
              <text
                x={79}
                y={tankY + 34}
                textAnchor="middle"
                fill={on ? ON : IDLE}
                style={{
                  fontSize: "18px",
                  fontFamily: "ui-monospace, monospace",
                  fontWeight: 700,
                  transition: "fill 0.3s",
                }}
              >
                {level.toFixed(1)}%
              </text>
            </g>

            </svg>
          </div>
        </div>
      </div>

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

function Valve({
  cx,
  cy,
  open,
  label,
}: {
  cx: number;
  cy: number;
  open: boolean;
  label: string;
}) {
  const color = open ? ON : IDLE;
  return (
    <g>
      <polygon
        points={`${cx - 12},${cy - 10} ${cx + 12},${cy - 10} ${cx},${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        style={{ transition: "stroke 0.3s" }}
      />
      <polygon
        points={`${cx - 12},${cy + 10} ${cx + 12},${cy + 10} ${cx},${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        style={{ transition: "stroke 0.3s" }}
      />
      {open && (
        <>
          <polygon
            points={`${cx - 12},${cy - 10} ${cx + 12},${cy - 10} ${cx},${cy}`}
            fill={ON}
            opacity="0.2"
          />
          <polygon
            points={`${cx - 12},${cy + 10} ${cx + 12},${cy + 10} ${cx},${cy}`}
            fill={ON}
            opacity="0.2"
          />
        </>
      )}
      <text
        x={cx + 18}
        y={cy + 3}
        className="fill-neutral-500 dark:fill-neutral-400"
        style={{
          fontSize: "7px",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 600,
        }}
      >
        {label}
      </text>
    </g>
  );
}

function Pump({
  cx,
  cy,
  running,
  label,
}: {
  cx: number;
  cy: number;
  running: boolean;
  label: string;
}) {
  const color = running ? ON : IDLE;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r="14"
        fill="none"
        stroke={color}
        strokeWidth="2"
        style={{ transition: "stroke 0.3s" }}
      />
      {running && (
        <circle cx={cx} cy={cy} r="14" fill={ON} opacity="0.15" />
      )}
      {/* Impeller */}
      <g
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: running ? "spin 0.8s linear infinite" : "none",
        }}
      >
        <line
          x1={cx - 9}
          y1={cy}
          x2={cx + 9}
          y2={cy}
          stroke={color}
          strokeWidth="2"
        />
        <line
          x1={cx}
          y1={cy - 9}
          x2={cx}
          y2={cy + 9}
          stroke={color}
          strokeWidth="2"
        />
      </g>
      <text
        x={cx}
        y={cy + 26}
        textAnchor="middle"
        className="fill-neutral-500 dark:fill-neutral-400"
        style={{
          fontSize: "7px",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 600,
        }}
      >
        {label}
      </text>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </g>
  );
}
