"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

const userMessage = "How fast can we get started?";
const aiResponse = "Most projects kick off within a week. We scope, prototype, and iterate fast so you see results early.";

export default function LLMChat() {
  const [phase, setPhase] = useState<"idle" | "typing-user" | "typing-ai" | "done">("idle");
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
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
    setUserText("");
    setAiText("");
  }

  function play() {
    stopAnimation();
    setPhase("typing-user");
    setUserText("");
    setAiText("");
    startTime.current = performance.now();

    const userDuration = userMessage.length * 35;
    const pauseAfterUser = 400;
    const aiStart = userDuration + pauseAfterUser;

    function loop(now: number) {
      const elapsed = now - startTime.current;

      // Phase 1: type user message
      if (elapsed < userDuration) {
        const chars = Math.min(userMessage.length, Math.floor(elapsed / 35));
        setUserText(userMessage.slice(0, chars));
      } else {
        setUserText(userMessage);
      }

      // Phase 2: type AI response
      if (elapsed >= aiStart) {
        setPhase("typing-ai");
        const aiElapsed = elapsed - aiStart;
        const chars = Math.min(aiResponse.length, Math.floor(aiElapsed / 20));
        setAiText(aiResponse.slice(0, chars));

        if (chars >= aiResponse.length) {
          animRef.current = 0;
          setPhase("done");
          return;
        }
      }

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    return () => stopAnimation();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";
  const isTypingUser = phase === "typing-user";
  const isTypingAi = phase === "typing-ai";
  const showCursor = isTypingUser || isTypingAi;

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
      {/* Chat area */}
      <div className="w-[85%] flex flex-col gap-4">
        {/* Pre-existing conversation (always visible) */}
        <div className="flex justify-end">
          <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-primary/15 text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
            Can AI actually help my business?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] flex gap-3">
            <div className="shrink-0 w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mt-0.5 opacity-50">
              <svg className="w-4 h-4 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M18 14a6 6 0 0 1-12 0" />
                <path d="M15 22v-4" />
                <path d="M9 22v-4" />
                <path d="M12 18v4" />
              </svg>
            </div>
            <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-neutral-100/60 dark:bg-neutral-800/60 text-neutral-400 dark:text-neutral-500 text-sm leading-relaxed">
              Absolutely. From automating support to analyzing documents at scale, LLMs handle the repetitive work so your team focuses on what matters.
            </div>
          </div>
        </div>

        {/* User message (animated) - always rendered, hidden via opacity */}
        <div
          className="flex justify-end transition-opacity duration-300"
          style={{ opacity: userText ? 1 : 0 }}
        >
          <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-sm leading-relaxed">
            {userText || userMessage}
            {isTypingUser && (
              <span className="inline-block w-[2px] h-4 bg-primary-foreground/70 ml-0.5 animate-pulse align-text-bottom" />
            )}
          </div>
        </div>

        {/* AI response - always rendered, hidden via opacity */}
        <div
          className="flex justify-start transition-opacity duration-300"
          style={{ opacity: (isTypingAi || isDone) ? 1 : 0 }}
        >
          <div className="max-w-[85%] flex gap-3">
            {/* AI avatar */}
            <div className="shrink-0 w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M18 14a6 6 0 0 1-12 0" />
                <path d="M15 22v-4" />
                <path d="M9 22v-4" />
                <path d="M12 18v4" />
              </svg>
            </div>

            {/* Response bubble */}
            <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
              {aiText || aiResponse}
              {isTypingAi && (
                <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-pulse align-text-bottom" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 flex items-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isDone
              ? "#22c55e"
              : showCursor
              ? "hsl(var(--primary))"
              : "#a3a3a3",
          }}
        />
        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          {isDone
            ? "Response complete"
            : isTypingAi
            ? "Generating..."
            : isTypingUser
            ? "Processing prompt..."
            : "Language model"}
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
