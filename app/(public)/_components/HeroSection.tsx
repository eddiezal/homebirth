"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroIllustration } from "./HeroIllustration";

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
    <section className="mx-auto grid min-h-[calc(85vh-60px)] max-w-[1200px] items-center gap-10 px-10 pb-[50px] pt-[70px] sm:grid-cols-2">
      <div>
        <div className="mb-[22px] inline-flex items-center gap-2 rounded-3xl bg-primary-lighter px-[18px] py-2 text-sm font-bold text-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#f5e6f9" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#8b5fa0" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9" cy="10" r="1" fill="#8b5fa0" />
            <circle cx="15" cy="10" r="1" fill="#8b5fa0" />
          </svg>
          Hey, welcome
        </div>

        <h1 className="mb-5 font-serif text-[48px] font-bold leading-[1.18] text-heading max-sm:text-[36px]">
          Find a midwife who <em className="text-primary">truly gets you</em>
        </h1>

        <p className="mb-8 max-w-[460px] text-lg leading-[1.7] text-muted">
          You shouldn&apos;t have to settle for whoever&apos;s available. Tell
          us what you care about, and we&apos;ll find someone who cares about
          the same things.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-[14px] flex gap-[10px] max-sm:justify-center"
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="Your zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            className="w-[210px] rounded-2xl border-2 border-[#e0d4e4] bg-white px-5 py-[15px] text-base text-heading outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-2xl bg-primary px-[30px] py-[15px] text-base font-bold text-white transition-all hover:-translate-y-px hover:bg-primary-hover"
          >
            Find my match
          </button>
        </form>

        <div className="text-sm text-faint">
          Free, no account needed — takes about 2 minutes
        </div>
      </div>

      <HeroIllustration />
    </section>
  );
}
