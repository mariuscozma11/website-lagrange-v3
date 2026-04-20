"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const ON = "#16a34a";
const IDLE = "#9ca3af";
const STRUCT = "#525252";
const PART = "#f59e0b";

const BASE = { x: 200, y: 250 };
const L1 = 78;
const L2 = 66;

const POSES = {
  HOME: { x: 200, y: 150 },
  PICK_UP: { x: 100, y: 215 },
  PICK: { x: 100, y: 255 },
  PLACE_UP: { x: 300, y: 215 },
  PLACE: { x: 300, y: 255 },
} as const;

type PoseKey = keyof typeof POSES;

type Phase = {
  name: string;
  dur: number;
  from: PoseKey;
  to: PoseKey;
  grip: boolean;
  carry: boolean;
};

const PHASES: Phase[] = [
  { name: "approach pick", dur: 1200, from: "HOME", to: "PICK_UP", grip: false, carry: false },
  { name: "descend", dur: 400, from: "PICK_UP", to: "PICK", grip: false, carry: false },
  { name: "grip", dur: 350, from: "PICK", to: "PICK", grip: true, carry: true },
  { name: "lift", dur: 400, from: "PICK", to: "PICK_UP", grip: true, carry: true },
  { name: "traverse", dur: 1300, from: "PICK_UP", to: "PLACE_UP", grip: true, carry: true },
  { name: "descend", dur: 400, from: "PLACE_UP", to: "PLACE", grip: true, carry: true },
  { name: "release", dur: 350, from: "PLACE", to: "PLACE", grip: false, carry: false },
  { name: "return", dur: 1100, from: "PLACE", to: "HOME", grip: false, carry: false },
];

function ik(tx: number, ty: number) {
  const dx = tx - BASE.x;
  const dy = ty - BASE.y;
  const d2 = dx * dx + dy * dy;
  const c = Math.max(-1, Math.min(1, (d2 - L1 * L1 - L2 * L2) / (2 * L1 * L2)));
  const solve = (sign: 1 | -1) => {
    const a2rel = sign * Math.acos(c);
    const a1 =
      Math.atan2(dy, dx) -
      Math.atan2(L2 * Math.sin(a2rel), L1 + L2 * Math.cos(a2rel));
    const ey = BASE.y + L1 * Math.sin(a1);
    return { a1, a2: a1 + a2rel, ey };
  };
  const a = solve(-1);
  const b = solve(1);
  return a.ey <= b.ey ? a : b;
}

const POSE_ANGLES: Record<PoseKey, { a1: number; a2: number }> = {
  HOME: ik(POSES.HOME.x, POSES.HOME.y),
  PICK_UP: ik(POSES.PICK_UP.x, POSES.PICK_UP.y),
  PICK: ik(POSES.PICK.x, POSES.PICK.y),
  PLACE_UP: ik(POSES.PLACE_UP.x, POSES.PLACE_UP.y),
  PLACE: ik(POSES.PLACE.x, POSES.PLACE.y),
};

const lerpAngle = (a: number, b: number, t: number) => {
  let d = b - a;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return a + d * t;
};
const ease = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export default function RobotArm() {
  const [on, setOn] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({ phase: 0, start: 0, cycles: 0 });

  const clear = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const activate = () => {
    clear();
    setOn(true);
    setPhaseIdx(0);
    setProgress(0);
    stateRef.current = { phase: 0, start: 0, cycles: 0 };
  };

  const deactivate = () => {
    clear();
    setOn(false);
    setPhaseIdx(0);
    setProgress(0);
  };

  useEffect(() => () => clear(), []);

  useEffect(() => {
    if (!on) return;
    stateRef.current.start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - stateRef.current.start;
      const p = PHASES[stateRef.current.phase];
      if (elapsed >= p.dur) {
        stateRef.current.start = now;
        const next = (stateRef.current.phase + 1) % PHASES.length;
        stateRef.current.phase = next;
        setPhaseIdx(next);
        setProgress(0);
      } else {
        setProgress(elapsed / p.dur);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return clear;
  }, [on]);

  const phase = PHASES[phaseIdx];
  const t = ease(progress);
  const fromA = POSE_ANGLES[phase.from];
  const toA = POSE_ANGLES[phase.to];
  const homeA = POSE_ANGLES.HOME;
  const a1 = on ? lerpAngle(fromA.a1, toA.a1, t) : homeA.a1;
  const a2 = on ? lerpAngle(fromA.a2, toA.a2, t) : homeA.a2;
  const elbowX = BASE.x + L1 * Math.cos(a1);
  const elbowY = BASE.y + L1 * Math.sin(a1);
  const ex = elbowX + L2 * Math.cos(a2);
  const ey = elbowY + L2 * Math.sin(a2);

  // Part position
  let partX = 100;
  let partY = 270;
  if (on) {
    if (phase.carry) {
      partX = ex;
      partY = ey + 12;
    } else if (
      phase.name === "release" ||
      phase.name === "return"
    ) {
      partX = 300;
      partY = 270;
    }
  }

  const gripOpen = !on || !phase.grip;

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
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Conveyor (left) */}
            <rect
              x={40}
              y={270}
              width={120}
              height={14}
              rx="2"
              fill="none"
              stroke={STRUCT}
              strokeWidth="1.5"
            />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1={48 + i * 20}
                y1={270}
                x2={48 + i * 20}
                y2={284}
                stroke={STRUCT}
                strokeWidth="0.5"
              />
            ))}
            <text
              x={100}
              y={300}
              textAnchor="middle"
              className="fill-neutral-500 dark:fill-neutral-400"
              style={{
                fontSize: "7px",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              INFEED
            </text>

            {/* Bin (right) */}
            <path
              d={`M 248,270 L 252,296 L 348,296 L 352,270`}
              fill="none"
              stroke={STRUCT}
              strokeWidth="1.5"
            />
            <text
              x={300}
              y={310}
              textAnchor="middle"
              className="fill-neutral-500 dark:fill-neutral-400"
              style={{
                fontSize: "7px",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              OUTFEED
            </text>

            {/* Base mount */}
            <rect
              x={BASE.x - 18}
              y={BASE.y}
              width={36}
              height={14}
              fill={STRUCT}
              opacity="0.3"
            />
            <rect
              x={BASE.x - 22}
              y={BASE.y + 14}
              width={44}
              height={6}
              fill={STRUCT}
              opacity="0.3"
            />

            {/* Arm link 1 */}
            <line
              x1={BASE.x}
              y1={BASE.y}
              x2={elbowX}
              y2={elbowY}
              stroke={STRUCT}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Arm link 2 */}
            <line
              x1={elbowX}
              y1={elbowY}
              x2={ex}
              y2={ey}
              stroke={STRUCT}
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Joints */}
            <circle cx={BASE.x} cy={BASE.y} r="6" fill={on ? ON : IDLE} />
            <circle cx={elbowX} cy={elbowY} r="4" fill={on ? ON : IDLE} />

            {/* Gripper */}
            <Gripper x={ex} y={ey} open={gripOpen} active={on} />

            {/* Part */}
            <rect
              x={partX - 7}
              y={partY - 7}
              width={14}
              height={14}
              rx="1.5"
              fill={PART}
              stroke="#b45309"
              strokeWidth="1"
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

function Gripper({
  x,
  y,
  open,
  active,
}: {
  x: number;
  y: number;
  open: boolean;
  active: boolean;
}) {
  const spread = open ? 8 : 3;
  const color = active ? ON : IDLE;
  return (
    <g>
      {/* Wrist plate */}
      <rect x={x - 7} y={y - 3} width={14} height={6} fill={color} />
      {/* Prongs */}
      <line
        x1={x - spread}
        y1={y + 3}
        x2={x - spread}
        y2={y + 12}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transition: "all 0.25s" }}
      />
      <line
        x1={x + spread}
        y1={y + 3}
        x2={x + spread}
        y2={y + 12}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transition: "all 0.25s" }}
      />
    </g>
  );
}
