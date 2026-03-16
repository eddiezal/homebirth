"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Modal, Card, Button, Input } from "@/components/ui";
import { submitConsultRequest } from "@/lib/actions/submit-consult";
import { loadIntakeAnswers } from "@/lib/utils/intake-storage";
import type { Provider } from "@/lib/types/provider";

interface ConsultRequestModalProps {
  provider: Provider;
  open: boolean;
  onClose: () => void;
}

export function ConsultRequestModal({
  provider,
  open,
  onClose,
}: ConsultRequestModalProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[\d\s\-().+]{7,}$/.test(form.phone)) {
      errs.phone = "Please enter a valid phone number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Load intake answers from sessionStorage to persist with the consult
    const stored = loadIntakeAnswers();

    const result = await submitConsultRequest(
      provider.id,
      form.name,
      form.email,
      form.phone,
      provider.matchScore,
      provider.matchReasons,
      stored ? { answers: stored.answers, zip: stored.zip } : undefined
    );

    if (result.error) {
      setErrors({ [result.field || "email"]: result.error });
      setLoading(false);
      return;
    }

    setLoading(false);
    onClose();
    router.push(`/confirmation?consult=${result.consultId}`);
  }

  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-1 text-muted hover:bg-gray-100 hover:text-heading"
        aria-label="Close"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Heading */}
      <h2 className="text-lg font-semibold text-heading">Request a consult</h2>
      <p className="mt-1 text-sm text-muted">
        Share your contact info so the provider can reach you.
      </p>

      {/* Provider mini-card */}
      <Card variant="teal" padding="p-4" className="mt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-heading">{provider.name}</p>
            <p className="text-xs text-muted">
              {provider.credentials} · {provider.location} · {provider.distance} mi
            </p>
          </div>
          <span className="text-lg font-bold text-primary">
            {provider.matchScore}%
          </span>
        </div>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
        <Input
          label="Your name"
          placeholder="Full name"
          required
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="(555) 123-4567"
          required
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          error={errors.phone}
        />

        {errors.email?.includes("already exists") && (
          <Link
            href="/sign-in"
            className="text-sm font-medium text-primary hover:underline"
          >
            Sign in instead
          </Link>
        )}

        <Button fullWidth className="mt-1" disabled={loading}>
          {loading ? "Sending request..." : "Send request"}
        </Button>
      </form>

      {/* What happens next */}
      <div className="mt-5 border-t border-card-border pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
          What happens next
        </h3>
        <ol className="mt-3 flex flex-col gap-2.5">
          {[
            "Provider receives your request with your intake profile",
            "Most providers respond within 24–48 hours",
            "You'll get an email + text when they respond",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-[10px] font-semibold text-primary">
                {i + 1}
              </span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Privacy note */}
      <p className="mt-4 text-[11px] leading-relaxed text-muted">
        Your info is only shared with providers you request consults from. We
        never sell your data.{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy policy
        </Link>
      </p>

      {/* Sign in link */}
      <p className="mt-3 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline" onClick={onClose}>
          Sign in
        </Link>
      </p>
    </Modal>
  );
}
