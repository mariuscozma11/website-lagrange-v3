"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// Each field's position is hand-mapped to a specific gray bar below
// All coordinates are % within the document container
const extractedFields = [
  { label: "Invoice", value: "INV-00482", color: "#3b82f6" },
  { label: "Date", value: "2026-03-15", color: "#22c55e" },
  { label: "Vendor", value: "Acme Corp.", color: "#8b5cf6" },
  { label: "Tax", value: "$342.40", color: "#ef4444" },
  { label: "Total", value: "$4,280.00", color: "#f59e0b" },
];

// Document rows: each row knows its y position, and optionally which field highlights it
interface DocRow {
  y: number; // top position %
  bars: { x: number; w: number; h: number; bold?: boolean; fieldIndex?: number }[];
}

const docRows: DocRow[] = [
  // Header
  { y: 6, bars: [{ x: 8, w: 30, h: 2.5, bold: true, fieldIndex: 0 }] }, // "INVOICE" title
  { y: 11, bars: [{ x: 8, w: 24, h: 1.5 }] }, // invoice number
  { y: 15, bars: [{ x: 64, w: 28, h: 1.5, fieldIndex: 1 }] }, // date, right
  // Vendor
  { y: 22, bars: [{ x: 8, w: 22, h: 1.5, bold: true, fieldIndex: 2 }] }, // vendor name
  { y: 26, bars: [{ x: 8, w: 36, h: 1 }] }, // address line 1
  { y: 29, bars: [{ x: 8, w: 30, h: 1 }] }, // address line 2
  // Table header
  { y: 35, bars: [{ x: 8, w: 32, h: 1, bold: true }, { x: 62, w: 10, h: 1, bold: true }, { x: 76, w: 16, h: 1, bold: true }] },
  // Line items
  { y: 41, bars: [{ x: 8, w: 26, h: 1 }, { x: 62, w: 10, h: 1 }, { x: 76, w: 14, h: 1 }] },
  { y: 46, bars: [{ x: 8, w: 20, h: 1 }, { x: 62, w: 10, h: 1 }, { x: 76, w: 14, h: 1 }] },
  { y: 51, bars: [{ x: 8, w: 24, h: 1 }, { x: 62, w: 10, h: 1 }, { x: 76, w: 14, h: 1 }] },
  { y: 56, bars: [{ x: 8, w: 18, h: 1 }, { x: 62, w: 10, h: 1 }, { x: 76, w: 14, h: 1 }] },
  // Totals
  { y: 64, bars: [{ x: 60, w: 14, h: 1 }, { x: 78, w: 14, h: 1 }] }, // subtotal
  { y: 70, bars: [{ x: 64, w: 10, h: 1, fieldIndex: 3 }, { x: 78, w: 14, h: 1, fieldIndex: 3 }] }, // tax
  { y: 80, bars: [{ x: 60, w: 14, h: 1.5, bold: true, fieldIndex: 4 }, { x: 78, w: 14, h: 1.5, bold: true, fieldIndex: 4 }] }, // total
];

// Derive highlight boxes from the doc rows
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

const highlights = getFieldHighlights();

export default function OCRScan() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "extracted">("idle");

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

        {/* Separator lines */}
        <div className="absolute left-[8%] right-[8%] top-[19%] border-t border-neutral-100 dark:border-neutral-700/40" />
        <div className="absolute left-[8%] right-[8%] top-[33%] border-t border-neutral-100 dark:border-neutral-700/40" />
        <div className="absolute left-[8%] right-[8%] top-[37.5%] border-t border-neutral-100 dark:border-neutral-700/40" />
        <div className="absolute left-[8%] right-[8%] top-[62%] border-t border-neutral-100 dark:border-neutral-700/40" />
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
