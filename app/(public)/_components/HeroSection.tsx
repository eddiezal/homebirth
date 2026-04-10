"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [zip, setZip] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (zip.trim()) {
      router.push(`/fork?zip=${encodeURIComponent(zip.trim())}`);
    }
  }

  return (
    <section className="relative mx-auto flex max-w-[720px] flex-col items-center px-6 pb-[60px] pt-[60px] text-center md:min-h-[calc(100vh-60px)] md:justify-center md:pb-[80px] md:pt-[40px]">
      <div className="mb-[22px] inline-flex items-center gap-2 rounded-3xl bg-primary-lighter px-[18px] py-2 text-sm font-bold text-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#f5e6f9" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#8b5fa0" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="10" r="1" fill="#8b5fa0" />
          <circle cx="15" cy="10" r="1" fill="#8b5fa0" />
        </svg>
        Hey, welcome
      </div>

      <h1 className="mb-4 font-serif text-heading">
        <span className="block text-[44px] font-semibold leading-[1.2] tracking-[-0.01em] max-md:text-[28px]">
          Find a midwife who
        </span>
        <span className="block text-[56px] font-bold italic leading-[1.1] tracking-[-0.02em] text-primary max-md:text-[36px]">
          truly gets you
        </span>
      </h1>

      <p className="mx-auto mb-8 max-w-[500px] text-lg leading-[1.7] text-muted max-md:text-base">
        You shouldn&apos;t have to settle for whoever&apos;s available. Tell
        us what you care about, and we&apos;ll find someone who cares about
        the same things.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mb-[14px] flex gap-[10px] max-md:flex-col max-md:items-center"
      >
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          placeholder="Your zip code"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          className="w-[210px] rounded-2xl border-2 border-[#e0d4e4] bg-white px-5 py-[15px] text-base text-heading outline-none transition-colors placeholder:text-muted focus:border-primary max-md:w-full max-md:max-w-[300px] max-md:text-center"
        />
        <button
          type="submit"
          className="rounded-2xl bg-primary px-[30px] py-[15px] text-base font-bold text-white transition-all hover:-translate-y-px hover:bg-primary-hover max-md:w-full max-md:max-w-[300px]"
        >
          Find my midwife
        </button>
      </form>

      <div className="mb-6 text-sm text-faint">
        Free, no account needed — takes about 2 minutes
      </div>

      {/* Trust signal */}
      <div className="flex items-center gap-3 text-[13px] text-muted">
        <div className="flex -space-x-2">
          {["#d4b8e0", "#f0cfc0", "#b8d4a8"].map((bg, i) => (
            <div
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
              style={{ background: bg }}
            >
              {["S", "M", "J"][i]}
            </div>
          ))}
        </div>
        <span>Trusted by families in San Diego</span>
      </div>
    </section>
  );
}
