"use client";

import { motion } from "motion/react";
import Image from "next/image";

export interface Technology {
  name: string;
  image: string;
}

interface TechGridProps {
  technologies: Technology[];
  title?: string;
}

interface GridConfig {
  contentCols: number;
  totalRows: number;
  paddingColFr: number; // fr units for padding columns (e.g., 0.3 for narrow)
}

function GridWithOverlays({
  technologies,
  config,
  className,
  title,
}: {
  technologies: Technology[];
  config: GridConfig;
  className?: string;
  title?: string;
}) {
  const { contentCols, totalRows, paddingColFr } = config;
  const totalCols = contentCols + 2;

  // Calculate the percentage width of padding columns
  // Total fr = paddingColFr + contentCols * 1 + paddingColFr = 2 * paddingColFr + contentCols
  const totalFr = 2 * paddingColFr + contentCols;
  const paddingColPercent = (paddingColFr / totalFr) * 100;

  const cells = [];
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      const isPaddingRow = row === 0 || row === totalRows - 1;
      const isPaddingCol = col === 0 || col === totalCols - 1;
      const isPadding = isPaddingRow || isPaddingCol;

      const contentRow = row - 1;
      const contentCol = col - 1;
      const techIndex = contentRow * contentCols + contentCol;
      const tech =
        !isPadding && techIndex >= 0 && techIndex < technologies.length
          ? technologies[techIndex]
          : null;

      cells.push(
        <div
          key={`${row}-${col}`}
          className={`flex flex-col items-center justify-center gap-2 p-3 border-r border-b border-dashed border-neutral-300 dark:border-neutral-700 ${
            !isPaddingCol ? "aspect-square" : ""
          }`}
        >
          {tech && (
            <>
              <Image
                src={tech.image}
                alt={tech.name}
                width={48}
                height={48}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              />
              <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-500 font-medium text-center leading-tight">
                {tech.name}
              </span>
            </>
          )}
        </div>
      );
    }
  }

  // grid-template-columns: paddingFr, content cols (1fr each), paddingFr
  const gridTemplateCols = `${paddingColFr}fr repeat(${contentCols}, 1fr) ${paddingColFr}fr`;
  const rowHeight = `${100 / totalRows}%`;

  return (
    <div className={`relative ${className || ""}`}>
      <div
        className="grid border-t border-l border-dashed border-neutral-300 dark:border-neutral-700"
        style={{ gridTemplateColumns: gridTemplateCols }}
      >
        {cells}
      </div>

      {/* Title positioned over the top padding row */}
      {title && (
        <div
          className="absolute left-0 right-0 flex items-end justify-center z-20 pointer-events-none"
          style={{ top: 0, height: rowHeight }}
        >
          <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 translate-y-1/2 bg-background px-3">
            {title}
          </span>
        </div>
      )}

      {/* Gradient overlays */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"
        style={{ width: `${paddingColPercent}%` }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"
        style={{ width: `${paddingColPercent}%` }}
      />
      <div
        className="absolute left-0 right-0 top-0 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none"
        style={{ height: rowHeight }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none"
        style={{ height: rowHeight }}
      />
    </div>
  );
}

export default function TechGrid({ technologies, title }: TechGridProps) {
  const buildConfig = (contentCols: number, paddingColFr: number): GridConfig => {
    const contentRows = Math.ceil(technologies.length / contentCols);
    const totalRows = contentRows + 2;
    return { contentCols, totalRows, paddingColFr };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Mobile (< md): 2 content cols, narrow padding (0.25fr) */}
      <GridWithOverlays
        technologies={technologies}
        config={buildConfig(2, 0.25)}
        className="md:hidden"
        title={title}
      />

      {/* Medium (md to lg): 4 content cols, medium padding (0.5fr) */}
      <GridWithOverlays
        technologies={technologies}
        config={buildConfig(4, 0.5)}
        className="hidden md:block lg:hidden"
        title={title}
      />

      {/* Large (lg+): 6 content cols, full padding (1fr) */}
      <GridWithOverlays
        technologies={technologies}
        config={buildConfig(6, 1)}
        className="hidden lg:block"
        title={title}
      />
    </motion.div>
  );
}
