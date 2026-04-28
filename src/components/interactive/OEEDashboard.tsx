"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const ON = "#16a34a";
const WARN = "#f59e0b";
const DANGER = "#dc2626";
const IDLE = "#9ca3af";

const AVAIL = 92.0;
const PERF = 88.0;
const QUAL = 96.8;
const OEE = (AVAIL * PERF * QUAL) / 10000;

const TARGET_PARTS = 4200;
const PARTS = 3842;
const REJECTS = 126;
const DOWNTIME = 28;
const RATE = 58;
const TARGET_RATE = 65;

const pickColor = (v: number, green = 85, amber = 70) =>
  v >= green ? ON : v >= amber ? WARN : DANGER;

export default function OEEDashboard() {
  const [on, setOn] = useState(false);
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);

  const clear = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const activate = () => {
    clear();
    setOn(true);
    setT(0);
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setT(eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const deactivate = () => {
    clear();
    setOn(false);
    setT(0);
  };

  useEffect(() => () => clear(), []);

  const oee = OEE * t;
  const avail = AVAIL * t;
  const perf = PERF * t;
  const qual = QUAL * t;
  const parts = Math.round(PARTS * t);
  const rejects = Math.round(REJECTS * t);
  const downtime = Math.round(DOWNTIME * t);
  const rate = Math.round(RATE * t);
  const oeeColor = on ? pickColor(oee) : IDLE;

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <div className="w-full">
        <div className="relative aspect-square">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* OEE donut */}
            <Donut
              cx={200}
              cy={120}
              r={56}
              stroke={10}
              value={oee}
              max={100}
              color={oeeColor}
              active={on}
            />
            <text
              x={200}
              y={116}
              textAnchor="middle"
              fill={oeeColor}
              style={{
                fontSize: "28px",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 700,
                transition: "fill 0.3s",
              }}
            >
              {oee.toFixed(1)}
            </text>
            <text
              x={200}
              y={132}
              textAnchor="middle"
              className="fill-neutral-500 dark:fill-neutral-400"
              style={{
                fontSize: "9px",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.15em",
                fontWeight: 700,
              }}
            >
              OEE %
            </text>

            {/* A P Q mini donuts */}
            <MiniGauge cx={80} cy={230} label="AVAIL" value={avail} active={on} />
            <MiniGauge cx={200} cy={230} label="PERF" value={perf} active={on} />
            <MiniGauge cx={320} cy={230} label="QUAL" value={qual} active={on} />

            {/* Divider */}
            <line
              x1="20"
              y1="300"
              x2="380"
              y2="300"
              className="stroke-neutral-200 dark:stroke-neutral-700"
              strokeWidth="0.5"
            />

            {/* Production stats */}
            <Stat
              x={40}
              label="PARTS"
              value={`${parts.toLocaleString()}`}
              sub={`/ ${TARGET_PARTS.toLocaleString()}`}
              active={on}
            />
            <Stat
              x={140}
              label="REJECTS"
              value={rejects.toString()}
              sub="pcs"
              active={on}
              color={on && rejects > 100 ? DANGER : undefined}
            />
            <Stat
              x={240}
              label="DOWNTIME"
              value={`${downtime}m`}
              sub="this shift"
              active={on}
              color={on && downtime > 20 ? WARN : undefined}
            />
            <Stat
              x={340}
              label="RATE"
              value={`${rate}`}
              sub={`/ ${TARGET_RATE} ppm`}
              active={on}
            />

          </svg>
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

function Donut({
  cx,
  cy,
  r,
  stroke,
  value,
  max,
  color,
  active,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke: number;
  value: number;
  max: number;
  color: string;
  active: boolean;
}) {
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, value / max)));
  return (
    <g transform={`rotate(-90 ${cx} ${cy})`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        className="stroke-neutral-200 dark:stroke-neutral-700"
        strokeWidth={stroke}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={active ? color : IDLE}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{ transition: "stroke 0.3s" }}
      />
    </g>
  );
}

function MiniGauge({
  cx,
  cy,
  label,
  value,
  active,
}: {
  cx: number;
  cy: number;
  label: string;
  value: number;
  active: boolean;
}) {
  const r = 28;
  const stroke = 5;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, value / 100)));
  const color = active ? pickColor(value) : IDLE;
  return (
    <g>
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          className="stroke-neutral-200 dark:stroke-neutral-700"
          strokeWidth={stroke}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke 0.3s" }}
        />
      </g>
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        fill={color}
        style={{
          fontSize: "14px",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
          transition: "fill 0.3s",
        }}
      >
        {value.toFixed(0)}
      </text>
      <text
        x={cx}
        y={cy + 46}
        textAnchor="middle"
        className="fill-neutral-500 dark:fill-neutral-400"
        style={{
          fontSize: "8px",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </text>
    </g>
  );
}

function Stat({
  x,
  label,
  value,
  sub,
  active,
  color,
}: {
  x: number;
  label: string;
  value: string;
  sub: string;
  active: boolean;
  color?: string;
}) {
  const y = 320;
  const valueColor = color ?? (active ? ON : IDLE);
  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        className="fill-neutral-400 dark:fill-neutral-500"
        style={{
          fontSize: "7px",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </text>
      <text
        x={x}
        y={y + 18}
        textAnchor="middle"
        fill={valueColor}
        style={{
          fontSize: "15px",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
          transition: "fill 0.3s",
        }}
      >
        {value}
      </text>
      <text
        x={x}
        y={y + 32}
        textAnchor="middle"
        className="fill-neutral-400 dark:fill-neutral-500"
        style={{
          fontSize: "7px",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {sub}
      </text>
    </g>
  );
}
