"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Check, X } from "lucide-react";

const SCENARIO_LEN = 4500;
const SCENARIOS = 3;
const CYCLE = SCENARIO_LEN * SCENARIOS;

// Phase boundaries within a single scenario
const FADE_IN_END = 500;
const SCAN_END = 1500;
const ANNOT_END = 2800;
const VERDICT_END = 3500;

function ease(t: number) {
  const k = Math.max(0, Math.min(1, t));
  return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
}

interface DefectMark {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color: string;
  appearAt: number; // ms within annotation phase
}

const SCRATCH_DEFECTS: DefectMark[] = [
  { x: 32, y: 38.5, w: 14, h: 6, label: "scratch 0.91", color: "#ef4444", appearAt: 0 },
  { x: 58, y: 53, w: 10, h: 5, label: "scratch 0.84", color: "#ef4444", appearAt: 350 },
];

interface PCBSlot {
  id: string;
  x: number;
  y: number;
  populated: boolean;
}

const PCB_SLOTS: PCBSlot[] = [
  { id: "C1", x: 30, y: 38, populated: true },
  { id: "C2", x: 50, y: 38, populated: false },
  { id: "C3", x: 70, y: 38, populated: true },
  { id: "C4", x: 30, y: 60, populated: true },
  { id: "C5", x: 50, y: 60, populated: true },
  { id: "C6", x: 70, y: 60, populated: true },
];

interface DimMark {
  axis: "horiz" | "vert";
  // Position of dimension line in % of frame
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  appearAt: number;
}

const DIMS: DimMark[] = [
  { axis: "horiz", x1: 25, y1: 70, x2: 75, y2: 70, label: "124.2 mm",      appearAt: 0 },
  { axis: "vert",  x1: 80, y1: 35, x2: 80, y2: 65, label: "48.0 mm",       appearAt: 350 },
  { axis: "horiz", x1: 42, y1: 50, x2: 58, y2: 50, label: "⌀ 12.05 mm",    appearAt: 700 },
];

export default function DefectInspection() {
  const [phase, setPhase] = useState<"idle" | "running">("idle");
  const [t, setT] = useState(0);
  const [stats, setStats] = useState({ inspected: 0, pass: 0, fail: 0 });
  const lastScenarioRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (phase !== "running") {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const start = performance.now();
    const loop = (now: number) => {
      setT((now - start) % CYCLE);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Reset stats when starting fresh
  useEffect(() => {
    if (phase === "idle") {
      setStats({ inspected: 0, pass: 0, fail: 0 });
      lastScenarioRef.current = -1;
    }
  }, [phase]);

  const scenarioIdx = Math.floor(t / SCENARIO_LEN);
  const localT = t - scenarioIdx * SCENARIO_LEN;

  // Tally on scenario change
  useEffect(() => {
    if (phase !== "running") return;
    if (lastScenarioRef.current === scenarioIdx) return;
    if (lastScenarioRef.current !== -1) {
      // Previous scenario completed
      const prev = lastScenarioRef.current;
      const wasPass = prev === 2;
      setStats((s) => ({
        inspected: s.inspected + 1,
        pass: s.pass + (wasPass ? 1 : 0),
        fail: s.fail + (wasPass ? 0 : 1),
      }));
    }
    lastScenarioRef.current = scenarioIdx;
  }, [scenarioIdx, phase]);

  const showWorkpiece = localT > 0 && localT < SCENARIO_LEN - 200;
  const workpieceOpacity = (() => {
    if (localT < FADE_IN_END) return ease(localT / FADE_IN_END);
    if (localT > SCENARIO_LEN - 600) return ease((SCENARIO_LEN - localT) / 600);
    return 1;
  })();

  const scanProgress =
    localT >= FADE_IN_END && localT < SCAN_END
      ? (localT - FADE_IN_END) / (SCAN_END - FADE_IN_END)
      : localT >= SCAN_END
      ? 1
      : 0;
  const scanActive = localT >= FADE_IN_END && localT < SCAN_END;

  const annotT = Math.max(0, localT - SCAN_END); // time into annotation phase
  const showAnnots = localT >= SCAN_END;
  const showVerdict = localT >= ANNOT_END && localT < SCENARIO_LEN - 200;

  const verdict = scenarioIdx === 2 ? "PASS" : "FAIL";
  const verdictColor = verdict === "PASS" ? "#22c55e" : "#ef4444";
  const verdictReason =
    scenarioIdx === 0
      ? "2 surface defects"
      : scenarioIdx === 1
      ? "missing component (C2)"
      : "all dims in tolerance";

  // Status indicator color
  let statusDotColor = "#a3a3a3";
  if (phase === "running") {
    if (showVerdict) statusDotColor = verdictColor;
    else if (scanActive) statusDotColor = "#3b82f6";
    else statusDotColor = "#a3a3a3";
  }

  let status = "Tap to start";
  if (phase === "running") {
    if (localT < FADE_IN_END) status = "Loading workpiece";
    else if (scanActive) status = "Scanning…";
    else if (showAnnots && !showVerdict) status = "Analyzing";
    else if (showVerdict) status = `${verdict} · ${verdictReason}`;
    else status = "";
  }

  return (
    <div
      className="relative w-full aspect-square select-none cursor-pointer"
      onClick={() => setPhase((p) => (p === "idle" ? "running" : "idle"))}
      onMouseEnter={() => setPhase("running")}
      onMouseLeave={() => setPhase("idle")}
    >
      {/* Camera frame */}
      <div className="absolute inset-[5%] rounded-md border border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="absolute top-1.5 left-2 font-mono text-[8px] text-neutral-400 dark:text-neutral-600">
          CAM_02 · INSPECTION
        </div>
        <div className="absolute top-1.5 right-2 font-mono text-[8px] text-neutral-400 dark:text-neutral-600 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
          REC
        </div>
        <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-neutral-400/40 dark:border-neutral-500/40" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-neutral-400/40 dark:border-neutral-500/40" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-neutral-400/40 dark:border-neutral-500/40" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-neutral-400/40 dark:border-neutral-500/40" />
      </div>

      {/* Inspection stage (interior of camera frame) */}
      <div
        className="absolute inset-[5%] overflow-hidden"
        style={{ opacity: phase === "running" && showWorkpiece ? workpieceOpacity : 0 }}
      >
        {/* Scenario 0: Metal plate with scratches */}
        {scenarioIdx === 0 && (
          <>
            <div
              className="absolute rounded-sm shadow-md"
              style={{
                left: "20%",
                top: "30%",
                width: "60%",
                height: "40%",
                background:
                  "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 50%, #d1d5db 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
            {/* Visible scratch lines (rendered with the workpiece) */}
            <div
              className="absolute"
              style={{
                left: "33%",
                top: "40%",
                width: "12%",
                height: "1px",
                background: "rgba(40,40,40,0.6)",
                transform: "rotate(15deg)",
                transformOrigin: "left center",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "59%",
                top: "57%",
                width: "8%",
                height: "1px",
                background: "rgba(40,40,40,0.55)",
                transform: "rotate(-22deg)",
                transformOrigin: "left center",
              }}
            />
            {/* Defect bboxes */}
            {showAnnots &&
              SCRATCH_DEFECTS.map((d, i) => {
                const visible = annotT >= d.appearAt;
                return (
                  <div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${d.x}%`,
                      top: `${d.y}%`,
                      width: `${d.w}%`,
                      height: `${d.h}%`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.85)",
                      transition: "all 200ms ease-out",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-sm"
                      style={{
                        border: `1.5px solid ${d.color}`,
                        backgroundColor: `${d.color}20`,
                      }}
                    />
                    <div
                      className="absolute -top-4 left-0 px-1 py-[1px] rounded-sm font-mono text-[8px] text-white whitespace-nowrap"
                      style={{ backgroundColor: d.color }}
                    >
                      {d.label}
                    </div>
                  </div>
                );
              })}
          </>
        )}

        {/* Scenario 1: PCB with missing component */}
        {scenarioIdx === 1 && (
          <>
            <div
              className="absolute rounded-sm"
              style={{
                left: "17%",
                top: "25%",
                width: "66%",
                height: "55%",
                background:
                  "linear-gradient(180deg, #14532d 0%, #15803d 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {/* Trace lines */}
              <div className="absolute left-[10%] right-[10%] top-[48%] h-[1px] bg-yellow-600/40" />
              <div className="absolute left-[10%] right-[10%] top-[52%] h-[1px] bg-yellow-600/40" />
              <div className="absolute left-[15%] top-[20%] bottom-[20%] w-[1px] bg-yellow-600/40" />
              <div className="absolute right-[15%] top-[20%] bottom-[20%] w-[1px] bg-yellow-600/40" />
            </div>
            {/* Slots */}
            {PCB_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="absolute rounded-sm"
                style={{
                  left: `${slot.x - 5}%`,
                  top: `${slot.y - 4}%`,
                  width: "10%",
                  height: "8%",
                  background: slot.populated
                    ? "linear-gradient(180deg, #1f2937, #111827)"
                    : "transparent",
                  border: slot.populated
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px dashed rgba(0,0,0,0.4)",
                  boxShadow: slot.populated ? "0 1px 1px rgba(0,0,0,0.4)" : "none",
                }}
              />
            ))}
            {/* Annotations */}
            {showAnnots &&
              PCB_SLOTS.map((slot, i) => {
                const visible = annotT >= i * 150;
                const isMissing = !slot.populated;
                const color = isMissing ? "#ef4444" : "#22c55e";
                return (
                  <div
                    key={`ann-${slot.id}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${slot.x - 5}%`,
                      top: `${slot.y - 4}%`,
                      width: "10%",
                      height: "8%",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0.7)",
                      transition: "all 180ms ease-out",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-sm"
                      style={{
                        border: `1.5px solid ${color}`,
                        backgroundColor: `${color}25`,
                      }}
                    />
                    <div
                      className="absolute -top-4 left-0 px-1 py-[1px] rounded-sm font-mono text-[7px] text-white whitespace-nowrap flex items-center gap-0.5"
                      style={{ backgroundColor: color }}
                    >
                      {isMissing ? (
                        <>
                          <X className="w-2 h-2" /> {slot.id} MISSING
                        </>
                      ) : (
                        <>
                          <Check className="w-2 h-2" /> {slot.id}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </>
        )}

        {/* Scenario 2: Dimensional check */}
        {scenarioIdx === 2 && (
          <>
            {/* Mechanical part - L-shape */}
            <div
              className="absolute"
              style={{
                left: "25%",
                top: "35%",
                width: "50%",
                height: "30%",
              }}
            >
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #71717a 0%, #52525b 50%, #3f3f46 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.3)",
                }}
              />
              {/* Center hole */}
              <div
                className="absolute rounded-full"
                style={{
                  left: "44%",
                  top: "30%",
                  width: "12%",
                  height: "40%",
                  background: "radial-gradient(ellipse, #18181b 50%, #27272a)",
                  boxShadow: "inset 0 1px 1px rgba(0,0,0,0.6)",
                }}
              />
            </div>

            {/* Dimension annotations */}
            {showAnnots &&
              DIMS.map((d, i) => {
                const visible = annotT >= d.appearAt;
                const opacity = visible ? 1 : 0;
                if (d.axis === "horiz") {
                  return (
                    <div
                      key={i}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${d.x1}%`,
                        top: `${d.y1}%`,
                        width: `${d.x2 - d.x1}%`,
                        height: 0,
                        opacity,
                        transition: "opacity 200ms ease-out",
                      }}
                    >
                      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-emerald-500" />
                      <div className="absolute left-0 top-[-5px] w-[1.5px] h-[10px] bg-emerald-500" />
                      <div className="absolute right-0 top-[-5px] w-[1.5px] h-[10px] bg-emerald-500" />
                      <div className="absolute left-1/2 -translate-x-1/2 -top-5 px-1 py-[1px] rounded-sm font-mono text-[8px] text-white bg-emerald-500 whitespace-nowrap flex items-center gap-1">
                        <Check className="w-2 h-2" /> {d.label}
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${d.x1}%`,
                      top: `${d.y1}%`,
                      width: 0,
                      height: `${d.y2 - d.y1}%`,
                      opacity,
                      transition: "opacity 200ms ease-out",
                    }}
                  >
                    <div className="absolute inset-y-0 left-0 w-[1.5px] bg-emerald-500" />
                    <div className="absolute top-0 left-[-5px] h-[1.5px] w-[10px] bg-emerald-500" />
                    <div className="absolute bottom-0 left-[-5px] h-[1.5px] w-[10px] bg-emerald-500" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 px-1 py-[1px] rounded-sm font-mono text-[8px] text-white bg-emerald-500 whitespace-nowrap flex items-center gap-1">
                      <Check className="w-2 h-2" /> {d.label}
                    </div>
                  </div>
                );
              })}
          </>
        )}

        {/* Scan line */}
        {scanActive && (
          <>
            <div
              className="absolute left-[5%] right-[5%] h-[2px] pointer-events-none z-10"
              style={{
                top: `${5 + scanProgress * 90}%`,
                background: "linear-gradient(to right, transparent, #3b82f6, transparent)",
              }}
            />
            <div
              className="absolute left-[5%] right-[5%] h-12 pointer-events-none z-10"
              style={{
                top: `${5 + scanProgress * 90}%`,
                background:
                  "linear-gradient(to bottom, rgba(59,130,246,0.12), transparent)",
                transform: "translateY(-100%)",
              }}
            />
          </>
        )}

        {/* Verdict banner */}
        {showVerdict && (
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ bottom: "8%" }}
          >
            <div
              className="px-3 py-1 rounded-md font-mono text-[10px] sm:text-[11px] font-bold text-white tracking-wider flex items-center gap-1.5"
              style={{
                backgroundColor: verdictColor,
                opacity: localT > ANNOT_END + 100 ? 1 : 0,
                transform: localT > ANNOT_END + 100 ? "scale(1)" : "scale(0.85)",
                transformOrigin: "center",
                transition: "all 220ms ease-out",
                boxShadow: `0 0 0 4px ${verdictColor}25`,
              }}
            >
              {verdict === "PASS" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              {verdict}
            </div>
          </div>
        )}
      </div>

      {/* Idle play button */}
      {phase === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
          </div>
        </div>
      )}

      {/* Status row */}
      <div className="absolute bottom-[1.5%] left-[6%] right-[6%] flex items-center justify-between gap-1.5 pointer-events-none">
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {phase === "running"
            ? `Inspected ${stats.inspected} · Pass ${stats.pass} · Fail ${stats.fail}`
            : ""}
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
            style={{ backgroundColor: statusDotColor }}
          />
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
