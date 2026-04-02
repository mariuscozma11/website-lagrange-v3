"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Square } from "lucide-react";

const transcript = [
  { text: "Speech", delay: 0 },
  { text: " recognition", delay: 600 },
  { text: " just works.", delay: 1400 },
];

const totalDuration = 2400;
const barCount = 32;

export default function ASRTranscribe() {
  const [phase, setPhase] = useState("idle");
  const [visibleText, setVisibleText] = useState("");
  const [barHeights, setBarHeights] = useState(() =>
    new Array(barCount).fill(12)
  );
  const animRef = useRef(0);
  const startTime = useRef(0);

  function stopAnimation() {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = 0;
    }
  }

  function resetToIdle() {
    stopAnimation();
    setPhase("idle");
    setVisibleText("");
    setBarHeights(new Array(barCount).fill(12));
  }

  function play() {
    stopAnimation();
    setPhase("playing");
    setVisibleText("");
    startTime.current = performance.now();

    function loop(now: number) {
      const elapsed = now - startTime.current;

      // Update text
      let text = "";
      for (const seg of transcript) {
        if (elapsed >= seg.delay) {
          const chars = Math.min(
            seg.text.length,
            Math.floor((elapsed - seg.delay) / 50)
          );
          text += seg.text.slice(0, chars);
        }
      }
      setVisibleText(text);

      // Update bars
      const heights = new Array(barCount);
      const progress = elapsed / totalDuration;
      for (let i = 0; i < barCount; i++) {
        const wavePos = (i / barCount) * Math.PI * 3 + elapsed * 0.012;
        const envelope =
          Math.sin((i / barCount) * Math.PI) *
          Math.sin(progress * Math.PI);
        const wave = (Math.sin(wavePos) * 0.5 + 0.5) * envelope;
        const noise = Math.sin(i * 5.7 + elapsed * 0.015) * 0.2;
        heights[i] = Math.max(12, Math.min(100, (wave + noise) * 100));
      }
      setBarHeights(heights);

      if (elapsed < totalDuration) {
        animRef.current = requestAnimationFrame(loop);
      } else {
        animRef.current = 0;
        setBarHeights(new Array(barCount).fill(12));
        setPhase("done");
      }
    }

    animRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    return () => stopAnimation();
  }, []);

  const isPlaying = phase === "playing";
  const isDone = phase === "done";
  const isIdle = phase === "idle";

  return (
    <div
      className="relative w-full aspect-square select-none flex flex-col items-center justify-center"
      onMouseEnter={() => { if (isIdle) play(); }}
      onMouseLeave={resetToIdle}
      onClick={() => {
        if (isIdle) play();
        else if (isDone) resetToIdle();
      }}
    >
      {/* Play/Stop + Waveform */}
      <div className="w-[80%] flex items-center gap-5">
        {/* Button */}
        <div className="shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <div className="relative w-5 h-5">
            <Play
              className="absolute inset-0 w-5 h-5 text-primary-foreground ml-0.5 transition-all duration-300"
              style={{
                opacity: isPlaying ? 0 : 1,
                transform: isPlaying ? "scale(0.5) rotate(90deg)" : "scale(1) rotate(0deg)",
              }}
            />
            <Square
              className="absolute inset-0 w-4 h-4 m-0.5 text-primary-foreground fill-primary-foreground transition-all duration-300"
              style={{
                opacity: isPlaying ? 1 : 0,
                transform: isPlaying ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-90deg)",
              }}
            />
          </div>
        </div>

        {/* Bars */}
        <div className="flex-1 overflow-hidden" style={{ height: "64px" }}>
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            className={
              isPlaying
                ? "text-primary"
                : isDone
                ? "text-primary/40"
                : "text-primary/20"
            }
          >
            {barHeights.map((h, i) => {
              const barWidth = 100 / barCount;
              const x = i * barWidth + barWidth * 0.15;
              const w = barWidth * 0.7;
              const barH = (h / 100) * 64;
              const y = (64 - barH) / 2;
              return (
                <rect
                  key={i}
                  x={`${x}%`}
                  y={y}
                  width={`${w}%`}
                  height={barH}
                  rx="2"
                  fill="currentColor"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="w-[80%] mt-8 min-h-[2rem]">
        {isIdle ? (
          <p className="text-sm text-neutral-400 dark:text-neutral-500 text-center">
            Hover to transcribe
          </p>
        ) : (
          <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300 text-center leading-relaxed">
            {visibleText}
            {isPlaying && (
              <span className="inline-block w-[2px] h-5 bg-primary ml-0.5 animate-pulse align-text-bottom" />
            )}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="mt-6 flex items-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone
              ? "#22c55e"
              : isPlaying
              ? "hsl(var(--primary))"
              : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "Transcription complete"
            : isPlaying
            ? "Transcribing..."
            : "Speech recognition"}
        </span>
      </div>

      {/* Touch play overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center xl:hidden transition-opacity duration-300 z-20"
        style={{ opacity: isIdle ? 1 : 0, pointerEvents: isIdle ? "auto" : "none" }}
      >
        <button className="w-14 h-14 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-6 h-6 text-neutral-600 dark:text-neutral-300 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
