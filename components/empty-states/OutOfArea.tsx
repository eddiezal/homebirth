"use client";

import { useState } from "react";
import { Container, Button, SectionHeading } from "@/components/ui";
import { joinWaitlist } from "@/lib/actions/waitlist";

interface OutOfAreaProps {
  city: string;
  zip: string;
  waitlistCounts?: { city: string; state: string; count: number }[];
}

const TARGET = 100;

export function OutOfArea({ city, zip, waitlistCounts = [] }: OutOfAreaProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const currentCity = waitlistCounts.find(
    (c) => city && c.city.toLowerCase().includes(city.split(",")[0].trim().toLowerCase())
  );
  const cityCount = currentCity?.count || 0;
  const pct = Math.min(Math.round((cityCount / TARGET) * 100), 100);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    const parts = city.split(",").map((s) => s.trim());
    const result = await joinWaitlist(email, zip, parts[0], parts[1]);
    if (result.error) {
      setError(result.error);
    } else {
      setSubmitted(true);
    }
  }

  return (
    <section className="py-16">
      <Container className="flex flex-col items-center text-center">
        <SectionHeading>Help bring Homebirth.com to {city || "your area"}</SectionHeading>
        <p className="mt-3 max-w-lg text-muted">
          We launch in new cities based on demand. The more parents who sign up
          in your area, the sooner we&apos;ll get there.
        </p>

        {/* Progress card */}
        <div className="mt-8 w-full max-w-md rounded-[12px] border-2 border-primary/20 bg-white p-6">
          <p className="text-lg font-semibold text-heading">
            {city || "Your area"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {cityCount} of {TARGET} signups
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            {TARGET - cityCount > 0
              ? `${TARGET - cityCount} more signups and we'll start onboarding providers`
              : "We're close! Stay tuned."}
          </p>

          {submitted ? (
            <div className="mt-4 rounded-[8px] bg-primary-light p-3">
              <p className="text-sm font-medium text-primary">
                You&apos;re on the list! We&apos;ll email you when we launch in{" "}
                {city || "your area"}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-[8px] border border-card-border px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <Button type="submit" size="sm">
                Join waitlist
              </Button>
            </form>
          )}
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>

        {/* City leaderboard */}
        {waitlistCounts.length > 0 && (
          <div className="mt-10 w-full max-w-md text-left">
            <h3 className="text-sm font-semibold text-heading">
              Where we&apos;re launching next
            </h3>
            <div className="mt-3 space-y-3">
              {waitlistCounts.slice(0, 5).map((c) => {
                const p = Math.min(Math.round((c.count / TARGET) * 100), 100);
                return (
                  <div key={`${c.city}-${c.state}`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-heading">
                        {c.city}
                        {c.state ? `, ${c.state}` : ""}
                      </span>
                      <span className="text-muted">
                        {c.count}/{TARGET}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                      <div
                        className="h-1.5 rounded-full bg-primary/60"
                        style={{ width: `${p}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Content fallback */}
        <div className="mt-12 w-full max-w-lg">
          <h3 className="text-sm font-semibold text-heading">
            Start preparing now
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Home birth guide", href: "/resources" },
              { title: "Questions to ask", href: "/questions" },
              { title: "Cost breakdown", href: "/resources" },
            ].map((r) => (
              <a
                key={r.title}
                href={r.href}
                className="rounded-[12px] border border-card-border bg-white p-4 text-center text-sm font-medium text-heading transition-colors hover:border-primary hover:text-primary"
              >
                {r.title}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
