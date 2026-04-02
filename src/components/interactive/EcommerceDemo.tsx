"use client";

import { useState, useEffect, useRef } from "react";
import { Play, ShoppingCart, Star } from "lucide-react";

export default function EcommerceDemo() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [cartCount, setCartCount] = useState(0);
  const [cartBump, setCartBump] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  function clearTimeouts() {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }

  function resetToIdle() {
    clearTimeouts();
    setPhase("idle");
    setCartCount(0);
    setCartBump(false);
    setButtonPressed(false);
  }

  function play() {
    if (phase !== "idle") return;
    setPhase("playing");
    setButtonPressed(false);
    setCartCount(0);

    // Button press
    const t1 = setTimeout(() => setButtonPressed(true), 400);
    // Cart bump
    const t2 = setTimeout(() => {
      setCartCount(1);
      setCartBump(true);
    }, 700);
    const t3 = setTimeout(() => setCartBump(false), 1000);
    // Done
    const t4 = setTimeout(() => setPhase("done"), 1200);

    timeoutRefs.current = [t1, t2, t3, t4];
  }

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  const isIdle = phase === "idle";
  const isDone = phase === "done";
  const itemAdded = cartCount > 0;

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
      {/* Product card with cart */}
      <div className="w-[70%] max-w-[260px]">
        {/* Cart icon - above card, right-aligned */}
        <div className="flex justify-end mb-2 pr-1">
          <div className="relative">
            <ShoppingCart
              className="w-5 h-5 text-neutral-400 dark:text-neutral-500 transition-transform duration-300"
              style={{ transform: cartBump ? "scale(1.3)" : "scale(1)" }}
            />
            <div
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center transition-all duration-300"
              style={{
                opacity: itemAdded ? 1 : 0,
                transform: itemAdded ? "scale(1)" : "scale(0)",
              }}
            >
              {cartCount}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm overflow-hidden">
        {/* Product image */}
        <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-700/40 flex items-center justify-center relative">
          <div className="w-[45%] aspect-square rounded-2xl bg-primary/10 -rotate-6" />
          <div className="absolute w-[30%] aspect-square rounded-xl bg-primary/7 translate-x-[30%] -translate-y-[20%] rotate-12" />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-[9px] font-bold">
            -20%
          </div>
        </div>

        {/* Product info */}
        <div className="p-3 sm:p-4">
          {/* Title placeholder */}
          <div className="h-2 w-[70%] rounded bg-neutral-300 dark:bg-neutral-600 mb-1.5" />
          <div className="h-1.5 w-[45%] rounded bg-neutral-200 dark:bg-neutral-700" />

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-2.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-neutral-300 dark:text-neutral-600"}`}
              />
            ))}
            <span className="text-[9px] text-neutral-400 dark:text-neutral-500 ml-1">(128)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base sm:text-lg font-bold text-neutral-800 dark:text-neutral-200 font-mono">
              $79.99
            </span>
            <span className="text-xs text-neutral-400 line-through font-mono">
              $99.99
            </span>
          </div>

          {/* Add to cart button */}
          <div className="mt-3 relative overflow-hidden">
            <div
              className="w-full py-2 rounded-lg text-center text-xs font-semibold transition-all duration-300"
              style={{
                backgroundColor: itemAdded ? "rgb(34 197 94)" : "hsl(var(--primary))",
                color: "white",
                transform: buttonPressed && !itemAdded ? "scale(0.96)" : "scale(1)",
              }}
            >
              {itemAdded ? "Added to cart ✓" : "Add to Cart"}
            </div>
          </div>
        </div>
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
            ? "Item added"
            : !isIdle
            ? "Shopping..."
            : "Hover to shop"}
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
