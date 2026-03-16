# Homebirth.com — Roadmap to Launch

**Created:** 2026-03-15
**Updated:** 2026-03-16
**Current sprint:** All sprints complete — ready for deployment

---

## Completed Work

### Sprints 1–4: UI Layer (DONE)
All pages built with real UI, mock data, and sessionStorage persistence:

- **Public:** Homepage, Fork First, Intake (18 Qs), Processing animation, Match results (split cards + sidebar), Provider profiles (3 tabs), Confirmation, Onboarding (8-step wizard), Resources, Questions library, Privacy, Terms
- **Auth:** Parent sign-in, magic link flow, set password, provider sign-in, provider apply
- **Parent:** Dashboard, messaging (two-panel + availability picker), preferences editor, exploring path
- **Provider:** Narrative dashboard, split inbox + response composer, profile editor
- **Shared:** 16 UI components, Nav, Footer, ConsultRequestModal, PreferencesSlideOver
- **Logic:** Matching engine (hard filters + soft scoring) with 15 smoke tests

### Sprint 5: Supabase Foundation (DONE)
- [x] Supabase project created, `@supabase/supabase-js` + `@supabase/ssr` installed
- [x] `lib/supabase/server.ts` (SSR client) + `lib/supabase/admin.ts` (service role client)
- [x] `middleware.ts` for auth session refresh
- [x] Full schema deployed: `parents`, `providers`, `provider_education`, `provider_reviews`, `provider_ratings`, `intakes`, `consults`, `messages`, `waitlist`
- [x] RLS policies on all tables (using `SECURITY DEFINER` helper functions to avoid recursion)
- [x] Indexes, triggers (`updated_at`), realtime enabled on messages + consults
- [x] Auth wired: `signInWithPassword()`, `sendMagicLink()`, `signUpProvider()`, `signUpParent()`, `setPassword()`, `signOut()`, `getUser()`, `getUserProfile()`
- [x] Provider queries: `getAllProviders()`, `getProviderById()`, `getDirectoryProviders()`, `searchProvidersByName()`
- [x] Route guards on `(parent)` and `(provider)` layouts
- [x] Nav components use real sessions

### Sprint 5b: Data Pipeline (DONE)
- [x] 4,772 real scraped providers imported into Supabase (NPI Registry + Google Places + WA State Board)
- [x] Fake seed providers deleted
- [x] Directory listing on results page (shows unclaimed providers with pagination)
- [x] `DirectoryCard` component for compact unclaimed provider display
- [x] Unclaimed provider profile page (limited info + "Claim this profile" banner)
- [x] Provider claim flow: search by name → select profile → create account → link to existing row
- [x] `claimProviderProfile()` server action

### Sprint 6: Core Parent Flow (DONE)
- [x] `lib/queries/consults.ts` — `createConsult()`, `getConsultById()`, `getConsultsByParent()`, `getConsultsByProvider()`
- [x] `lib/actions/submit-consult.ts` — full consult submission: auth → parent record → intake persist → consult + system message
- [x] `ConsultRequestModal` wired to real DB (creates auth user, parent, intake, consult)
- [x] Confirmation page loads consult from DB by ID
- [x] Intake answers persist to `intakes` table (on consult request if anonymous)
- [x] Provider onboarding writes to `providers` table via `updateProviderProfile()`
- [x] `OnboardingWizard` "Launch my profile" sets `onboarding_complete = true`

### Sprint 7: Provider Dashboard + Inbox — Real Data (DONE)
- [x] `lib/queries/dashboard.ts` — assembles `ProviderDashboardData` from real DB (greeting, pipeline, timeline, profile health)
- [x] `lib/queries/provider-leads.ts` — `getProviderLeads()` with filtering
- [x] Provider dashboard page → server component fetching real data
- [x] Provider inbox page → server component, mutations via `sendProviderResponse()`, `declineConsult()`
- [x] Provider profile editor reads/writes real DB via `getProviderEditProfile()`, `updateProviderProfile()`
- [x] Provider layout passes `providerName` + `newLeadCount` to ProviderNav
- [x] Deleted: `lib/data/mock-leads.ts`, `lib/data/mock-dashboard.ts`, `lib/utils/lead-storage.ts`
- [x] RLS fix: `SECURITY DEFINER` functions (`my_parent_id()`, `my_provider_id()`) to break circular policy evaluation
- [x] Seed script: `scripts/seed-test-provider.mjs` — creates test provider + 2 parents + consults + messages

### Sprint 8: Parent Dashboard + Messaging — Real Data (DONE)
- [x] `lib/queries/parent-dashboard.ts` — `getParentConsultCards()`, `getParentThreads()`
- [x] Parent dashboard page → server component fetching real consults
- [x] Parent messages page → server component fetching real threads
- [x] `MessagesView` sends messages via `sendMessage()`, confirms slots via `confirmTimeSlot()`
- [x] Parent layout passes `parentName` to ParentNav (no more sessionStorage)
- [x] Cleaned up `lib/utils/notifications.ts` (removed sessionStorage dependency)
- [x] Deleted: `lib/data/mock-consults.ts`, `lib/data/mock-threads.ts`, `lib/data/mock-parent-dashboard.ts`, `lib/data/mock-auth.ts`, `lib/data/mock-providers.ts`, `lib/utils/parent-storage.ts`
- [x] Seed script updated with parent test account URLs

### Sprint 9: Notifications + For Providers Page (DONE)
- [x] **For Providers landing page** at `/providers` (section 12):
  - Hero ("Two sides of the same experience")
  - 4-row side-by-side walkthrough (gray parent cards ↔ teal provider cards)
  - Lead packet preview card (sample lead with match reasons)
  - 3-tier pricing section (Basic $49 / Pro $99 / Practice $199, all free during beta)
  - Dark bottom CTA → `/provider-apply`
- [x] **Email infrastructure** via Resend:
  - `lib/email/resend.ts` — client (falls back to console.log without API key)
  - `lib/email/send.ts` — `sendEmail()` server action
  - `lib/email/templates.ts` — 7 HTML email templates (4 parent, 3 provider)
  - `lib/email/notify.ts` — 3 notification dispatchers with DB lookups
- [x] **Triggers wired** (fire-and-forget, non-blocking):
  - `submitConsultRequest` → `notifyConsultCreated` (emails both sides)
  - `sendProviderResponse` → `notifyProviderResponded` (emails parent)
  - `confirmTimeSlot` → `notifyConsultScheduled` (emails both sides)
- [ ] SMS deferred to post-launch (email covers critical path)
- [ ] `RESEND_API_KEY` + `EMAIL_FROM` env vars needed to activate (logs to console until then)

---

### Sprint 10: Maps, Mobile, Polish, Launch (DONE)
- [x] **Google Maps component** (`components/MapView.tsx`):
  - `@googlemaps/js-api-loader` v2 with `setOptions` + `importLibrary`
  - Provider pins (teal circles, initials), "You" marker (blue), bi-directional hover highlighting
  - Falls back to placeholder gracefully when no API key
  - ResultsSidebar wired with map, card ↔ pin hover + click-to-scroll
  - Mobile: collapsed by default, toggle to show/hide
- [x] **Empty states** (`components/empty-states/`):
  - `OutOfArea` — waitlist signup with progress bar, city demand leaderboard, content fallback
  - `NoResults` — demand signal card, alert-me email, broaden search, browse all
  - `EmptyProviderInbox` — profile optimization checklist with impact stats
  - `EmptyParentDashboard` — top match teaser card + retake intake link
  - `lib/actions/waitlist.ts` — `joinWaitlist()` + `getWaitlistCounts()` server actions
- [x] **Mobile responsive audit** — all two-panel layouts verified:
  - `lg:` breakpoints collapse properly across all pages
  - No hardcoded widths overflow at 375px
  - Drill-in patterns (messages, inbox) with back buttons
  - Sticky bottom CTA on provider profile
  - Filter pills scroll horizontally
- [x] **Zod input validation** (`lib/validations.ts`):
  - Schemas for: consult request, message, provider response, waitlist, provider profile
  - Wired into: `submitConsultRequest`, `sendMessage`, `sendProviderResponse`, `joinWaitlist`
- [x] **Security headers** in `next.config.ts`:
  - X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy
- [x] **Deployment prep:**
  - `.env.example` with all required env vars documented
  - `.gitignore` updated to allow `.env.example`
  - Production build succeeds (`next build` — all routes compile)

**Remaining for go-live (manual steps):**
- Create Vercel project + add env vars
- Create Supabase production project (separate from dev)
- Point domain (homebirth.com) to Vercel
- Set up Resend account + verify sender domain
- Add `NEXT_PUBLIC_GOOGLE_MAPS_KEY` for maps
- Playwright E2E tests (optional pre-launch, can run post-launch)
- Lighthouse audit

---

## Post-Launch (Not in scope for MVP)

- SMS notifications via Twilio
- Review aggregation pipeline (Google/Yelp/Facebook scraping + sentiment)
- Provider analytics dashboard (lead conversion, view trends)
- Subscription billing (Stripe for Basic/Pro/Practice)
- Article/content CMS for exploring path
- Profile view tracking
- Real-time messaging (Supabase Realtime subscriptions)
- Phase 2: open messaging, birth plan builder, document sharing, scheduling
- Phase 3: birth stories, community feed, expanded directory

---

## File Cleanup Tracker

| File | Replaced In | Status |
|------|-------------|--------|
| `lib/data/mock-auth.ts` | Sprint 8 | **DELETED** |
| `lib/data/mock-providers.ts` | Sprint 8 | **DELETED** |
| `lib/data/mock-leads.ts` | Sprint 7 | **DELETED** |
| `lib/data/mock-dashboard.ts` | Sprint 7 | **DELETED** |
| `lib/data/mock-consults.ts` | Sprint 8 | **DELETED** |
| `lib/data/mock-threads.ts` | Sprint 8 | **DELETED** |
| `lib/data/mock-parent-dashboard.ts` | Sprint 8 | **DELETED** |
| `lib/utils/lead-storage.ts` | Sprint 7 | **DELETED** |
| `lib/utils/parent-storage.ts` | Sprint 8 | **DELETED** |
| `lib/utils/consult-storage.ts` | Sprint 6 | Pending |
| `lib/utils/onboarding-storage.ts` | Sprint 6 | Pending |

**Keeps:** `lib/data/intake-questions.ts` (static config), `lib/matching/score.ts` (reused server-side), `lib/utils/intake-storage.ts` (needed for anonymous intake flow).
