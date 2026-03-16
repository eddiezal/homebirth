"use server";

import { resend, EMAIL_FROM } from "./resend";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send a transactional email via Resend.
 * Falls back to console.log in development when no API key is configured.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  if (!resend) {
    console.log(`[email:dev] To: ${to}`);
    console.log(`[email:dev] Subject: ${subject}`);
    console.log(`[email:dev] Body preview: ${html.substring(0, 200)}...`);
    return { success: true, dev: true };
  }

  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error("[email] Failed to send:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("[email] Unexpected error:", err);
    return { success: false, error: "Failed to send email" };
  }
}
