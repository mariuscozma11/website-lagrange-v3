"use client";

import { useState, useRef, useEffect } from "react";
import { Play, WifiOff, Check } from "lucide-react";

export default function OfflineSync() {
  const [phase, setPhase] = useState<"idle" | "online" | "dropping" | "offline" | "syncing" | "done">("idle");
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  function clearTimeouts() {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }

  function resetToIdle() {
    clearTimeouts();
    setPhase("idle");
  }

  function play() {
    if (phase !== "idle") return;
    setPhase("online");

    const t1 = setTimeout(() => setPhase("dropping"), 500);
    const t2 = setTimeout(() => setPhase("offline"), 1000);
    const t3 = setTimeout(() => setPhase("syncing"), 2400);
    const t4 = setTimeout(() => setPhase("done"), 3200);

    timeoutRefs.current = [t1, t2, t3, t4];
  }

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";
  const isOffline = phase === "offline";
  const isDropping = phase === "dropping";
  const isSyncing = phase === "syncing";
  const signalLost = isOffline || isDropping;
  const showOfflineBadge = isOffline;
  const showSyncedBadge = isDone;

  // Signal bars: 4 bars, they shrink during drop
  const signalBars = [1, 2, 3, 4].map((level) => {
    if (isIdle) return true;
    if (phase === "online") return true;
    if (isDropping) return level <= 1;
    if (isOffline) return false;
    if (isSyncing) return level <= 3;
    if (isDone) return true;
    return true;
  });

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
      {/* Phone frame */}
      <div className="relative w-[50%] max-w-[200px] aspect-[9/18] rounded-[24px] border-[3px] border-neutral-300 dark:border-neutral-600 overflow-hidden bg-white dark:bg-neutral-800">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[14px] bg-neutral-300 dark:bg-neutral-600 rounded-b-xl z-10" />

        {/* Status bar */}
        <div className="pt-5 px-3 flex justify-between items-center">
          <span className="text-[6px] font-semibold text-neutral-800 dark:text-neutral-200">9:41</span>
          {/* Signal bars */}
          <div className="flex items-end gap-[1.5px]">
            {signalBars.map((on, i) => (
              <div
                key={i}
                className="w-[3px] rounded-sm transition-all duration-300"
                style={{
                  height: `${4 + i * 2}px`,
                  backgroundColor: on
                    ? "rgb(115 115 115)"
                    : "rgb(212 212 212)",
                  opacity: on ? 1 : 0.3,
                  transitionDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* App content */}
        <div className="px-3 pt-3 space-y-2">
          {/* Nav */}
          <div className="h-1.5 w-[50%] rounded bg-neutral-800 dark:bg-neutral-200" />

          {/* Content cards - always visible, proving offline works */}
          {[0.75, 0.55, 0.65].map((w, i) => (
            <div
              key={i}
              className="rounded-lg bg-neutral-100 dark:bg-neutral-700/40 p-2 transition-all duration-300"
            >
              <div className="h-1 rounded bg-neutral-300 dark:bg-neutral-600 mb-1" style={{ width: `${w * 100}%` }} />
              <div className="h-0.5 w-[80%] rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}

          {/* Action button */}
          <div className="rounded-lg py-1.5 bg-primary">
            <div className="h-1 w-[35%] mx-auto rounded bg-white/80" />
          </div>
        </div>

        {/* Center overlays container */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {/* Offline badge */}
          <div
            className="absolute flex flex-col items-center gap-1.5 transition-all duration-300"
            style={{
              opacity: showOfflineBadge ? 1 : 0,
              transform: showOfflineBadge ? "scale(1)" : "scale(0.8)",
            }}
          >
            <div className="w-11 h-11 rounded-full bg-amber-500/90 flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-white" />
            </div>
            <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400 bg-white/90 dark:bg-neutral-800/90 px-2 py-0.5 rounded-full">
              Offline
            </span>
          </div>

          {/* Syncing spinner */}
          <div
            className="absolute flex flex-col items-center gap-1.5 transition-all duration-300"
            style={{
              opacity: isSyncing ? 1 : 0,
              transform: isSyncing ? "scale(1)" : "scale(0.8)",
            }}
          >
            <div className="w-11 h-11 rounded-full border-[2.5px] border-primary border-t-transparent animate-spin" />
            <span className="text-[8px] font-bold text-primary bg-white/90 dark:bg-neutral-800/90 px-2 py-0.5 rounded-full">
              Syncing
            </span>
          </div>

          {/* Synced badge */}
          <div
            className="absolute flex flex-col items-center gap-1.5 transition-all duration-300"
            style={{
              opacity: showSyncedBadge ? 1 : 0,
              transform: showSyncedBadge ? "scale(1)" : "scale(0.8)",
            }}
          >
            <div className="w-11 h-11 rounded-full bg-green-500/90 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-[8px] font-bold text-green-600 dark:text-green-400 bg-white/90 dark:bg-neutral-800/90 px-2 py-0.5 rounded-full">
              Synced
            </span>
          </div>
        </div>

        {/* Dim overlay when offline */}
        <div
          className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-900/20 transition-opacity duration-500 pointer-events-none"
          style={{ opacity: signalLost || isOffline ? 1 : 0 }}
        />
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone
              ? "#22c55e"
              : isOffline
              ? "#f59e0b"
              : isSyncing
              ? "hsl(var(--primary))"
              : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "All changes synced"
            : isSyncing
            ? "Syncing..."
            : isOffline
            ? "Working offline"
            : signalLost
            ? "Losing signal..."
            : isIdle
            ? "Hover to simulate"
            : "Connected"}
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
