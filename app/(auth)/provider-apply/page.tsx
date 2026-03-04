"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SectionLabel, Button, Input } from "@/components/ui";
import { MOCK_EXISTING_EMAIL } from "@/lib/data/mock-auth";
import { saveOnboardingData, saveOnboardingStep } from "@/lib/utils/onboarding-storage";
import { INITIAL_ONBOARDING_DATA } from "@/lib/types/onboarding";

const credentialOptions = ["CNM", "CPM", "LM", "CM", "Doula", "Other"];

export default function ProviderApplyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  function toggleCredential(cred: string) {
    setCredentials((prev) =>
      prev.includes(cred) ? prev.filter((c) => c !== cred) : [...prev, cred]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    } else if (email.toLowerCase() === MOCK_EXISTING_EMAIL) {
      errs.email = "An account with this email already exists.";
    }
    if (!password) {
      errs.password = "Password is required for provider accounts";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }
    if (credentials.length === 0) {
      errs.credentials = "Select at least one credential type";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Mock success — seed onboarding data and redirect
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "homebirth_provider_apply",
        JSON.stringify({ name, email, credentials })
      );
      saveOnboardingData({
        ...INITIAL_ONBOARDING_DATA,
        fullName: name,
        credentialType: credentials,
      });
      saveOnboardingStep(1);
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="rounded-[12px] border border-card-border bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
          <svg
            className="h-7 w-7 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-xl font-semibold text-heading">
          Application received!
        </h1>
        <p className="mt-2 text-sm text-muted">
          Let&apos;s build your profile. It takes about 5 minutes and you can
          save your progress anytime.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button href="/onboarding">
            Start building your profile →
          </Button>
          <Button variant="outlined" href="/">
            I&apos;ll do this later
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[12px] border border-card-border bg-white p-8">
      <SectionLabel>For providers</SectionLabel>
      <h1 className="mt-2 text-xl font-semibold text-heading">
        Apply to join Homebirth.com
      </h1>
      <p className="mt-1 text-sm text-muted">
        Start building your profile. Takes about 5 minutes.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <Input
          label="Full name"
          placeholder="Your full name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@practice.com"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => {
              const next = { ...prev };
              delete next.email;
              return next;
            });
          }}
          error={errors.email}
        />

        {errors.email?.includes("already exists") && (
          <Link
            href="/provider-sign-in"
            className="text-sm font-medium text-primary hover:underline"
          >
            Sign in instead
          </Link>
        )}

        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        {/* Credential type chips */}
        <div>
          <label className="block text-sm font-medium text-heading">
            Credential type
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {credentialOptions.map((cred) => {
              const selected = credentials.includes(cred);
              return (
                <button
                  key={cred}
                  type="button"
                  onClick={() => toggleCredential(cred)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary text-white"
                      : "border-card-border text-heading hover:border-primary"
                  }`}
                >
                  {cred}
                </button>
              );
            })}
          </div>
          {errors.credentials && (
            <p className="mt-1 text-xs text-red-500">{errors.credentials}</p>
          )}
        </div>

        <Button fullWidth className="mt-1">
          Apply
        </Button>
      </form>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
        By applying, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="mt-3 text-center text-xs text-muted">
        Already have an account?{" "}
        <Link
          href="/provider-sign-in"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
