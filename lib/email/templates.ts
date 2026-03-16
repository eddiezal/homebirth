// Transactional email templates for Homebirth.com
// Simple HTML — no external dependencies. Inline styles for email client compatibility.

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function layout(content: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f8f9fb;">
<div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;">
  <div style="padding:32px 32px 0;text-align:center;">
    <a href="${BASE_URL}" style="font-size:20px;font-weight:700;color:#1a6b5a;text-decoration:none;letter-spacing:-0.02em;">homebirth</a>
  </div>
  <div style="padding:24px 32px 32px;">
    ${content}
  </div>
</div>
<div style="text-align:center;padding:16px;font-size:12px;color:#6b7280;">
  Homebirth.com &middot; You received this because of activity on your account.
</div>
</body>
</html>`;
}

function button(text: string, href: string) {
  return `<div style="text-align:center;margin:24px 0;">
  <a href="${href}" style="display:inline-block;padding:12px 28px;background:#111827;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">${text}</a>
</div>`;
}

// ─── Parent Emails ──────────────────────────────────────────────

/** Sent when parent submits a consult request */
export function parentConsultConfirmation(p: {
  parentName: string;
  providerName: string;
  dashboardUrl?: string;
}) {
  const url = p.dashboardUrl || `${BASE_URL}/dashboard`;
  return {
    subject: `Your consult request was sent to ${p.providerName}`,
    html: layout(`
      <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">Your request has been sent!</h2>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        Hi ${p.parentName}, your consult request was sent to <strong style="color:#111827;">${p.providerName}</strong>.
        Most providers respond within 24&ndash;48 hours.
      </p>
      <p style="font-size:14px;color:#6b7280;line-height:1.5;">
        <strong style="color:#111827;">What happens next:</strong>
      </p>
      <ol style="font-size:14px;color:#6b7280;line-height:1.8;padding-left:20px;">
        <li>${p.providerName} reviews your profile and intake answers</li>
        <li>She responds with available times for a consult call</li>
        <li>You pick a time and schedule your call</li>
      </ol>
      ${button("View your dashboard", url)}
      <p style="font-size:13px;color:#6b7280;text-align:center;">
        We'll email you again when ${p.providerName} responds.
      </p>
    `),
  };
}

/** Sent when provider responds to a consult request */
export function parentProviderResponded(p: {
  parentName: string;
  providerName: string;
  messagePreview: string;
  messagesUrl?: string;
}) {
  const url = p.messagesUrl || `${BASE_URL}/messages`;
  return {
    subject: `${p.providerName} responded to your consult request`,
    html: layout(`
      <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">
        ${p.providerName} responded!
      </h2>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        Hi ${p.parentName}, great news &mdash; ${p.providerName} has responded to your consult request.
      </p>
      <div style="background:#f3f4f6;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="font-size:14px;color:#111827;margin:0;font-style:italic;line-height:1.5;">
          &ldquo;${p.messagePreview}&rdquo;
        </p>
      </div>
      ${button("View message & pick a time", url)}
    `),
  };
}

/** Sent when a consult is confirmed/scheduled */
export function parentConsultScheduled(p: {
  parentName: string;
  providerName: string;
  day: string;
  time: string;
  messagesUrl?: string;
}) {
  const url = p.messagesUrl || `${BASE_URL}/messages`;
  return {
    subject: `Consult scheduled with ${p.providerName} — ${p.day} at ${p.time}`,
    html: layout(`
      <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">
        Your consult is confirmed!
      </h2>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        Hi ${p.parentName}, your consult with <strong style="color:#111827;">${p.providerName}</strong>
        is scheduled for:
      </p>
      <div style="background:#e6f3f0;border-radius:8px;padding:16px;text-align:center;margin:16px 0;">
        <p style="font-size:18px;font-weight:600;color:#1a6b5a;margin:0;">
          ${p.day} at ${p.time}
        </p>
      </div>
      <p style="font-size:14px;color:#6b7280;line-height:1.5;">
        <strong style="color:#111827;">How to prepare:</strong>
      </p>
      <ul style="font-size:14px;color:#6b7280;line-height:1.8;padding-left:20px;">
        <li>Review your <a href="${BASE_URL}/questions" style="color:#1a6b5a;">questions to ask</a></li>
        <li>Have your insurance info handy if applicable</li>
        <li>Find a quiet spot for the call</li>
      </ul>
      ${button("View your messages", url)}
    `),
  };
}

/** Sent 7 days after consult request with no provider response */
export function parentNoResponseNudge(p: {
  parentName: string;
  providerName: string;
  resultsUrl?: string;
}) {
  const url = p.resultsUrl || `${BASE_URL}/results`;
  return {
    subject: `Haven't heard back? Try your other matches`,
    html: layout(`
      <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">
        Still waiting on ${p.providerName}?
      </h2>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        Hi ${p.parentName}, it's been a few days since you requested a consult
        with ${p.providerName}. Some providers take longer to respond, but
        you don't have to wait.
      </p>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        You have other great matches who may be available sooner.
      </p>
      ${button("See your other matches", url)}
    `),
  };
}

// ─── Provider Emails ────────────────────────────────────────────

/** Sent when provider receives a new lead */
export function providerNewLead(p: {
  providerName: string;
  parentName: string;
  matchScore: number;
  dueDate: string;
  tags: string[];
  inboxUrl?: string;
}) {
  const url = p.inboxUrl || `${BASE_URL}/provider-inbox`;
  const tagHtml = p.tags
    .map(
      (t) =>
        `<span style="display:inline-block;background:#e6f3f0;color:#1a6b5a;font-size:12px;font-weight:500;padding:3px 10px;border-radius:12px;margin:2px 4px 2px 0;">${t}</span>`
    )
    .join("");
  return {
    subject: `New consult request from ${p.parentName}`,
    html: layout(`
      <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">
        New lead: ${p.parentName}
      </h2>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        Hi ${p.providerName}, you have a new consult request.
      </p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="font-size:15px;font-weight:600;color:#111827;margin:0 0 4px;">
          ${p.parentName}
          <span style="font-weight:400;color:#1a6b5a;font-size:13px;margin-left:8px;">${p.matchScore}% match</span>
        </p>
        <p style="font-size:13px;color:#6b7280;margin:0 0 10px;">Due ${p.dueDate}</p>
        <div>${tagHtml}</div>
      </div>
      <p style="font-size:14px;color:#6b7280;line-height:1.5;">
        Parents who get a response within 24 hours are <strong style="color:#111827;">3x more likely</strong> to book a consult.
      </p>
      ${button("Respond now", url)}
    `),
  };
}

/** Sent when parent confirms a time slot */
export function providerTimeConfirmed(p: {
  providerName: string;
  parentName: string;
  day: string;
  time: string;
  inboxUrl?: string;
}) {
  const url = p.inboxUrl || `${BASE_URL}/provider-inbox`;
  return {
    subject: `${p.parentName} confirmed — ${p.day} at ${p.time}`,
    html: layout(`
      <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">
        Consult confirmed!
      </h2>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        Hi ${p.providerName}, <strong style="color:#111827;">${p.parentName}</strong>
        confirmed a consult time:
      </p>
      <div style="background:#e6f3f0;border-radius:8px;padding:16px;text-align:center;margin:16px 0;">
        <p style="font-size:18px;font-weight:600;color:#1a6b5a;margin:0;">
          ${p.day} at ${p.time}
        </p>
      </div>
      ${button("View in inbox", url)}
    `),
  };
}

/** Sent when provider hasn't responded to a lead after 24 hours */
export function providerLeadReminder(p: {
  providerName: string;
  parentName: string;
  inboxUrl?: string;
}) {
  const url = p.inboxUrl || `${BASE_URL}/provider-inbox`;
  return {
    subject: `Reminder: ${p.parentName} is waiting for your response`,
    html: layout(`
      <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">
        Don't miss this lead
      </h2>
      <p style="font-size:15px;color:#6b7280;margin:0 0 16px;line-height:1.5;">
        Hi ${p.providerName}, <strong style="color:#111827;">${p.parentName}</strong>
        requested a consult with you yesterday and is still waiting for a response.
      </p>
      <p style="font-size:14px;color:#6b7280;line-height:1.5;">
        Quick responses build trust &mdash; parents who hear back within 24 hours
        are much more likely to book.
      </p>
      ${button("Respond now", url)}
    `),
  };
}
