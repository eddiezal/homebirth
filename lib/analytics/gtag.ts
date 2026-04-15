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
const DEBUG_MODE = process.env.NEXT_PUBLIC_GA_DEBUG === "1";

const isEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  if (!GA_ID) return false;
  if (process.env.NODE_ENV !== "production" && !DEBUG_MODE) {
    return false;
  }
  return typeof window.gtag === "function";
};

/** Tag every event with debug_mode when NEXT_PUBLIC_GA_DEBUG=1 so it
 *  shows up in GA4 DebugView. */
const withDebug = (params: Record<string, unknown>): Record<string, unknown> =>
  DEBUG_MODE ? { ...params, debug_mode: true } : params;

/** Fire a page_view event. Call on route change. */
export function pageview(url: string): void {
  if (!isEnabled()) return;
  window.gtag(
    "event",
    "page_view",
    withDebug({
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    }),
  );
}

/** Fire an arbitrary GA4 event. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (!isEnabled()) return;
  window.gtag("event", name, withDebug(params));
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
