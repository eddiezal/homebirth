"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SectionLabel, Button, Input } from "@/components/ui";
import { signInWithPassword, sendMagicLink } from "@/lib/supabase/auth";

export default function ProviderSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateEmail(): boolean {
    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return false;
    }
    return true;
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!validateEmail()) return;

    setLoading(true);

    if (password) {
      const result = await signInWithPassword(email, password, "/provider-dashboard");

      if (result?.error) {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
        if (attempts >= 3) {
          setLocked(true);
          await sendMagicLink(email);
          setLoading(false);
          return;
        }
        setErrors({ [result.field || "password"]: result.error });
        setLoading(false);
        return;
      }

      // Hard navigate so the server sees the new session cookies
      if (result?.redirectTo) {
        window.location.href = result.redirectTo;
        return;
      }
    } else {
      await handleMagicLinkSend();
    }
  }

  async function handleMagicLinkSend() {
    if (!validateEmail()) return;

    setLoading(true);
    const result = await sendMagicLink(email);

    if (result?.error) {
      setErrors({ [result.field || "email"]: result.error });
      setLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("homebirth_auth_email", email);
    }
    router.push("/sign-in/magic-link-sent");
  }

  return (
    <div className="rounded-[12px] border border-card-border bg-white p-8">
      <SectionLabel>For providers</SectionLabel>
      <h1 className="mt-2 text-xl font-semibold text-heading">
        Sign in to your practice
      </h1>
      <p className="mt-1 text-sm text-muted">
        Access your inbox, profile, and dashboard.
      </p>

      <form onSubmit={handleSignIn} className="mt-6 flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@practice.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({});
          }}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => {
              const next = { ...prev };
              delete next.password;
              return next;
            });
          }}
          error={errors.password}
          hint="Leave blank to receive a magic link"
          disabled={locked}
        />

        {errors.password && (
          <button
            type="button"
            onClick={handleMagicLinkSend}
            className="text-left text-sm font-medium text-primary hover:underline"
          >
            Send me a sign-in link instead
          </button>
        )}

        {locked && (
          <div className="rounded-[8px] bg-amber-50 p-3">
            <p className="text-sm text-amber-800">
              We sent a sign-in link to your email for security.
            </p>
          </div>
        )}

        <Button fullWidth disabled={locked || loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-card-border" />
          <span className="text-xs text-muted">or</span>
          <div className="h-px flex-1 bg-card-border" />
        </div>

        <Button
          variant="outlined"
          fullWidth
          type="button"
          onClick={handleMagicLinkSend}
          disabled={loading}
        >
          Send me a sign-in link
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        New provider?{" "}
        <Link
          href="/provider-apply"
          className="font-medium text-primary hover:underline"
        >
          Apply to join
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-muted">
        Looking for a midwife?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-primary hover:underline"
        >
          Parent sign-in
        </Link>
      </p>
    </div>
  );
}
