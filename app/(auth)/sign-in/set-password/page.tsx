"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { setPassword as updatePassword, getUser } from "@/lib/supabase/auth";
import { Suspense } from "react";

function SetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noSession, setNoSession] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const user = await getUser();
      if (user) {
        setEmail(user.email || "");
      } else {
        setNoSession(true);
      }
    }
    checkUser();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }
    if (password !== confirm) {
      errs.confirm = "Passwords don't match";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    const result = await updatePassword(password);

    if (result?.error) {
      setErrors({ [result.field || "password"]: result.error });
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (noSession) {
    return (
      <div className="rounded-[12px] border border-card-border bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
          <svg
            className="h-7 w-7 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-xl font-semibold text-heading">
          This link has expired
        </h1>
        <p className="mt-2 text-sm text-muted">
          Sign-in links are valid for 15 minutes.
        </p>
        <div className="mt-6">
          <Button variant="outlined" href="/sign-in">
            Send a new sign-in link
          </Button>
        </div>
      </div>
    );
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
          Password set!
        </h1>
        <p className="mt-2 text-sm text-muted">
          You can now sign in with your email and password.
        </p>
        <div className="mt-6">
          <Button href="/sign-in">Go to sign in</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[12px] border border-card-border bg-white p-8">
      <h1 className="text-xl font-semibold text-heading">Set a password</h1>
      <p className="mt-1 text-sm text-muted">
        Optional — you can always sign in with a magic link instead.
      </p>

      {email && (
        <div className="mt-4 rounded-[8px] bg-gray-50 px-3 py-2">
          <p className="text-sm text-muted">{email}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <Input
          label="New password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />
        <Button fullWidth disabled={loading}>
          {loading ? "Setting password..." : "Set password"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted hover:text-heading"
        >
          Skip for now — I&apos;ll keep using magic links
        </Link>
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-muted">Loading...</p>
        </div>
      }
    >
      <SetPasswordForm />
    </Suspense>
  );
}
