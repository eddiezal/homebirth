"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatedDots } from "./AnimatedDots";
import { ProcessingChecklist } from "./ProcessingChecklist";

const sublines = [
  "Checking provider availability...",
  "Matching care style preferences...",
  "Scoring compatibility...",
  "Preparing your results...",
];

const TOTAL_DURATION = 3000;
const SUBLINE_INTERVAL = 750;

export function ProcessingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [sublineIndex, setSublineIndex] = useState(0);

  const navigateToResults = useCallback(() => {
    router.push("/results");
  }, [router]);

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(navigateToResults, 400);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [navigateToResults]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSublineIndex((prev) => (prev + 1) % sublines.length);
    }, SUBLINE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="flex w-full max-w-[520px] flex-col items-center px-6 text-center">
        <AnimatedDots />

        <h2 className="mt-8 text-[1.75rem] font-semibold tracking-[-0.015em] text-heading">
          Finding your matches...
        </h2>

        <p className="mt-3 h-6 text-muted transition-opacity duration-300">
          {sublines[sublineIndex]}
        </p>

        <div className="mt-10 w-full">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 w-full">
          <ProcessingChecklist progress={progress} />
        </div>
      </div>
    </section>
  );
}
