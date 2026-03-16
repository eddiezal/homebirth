"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SectionLabel, Button, Input } from "@/components/ui";
import { signUpProvider, claimProviderProfile } from "@/lib/supabase/auth";
import { searchProvidersByName } from "@/lib/queries/providers";
import { saveOnboardingData, saveOnboardingStep } from "@/lib/utils/onboarding-storage";
import { INITIAL_ONBOARDING_DATA } from "@/lib/types/onboarding";
import type { Provider } from "@/lib/types/provider";

const credentialOptions = ["CNM", "CPM", "LM", "CM", "Doula", "Other"];

export default function ProviderApplyPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    }>
      <ProviderApplyContent />
    </Suspense>
  );
}

function ProviderApplyContent() {
  const searchParams = useSearchParams();
  const claimName = searchParams.get("claim");

  if (claimName) {
    return <ClaimFlow initialName={claimName} />;
  }

  return <ApplyFlow />;
}

/* ─── Claim Flow ─────────────────────────────────────────────────── */

function ClaimFlow({ initialName }: { initialName: string }) {
  const [searchQuery, setSearchQuery] = useState(initialName);
  const [results, setResults] = useState<Provider[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const doSearch = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    const providers = await searchProvidersByName(query, 10);
    setResults(providers);
    setSearching(false);
  }, []);

  // Search on mount with the claim name
  useEffect(() => {
    if (initialName) doSearch(initialName);
  }, [initialName, doSearch]);

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProvider) return;

    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    const result = await claimProviderProfile(selectedProvider.id, email, password);

    if (result?.error) {
      setErrors({ [result.field || "email"]: result.error });
      setLoading(false);
      return;
    }

    // Seed onboarding with existing provider data
    if (typeof window !== "undefined") {
      const creds = selectedProvider.credentials
        ? selectedProvider.credentials.split(/[,/]/).map((c) => c.trim()).filter(Boolean)
        : [];
      saveOnboardingData({
        ...INITIAL_ONBOARDING_DATA,
        fullName: selectedProvider.name,
        credentialType: creds,
        practiceLocation: selectedProvider.location || "",
      });
      saveOnboardingStep(1);
    }
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="rounded-[12px] border border-card-border bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
          <svg className="h-7 w-7 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="mt-4 text-xl font-semibold text-heading">
          Profile claimed!
        </h1>
        <p className="mt-2 text-sm text-muted">
          Complete your profile to start receiving consult requests from
          matched parents.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button href="/onboarding">
            Complete your profile →
          </Button>
          <Button variant="outlined" href="/provider-dashboard">
            Go to dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Phase 2: Account creation for selected provider
  if (selectedProvider) {
    return (
      <div className="rounded-[12px] border border-card-border bg-white p-8">
        <SectionLabel>Claim your profile</SectionLabel>
        <h1 className="mt-2 text-xl font-semibold text-heading">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted">
          Set up sign-in credentials to claim this profile.
        </p>

        {/* Selected provider preview */}
        <div className="mt-5 flex items-center gap-3 rounded-[12px] border border-primary/20 bg-primary-light p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {selectedProvider.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-heading">{selectedProvider.name}</p>
            <p className="text-xs text-muted">
              {[selectedProvider.credentials, selectedProvider.location].filter(Boolean).join(" · ")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedProvider(null)}
            className="text-xs font-medium text-primary hover:underline"
          >
            Change
          </button>
        </div>

        <form onSubmit={handleClaim} className="mt-6 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@practice.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => { const next = { ...prev }; delete next.email; return next; });
            }}
            error={errors.email}
          />

          {errors.email?.includes("already exists") && (
            <Link href="/provider-sign-in" className="text-sm font-medium text-primary hover:underline">
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

          <Button fullWidth className="mt-1" disabled={loading}>
            {loading ? "Claiming profile..." : "Claim profile & create account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
          By claiming, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    );
  }

  // Phase 1: Search and select provider to claim
  return (
    <div className="rounded-[12px] border border-card-border bg-white p-8">
      <SectionLabel>Claim your profile</SectionLabel>
      <h1 className="mt-2 text-xl font-semibold text-heading">
        Find your profile
      </h1>
      <p className="mt-1 text-sm text-muted">
        Search for your name to find and claim your existing listing.
      </p>

      <div className="mt-5">
        <Input
          label="Search by name"
          placeholder="Your full name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            doSearch(e.target.value);
          }}
        />
      </div>

      {/* Search results */}
      <div className="mt-4 flex flex-col gap-2">
        {searching && (
          <p className="py-4 text-center text-sm text-muted">Searching...</p>
        )}

        {!searching && results.length > 0 && results.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => setSelectedProvider(provider)}
            className="flex items-center gap-3 rounded-[12px] border border-card-border p-4 text-left transition-colors hover:border-primary hover:bg-primary-light/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-muted">
              {provider.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-heading">{provider.name}</p>
              <p className="text-xs text-muted">
                {[provider.credentials, provider.location].filter(Boolean).join(" · ")}
              </p>
            </div>
            <svg className="h-5 w-5 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}

        {!searching && searchQuery.trim().length >= 2 && results.length === 0 && (
          <div className="rounded-[12px] border border-card-border bg-gray-50 p-6 text-center">
            <p className="text-sm text-muted">
              No unclaimed profiles found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-2 text-xs text-muted">
              Your profile may already be claimed, or you might need to create a new one.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button variant="outlined" size="sm" href="/provider-sign-in">
                Sign in
              </Button>
              <Button size="sm" href="/provider-apply">
                Create new profile
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-card-border pt-4">
        <p className="text-center text-xs text-muted">
          Don&apos;t see yourself?{" "}
          <Link href="/provider-apply" className="font-medium text-primary hover:underline">
            Create a new profile instead
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ─── Standard Apply Flow (unchanged) ────────────────────────────── */

function ApplyFlow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleCredential(cred: string) {
    setCredentials((prev) =>
      prev.includes(cred) ? prev.filter((c) => c !== cred) : [...prev, cred]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
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

    setLoading(true);
    const result = await signUpProvider(name, email, password, credentials);

    if (result?.error) {
      setErrors({ [result.field || "email"]: result.error });
      setLoading(false);
      return;
    }

    // Seed onboarding data for the wizard
    if (typeof window !== "undefined") {
      saveOnboardingData({
        ...INITIAL_ONBOARDING_DATA,
        fullName: name,
        credentialType: credentials,
      });
      saveOnboardingStep(1);
    }
    setSuccess(true);
    setLoading(false);
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
          Account created!
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

        <Button fullWidth className="mt-1" disabled={loading}>
          {loading ? "Creating account..." : "Apply"}
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
