"use client";

import { useEffect, useRef } from "react";

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleScroll() {
      if (window.scrollY > 100 && el) {
        el.style.opacity = "0";
        el.style.transition = "opacity 0.4s ease";
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="-mt-5 pb-[30px] text-center">
      <div className="inline-flex animate-bounce-slow flex-col items-center gap-[6px] text-[13px] font-semibold text-primary-light">
        explore
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60" aria-hidden="true">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}
