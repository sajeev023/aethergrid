"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";

type AnimatedCounterProps = {
  value: string;
  className?: string;
};

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // Strip comma-formatting for counting, extract the core numeric value and suffixes
  const cleanValue = value.replace(/,/g, "");
  const numericMatch = cleanValue.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  
  // Extract trailing suffix (e.g. "+", "k+", etc.)
  const suffix = cleanValue.replace(/^\d+/, "");
  const hasComma = value.includes(",");

  // Initialize with real target value to eliminate any "0" flash on initial SSR & paint
  const [displayVal, setDisplayVal] = useState(value);
  const count = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayVal(value);
      return;
    }

    if (!isInView) return;

    // Reset to initial count only when entering viewport to start smooth climb
    count.set(0);

    const controls = animate(count, numericValue, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        let formatted = rounded.toString();
        if (hasComma) {
          formatted = rounded.toLocaleString("en-US");
        }
        setDisplayVal(formatted + suffix);
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue, suffix, hasComma, count, prefersReducedMotion, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className || ""}`}>
      {displayVal}
    </span>
  );
}
