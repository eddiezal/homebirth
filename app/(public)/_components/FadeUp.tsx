"use client";

import { useEffect, useRef, type ElementType } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}

export function FadeUp({ children, className = "", as: Tag = "section", id }: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-7");
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`translate-y-7 opacity-0 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </Tag>
  );
}
