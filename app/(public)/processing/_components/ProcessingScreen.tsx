"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadIntakeAnswers } from "@/lib/utils/intake-storage";
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
  const sublineRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigateToResults = useCallback(() => {
    router.push("/results");
  }, [router]);

  // Guard — if no intake data, send back to intake
  useEffect(() => {
    const data = loadIntakeAnswers();
    if (!data) {
      router.replace("/intake");
    }
  }, [router]);

  // Progress bar
  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        // Stop subline cycling too
        if (sublineRef.current) clearInterval(sublineRef.current);
        setTimeout(navigateToResults, 400);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [navigateToResults]);

  // Subline cycling
  useEffect(() => {
    sublineRef.current = setInterval(() => {
      setSublineIndex((prev) => (prev + 1) % sublines.length);
    }, SUBLINE_INTERVAL);

    return () => {
      if (sublineRef.current) clearInterval(sublineRef.current);
    };
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