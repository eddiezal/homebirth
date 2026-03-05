"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Button } from "@/components/ui";

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
    <section id="hero" className="pb-20 pt-16">
      <Container className="flex flex-col items-center text-center">
        <div className="mb-6 h-1 w-16 rounded-full bg-primary" />

        <h1 className="max-w-3xl text-[2.5rem] font-semibold leading-tight tracking-[-0.025em] text-heading sm:text-[3.8rem]">
          Find the right midwife for your homebirth
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted">
          Answer a few questions about your preferences and we&apos;ll match you
          with vetted providers in your area. Free, no account needed.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="Enter your zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            className="flex-1 rounded-[8px] border border-card-border px-4 py-3 text-base text-heading outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
          <Button type="submit" size="md">
            Find my match
          </Button>
        </form>
      </Container>
    </section>
  );
}