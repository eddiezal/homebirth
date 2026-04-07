# CLAUDE.md — Homebirth.com

## What This Project Is

Homebirth.com is a trust-first marketplace and lightweight operating system for out-of-hospital birth. It connects expecting parents with midwives/doulas through a guided, symmetrical intake and matching system.

**This is NOT an EHR.** No medical records, no clinical charting. The focus is: **discovery → trust → matching → conversion (parent → consult → booking).**

**Document structure:**
- **Tech Stack + Design System** — foundational decisions
- **Page-by-Page UX (sections 1–21 + subsections)** — every screen spec'd in flow order: parent journey → provider journey → edge cases → auth → mobile → notifications → map
- **Core Concepts** — symmetrical intake, mirror intake, provider flow, matching logic (reference material for the page specs above)
- **MVP Feature Set** — canonical list of what ships at launch
- **Business + Operations** — pricing, GTM, metrics, guardrails, roadmap, conventions

---

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Auth
- **Hosting:** Vercel

---

## Design System — Soft & Illustrated

All pages follow the **Soft & Illustrated** style. This is locked in.

- **Fonts:** Fraunces (serif, headings/taglines/quotes) + Nunito (sans-serif, body/buttons/nav/labels)
- **Primary accent:** `#8b5fa0` (lavender)
- **Primary dark:** `#6b4c7c` (logo, dark accent, nav CTA)
- **Primary light:** `#d4b8e0` (borders, illustration accents)
- **Primary lighter:** `#f5e6f9` (badges, card backgrounds, number circles)
- **Primary bg:** `#f9f0fc` (section backgrounds)
- **Warm accents:** `#f0cfc0` (peach), `#fce8d5` (peach light), `#e8a0b8` (pink), `#b8d4a8` (green)
- **Text:** `#3a3535` (headings/body), `#7a6e6e` (secondary/muted), `#a89e9e` (faint/meta)
- **Cards:** `#ffffff` background, `2px solid #f0e4f5` border, hover border `#d4b8e0`
- **Card radius:** `22px`
- **Button radius:** `16px` (standard), `24px` (pills/nav CTA)
- **Page background:** `#fffcf8` (warm cream)
- **Section labels:** Uppercase, `13px`, `letter-spacing: 2.5px`, color `#8b5fa0`, weight 700
- **Hero headings:** Fraunces `48px`, weight 700, line-height 1.18
- **Section headings:** Fraunces `38px`, weight 600, line-height 1.2
- **Max content width:** `1200px` (standard), `1000px` (narrow sections)
- **Links:** Color `#8b5fa0` (lavender), no underline by default, underline on hover. Arrow links use weight 500.
- **Illustrations:** Pure CSS/SVG — no image dependencies. Lavender + peach + pink palette, floating animation on decorative elements.
- **Scroll animations:** Fade-up on scroll (IntersectionObserver, threshold 0.12, 0.7s ease transition)
- **No emojis in production** — mockups use emoji placeholders for avatars/icons; replace with real photos/SVG icons

---

## Page-by-Page UX Decisions

### 1. Homepage — Soft & Illustrated, Guide First

The homepage uses a **warm, illustrated, guide-first** approach: builds trust through personality and education before asking for action. Pure CSS/SVG illustrations, scroll animations, and conversational copy.

**Section flow (in order):**

1. **Nav** — Sticky, blurred background. Logo (Fraunces, lavender-dark) left, links right: "How it works", "For providers", "Resources", "Sign in" (pill button, lavender-dark bg)
2. **Hero** — Two-column grid: content left, CSS/SVG illustration right
   - Greeting badge: "Hey, welcome" with smiley icon
   - H1: "Find a midwife who *truly gets you*" (italic emphasis in lavender)
   - Subhead: "You shouldn't have to settle for whoever's available. Tell us what you care about, and we'll find someone who cares about the same things."
   - Zip code input + "Find my match" button
   - Meta: "Free, no account needed — takes about 2 minutes"
   - Illustration: Circular scene with house, people, trees, floating hearts/stars/moon/clouds — all CSS/SVG with float animation
3. **Scroll Indicator** — "explore" text + bouncing chevron, fades out after first scroll
4. **Guide Section** — Background: lavender-bg. Eyebrow: "Not sure where to begin?" Heading: "Honest answers to the questions you're already asking"
   - 3 cards in grid: "The beginner's guide", "Questions to ask", "Understanding costs"
   - Each card: custom SVG icon, title, description, hover lift effect
5. **How It Works** — Eyebrow: "How it works". Heading: "We do the searching. You do the choosing."
   - Matching illustration: gradient banner showing You → Match → Midwife flow with animated heart pulse
   - 3 step cards: "Tell us what matters", "Your matches, explained", "Say hello — they already know you"
6. **Questions Section** — Gradient background. Eyebrow: "Questions to ask". Heading: "Not sure what to ask? Here's a start."
   - 6 question bubbles with category tags (Safety, Trust, Budget, Comms, Values, Care), flex-wrap layout
7. **Testimonial** — Centered card with italic Fraunces quote, author name + location. Placeholder copy — replace with real testimonials when available.
8. **Trust Section** — Eyebrow: "Safety & trust". Heading: "Every provider is vetted with care"
   - 3 cards: "Identity verified", "License checked", "Match explained" — custom SVG icons
9. **Provider Callout** — Horizontal card targeting midwives: "Are you a homebirth provider?" with "Learn more" button
10. **Final CTA** — Purple gradient banner: "Ready when you are" / "No rush. No pressure. Just a better way to find your midwife." / "Start your match" button
11. **Footer** — Three-column: brand + tagline ("A softer way to find the person who'll walk beside you through birth."), family links, provider links. Bottom bar: copyright + privacy/terms

**All sections (except hero) use fade-up scroll animation** (IntersectionObserver, threshold 0.12)

**What's NOT on the homepage:**
- No provider cards / directory preview (roster doesn't exist at launch)
- No stats bar with fabricated numbers

---

### 2. Post-Zip Screen — Fork First

After parent enters zip and clicks "Find my match", they land on the **Fork First** screen.

**Layout:**
- Location confirmation badge at top: "San Diego, CA" + "Change" link
- Heading: "Where are you in your journey?"
- Subline: "We'll tailor your experience so you get exactly what's useful right now."
- **Two cards side by side:**
  1. **"I'm exploring"** — "Not sure if homebirth is right for me. I want to learn before I commit." → Routes to Exploring Path (Magazine Flow)
  2. **"I'm ready to match"** — "I want to find and compare providers who fit my needs." → Routes to full intake (12-18 Qs)

Each card has: icon, title, description, action link ("Show me resources →" / "Start matching →"), distinct background tint.

**Why 2 paths, not 3:** An earlier version had a third card ("I'm ready to book") that promised fast intake / direct matching. In practice, both matching paths need the same intake questions to produce good results — a "fast" intake just produces worse matches. Two honest paths (learn vs. match) is cleaner than three paths where two are identical. If data later shows that returning parents or high-intent visitors need a streamlined re-match flow, add it then.

---

### 3. Intake Flow

Triggered when parent chooses "I'm ready to match" from Fork First.

**UI pattern:**
- Progress bar at top: "Finding your match — Step X of 12" with filled bar
- One question per screen
- Large question heading + helper subline explaining why we ask
- Multiple-choice options as full-width clickable cards (not radio buttons)
- "← Back" on bottom left, "Skip this question" on bottom right
- Clean, centered layout, max-width ~640px

**Question set (12-18 questions):**

Hard Filters:
1. Location (already captured from zip)
2. Travel radius: 5 / 10 / 20 / 30+ miles
3. Estimated due date: month/year or trimester
4. Urgency: no rush / within a month / urgent (2 weeks)
5. Birth setting: home / birth center / either
6. Payment method: self-pay / insurance / Medicaid / not sure / flexible
7. Budget range: location-specific bands

Capability Match:
8. First birth? yes / no
9. VBAC interest? yes / no / maybe
10. Higher risk? yes / no / unsure (routing only, not clinical)

Soft Match:
11. Care style: hands-off / balanced / guided
12. Communication vibe: direct / gentle / educational / minimal
13. Top priority: calm reassurance / evidence-based / advocacy / holistic
14. Language preference: English / Spanish / bilingual / other
15. Support preferences (multi-select): trauma-informed / LGBTQ+ affirming / culturally specific / none
16. Transfer philosophy: hospital collaboration / calm guidance / no preference

Optional — Values & Spirituality (framed as "Values & Preferences — Optional"):
17. Faith/spiritual practices: important / nice-to-have / no pref / prefer secular
18. Spiritual tone: faith-based / spiritual non-denom / secular / not sure
19. Comfort preferences (multi-select): prayer / modesty / female-only team / clergy welcome / none

---

### 3b. Intake → Results Transition — Processing Animation

After the last intake question, show a **processing animation** (~3 seconds) before revealing results. This builds trust and creates the feeling that real work is happening.

**Layout:**
- Centered, max-width ~520px
- 3 animated dots at top (pulse/scale animation)
- Heading: "Finding your matches..."
- Rotating subline that cycles through stages:
  1. "Checking provider availability..."
  2. "Matching care style preferences..."
  3. "Scoring compatibility..."
  4. "Preparing your results..."
- Progress bar that fills from 0-100%
- Step-by-step checklist that checks off as progress advances:
  - Location & availability (at 25%)
  - Budget & payment (at 45%)
  - Care style & values (at 70%)
  - Ranking best matches (at 90%)
- Auto-transitions to Match Results page when complete

---

### 4. Match Results — Sidebar + Map with Split Cards

**Ungated — no login or account required to see matches.**

**Match count:** Intake produces 3-7 ranked providers. At early San Diego launch, total roster may be small enough that most parents see all available providers. The page handles any count from 1 to 7+ gracefully — if only 1-2 match, show them with a "Widen your search" nudge below.

**Page layout: two-column (cards left, sticky sidebar right)**

**Header row:**
- Left: Section label "Your matches" + heading "X providers matched in [location]"
- Right: Preference pills (Home birth, June 2026, VBAC, Insurance, Balanced care) + "Edit" link

**Left column — Split provider cards (stacked):**

Each card is a horizontal split:
- **Left side (~58%):** Provider info
  - Avatar/photo + name + credentials
  - Location, distance, years of experience, births attended
  - Philosophy quote (italic, 1-2 sentences)
  - Pricing range (bold) + response time
  - Capability tags: "VBAC-friendly", "Bilingual", "Trauma-informed", etc.
  - Two buttons: "Request consult" (dark primary) + "View profile" (outlined)
  - Acceptance status badge
- **Right side (~38%, teal background panel):** "Why this match"
  - Header: "Why this match" + match score percentage (e.g., 97%)
  - Checklist of match reasons with checkmark icons
  - e.g.: Within 5 miles, Open for June due date, VBAC-experienced

**No dropdowns or accordions.** All info is always visible. No hidden content.

**Right column — Sticky sidebar:**
- **Map** (Google Maps — see section 21 for full spec): Shows provider pins with initials + match score. Blue "You" marker for parent location. Hover a card → pin highlights. Hover a pin → card highlights (bi-directional).
- **Quick filters** (checkboxes): Accepting clients only, Within 10 miles, Sliding scale / Medicaid, VBAC experienced
- **Sort toggle:** Best match (default) / Distance / Experience

**Bottom:** "Not finding the right match? Widen search radius or adjust preferences"

---

### 4b. Provider Profile Page

Accessed when parent clicks "View profile" on a match card. Full-page dedicated profile with tabbed sections.

**Header:**
- Back link: "← Back to matches"
- Large avatar + Name + Credentials (e.g., "Sarah Chen, CNM, MSN")
- Location, distance, experience
- Status badge (Accepting clients)
- Aggregate star rating + review count + source badges (Google, Yelp, Facebook icons)

**Sticky sidebar (right, ~280px):**
- Match score (large, e.g., 97%) + match reason checklist with checkmarks
- "Request consult" button (full width, dark primary)
- Response time note
- Verification badges: Identity verified, License verified, Practice verified

**Tabbed content sections (3 tabs):**

1. **About** (consolidates Overview + Approach + Credentials)
   - Philosophy (paragraph)
   - Specialties & tags (teal pills)
   - Birth settings (Home birth, Birth center — with icons)
   - Scope of care (checklist: VBAC, First births, Water birth, etc.)
   - Transfer plan & hospital relationships (card with paragraph)
   - Communication style tags (e.g., Balanced approach, Shared decision-making, Evidence-based counseling)
   - Languages
   - Education & certifications (list with graduation cap icons)
   - Verification status (detailed: "Identity verified — confirmed via government-issued ID", "License verified — checked against California state records", "Practice verified — confirmed active practice and location")

2. **Reviews**
   - **Aggregate rating block:** Large rating number (e.g., 4.9), stars, total review count, "across X platforms"
   - **Source breakdown cards:** One card per source (Google, Yelp, Facebook), each showing: branded icon + color, source name, individual rating with stars, review count
   - **Sentiment tags:** "What parents mention most" — pill-shaped tags with counts, e.g., "Great communicator (18)", "Made me feel safe (15)", "Knowledgeable (14)". Top 3 highlighted in teal, rest neutral. Auto-generated from review text analysis.
   - **Selected review snippets:** 4 featured reviews, each showing: author initials avatar, author name, date, star rating, source badge (branded color), quoted review text (italic). "View all X reviews →" link at bottom.
   - **No reviews fallback:** If a provider has zero aggregated reviews, show: "No reviews yet" heading + "Reviews from Google, Yelp, and Facebook will appear here once available." + "Have reviews elsewhere? Submit your URLs from your dashboard." This tab still appears (not hidden) — an empty reviews tab is better than hiding it and making parents wonder.

3. **Pricing**
   - Fee range (large, bold)
   - Sliding scale badge (if applicable)
   - What's included (paragraph)
   - Accepted insurance list (individual cards/pills)

**Reviews data pipeline (technical):**
- At provider onboarding, collect Google Business URL, Yelp URL, Facebook page URL
- Scrape/aggregate ratings and review text at onboarding, cache in database
- Refresh periodically (weekly or on-demand)
- Run sentiment analysis on review text to auto-generate sentiment tags
- Providers can flag/dispute inaccurate reviews through support
- **Invalid URL handling:** If a submitted URL doesn't resolve, returns no reviews, or points to a different business, flag for manual review. Show provider a "We couldn't find reviews at this URL" message in their dashboard with option to resubmit.
- **Legal note (TODO):** Confirm compliance with Google/Yelp/Facebook terms of service for review display. May need to link out to source rather than reproduce full text. Consult legal before launch.

---

### 5. Consult Request — Modal Overlay

**Triggered when parent clicks "Request consult" on a match card or profile page.**

**Format: Modal overlay on top of the current page** (results or profile). Background dims with blur. No page navigation — parent stays in context.

**Modal contents (top to bottom):**
- Close button (x) top right
- Heading: "Request a consult"
- Subline: "Share your contact info so the provider can reach you."
- Provider mini-card (teal background): avatar, name, credentials, location, distance, match score
- Contact form:
  - Name (required) — text input
  - Email (required) — email input
  - Phone (required) — tel input
  - Password (optional) — password input, with note: "(or skip — we'll email you a sign-in link)"
  - "Send request & create account" button (full width, dark primary)
- "What happens next" steps:
  - Provider receives your request with your intake profile
  - Most providers respond within 24-48 hours
  - You'll get an email + text when she responds
- Privacy note: "Your info is only shared with providers you request consults from. We never sell your data. Privacy policy."
- "Already have an account? Sign in" link at bottom

This is the conversion moment — account creation is a side effect, not the purpose. An account is silently created from the contact info submitted here (see section 9: Account Creation and section 18: Auth Flows). Password is optional; parents can always sign in via magic link.

Provider receives a **structured lead packet** containing:
- Parent's intake answers (fit profile)
- Parent's contact info (name, email, phone)
- Which provider(s) were requested
- Match reasoning (why this parent matched with this provider)

---

### 6. Confirmation Screen — Rich

After submitting consult request. Two-column layout.

**Header (centered):**
- Success checkmark icon (teal circle)
- Heading: "Your request has been sent!"
- Subline referencing the provider by name

**Left column:**
- **Provider card with timeline:** Avatar, name, match score, "Request sent" badge. Vertical timeline with status dots:
  1. Request sent (just now) — completed
  2. Provider reviews your profile (within 24 hrs) — pending
  3. You hear back via email or text (1-2 days) — pending
  4. Schedule your consult call (on your timeline) — pending
- **Notification preferences:** "We'll notify you when [name] responds" — Email + Text badges shown as confirmation of what's active (not toggles — preferences managed from dashboard settings, see section 20)

**Right column:**
- **"Prep for your consult" card:** 4 preview questions from the Questions to Ask library with category tags (Safety, Budget, Communication, Care). "View all →" link to full library.
- **"Want to compare options?" CTA:** Teal background card encouraging them to go back to matches and request more consults. "Back to matches" button.

---

### 7. Exploring Path — Magazine Flow

Accessed when parent clicks "I'm exploring" from Fork First. This is the resource hub for parents who aren't ready to match yet. Editorial layout that builds authority and trust.

**Header (centered):**
- Section label: "The homebirth resource center"
- Heading: "Your guide to out-of-hospital birth"
- Subline: "Evidence-based guides. No agenda. Just the information you need to decide what's right for you."

**Full-width hero article:**
- Large card with gradient teal background, spans full width
- Left side: "Start here" label, heading "The complete beginner's guide to homebirth", description paragraph, "Read the guide" button (dark primary)
- Right side: Large illustration/icon placeholder
- This is the same beginner's guide linked from the homepage Start Here hub

**Content sections (alternating layouts):**

1. **Getting started** (3-column grid)
   - "Is homebirth right for me?" (4 min)
   - "Midwife vs. doula — explained" (3 min)
   - "How to talk to family who are worried" (4 min)

2. **Cost & insurance** (2/3 + 1/3 split)
   - Left (2/3): Two horizontal article cards with icons, stacked vertically
     - "What does homebirth actually cost?" (5 min)
     - "Insurance & Medicaid coverage guide" (6 min)
   - Right (1/3): Inline matching nudge card (teal background)
     - "Know enough to get started?"
     - "You don't need to read everything. Match when you're ready."
     - "Start matching" button

3. **Finding & evaluating providers** (3-column grid)
   - "How to evaluate a provider" (4 min)
   - "Questions to ask at your first consult" (6 min)
   - "Understanding transfer plans" (3 min)

4. **Safety & special situations** (2-column grid)
   - "VBAC at home: what you should know" (5 min)
   - "When homebirth isn't the right choice" (3 min)

**Bottom CTA:** "Ready to find your match?" centered card with "Start matching" button, "Free. No account needed. Takes ~2 min"

**Design notes:**
- Each article card shows: icon, category tag, read time, title, description, "Read →" link
- Alternating grid layouts (3-col, 2/3+1/3, 3-col, 2-col) create visual rhythm and prevent monotony
- Inline matching CTA after section 2 catches parents who feel ready early without being pushy
- The same articles are linked from the homepage Start Here hub — this is the full library

---

### 8. Questions to Ask Library — Checklist Builder

Interactive page where parents build a personal consult checklist. Linked from homepage, confirmation page, profile page, and dashboard.

**Layout: Two-column (questions left, sticky checklist sidebar right)**

**Left column — Questions by category:**
- 6 categories, each with header (icon + label + question count):
  1. Safety & transfers (6 questions)
  2. Experience & credentials (5 questions)
  3. Care style & philosophy (5 questions)
  4. Communication (4 questions)
  5. Cost & logistics (5 questions)
  6. Postpartum support (4 questions)
- ~30 questions total (content TBD — see below for category structure; actual question copy to be written before launch)
- Each question is a clickable card: checkbox + "Must ask" badge (on priority questions) + question text + "Why this matters" explanation
- Clicking a question toggles it — card highlights teal, checkmark appears, added to sidebar

**Right column — Sticky "Your checklist" sidebar:**
- Header: "Your checklist" + count (e.g., 7/30)
- Progress bar showing how many selected
- Scrollable list of checked questions with category icons
- "Copy checklist" button + "Email to myself" button
- "Ready to use these?" matching CTA card below

**Question priority:** Each category has 1 "Must ask" question flagged with a colored badge. These are the minimum viable questions for a consult.

---

### 9. Account Creation

> **See section 18 (Auth / Sign-in Flows) for the full auth spec.** Summary: Account is auto-created when parent submits a consult request. Password is optional (set via email link or at time of request). Parents can sign in via magic link or password. No forced sign-up wall anywhere in the public flow.

---

### 10. Parent Dashboard — Minimal Clean (Two Column)

The logged-in home screen. Accessed after sign-in or via magic link from notification emails.

**Greeting:** "Hi [name]" + one-line status update that doubles as the most important info (e.g., "Sarah responded — ready to schedule your consult.")

**Left column (~62%):**
- **Consult cards (stacked):** Same card component as match results but with status tracking:
  - Green left border on cards that need action (provider responded)
  - Status badges: "Responded" (teal), "Viewed your request" (amber), "Request sent" (gray)
  - Provider's response message shown as quoted text
  - Action buttons: "Confirm time" + "Message" (on responded), "Message" (on viewed)
  - "Providers typically respond within 24-48 hours" note on pending cards
- **Remaining matches (inline):** "2 more matches you haven't contacted yet" + compact side-by-side provider cards with "Request" buttons

**Right column (sticky sidebar, ~280px):**
- **Combined due date + profile card:** Due date (large), weeks remaining, preference tags, "Edit preferences" button — all in one compact card
- **Checklist preview:** Saved questions from the Questions to Ask builder with Copy + Email buttons
- **Contextual resource card:** Teal background, surfaces relevant article based on current stage (e.g., "Preparing for your consult?")

**Design notes:**
- No section headers, no summary cards, no metric rows — let the content speak
- Greeting is the status update
- Remaining matches shown as a compact inline row, not a list
- Lightest weight of all dashboard options — calm, not overwhelming

---

### 10b. Edit Preferences / Re-match

Accessed from 3 places: "Edit" link on match results preference pills, "Edit preferences" button on parent dashboard sidebar, and "retake intake" link on empty parent dashboard.

**Layout:** Single centered column (max-width ~640px), same styling as original intake. Not a full re-take — a single scrollable page showing all current preferences with inline editing.

**Structure:**
- Header: "Your preferences" + "Last updated [date]"
- Grouped by intake category (Hard Filters, Capability Match, Soft Match, Values — same groups as section 3)
- Each preference shown as a row: label + current value as editable chip/selector
  - Example: "Travel radius" → chips: 5 / **10** / 20 / 30+ (current selection bolded/teal)
  - Example: "Care style" → chips: hands-off / **balanced** / guided
  - Multi-select questions show all options with current selections highlighted
- "Update matches" button at bottom (dark CTA, full-width)
- "Cancel" link below

**Behavior:**
- Changing any preference and clicking "Update matches" triggers the processing animation (section 3b) and produces new results
- If parent has active consult requests, show a note: "Updating preferences will refresh your match list but won't affect consults you've already sent."
- From match results "Edit" link: opens as a slide-over panel on desktop (right side, 400px), full-screen on mobile. Updating closes the panel and refreshes results in place.
- From dashboard: navigates to full-page edit. After update, redirects to new match results.

**Mobile:** Same content, full-screen page. Chips wrap naturally. Full-width "Update matches" button.

---

### 11. Messaging — Dedicated Page, Hybrid Structure

Accessed when parent clicks "Message" or "Confirm time" from dashboard. Full messaging page.

**Layout: Two-panel inbox (thread list left, conversation right)**

**Left panel (~300px) — Thread list:**
- Header: "Messages"
- One row per consult request, showing: provider avatar, name, message preview (truncated), timestamp, unread dot (teal)
- Active thread highlighted with teal left border + teal background
- Status context in preview: "Viewed your request" or "Request sent — waiting for response" for threads without provider messages

**Right panel — Conversation thread:**

**Thread header:** Provider avatar + name + credentials, match %, location, typical response time. "View profile" button on the right.

**Message area (scrollable):**
- **System event** (centered divider): "You requested a consult with Sarah Chen - Mar 1, 2026"
- **Intake snippet** (gray card): "Shared from your intake:" + preference tags (Home birth, June 2026, VBAC, Insurance, etc.)
- **Provider message** (left-aligned bubble, gray background, rounded): Chat-style bubble with provider avatar, name, timestamp. Natural language message.
- **Availability widget** (structured card embedded in flow): "Available times for a free consult call" header with calendar icon. Selectable time slot rows (day, time, duration) — clicking one highlights it teal with a radio-style selection. "Confirm this time" button appears when a slot is selected.
- **Parent message** (right-aligned bubble, teal background): Free-text reply from parent.

**Input area (bottom):**
- **Quick suggestion pills** (above input): Pre-written common replies — "I'd like to confirm a time", "Ask about insurance", "Request different times". Tapping one populates the text input.
- **Text input** (full width): "Type a message..." placeholder. Send button (dark, arrow icon) on the right.
- Parents can BOTH use structured actions (availability picker) AND send free-text messages.

**System events that appear in the thread over time:**
1. "You requested a consult" (at consult request) — **MVP**
2. "[Provider] viewed your request" (when provider opens) — **MVP**
3. Availability widget (when provider responds with times) — **MVP**
4. "Consult scheduled — [date] at [time]" (confirmation card with "Add to calendar" + "View your checklist" buttons) — **MVP**
5. "Consult completed" (after the call happens) — **Phase 2** (requires scheduling integration or manual provider confirmation)
6. "How was your consult?" (review prompt) — **Phase 2/3** (seeds community content; not in MVP launch)

**Design notes:**
- This is NOT real-time chat — it's async messaging with structured widgets inline
- Provider responses come via email notification → parent clicks link → lands on this page
- The availability widget is the key conversion interaction — it turns messaging into scheduling
- Quick suggestion pills guide parents toward common actions without restricting free-text
- Thread list scales to multiple providers as parent requests more consults

---

### 12. For Providers Landing Page — Show Don't Tell (Side by Side)

Conversion page for midwives and birth workers. Accessed via "For providers" nav link.

**Approach: Show Don't Tell** — the page structure mirrors the symmetrical intake concept. Providers see what parents experience alongside what they experience, in parallel.

**Hero (centered):**
- Label: "For midwives & birth workers"
- Heading: "Two sides of the same experience"
- Subline: "Parents answer intake questions. You answer the mirror version. We match based on real compatibility — not keywords, not ads, not proximity alone."
- CTA: "Join the beta — free"

**Core section: Side-by-side walkthrough**
- Column headers: "What parents experience" (left, gray cards) | "What you experience" (right, teal cards)
- Arrow icon connectors between columns
- 4 parallel rows:

1. **Zip + path selection** / **Service area + availability setup**
   - Parent: Enters zip, picks exploring or matching path
   - Provider: Defines radius, availability, client types during setup — only matched leads come through

2. **12-18 intake questions** / **Mirror intake**
   - Parent: Care style, birth setting, budget, insurance, due date, values — 2 minutes
   - Provider: Same categories from your side — what you offer, scope, pricing, philosophy. Matching by fit, not keyword

3. **Ranked match results** / **Positioned by fit**
   - Parent: 3-7 providers with "Why this match" panels — distance, availability, care style, specialties
   - Provider: Not competing with everyone — shown only to parents whose needs align with your practice

4. **Profile + consult request** / **Lead packet**
   - Parent: Sees credentials, philosophy, pricing, aggregated reviews. Clicks "Request consult," shares contact info
   - Provider: Receives name, contact, full intake answers, match reasoning — all before responding

**Lead packet preview:** Centered card showing a sample lead: parent initials, due date, preference tags, "Why she matched with you" checklist, Respond + View buttons.

**Pricing section:** 3-tier cards (Basic $49, Pro $99, Practice $199) — all free during beta. Pro highlighted as "Most popular." Each tier lists features with checkmarks.

**Bottom CTA:** Dark card — "See both sides for yourself" + "Apply to join" button + "Free during beta. San Diego only. 5-minute setup"

**Design notes:**
- The side-by-side structure makes symmetrical intake immediately intuitive — providers see themselves as the other half
- Gray cards for parent side, teal cards for provider side — visual distinction is instant
- No fake testimonials or placeholder stats at launch — the product itself is the selling point
- Pricing is transparent and shown on the page, not hidden behind a form

---

### 13. Provider Onboarding — Guided + Preview (Conversational)

Accessed after provider clicks "Apply to join" or "Join the beta." Step-by-step wizard with a persistent live profile preview.

**Layout: Form left (~54%), live profile preview right (~340px sticky)**

**Approach: Conversational** — warm, personal step titles. More granular steps (8 total) so each screen is focused and not overwhelming. Coaching and context woven into each step.

**8 Steps:**

1. **"First things first — what should we call you?"**
   - Profile photo upload (drag-and-drop or click to browse, circular crop preview, "Add later" skip option)
   - Full name, credential type (CNM/CPM/LM/Doula/Other as chip select), additional certifications (optional)

2. **"Where do you practice?"**
   - Practice location (address input), service radius (5/10/15/20/30 mi chips), birth settings offered (Home birth/Birth center/Hospital chips)
   - Teal callout: "Parents outside your radius will never see your profile. No wasted leads."

3. **"In one sentence, what makes you you?"**
   - Tagline field (shown in teal highlight box as it'll appear)
   - Coaching section: "What works well" — Specific > vague, Philosophy > credentials, Human > clinical — each with before/after examples
   - Example taglines from other providers for inspiration (clickable to populate)

4. **"How would you describe your approach?"**
   - Care philosophy textarea (2-3 sentences, hint: "Think about what you'd say in a first consult")
   - Specialties multi-select chips (VBAC, Water birth, Multiples, First-time parents, Breech, Postpartum focus, High-risk support)

5. **"Any values you want to lead with?"**
   - Values tags as rounded pill chips (Evidence-focused, Trauma-informed, LGBTQ+ affirming, Faith-friendly, Culturally responsive, Spanish-speaking, Bilingual, Holistic)
   - Trust note: "Only select what genuinely represents your practice. Parents trust authenticity over keyword stuffing."

6. **"What do you charge?"**
   - Fee range (two inputs with "to" between, hint: "Parents see a range, not exact numbers")
   - What's included (chip multi-select: Prenatal visits, Labor + delivery, Postpartum visits, 24/7 on-call, Birth supplies, Newborn exam)
   - Payment options (Insurance billing, Self-pay, Payment plans, Sliding scale, Medicaid, HSA/FSA)
   - Insurance plans accepted (if applicable)
   - Accepting clients due in (month chips)

7. **"Time to set up matching"**
   - Teal callout: "Parents never see these answers. They only power the matching algorithm."
   - Mirror intake questions — same categories as parent intake, provider side:
     - Care style you practice: Hands-off / Balanced / Guided (mirrors parent Q11)
     - Communication vibe: Direct / Gentle / Educational / Minimal (mirrors parent Q12)
     - How you'd describe your focus: Calm reassurance / Evidence-based / Advocacy / Holistic (mirrors parent Q13)
     - Transfer approach: Hospital agreements / Backup OB / Case-by-case (mirrors parent Q16)
     - Preferred contact method from parents: Text / Email / Portal / Phone (operational, not scored)
     - Education style with clients: Hands-on coaching / Resource sharing / On-request only (mirrors parent soft preference for info delivery)
     - Scope comfort — select all that apply: First-time parents / VBAC / Multiples / Breech / Higher-risk pregnancies / Postpartum-only (mirrors parent Q8-10, validates capability tags)
     - Partner/support person involvement: Actively included / Welcome but parent-focused / Flexible (soft match — some parents want partner involvement, others don't)
   - 8 questions total. First 4 are direct mirrors of parent soft-match questions (scored). Last 4 are operational or capability validation (filtered or lightly weighted).

8. **"One last thing — verification"**
   - Three verification tiers: Identity (government ID), License (state license/certification), Practice (NPI or website URL)
   - Each as a card with icon, description, and Upload/Enter button
   - Review URL submission checkbox: "Pull my reviews from Google, Yelp, and Facebook"
   - Skip note: "Skip this for now? No problem — add verification anytime from your dashboard."

**Live profile preview (right side):**
- Header: "Your profile" label + "Parents see this" badge
- Progressive build: starts as skeleton, fills as steps are completed
  - Step 1: Photo (or placeholder avatar) + name + credentials appear
  - Step 2: Location + radius + birth settings
  - Step 3: Tagline appears in italics
  - Step 4: Philosophy card + specialty tags
  - Step 5: Value badges appear
  - Step 6: Pricing line + availability
  - Step 7: "Matching active" indicator
  - Step 8: Verification badges note

**Navigation:**
- Thin progress bar at top (colored segments, step X of 8)
- "Save & exit" always available in nav
- Back / Continue buttons at bottom of each step
- Final button: "Launch my profile →"

**Design notes:**
- Conversational tone throughout — "Let's talk pricing" not "Pricing Configuration"
- Each step has contextual coaching (example taglines, trust notes, matching explainer)
- 8 smaller steps feels faster than 6 dense ones — less cognitive load per screen
- Preview builds the profile card progressively — satisfying "building" feeling
- Mirror intake clearly separated from public profile content with callout

---

### 14. Provider Lead Inbox + Messaging — Split Inbox

The provider's primary workspace. Two-panel layout mirroring the parent messaging page — consistent pattern across both sides of the marketplace.

**Provider nav (consistent across all provider screens):**
Logo + tabs (Dashboard / Inbox / Profile) + provider avatar + name. Active tab highlighted. Dashboard is the default landing after login. Inbox tab shows unread lead count badge when new leads exist.

**Layout: Lead list left (~320px), full detail + messaging right**

**Left panel — Lead list:**
- Header: "Leads" + new count badge
- Filter pills: All / New / Active / Booked
- Scrollable lead rows, each showing:
  - Avatar (initials), name, due date, match %, status badge, timestamp
  - Active lead highlighted teal with left border accent
  - New leads get unread dot (green circle)
  - Green left border on new/unread leads

**Status badges (consistent with parent dashboard):**
- New (teal) — just arrived, needs response
- Contacted (amber) — provider has responded, waiting
- Scheduled (blue) — consult call booked
- Booked (green) — client confirmed
- Not a fit (gray) — declined by either side

**Right panel — Lead detail + thread:**

**Header bar:** Avatar + name + credentials area, due date, location + distance, match %. Status badge. "View full intake" button for complete intake profile.

**Intake summary (top of panel):**
- Preference tags (chips: Home birth, VBAC, Insurance, Balanced care, etc.)
- "Why she matched with you" checklist (green checkmarks: within service area, open for due date, specialty match, insurance compatible)

**Conversation thread (scrollable, below intake summary):**
- System event (centered divider): "Jessica M. requested a consult - 2 hours ago"
- Provider message (right-aligned, teal background bubble): sent messages with timestamp
- Status events:
  - Scheduled: blue card with calendar icon, date/time, meeting link
  - Booked: green card with celebration icon, "Client booked!" + next steps

**Response composer (for new leads, replaces message input):**
- "Your response" header
- Personal message textarea (free-text, with sample: "Hi Jessica! Thanks for reaching out...")
- Availability picker:
  - "Offer times for a consult call" header with calendar icon
  - Checkable time slot rows (day + time), click to select multiple
  - "+ Add custom time" button
- Action buttons: "Send response" (dark CTA), "Use template" (outlined), "Decline" (text, red, right-aligned)

**Message input (for active conversations, bottom of panel):**
- Persistent input bar at panel bottom (like parent messaging)
- Text input "Type a message..." + send button (dark, arrow icon)
- Only visible for contacted/scheduled status (not new, not booked)

**Design notes:**
- Mirrors the parent two-panel messaging layout — same product, both sides
- Lead list acts as inbox — providers scan, click, respond without page changes
- Response composer combines personal message + availability in one action — the provider equivalent of the parent's availability widget
- "Use template" button supports response templates (saved messages for common scenarios)
- "View full intake" opens the complete intake answers as a modal or panel — for providers who want the full picture before responding
- Decline button is low-prominence but accessible — no pressure to respond to every lead
- Thread format means the entire relationship lifecycle is visible in one scrollable view

**Decline flow (when provider clicks "Decline"):**

Provider side:
- Confirmation modal: "Decline this lead?" with reason selection (optional, single-select):
  - "At capacity for this due date"
  - "Outside my scope of care"
  - "Not a good fit"
  - "Other"
- Optional message field: "Add a note (only visible to you)" — for provider's own records, never sent to parent
- "Confirm decline" button (red text) + "Cancel"
- Lead moves to "Not a fit" status (gray badge) in lead list
- Lead is deprioritized in the list but not deleted — provider can reopen if circumstances change

Parent side:
- Parent does NOT receive a decline notification — no rejection emails. The request simply stops progressing.
- If the parent checks their dashboard, the consult card shows "No response yet" status indefinitely, then after 7 days: "This provider hasn't responded. Try reaching out to your other matches."
- The system subtly promotes remaining matches: "2 more providers matched with you" card becomes more prominent on the dashboard after 48 hours of no response from any requested provider.
- If ALL requested providers have declined (edge case), the parent sees: "Your requested providers are unavailable right now" + "See more matches" button that returns them to results with expanded criteria.

Design rationale: No rejection notifications. Parents already feel vulnerable in this process — a "Provider X declined your request" email would damage trust in the platform. Instead, the system gracefully redirects toward other matches. Providers get clean pipeline management without guilt.

---

### 15. Provider Dashboard — Narrative Dashboard

The provider's home screen after login. Story-driven layout that mirrors the parent dashboard's philosophy: greeting as status, calm two-column, works at any volume.

**Layout: Main content left (~62%), sidebar right (~320px)**

**Greeting card (top, full-width of left column):**
- Inline prose status: "Good afternoon, Sarah. You have **2 new leads** waiting for a response. Your profile was viewed **142 times** this month — up 23% from February. You've booked **1 client** through the platform so far."
- Key numbers bolded/colored inline — no separate metric cards needed
- Adapts to context: if no new leads, focuses on views/bookings. If empty, encourages profile completion.

**New lead action cards (below greeting, left column):**
- Section label: "Respond to new leads" (uppercase teal)
- Stacked cards with teal border for each new lead:
  - Avatar (initials), name, match %, due date, tags joined with dots
  - Timestamp + "Respond" button (dark CTA)
  - Clicking "Respond" navigates to the Split Inbox with that lead selected

**Activity timeline (below lead cards, left column):**
- "Recent activity" header
- Vertical timeline with colored dots per event type:
  - New request (teal dot): "Jessica M. requested a consult" + match details
  - Sent response (amber dot): "You responded to Maria L." + availability offered
  - Scheduled (blue dot): "Consult scheduled with Priya S." + date/time/link
  - Booked (green dot): "Dana K. booked!" + next steps
  - System (gray dot): "Your profile was verified" + badge added
- Each event: dot → event text (bold) + timestamp (right) + detail line (colored)
- Connecting line between dots
- Scrollable, chronological — tells the story of the provider's platform activity

**Contextual insight (below timeline):**
- Teal tip card: "Your VBAC tag is driving 60% of your matches this month. Parents searching for VBAC experience are 2x more likely to request a consult."
- Rotates based on provider data — surfaces actionable insights

**Right sidebar:**

1. **"March at a glance"** — 2x2 metric grid:
   - Views (142), Requests (7), Booked (3), Response time (8h)
   - Teal background on accent metrics (requests, booked)

2. **Pipeline summary** — colored status rows with counts:
   - New (teal, 2), Contacted (amber, 1), Scheduled (blue, 1), Booked (green, 1)

3. **Profile health** — completion checklist with progress bar:
   - Photo, Tagline, Philosophy, Pricing, Verification (with "Add →" link), Review URLs
   - Progress: 5/6

4. **Your reviews** — aggregated snapshot:
   - 4.9 stars, 47 reviews
   - Sentiment tags: "Great communicator (18)", "Made me feel safe (15)"

5. **Views chart** — mini bar chart, last 6 months trending up

**Design notes:**
- Narrative approach works at any volume — the timeline tells a story whether 3 events or 30
- Greeting card gives the full picture in one sentence — no parsing metric cards
- Mirrors parent dashboard pattern: greeting as status, two-column, sidebar with utilities
- New leads are visually prominent (teal border, "Respond" button) without being alarming
- Timeline replaces a traditional activity feed — more readable, more human
- Sidebar is informational, not actionable — actions live in the main column

---

### 16. Article Template — Interactive Guide (Original)

Individual guide pages accessed from the Exploring path (Magazine Flow). Educational content that builds trust and nudges toward matching when the parent is ready.

**Layout: Single centered column (720px max) with embedded interactive widgets**

**Sticky progress bar (top):**
- Breadcrumb: Guides > Category
- Thin colored bar that fills as the reader scrolls through sections
- Read time label on right

**Article header:**
- Category label (uppercase teal, e.g. "PLANNING")
- Title: large Sora heading (2.3rem)
- Subtitle: one-line description in lighter text
- Author byline: avatar + name + credentials + date + read time

**Key takeaways card (before article body):**
- Teal background card with "KEY TAKEAWAYS" label
- 4 bullet points with checkmark icons summarizing main points
- Gives scanners the gist before committing to the full read

**Article body — 6 sections with embedded widgets:**

Sections flow as standard prose (heading + paragraph), with interactive elements placed at natural content breaks:

1. **Pull quote** (after section 2):
   - Dark background card, white italic text
   - "You're not going somewhere to give birth. Birth is coming to you."

2. **Inline provider quote card** (after section 3):
   - "FROM A LOCAL MIDWIFE" label
   - Provider avatar + name + credentials + location + experience
   - "View profile" button linking to their profile page
   - Italic quote from the provider relevant to the section topic
   - Bridges educational content to actual providers on the platform

3. **Matching CTA** (after section 4):
   - Teal card: "Ready to find your midwife?"
   - "Answer a few questions and we'll match you with providers in your area"
   - "Find my matches" button
   - Placed at the emotional peak

4. **Stat cards** (after section 5):
   - 3-column grid with teal borders
   - 10-15% transfer rate, <2% emergencies, 4-6 postpartum visits
   - Placed right after the transfer discussion to reinforce safety with data

**Expandable FAQ (after all sections):**
- "Common questions" heading
- 4 expandable cards (click to reveal answer):
  - "Is home birth safe for first-time parents?"
  - "What if something goes wrong?"
  - "What supplies do I need at home?"
  - "Can I have a water birth at home?"

**Dark bottom CTA:**
- Full-width dark card: "Ready to explore your options?"
- "Find midwives in your area who match your preferences"
- "Find my matches" button (white on dark)

**Related guides (below CTA):**
- "Keep reading" heading
- 2x2 grid of related guide cards (category label, title, read time)

**Design notes:**
- Single column keeps focus on reading — no sidebar distractions
- Interactive widgets break up long text and add value without interrupting flow
- Provider quote card is the key bridge between content and marketplace
- Matching CTA placed at emotional peak, not at the top or randomly
- FAQ addresses residual anxiety after the full read
- Key takeaways let scanners get value without reading the full article
- Progress bar gives a sense of completion and encourages finishing

---

### 17. Empty States — Community Waitlist

Edge case screens for when the happy path breaks. Framed around community demand and movement-building rather than dead ends.

**A. Out of Area (most common at launch)**

Triggered when zip code is outside San Diego service area.

- Header: "Help bring Homebirth.com to [City]"
- Subline: "We launch in new cities based on demand. The more parents who sign up in your area, the sooner we'll get there."
- **Progress card (teal border):**
  - City name + signup count: "Austin, TX — 67 of 100 signups"
  - Progress bar (filled to 67%)
  - Urgency note: "33 more signups and we'll start onboarding Austin providers"
  - Email capture input + "Join the waitlist" button
- **City demand leaderboard:**
  - "Where we're launching next" heading
  - 5 cities ranked by waitlist progress, each with:
    - City name, signup count / target, horizontal progress bar
  - User's city highlighted at top
  - Creates social proof and urgency
- **Content fallback (below):**
  - "Start preparing now" heading
  - 3 resource cards: Home birth guide, Questions to ask, Cost breakdown

**B. No Results (in-area, no matching providers)**

Triggered after intake when no providers match all preferences.

- Header: "No exact matches right now"
- Explanation: providers may be at capacity for due date
- **Demand signal note (teal card):**
  - "Your demand helps us grow — when parents search and don't find matches, we use that signal to recruit providers who fit. Your intake answers (anonymized) help us find the right midwives for your area."
- **3 action paths (stacked cards):**
  1. "Alert me when a match opens" (teal border, primary) — weekly check, one email when matched
  2. "Broaden my search" — adjust radius, preferences, or due date range
  3. "Browse all nearby providers" — see everyone, even non-matches

**C. Empty Provider Inbox (new provider, no leads)**

Triggered when provider inbox has zero leads.

- Header: "Your profile is live — leads are on the way"
- Reassuring copy about active marketing in their area
- **Platform stats (3-column grid):**
  - Parents searching in SD (312), intakes completed this week (89), providers live (12)
  - Shows the marketplace is active, not dead
- **Profile optimization checklist:**
  - Each item shows: label, completion status, impact badge
  - Add profile photo (2x more clicks), Get verified (3x more consults), Add transparent pricing (40% more views), Submit review URLs (builds trust)
  - Incomplete items have arrow action link

**D. Empty Parent Dashboard (account exists, no consults)**

Triggered when parent has account but hasn't requested any consults.

- Header: "Welcome back, [Name]"
- Subline: "You completed intake but haven't requested a consult yet. Your matches are still waiting."
- **Top match teaser card (teal border):**
  - "YOUR TOP MATCH" label
  - Provider avatar + name + credentials + match % + distance + specialties
  - Preference tags
  - "View profile" button
  - Shows a real match to create pull toward action
- Links below: "See all X matches →" or "retake intake"

**Design notes:**
- Out-of-area is the highest-traffic edge case at launch — progress bar + city leaderboard turns a dead end into a conversion tool
- Demand numbers must be real — faking progress bars kills trust instantly
- No results state uses demand signal framing to make the visitor feel their search wasn't wasted
- Provider inbox shows platform-wide stats to reassure that the marketplace is alive
- Empty parent dashboard shows actual match data to pull them back into the flow
- All states include content fallbacks (guides, questions to ask) so nobody leaves empty-handed

---

### 18. Auth / Sign-in Flows — Hybrid Auth

Magic link + password coexist. Users choose their preferred method. Auth is deliberately late — parents don't hit an account wall until consult request. Providers create accounts when they apply to join.

**6 states:**

**A. Consult Capture (parent first-time auth)**
- Modal card with provider preview at top (avatar, name, match %, location)
- "Request a consult — share your info so [Name] can reach out"
- Fields: First name, Email, Phone
- Password field with note: "(or skip — we'll email you a sign-in link)"
- "Send request & create account" button (dark CTA)
- "Already have an account? Sign in" link at bottom
- This IS the conversion moment — account creation is a side effect, not the purpose

**B. Magic Link Sent**
- Email icon in circle
- "Check your email" heading
- Bolded email address
- Explanation: "Click the link to sign in instantly. Valid for 15 minutes."
- "Resend link" button (outlined)
- "Didn't get it? Check spam or try another email"

**C. Set Password (optional, reached from email link)**
- "Set a password — so you can sign in without waiting for an email next time"
- Email (pre-filled, read-only), New password, Confirm password
- "Set password" button (dark CTA)
- "Skip — I'll keep using magic links" button (text, secondary)

**D. Parent Sign-in (returning)**
- "Welcome back" heading
- Email field + Password field (marked "optional")
- "Sign in" button (dark CTA)
- "or" divider
- "Send me a sign-in link instead" button (outlined teal)
- "No account? Find a midwife to get started" link
- Both auth methods always visible — user picks based on preference

**E. Provider Sign-in (returning)**
- "FOR PROVIDERS" label (uppercase teal)
- "Sign in to your practice" heading
- "Access your inbox, profile, and dashboard" subline
- Same hybrid pattern: email + optional password, or magic link
- "New provider? Apply to join" link

**F. Provider Apply (first-time account creation)**
- "FOR PROVIDERS" label
- "Create your account" heading
- "Start building your profile. Takes about 5 minutes."
- Fields: Full name, Email, Password (required for providers)
- Credential type chips: CNM, CPM, LM, Doula, Other (single select)
- "Create account & start profile →" button
- "Already have an account? Sign in" link
- Flows directly into the 8-step Conversational onboarding

**Design notes:**
- All auth cards use consistent styling: white card, 12px border radius (matches design system), subtle shadow, centered on page
- Parent auth is passwordless by default — password is always optional, magic link is always available
- Provider auth includes password at signup (they'll sign in frequently to check inbox)
- Consult capture is framed as sharing contact info, not creating an account — the account is a side effect
- Magic link emails are valid for 15 minutes, one-click sign-in
- "Already have an account?" and "No account?" links prevent dead ends
- No social auth (Google, Facebook) — keeps it simple, avoids trust concerns around data sharing

**Auth error states:**
- **Invalid email format:** Inline validation below field — "Please enter a valid email address." Red border on field. No form submission.
- **Email not found (returning user):** After clicking "Sign in" or "Send sign-in link" — "We don't have an account with that email. Did you mean to find a midwife?" with link to homepage. Friendly, not alarming.
- **Magic link expired:** Landing page when clicking a stale link — "This link has expired." + "Send a new sign-in link" button with email pre-filled. Note: "Sign-in links are valid for 15 minutes."
- **Wrong password:** Inline below password field — "That password isn't right." + "Send me a sign-in link instead" as secondary action. After 3 failed attempts: lock password entry for 15 minutes, auto-send magic link, show "We sent a sign-in link to your email for security."
- **Account already exists (provider apply):** If email matches existing account — "An account with this email already exists. Sign in instead?" with link to provider sign-in.
- **Rate limiting:** After too many magic link requests — "We've already sent a link to that email. Check your inbox (and spam folder). You can request another in 5 minutes."

---

### 19. Mobile Layouts — Stack & Collapse

Responsive adaptation for all screens. Desktop two-panel layouts become drill-in lists, map is toggleable, minimal chrome. This is a mobile website, not a native app — no bottom tab bars.

**General mobile rules:**
- Max width: 375px (iPhone frame)
- Top nav: back arrow + title + contextual right element (match %, badge count, etc.)
- All two-panel layouts collapse to list → detail drill-in
- Sidebar content stacks below main content
- CTAs become full-width buttons
- Filter pills scroll horizontally
- Cards stack vertically with consistent 16px horizontal padding

**A. Match Results**
- Top nav: "Your matches" + "3 found" count
- Toggleable map: "Show map" button, collapsed by default. Tap to reveal 180px map. Tap again to hide. Saves space, one tap away.
- Full match cards stacked vertically: avatar + name + verified badge, area + distance, match % (large, right-aligned), preference tags, reviews count, "View profile" button
- Top match gets teal border (2px solid accent)
- No sidebar — "Why this match" info lives within each card

**B. Provider Inbox (drill-in)**
- List view (default): Filter pills (All / New / Active / Booked) horizontal scroll. Lead rows: unread dot (green, for new), avatar, name, match %, status badge, due date, timestamp, right chevron.
- Detail view (tap lead): Back arrow + lead name + status badge in nav. Lead header (avatar, name, due date, match %). Preference tags. "View full intake" button. Conversation thread with system events. Response composer: message textarea, time slot picker with checkboxes, "Send response" + "Decline" buttons. "← Back to inbox" sticky at bottom.
- Transition: list → detail is a full-screen replacement, not a slide panel

**C. Parent Messages (drill-in)**
- List view: Conversation rows: unread dot, avatar, name, message preview (truncated), timestamp, chevron
- Thread view: Scheduled consult card at top (date, Zoom link, blue accent). Chat bubbles: provider messages (gray, left-aligned with avatar), user messages (teal, right-aligned). Sticky input bar at bottom: rounded text field + circular send button.
- Back arrow returns to conversation list

**D. Provider Dashboard**
- Logo + provider avatar header (no nav tabs — use hamburger or scroll)
- All content stacks vertically in priority order: greeting card → new lead action cards (teal border) → 2x2 stat grid → pipeline row (4 colored status boxes) → activity timeline
- No sidebar — metrics that were in sidebar move into the stat grid
- Pipeline summary becomes a compact horizontal row of 4 colored boxes

**E. Provider Profile**
- Back arrow + match % in nav bar
- Centered header: large avatar, name + credentials, location + distance + experience, verified badge + review count, tagline in italic teal
- Full-width "Request a consult" button below header
- Tab bar (About / Reviews / Pricing) — sticky below header on scroll
- Tab content flows naturally below
- Sticky CTA at bottom: "Request a consult" button persists above bottom edge with frosted glass background. Always visible regardless of scroll position.

**F. Questions to Ask — Checklist Builder (stack)**
- Questions and sidebar collapse to single column
- All 6 categories stack vertically, each collapsible (tap category header to expand/collapse question list). First category expanded by default, rest collapsed.
- Checking a question adds it to a floating bottom bar: "Your checklist (3)" + "View checklist" button
- Tapping "View checklist" opens a bottom sheet (60% screen height): checked questions listed, "Copy checklist" + "Email to myself" buttons, swipe down to dismiss
- Full-width "Start matching" CTA below all categories

**G. Provider Onboarding (stack, no live preview)**
- Form takes full width, no live preview panel on mobile
- Same 8 steps, same fields, same progress bar at top
- At the end of each step, a "Preview so far" link appears — tapping it shows a full-screen profile preview overlay (what parents will see). "x Close preview" button returns to the form.
- This replaces the always-visible desktop preview. The progressive build is still satisfying — just accessed on-demand rather than persistent.
- Final step 8 shows a full preview before "Launch my profile →"

**Screens that need minimal adaptation** (already single-column or close):
Homepage, Post-zip, Intake, Processing, Consult modal, Confirmation, Exploring path, Article template, Auth flows, Empty states — these just need max-width constraint and padding adjustments, no structural changes

**Design notes:**
- No bottom tab bar — this is a responsive website, not a native app. Bottom tabs set app expectations we're not meeting yet.
- Drill-in pattern (list → detail → back) is standard mobile web and works well
- Map toggle saves critical vertical space — most users care about cards, not geography
- Sticky CTA on provider profile ensures the conversion button is always reachable
- If/when native app ships (Phase 3+), bottom tab bar becomes the right pattern

---

### 20. Notifications

Transactional notifications only — no marketing emails at MVP. All notifications are triggered by user actions, not by timers or campaigns.

**Parent notifications:**

| Trigger | Email | SMS | In-app |
|---------|-------|-----|--------|
| Consult request sent | Confirmation + magic link | Confirmation | Dashboard status |
| Provider viewed request | No | No | Dashboard badge |
| Provider responded with times | "Sarah responded — pick a time" | Short link to messages | Unread dot in messages |
| Consult scheduled | Calendar invite + details | Date/time confirmation | Scheduled card in thread |
| No response after 7 days | "Haven't heard back? Try your other matches" | No | Dashboard nudge card |
| Magic link requested | Sign-in link | No | n/a |
| Waitlist launch (out-of-area) | "We're live in [city]!" | No | n/a |

**Provider notifications:**

| Trigger | Email | SMS | In-app |
|---------|-------|-----|--------|
| New lead received | Lead summary + "Respond" link | "[Name] requested a consult" | Inbox badge count |
| Parent confirmed time | Calendar invite + parent contact | Confirmation | Scheduled card in thread |
| Lead unreplied >24h | "You have a lead waiting" | No | Dashboard highlight |
| Profile verification complete | "You're now verified" | No | Badge appears |
| Magic link requested | Sign-in link | No | n/a |

**Notification preferences:**
- Parents: Email on by default, SMS on by default. Can toggle each off from dashboard settings.
- Providers: Email on by default, SMS on by default. Can toggle from provider dashboard settings.
- No notification preference screen at onboarding — defaults are on, manage later.

**Tone:** Warm, specific, action-oriented. Always include the provider/parent name. Never generic. Example: "Sarah Chen responded to your consult request — she has 3 times available this week. Pick one →" not "A provider responded to your request."

---

### 21. Map Component

Used on match results page (desktop sidebar, mobile toggle) and potentially on provider profile (location confirmation).

**Provider:** Google Maps (JavaScript API). Ships at MVP with full interactivity.

**Match results map behavior:**
- Default zoom: Fit all provider pins + parent location with padding
- Parent location: Blue "You" marker (circle with label)
- Provider pins: Teal circles with provider initials + match score. Top match pin is larger.
- Bi-directional highlighting: Hover a card → corresponding pin pulses/enlarges. Hover a pin → corresponding card gets teal border highlight. On mobile (touch): tap a pin → scroll card list to that provider.
- Clustering: If 7+ providers in tight area, cluster into a single pin with count. Click to expand. Unlikely at MVP scale but build for it.
- Click behavior: Click a pin → scroll to that provider's card in the left column (desktop) or scroll card list (mobile)
- No scroll-to-zoom by default — prevents accidental zoom while scrolling the page. Zoom via +/- buttons or pinch on mobile.

**Mobile map (toggle):**
- 180px height when expanded
- Tap "Show map" to reveal, "Hide map" to collapse
- Same pin behavior as desktop, simplified — tap pin to highlight card below
- Collapsed by default to save vertical space

---

## Product Vision — Phased Rollout

**Phase 1: Matchmaker+ (Launch)**

Everything designed in sections 1-21. The platform helps parents find, evaluate, and request consults with providers, then gives them a dashboard to track progress.

- Public: Homepage, Fork First, intake, processing animation, match results, provider profiles, exploring path, questions library
- Logged-in: Dashboard (Minimal Clean), consult tracker, hybrid messaging (dedicated inbox page — structured availability widgets + free-text replies + quick suggestion pills), saved checklist, editable preferences + re-match
- Account auto-created at consult request

**Phase 2: Relationship Layer (Post-launch, once bookings happening)**

The product stays useful after booking:
- Open messaging (unlocks after first consult)
- Birth plan builder (guided, shareable with provider)
- Document sharing (consent forms, insurance, lab referrals)
- Scheduling (prenatal visits in-platform)
- Post-birth review prompt (seeds Phase 3 community content)

**Phase 3: Community (Once enough parents + reviews + stories exist)**
- Birth stories (submitted after review, tagged by provider/setting/situation)
- Local community feed (moderated, San Diego first)
- Expanded directory (doulas, lactation consultants, birth photographers)
- Group events + classes listed by providers
- Parent-to-parent recommendations

Each phase only unlocks when the previous one has traction. Architecture from Phase 1 should create data and behavior that feeds Phase 3.

---

## Core Concept: Symmetrical Intake

Parents and providers answer mirrored versions of the same questions. The platform matches using hard filters + soft scoring and returns explainable results.

1. Parent completes intake (12-18 multiple-choice questions, ~2 min)
2. Provider completes the mirror intake (capabilities, constraints, preferences)
3. Matching engine runs hard filters first, then soft scoring
4. Parent gets a shortlist (3-7 providers) with "Why this match" explanations
5. Parent requests consults → providers get structured lead packets with contact info

---

## Provider Mirror Intake (Summary)

Providers answer the "what I offer" side of the same categories:
- Service area + radius, birth settings, availability, lead time
- Pricing model, insurance/Medicaid, sliding scale
- Scope: first-time parents, VBAC, twins, breech, postpartum depth
- Transfer approach + hospital relationships
- Care style spectrum, education style, communication tone
- Values tags (opt-in): trauma-informed, LGBTQ+ affirming, faith-friendly, evidence-focused
- Credentials, years in practice, births attended range

---

## Provider Flow

1. **Join/Claim** → Create profile (trust page): credentials, philosophy, pricing, availability, service radius, FAQs, testimonials, photos. Submit review URLs (Google Business, Yelp, Facebook) for aggregation.
2. **Mirror Intake** → Answer capability/constraint questions for matching accuracy
3. **Lead Inbox** → Simple pipeline: New → Contacted → Scheduled → Booked → Not a Fit
4. **Trust/Verification** → Badges: identity verified, license verified, practice verified

---

## Matching Logic

### Step 1: Hard Filters (binary pass/fail)
- Location radius
- Availability for due date window
- Birth setting compatibility
- Payment compatibility (insurance/self-pay/budget band)

### Step 2: Soft Scoring (weighted)
- Care style alignment
- Communication vibe match
- Capability matches (VBAC, first birth, etc.)
- Language preference
- Inclusivity/trauma-informed preferences
- Transfer approach fit
- Values/spiritual compatibility (only if parent opted in)

### Step 3: Explain the Match
Each result shows: "Matched because: within 10 miles, open for May due dates, VBAC-friendly, Spanish-speaking, budget range aligned."

---

## MVP Feature Set

### Parent-Facing (Public)
- Homepage (Guide First)
- Fork First post-zip routing
- Guided intake flow
- Processing animation transition (intake → results)
- Match results page (sidebar + map layout, split cards, no dropdowns)
- Provider profile pages (tabbed: About, Reviews, Pricing)
- Aggregated web reviews on profile (Google, Yelp, Facebook — ratings, source badges, sentiment tags, snippets)
- "Request a consult" flow (Modal Overlay) with contact capture (name + email + phone + optional password)
- Confirmation + next steps (Rich — timeline, consult prep, compare CTA)
- Exploring path / resource hub (Magazine Flow layout)
- Article template (Interactive Guide — progress bar, key takeaways, inline provider quotes, stat cards, FAQ)
- Empty states (Community Waitlist — out-of-area with city demand leaderboard, no results with demand signal, empty provider inbox with platform stats, empty parent dashboard with match teaser)
- Auth flows (Hybrid — magic link + optional password, consult capture as conversion-first contact sharing, adaptive sign-in for returning users)
- Mobile layouts (Stack & Collapse — drill-in for two-panel screens, toggleable map, sticky CTAs, no bottom tab bar)
- "Questions to ask" resource library (Checklist Builder — interactive, saveable)

### Parent-Facing (Logged-in)
- Auto-created account at consult request (password set via email link)
- Parent dashboard (Minimal Clean — two column)
- Consult tracker with status badges (Sent → Viewed → Responded → Scheduled → Completed)
- Messaging inbox (dedicated page, hybrid structure — availability widgets + free-text + quick suggestion pills)
- Saved Questions to Ask checklist (persisted, copy/email)
- Editable intake preferences + re-match (slide-over from results, full-page from dashboard — see section 10b)
- Follow-up nudges (email/SMS)

### Provider-Facing
- For Providers landing page (Show Don't Tell — Side by Side)
- Provider onboarding (Guided + Preview — Conversational, 8 steps with live profile preview)
- Mirror intake questionnaire (embedded as step 7 of onboarding)
- Profile builder (integrated into onboarding flow, editable post-launch from dashboard)
- Lead inbox + messaging (Split Inbox — two-panel, lead list left, detail + thread right)
- Response composer (personal message + availability picker + templates + decline)
- Pipeline tracking (New → Contacted → Scheduled → Booked → Not a Fit)
- Provider dashboard (Narrative — greeting as status, activity timeline, contextual insights, sidebar metrics)

### Trust Layer
- Verification badges (identity, license, practice)
- Clear disclosures (availability, scope, pricing ranges)
- Aggregated web reviews (Google, Yelp, Facebook) with sentiment analysis
- Reporting mechanism + moderation workflow

### Shared Infrastructure
- Notification system (transactional email + SMS for both parent and provider — see section 20)
- Map component (Google Maps, bi-directional card/pin highlighting — see section 21)
- Decline flow (provider-side reason capture, no parent rejection notification, graceful redirect to other matches)
- Auth error handling (inline validation, expired link recovery, rate limiting)

---

## Business Model

Provider-paid subscriptions (all free during beta):

**Basic — $49/mo**
- Profile listing (searchable, intake-matched)
- Matched lead delivery (structured lead packets with intake answers + contact info)
- Basic verification (identity)
- Aggregated web reviews on profile
- 1 response template

**Pro — $99/mo (Most popular)**
- Everything in Basic
- Full pipeline tracking (New → Contacted → Scheduled → Booked → Not a Fit)
- Unlimited response templates
- Lead analytics (views, match rate, response time, conversion)
- Premium verification badges (license + practice)
- Priority placement in results (when match scores are equal)

**Practice — $199/mo**
- Everything in Pro
- Multi-user inbox (associate midwives, office staff)
- Team management + role permissions
- Auto-responses for after-hours leads
- Custom intake questions (add 1-3 practice-specific questions to matching)
- Dedicated onboarding support

**What's always free (not behind a paywall):**
- Profile creation and onboarding
- Mirror intake for matching
- First 3 months (beta period)
- Review aggregation

**Paywall boundaries (post-beta):** The core conversion flow (lead arrives → provider sees it → responds) works on Basic. Pro unlocks visibility into how well it's working. Practice unlocks team workflows. No tier restricts a provider from receiving or responding to leads.

---

## Go-to-Market

Region-by-region rollout. Phase 1: one market (e.g., San Diego). Curate roster, hand-polish profiles, prove conversion. Then expand.

---

## North Star Metrics

- Parent intake completion rate
- Match → consult request rate
- Consult → booking rate
- Provider time-to-first-response
- Funnel drop-off points
- Provider retention/churn by tier

---

## Guardrails

- **Not medical advice.** Intake avoids detailed medical data.
- **Trust and explainability > "AI magic."**
- Values/spiritual questions are optional, framed as comfort/preferences, not identity.
- Intake captures fit signals, not clinical charting.
- No fake stats or testimonials at launch — only show real numbers.

---

## Roadmap

- **MVP (0-3 months):** Parent intake + matching + consult request, provider onboarding + profiles + lead inbox, verification v1
- **Phase 2 (3-6 months):** Follow-up automation, analytics dashboard, moderation workflows, Homebirth Pulse v1 (monthly market report for providers: anonymized demand trends by area, top-searched preferences, capacity gaps — helps providers understand what parents are looking for)
- **Phase 3 (6-12 months):** Deeper verification, practice accounts, hybrid pricing, partnerships/classes marketplace

---

## Conventions

These are starting defaults. Update as patterns emerge during development.

- **File naming:** kebab-case for files and folders (provider-dashboard.tsx, match-results/). PascalCase for React components (ProviderDashboard.tsx exports ProviderDashboard).
- **Component structure:** One component per file. Colocate styles, tests, and types with the component. Shared components in /components/ui/. Page-specific components in /app/[route]/_components/.
- **API route patterns:** /api/[resource] (RESTful). Examples: /api/intake, /api/matches, /api/leads, /api/providers/[id]. Use Next.js Route Handlers.
- **State management:** React Server Components + server actions for data fetching. Client state with useState/useReducer for UI-only state. No global state library at MVP — add if needed.
- **Testing strategy:** (TBD — decide before first sprint. Likely: Vitest for unit tests, Playwright for critical path E2E: intake → match → consult request → provider response.)
- **Branch naming:** feature/[short-description], fix/[short-description], chore/[short-description]. Main branch is main. No develop branch — ship from main behind feature flags if needed.
