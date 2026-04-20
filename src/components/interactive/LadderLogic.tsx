"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const ON = "#16a34a";
const OFF = "#6b7280";
const RAIL = "#525252";

type Cell =
  | { kind: "no"; tag: string; addr: string; bit: boolean }
  | { kind: "nc"; tag: string; addr: string; bit: boolean }
  | { kind: "coil"; tag: string; addr: string; energized: boolean };

export default function LadderLogic() {
  const [on, setOn] = useState(false);
  const [start, setStart] = useState(false);
  const tRef = useRef<NodeJS.Timeout[]>([]);

  const clear = () => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
  };
  const activate = () => {
    clear();
    setOn(true);
    setStart(false);
    tRef.current = [setTimeout(() => setStart(true), 600)];
  };
  const deactivate = () => {
    clear();
    setOn(false);
    setStart(false);
  };
  useEffect(() => () => clear(), []);

  // PLC bits
  const I_START = start;
  const I_STOP = false; // NC passes
  const I_ESTOP = false; // NC passes
  const I_DOOR = false; // NC passes
  const I_TEMP = true; // NO passes

  const pass = (k: "no" | "nc", b: boolean) => (k === "no" ? b : !b);

  // Rung 1: START · /STOP · /ESTOP → MOTOR
  const r1a = on && pass("no", I_START);
  const r1b = r1a && pass("nc", I_STOP);
  const r1c = r1b && pass("nc", I_ESTOP);
  const MOTOR = r1c;

  // Rung 2: MOTOR · /DOOR → CONVEYOR
  const r2a = on && pass("no", MOTOR);
  const r2b = r2a && pass("nc", I_DOOR);
  const CONV = r2b;

  // Rung 3: MOTOR · TEMP → HEATER
  const r3a = on && pass("no", MOTOR);
  const r3b = r3a && pass("no", I_TEMP);
  const HEAT = r3b;

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onClick={() => (on ? deactivate() : activate())}
    >
      <div className="w-[96%] max-w-[440px]">
        <div className="relative aspect-square">
          <svg
            viewBox="0 0 400 360"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <Network
              index={1}
              y={10}
              cells={[
                { kind: "no", tag: "START", addr: "%I0.0", bit: on && I_START },
                { kind: "nc", tag: "STOP", addr: "%I0.1", bit: on && I_STOP },
                { kind: "nc", tag: "E_STOP", addr: "%I0.2", bit: on && I_ESTOP },
                { kind: "coil", tag: "MOTOR", addr: "%Q0.0", energized: MOTOR },
              ]}
              segs={[on, r1a, r1b, r1c]}
              coilEnergized={MOTOR}
            />

            <Network
              index={2}
              y={130}
              cells={[
                { kind: "no", tag: "MOTOR", addr: "%Q0.0", bit: MOTOR },
                { kind: "nc", tag: "DOOR", addr: "%I0.3", bit: on && I_DOOR },
                { kind: "coil", tag: "CONV", addr: "%Q0.1", energized: CONV },
              ]}
              segs={[on, r2a, r2b]}
              coilEnergized={CONV}
            />

            <Network
              index={3}
              y={250}
              cells={[
                { kind: "no", tag: "MOTOR", addr: "%Q0.0", bit: MOTOR },
                { kind: "no", tag: "TEMP_OK", addr: "%I0.4", bit: on && I_TEMP },
                { kind: "coil", tag: "HEAT", addr: "%Q0.2", energized: HEAT },
              ]}
              segs={[on, r3a, r3b]}
              coilEnergized={HEAT}
            />

          </svg>
        </div>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{
          opacity: !on ? 1 : 0,
          pointerEvents: !on ? "auto" : "none",
        }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Network (one rung) ---------- */

function Network({
  index,
  y,
  cells,
  segs,
  coilEnergized,
}: {
  index: number;
  y: number;
  cells: Cell[];
  /** power flow state for each segment between rail→cell0, cell0→cell1, ..., cellN-1→cellN */
  segs: boolean[];
  coilEnergized: boolean;
}) {
  const railL = 28;
  const railR = 372;
  const top = y;
  const headerH = 0;
  const rungY = top + 40;
  const bot = top + 100;

  // x-positions for contacts (evenly spaced, coil always rightmost)
  const n = cells.length;
  const contactCount = n - 1;
  const coilX = railR - 34;
  const gap = (coilX - (railL + 30)) / Math.max(contactCount, 1);
  const xs: number[] = [];
  for (let i = 0; i < contactCount; i++) {
    xs.push(railL + 30 + gap * i + gap / 2);
  }
  xs.push(coilX);

  const wire = (state: boolean, from: number, to: number) => (
    <line
      x1={from}
      y1={rungY}
      x2={to}
      y2={rungY}
      stroke={state ? ON : OFF}
      strokeWidth={state ? 2.5 : 1.5}
      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
    />
  );

  return (
    <g>
      {/* Rung number */}
      <text
        x={10}
        y={rungY + 3}
        className="fill-neutral-300 dark:fill-neutral-700"
        style={{
          fontSize: "9px",
          fontFamily: "ui-monospace, monospace",
          fontWeight: 700,
        }}
      >
        {index.toString().padStart(3, "0")}
      </text>

      {/* Rails */}
      <line
        x1={railL}
        y1={top + 20}
        x2={railL}
        y2={bot - 20}
        stroke={segs[0] ? ON : RAIL}
        strokeWidth="2.5"
        style={{ transition: "stroke 0.3s" }}
      />
      <line
        x1={railR}
        y1={top + 20}
        x2={railR}
        y2={bot - 20}
        stroke={RAIL}
        strokeWidth="2.5"
      />

      {/* Wire segments + symbols */}
      {/* seg 0: rail → first contact */}
      {wire(segs[0], railL, xs[0] - 9)}

      {cells.map((c, i) => {
        const cx = xs[i];
        const isLast = i === cells.length - 1;
        const nextSeg = segs[i + 1] ?? false;

        return (
          <g key={i}>
            {/* between-cell wire */}
            {!isLast && wire(segs[i + 1], cx + 9, xs[i + 1] - 9)}

            {/* last cell → right rail (after coil) */}
            {isLast && wire(coilEnergized, cx + 11, railR)}

            {/* Tag name above */}
            <text
              x={cx}
              y={rungY - 18}
              textAnchor="middle"
              fill={
                (c.kind === "coil" && c.energized) ||
                (c.kind !== "coil" && c.bit)
                  ? ON
                  : "currentColor"
              }
              className={
                (c.kind === "coil" && c.energized) ||
                (c.kind !== "coil" && c.bit)
                  ? ""
                  : "fill-neutral-700 dark:fill-neutral-300"
              }
              style={{
                fontSize: "9px",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 700,
                letterSpacing: "0.04em",
                transition: "fill 0.3s",
              }}
            >
              {c.tag}
            </text>
            {/* Address below */}
            <text
              x={cx}
              y={rungY + 26}
              textAnchor="middle"
              className="fill-neutral-400 dark:fill-neutral-500"
              style={{
                fontSize: "7px",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {c.addr}
            </text>

            {c.kind === "coil" ? (
              <Coil cx={cx} cy={rungY} energized={c.energized} />
            ) : (
              <Contact
                cx={cx}
                cy={rungY}
                kind={c.kind}
                bit={c.bit}
                inState={segs[i]}
                outState={nextSeg}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

/* ---------- Contact symbol ---------- */

function Contact({
  cx,
  cy,
  kind,
  bit,
  inState,
  outState,
}: {
  cx: number;
  cy: number;
  kind: "no" | "nc";
  bit: boolean;
  inState: boolean;
  outState: boolean;
}) {
  const h = 14;
  return (
    <g>
      {/* Bit-active fill (monitoring style) */}
      {bit && (
        <rect
          x={cx - 9}
          y={cy - h}
          width="18"
          height={h * 2}
          fill={ON}
          opacity="0.12"
        />
      )}
      {/* Left bar */}
      <line
        x1={cx - 9}
        y1={cy - h}
        x2={cx - 9}
        y2={cy + h}
        stroke={inState ? ON : RAIL}
        strokeWidth="2.5"
        style={{ transition: "stroke 0.3s" }}
      />
      {/* Right bar */}
      <line
        x1={cx + 9}
        y1={cy - h}
        x2={cx + 9}
        y2={cy + h}
        stroke={outState ? ON : RAIL}
        strokeWidth="2.5"
        style={{ transition: "stroke 0.3s" }}
      />
      {/* NC slash */}
      {kind === "nc" && (
        <line
          x1={cx - 11}
          y1={cy + h}
          x2={cx + 11}
          y2={cy - h}
          stroke={bit ? "#dc2626" : RAIL}
          strokeWidth="2"
          style={{ transition: "stroke 0.3s" }}
        />
      )}
    </g>
  );
}

/* ---------- Coil symbol ---------- */

function Coil({
  cx,
  cy,
  energized,
}: {
  cx: number;
  cy: number;
  energized: boolean;
}) {
  const color = energized ? ON : RAIL;
  return (
    <g>
      {energized && (
        <rect
          x={cx - 11}
          y={cy - 12}
          width="22"
          height="24"
          fill={ON}
          opacity="0.12"
        />
      )}
      {/* Left arc — opening right */}
      <path
        d={`M ${cx - 9},${cy - 11} Q ${cx - 2},${cy} ${cx - 9},${cy + 11}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        style={{ transition: "stroke 0.3s" }}
      />
      {/* Right arc — opening left */}
      <path
        d={`M ${cx + 9},${cy - 11} Q ${cx + 2},${cy} ${cx + 9},${cy + 11}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        style={{ transition: "stroke 0.3s" }}
      />
    </g>
  );
}
