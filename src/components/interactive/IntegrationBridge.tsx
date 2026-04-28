"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const sources = [
  { label: "PLC", y: 70, protocol: "Modbus" },
  { label: "Sensors", y: 200, protocol: "OPC-UA" },
  { label: "SCADA", y: 330, protocol: "Profinet" },
];

const destinations = [
  { label: "Dashboard", y: 70, protocol: "REST" },
  { label: "ERP", y: 200, protocol: "SQL" },
  { label: "Cloud", y: 330, protocol: "MQTT" },
];

const hubX = 200;
const hubY = 200;
const sourceX = 60;
const destX = 340;

export default function IntegrationBridge() {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((a) => !a)}
    >
      <div className="w-full">
        <div className="relative aspect-square">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Paths : source → hub */}
            {sources.map((s, i) => {
              const pathId = `src-${i}`;
              const d = `M ${sourceX + 35},${s.y} Q ${(sourceX + hubX) / 2},${s.y} ${hubX - 35},${hubY}`;
              return (
                <g key={pathId}>
                  <path
                    id={pathId}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray={active ? "0" : "4 3"}
                    className={active ? "text-primary" : "text-neutral-300 dark:text-neutral-700"}
                    style={{ transition: "stroke 0.4s" }}
                  />
                  {active && (
                    <circle r="3" className="text-primary" fill="currentColor">
                      <animateMotion
                        dur={`${1.5 + i * 0.3}s`}
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  )}
                  {/* Protocol label mid-path */}
                  <text
                    x={(sourceX + hubX) / 2}
                    y={s.y - 8}
                    textAnchor="middle"
                    className={active ? "fill-primary" : "fill-neutral-400 dark:fill-neutral-500"}
                    style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 600, transition: "fill 0.4s" }}
                  >
                    {s.protocol}
                  </text>
                </g>
              );
            })}

            {/* Paths : hub → dest */}
            {destinations.map((d, i) => {
              const pathId = `dst-${i}`;
              const pathD = `M ${hubX + 35},${hubY} Q ${(hubX + destX) / 2},${d.y} ${destX - 35},${d.y}`;
              return (
                <g key={pathId}>
                  <path
                    id={pathId}
                    d={pathD}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray={active ? "0" : "4 3"}
                    className={active ? "text-primary" : "text-neutral-300 dark:text-neutral-700"}
                    style={{ transition: "stroke 0.4s" }}
                  />
                  {active && (
                    <circle r="3" className="text-primary" fill="currentColor">
                      <animateMotion
                        dur={`${1.5 + i * 0.3}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.2}s`}
                        path={pathD}
                      />
                    </circle>
                  )}
                  <text
                    x={(hubX + destX) / 2}
                    y={d.y - 8}
                    textAnchor="middle"
                    className={active ? "fill-primary" : "fill-neutral-400 dark:fill-neutral-500"}
                    style={{ fontSize: "9px", fontFamily: "ui-monospace, monospace", fontWeight: 600, transition: "fill 0.4s" }}
                  >
                    {d.protocol}
                  </text>
                </g>
              );
            })}

            {/* Source boxes */}
            {sources.map((s, i) => (
              <g key={`src-box-${i}`}>
                <rect
                  x={sourceX - 35}
                  y={s.y - 20}
                  width="70"
                  height="40"
                  rx="4"
                  fill="currentColor"
                  className="text-neutral-50 dark:text-neutral-800"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <rect
                  x={sourceX - 35}
                  y={s.y - 20}
                  width="70"
                  height="40"
                  rx="4"
                  fill="none"
                  className="text-neutral-300 dark:text-neutral-600"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <text
                  x={sourceX}
                  y={s.y + 4}
                  textAnchor="middle"
                  className="fill-neutral-600 dark:fill-neutral-400"
                  style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}
                >
                  {s.label}
                </text>
              </g>
            ))}

            {/* Destination boxes */}
            {destinations.map((d, i) => (
              <g key={`dst-box-${i}`}>
                <rect
                  x={destX - 35}
                  y={d.y - 20}
                  width="70"
                  height="40"
                  rx="4"
                  fill="currentColor"
                  className="text-neutral-50 dark:text-neutral-800"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <rect
                  x={destX - 35}
                  y={d.y - 20}
                  width="70"
                  height="40"
                  rx="4"
                  fill="none"
                  className="text-neutral-300 dark:text-neutral-600"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <text
                  x={destX}
                  y={d.y + 4}
                  textAnchor="middle"
                  className="fill-neutral-600 dark:fill-neutral-400"
                  style={{ fontSize: "11px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}
                >
                  {d.label}
                </text>
              </g>
            ))}

            {/* Hub */}
            <g>
              <rect
                x={hubX - 45}
                y={hubY - 28}
                width="90"
                height="56"
                rx="6"
                fill="currentColor"
                className={active ? "text-primary" : "text-neutral-200 dark:text-neutral-700"}
                style={{ transition: "fill 0.4s" }}
              />
              {/* Hub corner brackets */}
              <path
                d={`M ${hubX - 45},${hubY - 28 + 6} L ${hubX - 45},${hubY - 28} L ${hubX - 45 + 6},${hubY - 28}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={active ? "text-primary-foreground" : "text-neutral-400 dark:text-neutral-500"}
                style={{ transition: "stroke 0.4s" }}
              />
              <path
                d={`M ${hubX + 45 - 6},${hubY - 28} L ${hubX + 45},${hubY - 28} L ${hubX + 45},${hubY - 28 + 6}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={active ? "text-primary-foreground" : "text-neutral-400 dark:text-neutral-500"}
                style={{ transition: "stroke 0.4s" }}
              />
              <path
                d={`M ${hubX - 45},${hubY + 28 - 6} L ${hubX - 45},${hubY + 28} L ${hubX - 45 + 6},${hubY + 28}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={active ? "text-primary-foreground" : "text-neutral-400 dark:text-neutral-500"}
                style={{ transition: "stroke 0.4s" }}
              />
              <path
                d={`M ${hubX + 45 - 6},${hubY + 28} L ${hubX + 45},${hubY + 28} L ${hubX + 45},${hubY + 28 - 6}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={active ? "text-primary-foreground" : "text-neutral-400 dark:text-neutral-500"}
                style={{ transition: "stroke 0.4s" }}
              />
              <text
                x={hubX}
                y={hubY - 2}
                textAnchor="middle"
                className={active ? "fill-primary-foreground" : "fill-neutral-500 dark:fill-neutral-400"}
                style={{ fontSize: "10px", fontFamily: "ui-monospace, monospace", fontWeight: 700, letterSpacing: "0.1em", transition: "fill 0.4s" }}
              >
                LAGRANGE
              </text>
              <text
                x={hubX}
                y={hubY + 12}
                textAnchor="middle"
                className={active ? "fill-primary-foreground" : "fill-neutral-400 dark:fill-neutral-500"}
                style={{ fontSize: "8px", fontFamily: "ui-monospace, monospace", fontWeight: 500, letterSpacing: "0.15em", transition: "fill 0.4s" }}
              >
                BRIDGE
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Touch play overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{ opacity: !active ? 1 : 0, pointerEvents: !active ? "auto" : "none" }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
