"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { MOCK_ERROR_EMAIL, MOCK_WRONG_PASSWORD } from "@/lib/data/mock-auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockMessage, setLockMessage] = useState("");

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

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!validateEmail()) return;

    // Mock: email not found
    if (email.toLowerCase() === MOCK_ERROR_EMAIL) {
      setErrors({
        email:
          "We don't have an account with that email. Did you mean to find a midwife?",
      });
      return;
    }

    if (password) {
      // Mock: wrong password
      if (password === MOCK_WRONG_PASSWORD) {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);

        if (attempts >= 3) {
          setLocked(true);
          setLockMessage(
            "We sent a sign-in link to your email for security."
          );
          return;
        }

        setErrors({
          password: "That password isn't right.",
        });
        return;
      }

      // Mock: success with password
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "homebirth_auth_session",
          JSON.stringify({ email, name: "Parent User" })
        );
      }
      router.push("/results");
    } else {
      // Email only → magic link
      if (typeof window !== "undefined") {
        sessionStorage.setItem("homebirth_auth_email", email);
      }
      router.push("/sign-in/magic-link-sent");
    }
  }

  function handleMagicLink() {
    if (!validateEmail()) return;

    if (email.toLowerCase() === MOCK_ERROR_EMAIL) {
      setErrors({
        email:
          "We don't have an account with that email. Did you mean to find a midwife?",
      });
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("homebirth_auth_email", email);
    }
    router.push("/sign-in/magic-link-sent");
  }

  return (
    <div className="rounded-[12px] border border-card-border bg-white p-8">
      <h1 className="text-xl font-semibold text-heading">
        Sign in to your account
      </h1>
      <p className="mt-1 text-sm text-muted">
        Welcome back. Sign in to track your consult requests.
      </p>

      <form onSubmit={handleSignIn} className="mt-6 flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({});
          }}
          error={errors.email}
        />

        {errors.email?.includes("find a midwife") && (
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            Find a midwife
          </Link>
        )}

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
            onClick={handleMagicLink}
            className="text-left text-sm font-medium text-primary hover:underline"
          >
            Send me a sign-in link instead
          </button>
        )}

        {locked && (
          <div className="rounded-[8px] bg-amber-50 p-3">
            <p className="text-sm text-amber-800">{lockMessage}</p>
          </div>
        )}

        <Button fullWidth disabled={locked}>
          Sign in
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
          onClick={handleMagicLink}
        >
          Send me a sign-in link
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted">
        Don&apos;t have an account? It&apos;s created when you{" "}
        <Link href="/" className="font-medium text-primary hover:underline">
          request a consult
        </Link>
        .
      </p>

      <p className="mt-2 text-center text-xs text-muted">
        Are you a provider?{" "}
        <Link
          href="/provider-sign-in"
          className="font-medium text-primary hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
