/**
 * GA4 analytics helpers.
 *
 * No-ops when:
 *  - NEXT_PUBLIC_GA_ID is not set
 *  - NODE_ENV !== "production" (override with NEXT_PUBLIC_GA_DEBUG=1 to test locally)
 *  - window is undefined (SSR)
 *
 * Set NEXT_PUBLIC_GA_DEBUG=1 in .env.local to fire events from dev — useful
 * for verifying with GA4 DebugView before pushing to prod.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Debug mode is gated by BOTH the env var AND a non-prod build. This makes
 *  the code resilient to misconfiguration in Vercel — if someone sets
 *  NEXT_PUBLIC_GA_DEBUG=1 on Production by mistake, prod traffic still
 *  flows to standard reports instead of being routed to DebugView only. */
export const GA_DEBUG =
  process.env.NEXT_PUBLIC_GA_DEBUG === "1" &&
  process.env.NODE_ENV !== "production";

const isEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  if (!GA_ID) return false;
  if (process.env.NODE_ENV !== "production" && !GA_DEBUG) {
    return false;
  }
  return typeof window.gtag === "function";
};

/** Fire a page_view event. Call on route change. */
export function pageview(url: string): void {
  if (!isEnabled()) return;
  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Fire an arbitrary GA4 event. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (!isEnabled()) return;
  window.gtag("event", name, params);
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
