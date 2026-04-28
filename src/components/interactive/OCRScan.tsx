"use client";

import { useState, useMemo } from "react";
import { Play } from "lucide-react";

const extractedFields = [
  { label: "Invoice", value: "INV-00482", color: "#3b82f6" },
  { label: "Date", value: "2026-03-15", color: "#22c55e" },
  { label: "Vendor", value: "Acme Corp.", color: "#8b5cf6" },
  { label: "Batch", value: "LOT-2026-04-A12", color: "#06b6d4" },
  { label: "Serial", value: "SN 8472-0031", color: "#ec4899" },
  { label: "Total", value: "$4,280.00", color: "#f59e0b" },
];

interface DocRow {
  y: number;
  bars: { x: number; w: number; h: number; bold?: boolean; fieldIndex?: number }[];
}

const docRows: DocRow[] = [
  { y: 6, bars: [{ x: 8, w: 30, h: 2.5, bold: true, fieldIndex: 0 }] },
  { y: 11, bars: [{ x: 8, w: 24, h: 1.5 }] },
  { y: 15, bars: [{ x: 8, w: 28, h: 1.5, fieldIndex: 1 }] },
  { y: 22, bars: [{ x: 8, w: 22, h: 1.5, bold: true, fieldIndex: 2 }] },
  { y: 26, bars: [{ x: 8, w: 36, h: 1 }] },
  { y: 29, bars: [{ x: 8, w: 30, h: 1 }] },
  { y: 41, bars: [{ x: 8, w: 32, h: 1, bold: true }, { x: 62, w: 10, h: 1, bold: true }, { x: 76, w: 16, h: 1, bold: true }] },
  { y: 47, bars: [{ x: 8, w: 26, h: 1 }, { x: 62, w: 10, h: 1 }, { x: 76, w: 14, h: 1 }] },
  { y: 52, bars: [{ x: 8, w: 20, h: 1 }, { x: 62, w: 10, h: 1 }, { x: 76, w: 14, h: 1 }] },
  { y: 57, bars: [{ x: 8, w: 24, h: 1 }, { x: 62, w: 10, h: 1 }, { x: 76, w: 14, h: 1 }] },
  { y: 70, bars: [{ x: 60, w: 14, h: 1.5, bold: true, fieldIndex: 5 }, { x: 78, w: 14, h: 1.5, bold: true, fieldIndex: 5 }] },
];

// QR code: 21x21 (Version 1) with three finder patterns + alignment + timing
const QR_SIZE = 21;
const qrCode: boolean[] = (() => {
  const cells: boolean[] = new Array(QR_SIZE * QR_SIZE).fill(false);
  const set = (r: number, c: number, v: boolean) => {
    if (r >= 0 && r < QR_SIZE && c >= 0 && c < QR_SIZE) cells[r * QR_SIZE + c] = v;
  };
  const isReserved = (r: number, c: number) => {
    // Three finder patterns + 1px white separator around them
    const inFinder = (fr: number, fc: number) =>
      r >= fr - 1 && r <= fr + 7 && c >= fc - 1 && c <= fc + 7;
    if (inFinder(0, 0) || inFinder(0, QR_SIZE - 7) || inFinder(QR_SIZE - 7, 0)) return true;
    // Timing patterns
    if (r === 6 || c === 6) return true;
    return false;
  };

  // Finder pattern: 7x7 with concentric squares (solid, white, solid)
  const drawFinder = (fr: number, fc: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const onOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const onInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        set(fr + r, fc + c, onOuter || onInner);
      }
    }
  };
  drawFinder(0, 0);
  drawFinder(0, QR_SIZE - 7);
  drawFinder(QR_SIZE - 7, 0);

  // Timing patterns: alternating cells along row 6 and column 6
  for (let i = 8; i < QR_SIZE - 8; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }

  // Data fill: deterministic pseudo-random for unreserved cells
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let r = 0; r < QR_SIZE; r++) {
    for (let c = 0; c < QR_SIZE; c++) {
      if (!isReserved(r, c)) set(r, c, rand() > 0.5);
    }
  }

  return cells;
})();

// 1D barcode: alternating bar widths
const barcodeBars: { x: number; w: number }[] = (() => {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  let seed = 7;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  while (x < 100) {
    const w = 1 + Math.floor(rand() * 3);
    bars.push({ x, w });
    x += w + 1 + Math.floor(rand() * 2);
  }
  return bars;
})();

// Position of the codes within the document (in % of doc rect)
const QR_POS = { x: 70, y: 6, w: 22, h: 22 };
const BC_POS = { x: 8, y: 80, w: 40, h: 9 };

// fieldIndex 3 = Batch (QR code), fieldIndex 4 = Serial (Barcode)
const codeHighlights = [
  { fieldIndex: 3, ...QR_POS },
  { fieldIndex: 4, ...BC_POS },
];

function getFieldHighlights() {
  const fieldBounds: Record<number, { minX: number; minY: number; maxX: number; maxY: number }> = {};

  for (const row of docRows) {
    for (const bar of row.bars) {
      if (bar.fieldIndex === undefined) continue;
      const idx = bar.fieldIndex;
      const bounds = fieldBounds[idx] || { minX: 100, minY: 100, maxX: 0, maxY: 0 };
      bounds.minX = Math.min(bounds.minX, bar.x);
      bounds.minY = Math.min(bounds.minY, row.y);
      bounds.maxX = Math.max(bounds.maxX, bar.x + bar.w);
      bounds.maxY = Math.max(bounds.maxY, row.y + bar.h);
      fieldBounds[idx] = bounds;
    }
  }

  for (const c of codeHighlights) {
    fieldBounds[c.fieldIndex] = {
      minX: c.x,
      minY: c.y,
      maxX: c.x + c.w,
      maxY: c.y + c.h,
    };
  }

  return extractedFields.map((field, i) => {
    const b = fieldBounds[i];
    if (!b) return null;
    const pad = 1.5;
    return {
      ...field,
      x: b.minX - pad,
      y: b.minY - pad,
      w: b.maxX - b.minX + pad * 2,
      h: b.maxY - b.minY + pad * 2,
    };
  }).filter(Boolean);
}

export default function OCRScan() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "extracted">("idle");
  const highlights = useMemo(() => getFieldHighlights(), []);

  const handleHover = () => {
    if (phase !== "idle") return;
    setPhase("scanning");
    setTimeout(() => setPhase("extracted"), 1400);
  };

  const handleLeave = () => {
    setPhase("idle");
  };

  const handleTap = () => {
    if (phase === "idle") {
      setPhase("scanning");
      setTimeout(() => setPhase("extracted"), 1400);
    } else if (phase === "extracted") {
      setPhase("idle");
    }
  };

  return (
    <div
      className="relative w-full aspect-square select-none"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleTap}
    >
      {/* Document */}
      <div className="absolute inset-[15%] rounded-lg bg-white dark:bg-neutral-800 shadow-lg dark:shadow-neutral-900/50 border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Render all bars from docRows */}
        {docRows.map((row, ri) =>
          row.bars.map((bar, bi) => (
            <div
              key={`${ri}-${bi}`}
              className={`absolute rounded-sm ${bar.bold ? "bg-neutral-300 dark:bg-neutral-600" : "bg-neutral-200 dark:bg-neutral-700"}`}
              style={{
                left: `${bar.x}%`,
                top: `${row.y}%`,
                width: `${bar.w}%`,
                height: `${bar.h}%`,
              }}
            />
          ))
        )}

        {/* QR code */}
        <div
          className="absolute grid bg-white dark:bg-neutral-800 p-[3%]"
          style={{
            left: `${QR_POS.x}%`,
            top: `${QR_POS.y}%`,
            width: `${QR_POS.w}%`,
            height: `${QR_POS.h}%`,
            gridTemplateColumns: `repeat(${QR_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${QR_SIZE}, 1fr)`,
          }}
        >
          {qrCode.map((on, i) => (
            <div
              key={i}
              className={on ? "bg-neutral-900 dark:bg-neutral-100" : "bg-transparent"}
            />
          ))}
        </div>

        {/* 1D Barcode */}
        <div
          className="absolute"
          style={{
            left: `${BC_POS.x}%`,
            top: `${BC_POS.y}%`,
            width: `${BC_POS.w}%`,
            height: `${BC_POS.h}%`,
          }}
        >
          {barcodeBars.map((b, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-[28%] bg-neutral-800 dark:bg-neutral-200"
              style={{ left: `${b.x}%`, width: `${b.w}%` }}
            />
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-[22%] flex items-center justify-center">
            <div className="font-mono text-[6px] sm:text-[7px] text-neutral-700 dark:text-neutral-300 tracking-[0.2em]">
              847200310026
            </div>
          </div>
        </div>

        {/* Separator lines */}
        <div className="absolute left-[8%] right-[8%] top-[33%] border-t border-neutral-100 dark:border-neutral-700/40" />
        <div className="absolute left-[8%] right-[8%] top-[39%] border-t border-neutral-100 dark:border-neutral-700/40" />
        <div className="absolute left-[8%] right-[8%] top-[63%] border-t border-neutral-100 dark:border-neutral-700/40" />
      </div>

      {/* Scan line */}
      {phase === "scanning" && (
        <>
          <div
            className="absolute left-[15%] right-[15%] h-[2px] pointer-events-none z-10 animate-[ocrScan_1.4s_ease-in-out_forwards]"
            style={{ background: "linear-gradient(to right, transparent, #3b82f6, transparent)" }}
          />
          <div
            className="absolute left-[15%] right-[15%] h-8 pointer-events-none z-10 animate-[ocrScan_1.4s_ease-in-out_forwards]"
            style={{ background: "linear-gradient(to bottom, rgb(59 130 246 / 0.1), transparent)" }}
          />
          <style>{`
            @keyframes ocrScan {
              0% { top: 15%; opacity: 1; }
              50% { opacity: 0.8; }
              80% { opacity: 0.4; }
              100% { top: 85%; opacity: 0; }
            }
          `}</style>
        </>
      )}

      {/* Extraction highlights */}
      <div className="absolute inset-[15%]">
        {highlights.map((field, i) => (
          field && (
            <div
              key={field.label}
              className="absolute pointer-events-none"
              style={{
                left: `${field.x}%`,
                top: `${field.y}%`,
                width: `${field.w}%`,
                height: `${field.h}%`,
                opacity: phase === "extracted" ? 1 : 0,
                transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: phase === "extracted" ? `${i * 100}ms` : "0ms",
              }}
            >
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  backgroundColor: `${field.color}15`,
                  border: `1.5px solid ${field.color}`,
                }}
              />
              <div
                className="absolute -top-5 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap"
                style={{ backgroundColor: field.color, color: "#fff" }}
              >
                <span className="text-[8px] font-mono opacity-70">{field.label}:</span>
                <span className="text-[9px] font-mono font-semibold">{field.value}</span>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Viewfinder corners (idle) */}
      <div
        className="absolute inset-[14%] transition-opacity duration-500 pointer-events-none"
        style={{ opacity: phase === "idle" ? 0.5 : 0 }}
      >
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-neutral-400 dark:border-neutral-500 rounded-tl-sm" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-neutral-400 dark:border-neutral-500 rounded-tr-sm" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-neutral-400 dark:border-neutral-500 rounded-bl-sm" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-neutral-400 dark:border-neutral-500 rounded-br-sm" />
      </div>

      {/* Play button - visible on all non-hover devices */}
      <div
        className="absolute inset-[15%] flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{ opacity: phase === "idle" ? 1 : 0, pointerEvents: phase === "idle" ? "auto" : "none" }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-neutral-900/20 dark:hover:bg-white/20 transition-colors">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>

      {/* Status indicator - just below document */}
      <div className="absolute bottom-[10%] left-[15%] right-[15%] flex items-center justify-end gap-1.5 pointer-events-none">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor:
              phase === "extracted" ? "#22c55e" : phase === "scanning" ? "#3b82f6" : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {phase === "extracted"
            ? `${extractedFields.length} fields extracted`
            : phase === "scanning"
            ? "Reading document..."
            : "Tap to extract"}
        </span>
      </div>
    </div>
  );
}
