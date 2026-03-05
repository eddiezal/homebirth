"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Card, Badge, Button } from "@/components/ui";
import { getProviderById } from "@/lib/data/mock-providers";
import { loadConsultRequest } from "@/lib/utils/consult-storage";
import { StatusTimeline } from "./StatusTimeline";
import { PrepCard } from "./PrepCard";
import type { ConsultRequest } from "@/lib/types/consult";

export function ConfirmationView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const providerId = searchParams.get("provider") || "";
  const [consult, setConsult] = useState<ConsultRequest | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setConsult(loadConsultRequest());
    setLoaded(true);
  }, []);

  const provider = getProviderById(providerId);

  useEffect(() => {
    if (loaded && !provider) {
      router.replace("/results");
    }
  }, [loaded, provider, router]);

  if (!loaded || !provider) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const timelineSteps = [
    {
      label: "Request sent",
      detail: consult
        ? `Just now · ${new Date(consult.submittedAt).toLocaleTimeString()}`
        : "Just now",
      completed: true,
    },
    {
      label: "Provider reviews your profile",
      detail: "Usually within 24 hours",
      completed: false,
    },
    {
      label: "You hear back via email or text",
      detail: "1–2 days",
      completed: false,
    },
    {
      label: "Schedule your consult call",
      detail: "On your timeline",
      completed: false,
    },
  ];

  return (
    <section className="py-8">
      <Container>
        {/* Success header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
            <svg className="h-7 w-7 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-[1.75rem] font-semibold tracking-[-0.015em] text-heading">
            Your request has been sent!
          </h1>
          <p className="mt-2 text-sm text-muted">
            {provider.name} will receive your intake profile and contact info.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          {/* Left column */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* Provider card */}
            <Card>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-heading">
                      {provider.name}
                    </h3>
                    <Badge variant="teal">Request sent</Badge>
                  </div>
                  <p className="text-xs text-muted">
                    {provider.credentials} · {provider.matchScore}% match
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <StatusTimeline steps={timelineSteps} />
              </div>
            </Card>

            {/* Notification preferences */}
            <Card>
              <p className="text-sm text-heading">
                We&apos;ll notify you when{" "}
                <span className="font-medium">{provider.name}</span> responds
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Text
                </span>
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="w-full shrink-0 lg:w-80">
            <div className="flex flex-col gap-6">
              <PrepCard />

              <Card variant="teal">
                <h3 className="text-sm font-semibold text-heading">
                  Want to compare options?
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Request consults from more providers to find the best fit.
                </p>
                <div className="mt-4">
                  <Button variant="outlined" size="sm" href="/results">
                    Back to matches
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}