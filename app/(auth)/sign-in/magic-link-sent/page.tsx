"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { sendMagicLink } from "@/lib/supabase/auth";

export default function MagicLinkSentPage() {
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [rateLimited, setRateLimited] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(sessionStorage.getItem("homebirth_auth_email") || "");
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleResend() {
    if (resendCount >= 2) {
      setRateLimited(true);
      return;
    }

    if (email) {
      await sendMagicLink(email);
    }

    setResendCount((c) => c + 1);
    setCooldown(30);
  }

  return (
    <div className="rounded-[12px] border border-card-border bg-white p-8 text-center">
      {/* Email icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
        <svg
          className="h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </div>

      <h1 className="mt-5 text-xl font-semibold text-heading">
        Check your email
      </h1>

      {email && (
        <p className="mt-2 text-sm text-muted">
          We sent a sign-in link to{" "}
          <span className="font-semibold text-heading">{email}</span>
        </p>
      )}

      <p className="mt-1 text-sm text-muted">
        Click the link to sign in instantly. Valid for 15 minutes.
      </p>

      <div className="mt-6">
        {rateLimited ? (
          <div className="rounded-[8px] bg-amber-50 p-3">
            <p className="text-sm text-amber-800">
              We&apos;ve already sent a link. Check your inbox (and spam
              folder). You can request another in 5 minutes.
            </p>
          </div>
        ) : (
          <Button
            variant="outlined"
            onClick={handleResend}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Resend link (${cooldown}s)` : "Resend link"}
          </Button>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        Didn&apos;t get it? Check spam or{" "}
        <Link
          href="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          try another email
        </Link>
      </p>
    </div>
  );
}
