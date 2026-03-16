import { Resend } from "resend";

// Resend client — uses RESEND_API_KEY from environment.
// In development without a key, emails are logged to console instead of sent.
const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

// Default "from" address — update when domain is verified.
// Resend's free tier allows sending from "onboarding@resend.dev" for testing.
export const EMAIL_FROM =
  process.env.EMAIL_FROM || "Homebirth.com <onboarding@resend.dev>";
