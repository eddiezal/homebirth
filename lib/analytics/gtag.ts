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

/** Debug mode is gated by BOTH the env var AND a non-Production Vercel env.
 *  We use NEXT_PUBLIC_VERCEL_ENV (not NODE_ENV) because Vercel Preview builds
 *  run with NODE_ENV=production — they share the optimized build path with
 *  Production. NEXT_PUBLIC_VERCEL_ENV distinguishes `preview` from
 *  `production`, and is undefined locally (next dev), so:
 *    - Production (VERCEL_ENV=production): short-circuits, no debug
 *    - Preview (VERCEL_ENV=preview): honors the env var
 *    - Local dev (VERCEL_ENV=undefined): honors the env var
 *  This keeps prod traffic clean even if NEXT_PUBLIC_GA_DEBUG leaks into
 *  Production by misconfiguration. */
export const GA_DEBUG =
  process.env.NEXT_PUBLIC_GA_DEBUG === "1" &&
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

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
