"use client";

import { useState } from "react";
import { Container, SectionHeading, Button } from "@/components/ui";
import { joinWaitlist } from "@/lib/actions/waitlist";

interface NoResultsProps {
  location: string;
  zip: string;
  onBroadenSearch?: () => void;
  onBrowseAll?: () => void;
}

export function NoResults({ location, zip, onBroadenSearch, onBrowseAll }: NoResultsProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  async function handleAlert(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    const parts = location.split(",").map((s) => s.trim());
    await joinWaitlist(email, zip, parts[0], parts[1]);
    setSubscribed(true);
  }

  return (
    <section className="py-16">
      <Container className="flex flex-col items-center text-center">
        <SectionHeading>No exact matches right now</SectionHeading>
        <p className="mt-3 max-w-lg text-muted">
          Providers in your area may be at capacity for your due date, or your
          preferences narrowed the results. That&apos;s okay — here&apos;s what
          you can do.
        </p>

        {/* Demand signal */}
        <div className="mt-8 w-full max-w-md rounded-[12px] bg-primary-light p-5 text-left">
          <p className="text-sm font-medium text-primary">
            Your search helps us grow
          </p>
          <p className="mt-2 text-sm text-muted">
            When parents search and don&apos;t find matches, we use that signal
            to recruit providers who fit. Your intake answers (anonymized) help
            us find the right midwives for your area.
          </p>
        </div>

        {/* Three action paths */}
        <div className="mt-8 flex w-full max-w-lg flex-col gap-4">
          {/* Alert me */}
          <div className="rounded-[12px] border-2 border-primary/20 bg-white p-5 text-left">
            <p className="text-sm font-semibold text-heading">
              Alert me when a match opens
            </p>
            <p className="mt-1 text-xs text-muted">
              We&apos;ll check weekly and email you when we find someone.
            </p>
            {subscribed ? (
              <p className="mt-3 text-sm font-medium text-primary">
                You&apos;re subscribed! We&apos;ll email you.
              </p>
            ) : (
              <form onSubmit={handleAlert} className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-[8px] border border-card-border px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <Button type="submit" size="sm">
                  Notify me
                </Button>
              </form>
            )}
          </div>

          {/* Broaden search */}
          <button
            type="button"
            onClick={onBroadenSearch}
            className="rounded-[12px] border border-card-border bg-white p-5 text-left transition-colors hover:border-primary"
          >
            <p className="text-sm font-semibold text-heading">
              Broaden my search
            </p>
            <p className="mt-1 text-xs text-muted">
              Adjust your radius, preferences, or due date range.
            </p>
          </button>

          {/* Browse all */}
          <button
            type="button"
            onClick={onBrowseAll}
            className="rounded-[12px] border border-card-border bg-white p-5 text-left transition-colors hover:border-primary"
          >
            <p className="text-sm font-semibold text-heading">
              Browse all nearby providers
            </p>
            <p className="mt-1 text-xs text-muted">
              See everyone in your area, even if they&apos;re not an exact match.
            </p>
          </button>
        </div>
      </Container>
    </section>
  );
}
