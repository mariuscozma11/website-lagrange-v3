"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Check, X } from "lucide-react";

const question = "What does API stand for?";
const options = [
  { text: "Application Programming Interface", correct: true },
  { text: "Applied Protocol Integration", correct: false },
  { text: "Automated Process Input", correct: false },
];
const correctIndex = 0;

export default function LMSQuiz() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  function clearTimeouts() {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }

  function resetToIdle() {
    clearTimeouts();
    setPhase("idle");
    setSelectedIndex(-1);
    setShowResult(false);
  }

  function play() {
    if (phase !== "idle") return;
    setPhase("playing");
    setSelectedIndex(-1);
    setShowResult(false);

    // Select correct answer
    const t1 = setTimeout(() => setSelectedIndex(correctIndex), 300);
    // Show result
    const t2 = setTimeout(() => setShowResult(true), 600);
    // Done
    const t3 = setTimeout(() => setPhase("done"), 1000);

    timeoutRefs.current = [t1, t2, t3];
  }

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";

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
      {/* Quiz card */}
      <div className="w-[80%] max-w-[300px] rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between">
          <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Quiz
          </span>
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
            1 / 1
          </span>
        </div>

        {/* Question */}
        <div className="px-4 pt-4 pb-3">
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {question}
          </p>
        </div>

        {/* Options */}
        <div className="px-4 pb-4 flex flex-col gap-2">
          {options.map((opt, i) => {
            const isSelected = selectedIndex === i;
            const isCorrect = opt.correct;
            const showFeedback = showResult && isSelected;

            let borderColor = "border-neutral-200 dark:border-neutral-700";
            let bgColor = "";
            let textColor = "text-neutral-600 dark:text-neutral-400";

            if (showFeedback && isCorrect) {
              borderColor = "border-green-400 dark:border-green-500";
              bgColor = "bg-green-50 dark:bg-green-500/10";
              textColor = "text-green-700 dark:text-green-400";
            } else if (isSelected && !showResult) {
              borderColor = "border-primary dark:border-primary";
              bgColor = "bg-primary/5";
              textColor = "text-neutral-800 dark:text-neutral-200";
            }

            return (
              <div
                key={i}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-300 ${borderColor} ${bgColor}`}
              >
                {/* Radio / check indicator */}
                <div
                  className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: showFeedback && isCorrect
                      ? "#22c55e"
                      : isSelected
                      ? "hsl(var(--primary))"
                      : "rgb(212 212 212)",
                    backgroundColor: showFeedback && isCorrect
                      ? "#22c55e"
                      : isSelected
                      ? "hsl(var(--primary))"
                      : "transparent",
                  }}
                >
                  {(isSelected || (showFeedback && isCorrect)) && (
                    <Check className="w-2.5 h-2.5 text-white" />
                  )}
                </div>

                <span className={`text-xs transition-colors duration-300 ${textColor}`}>
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Result bar */}
        <div
          className="px-4 py-2.5 border-t border-neutral-100 dark:border-neutral-700/50 flex items-center gap-2 transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: showResult ? "60px" : "0px",
            padding: showResult ? undefined : "0 16px",
            borderTopWidth: showResult ? "1px" : "0px",
          }}
        >
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            Correct!
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone
              ? "#22c55e"
              : !isIdle
              ? "hsl(var(--primary))"
              : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "Assessment passed"
            : !isIdle
            ? "Answering..."
            : "Hover to answer"}
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
