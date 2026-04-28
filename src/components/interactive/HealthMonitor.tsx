"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const ON = "#16a34a";
const IDLE = "#9ca3af";
const WARN = "#f59e0b";
const DANGER = "#dc2626";
const STRUCT = "#525252";

const CURRENT_DAY = 46;
const MAX_DAY = 60;
const THRESHOLD = 7.5;

const trend = (d: number) => 1.2 + 0.04 * d + 0.0015 * d * d;
const noisy = (d: number) =>
  trend(d) + Math.sin(d * 1.7) * 0.15 + Math.sin(d * 3.1) * 0.1;

const history: { d: number; v: number }[] = [];
for (let d = 0; d <= CURRENT_DAY; d++) history.push({ d, v: noisy(d) });

const forecast: { d: number; v: number }[] = [];
for (let d = CURRENT_DAY; d <= MAX_DAY; d++) forecast.push({ d, v: trend(d) });

let failureDay = MAX_DAY;
for (let d = CURRENT_DAY; d <= MAX_DAY; d++) {
  if (trend(d) >= THRESHOLD) {
    failureDay = d;
    break;
  }
}

const XL = 60;
const XR = 365;
const YT = 130;
const YB = 280;

const xFor = (d: number) => XL + (d / MAX_DAY) * (XR - XL);
const yFor = (v: number) => YB - (v / 10) * (YB - YT);

const historyPath = history
  .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.d).toFixed(2)},${yFor(p.v).toFixed(2)}`)
  .join(" ");

const forecastPath = forecast
  .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.d).toFixed(2)},${yFor(p.v).toFixed(2)}`)
  .join(" ");

const currentV = history[CURRENT_DAY].v;
const rul = Math.max(0, failureDay - CURRENT_DAY);
const health = Math.max(0, Math.min(100, Math.round((1 - currentV / 10) * 100)));
const healthColor = health > 70 ? ON : health > 40 ? WARN : DANGER;

export default function HealthMonitor() {
  const [on, setOn] = useState(false);
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState(0);
  const tRef = useRef<NodeJS.Timeout[]>([]);
  const rafRef = useRef<number | null>(null);

  const clear = () => {
    tRef.current.forEach(clearTimeout);
    tRef.current = [];
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const activate = () => {
    clear();
    setOn(true);
    setStage(0);
    tRef.current.push(setTimeout(() => setStage(1), 150));
    tRef.current.push(setTimeout(() => setStage(2), 1500));
    tRef.current.push(setTimeout(() => setStage(3), 1900));
    tRef.current.push(setTimeout(() => setStage(4), 3100));
  };

  const deactivate = () => {
    clear();
    setOn(false);
    setStage(0);
  };

  useEffect(() => {
    if (!on) return;
    const start = performance.now();
    const tick = (now: number) => {
      setPhase(((now - start) / 1000) * 4);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [on]);

  useEffect(() => () => clear(), []);

  const amp = on ? (currentV / 10) * 14 : 1;
  const wx0 = 160;
  const wx1 = 345;
  const wy = 62;
  const steps = 40;
  const wavePoints: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = wx0 + (i / steps) * (wx1 - wx0);
    const y =
      wy +
      Math.sin(i * 0.42 + phase) * amp +
      Math.sin(i * 0.95 + phase * 1.3) * amp * 0.35;
    wavePoints.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`);
  }

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
            {/* Motor icon */}
            <g>
              {/* Body */}
              <rect
                x={55}
                y={45}
                width={55}
                height={36}
                rx="3"
                fill="none"
                stroke={STRUCT}
                strokeWidth="1.5"
              />
              {/* Fins */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1={64 + i * 10}
                  y1={45}
                  x2={64 + i * 10}
                  y2={81}
                  stroke={STRUCT}
                  strokeWidth="0.6"
                />
              ))}
              {/* Shaft */}
              <rect
                x={110}
                y={58}
                width={14}
                height={10}
                fill={STRUCT}
                opacity="0.6"
              />
              {/* Mount */}
              <rect
                x={50}
                y={81}
                width={65}
                height={4}
                fill={STRUCT}
                opacity="0.4"
              />
              {/* Sensor */}
              <circle
                cx={82}
                cy={43}
                r="3"
                fill={on ? ON : IDLE}
                style={{ transition: "fill 0.3s" }}
              />
              {on && (
                <circle cx={82} cy={43} r="3" fill={ON} opacity="0.3">
                  <animate
                    attributeName="r"
                    values="3;7;3"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <text
                x={82}
                y={97}
                textAnchor="middle"
                className="fill-neutral-500 dark:fill-neutral-400"
                style={{
                  fontSize: "6.5px",
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.1em",
                }}
              >
                ACCEL
              </text>
            </g>

            {/* Waveform panel */}
            <rect
              x={140}
              y={35}
              width={220}
              height={60}
              rx="2"
              fill="none"
              className="stroke-neutral-200 dark:stroke-neutral-700"
              strokeWidth="0.5"
            />
            <text
              x={148}
              y={46}
              className="fill-neutral-400 dark:fill-neutral-500"
              style={{
                fontSize: "7px",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: "0.08em",
              }}
            >
              LIVE · {currentV.toFixed(2)} mm/s
            </text>
            <line
              x1={wx0}
              y1={wy}
              x2={wx1}
              y2={wy}
              className="stroke-neutral-200 dark:stroke-neutral-700"
              strokeWidth="0.4"
              strokeDasharray="2 2"
            />
            <path
              d={wavePoints.join(" ")}
              fill="none"
              stroke={on ? (currentV >= THRESHOLD ? DANGER : WARN) : IDLE}
              strokeWidth="1.2"
              style={{ transition: "stroke 0.3s" }}
            />

            {/* ----- Chart ----- */}
            <text
              x={XL}
              y={YT - 8}
              className="fill-neutral-500 dark:fill-neutral-400"
              style={{
                fontSize: "8px",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              VIBRATION RMS (mm/s)
            </text>
            <text
              x={XR}
              y={YT - 8}
              textAnchor="end"
              className="fill-neutral-400 dark:fill-neutral-500"
              style={{
                fontSize: "7px",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              60-day window
            </text>

            {/* Y grid */}
            {[0, 2.5, 5, 7.5, 10].map((v) => (
              <g key={v}>
                <line
                  x1={XL}
                  y1={yFor(v)}
                  x2={XR}
                  y2={yFor(v)}
                  className="stroke-neutral-200 dark:stroke-neutral-800"
                  strokeWidth="0.5"
                />
                <text
                  x={XL - 5}
                  y={yFor(v) + 3}
                  textAnchor="end"
                  className="fill-neutral-400 dark:fill-neutral-500"
                  style={{
                    fontSize: "6.5px",
                    fontFamily: "ui-monospace, monospace",
                  }}
                >
                  {v}
                </text>
              </g>
            ))}

            {/* X axis + labels */}
            <line
              x1={XL}
              y1={YB}
              x2={XR}
              y2={YB}
              stroke={STRUCT}
              strokeWidth="0.8"
            />
            {[0, 15, 30, 45, 60].map((d) => (
              <g key={d}>
                <line
                  x1={xFor(d)}
                  y1={YB}
                  x2={xFor(d)}
                  y2={YB + 3}
                  stroke={STRUCT}
                  strokeWidth="0.6"
                />
                <text
                  x={xFor(d)}
                  y={YB + 12}
                  textAnchor="middle"
                  className="fill-neutral-400 dark:fill-neutral-500"
                  style={{
                    fontSize: "6.5px",
                    fontFamily: "ui-monospace, monospace",
                  }}
                >
                  d{d}
                </text>
              </g>
            ))}

            {/* Threshold line */}
            <g
              style={{
                opacity: stage >= 2 ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <line
                x1={XL}
                y1={yFor(THRESHOLD)}
                x2={XR}
                y2={yFor(THRESHOLD)}
                stroke={DANGER}
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x={XR - 4}
                y={yFor(THRESHOLD) - 4}
                textAnchor="end"
                fill={DANGER}
                style={{
                  fontSize: "7px",
                  fontFamily: "ui-monospace, monospace",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                ALARM {THRESHOLD}
              </text>
            </g>

            {/* History line (animates draw) */}
            <path
              d={historyPath}
              fill="none"
              stroke={ON}
              strokeWidth="1.5"
              pathLength="1"
              strokeDasharray="1 1"
              strokeDashoffset={stage >= 1 ? 0 : 1}
              style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
            />

            {/* Forecast line */}
            <path
              d={forecastPath}
              fill="none"
              stroke={WARN}
              strokeWidth="1.2"
              strokeDasharray="4 3"
              style={{
                opacity: stage >= 3 ? 1 : 0,
                transition: "opacity 0.8s ease-out",
              }}
            />

            {/* Current day marker */}
            {on && stage >= 1 && (
              <g>
                <line
                  x1={xFor(CURRENT_DAY)}
                  y1={yFor(currentV)}
                  x2={xFor(CURRENT_DAY)}
                  y2={YB}
                  stroke={STRUCT}
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />
                <circle
                  cx={xFor(CURRENT_DAY)}
                  cy={yFor(currentV)}
                  r="3.5"
                  fill={ON}
                />
                <circle
                  cx={xFor(CURRENT_DAY)}
                  cy={yFor(currentV)}
                  r="3.5"
                  fill={ON}
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="3.5;8;3.5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x={xFor(CURRENT_DAY)}
                  y={YB + 22}
                  textAnchor="middle"
                  fill={ON}
                  style={{
                    fontSize: "6.5px",
                    fontFamily: "ui-monospace, monospace",
                    fontWeight: 700,
                  }}
                >
                  NOW
                </text>
              </g>
            )}

            {/* Predicted failure marker */}
            <g
              style={{
                opacity: stage >= 4 ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <line
                x1={xFor(failureDay)}
                y1={yFor(THRESHOLD)}
                x2={xFor(failureDay)}
                y2={YB}
                stroke={DANGER}
                strokeWidth="0.8"
                strokeDasharray="3 2"
              />
              <polygon
                points={`${xFor(failureDay)},${yFor(THRESHOLD) - 5} ${
                  xFor(failureDay) + 4
                },${yFor(THRESHOLD)} ${xFor(failureDay)},${yFor(THRESHOLD) + 5} ${
                  xFor(failureDay) - 4
                },${yFor(THRESHOLD)}`}
                fill={DANGER}
              />
              <rect
                x={xFor(failureDay) - 32}
                y={yFor(THRESHOLD) - 30}
                width={64}
                height={18}
                rx="2"
                fill={DANGER}
                opacity="0.95"
              />
              <text
                x={xFor(failureDay)}
                y={yFor(THRESHOLD) - 18}
                textAnchor="middle"
                fill="#ffffff"
                style={{
                  fontSize: "7px",
                  fontFamily: "ui-monospace, monospace",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                FAIL d{failureDay}
              </text>
            </g>

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
