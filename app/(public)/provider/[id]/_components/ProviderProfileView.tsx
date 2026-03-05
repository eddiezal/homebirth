"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Tabs, TabPanel, Button } from "@/components/ui";
import { ConsultRequestModal } from "@/components/ConsultRequestModal";
import { loadIntakeAnswers } from "@/lib/utils/intake-storage";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSidebar } from "./ProfileSidebar";
import { AboutTab } from "./AboutTab";
import { ReviewsTab } from "./ReviewsTab";
import { PricingTab } from "./PricingTab";
import type { ProviderProfile } from "@/lib/types/provider";
import type { IntakeAnswers } from "@/lib/types/intake";

interface ProviderProfileViewProps {
  provider: ProviderProfile;
}

const profileTabs = [
  { id: "about", label: "About" },
  { id: "reviews", label: "Reviews" },
  { id: "pricing", label: "Pricing" },
];

/** Generate human-readable match reasons from intake answers + provider data */
function generateMatchReasons(
  provider: ProviderProfile,
  answers: IntakeAnswers
): string[] {
  const reasons: string[] = [];

  // Distance
  const radius = answers["travel-radius"] as string | undefined;
  if (radius && radius !== "30+") {
    if (provider.distance <= parseInt(radius, 10)) {
      reasons.push(`Within ${radius} miles`);
    }
  } else if (provider.distance <= 10) {
    reasons.push(`${provider.distance} miles away`);
  }

  // Birth setting
  const setting = answers["birth-setting"] as string | undefined;
  const settingMap: Record<string, string> = {
    home: "Home birth",
    "birth-center": "Birth center",
  };
  if (setting && setting !== "either" && provider.birthSettings.includes(settingMap[setting])) {
    reasons.push(`Offers ${settingMap[setting].toLowerCase()}`);
  }

  // VBAC
  const vbac = answers["vbac"] as string | undefined;
  if ((vbac === "yes" || vbac === "maybe") && provider.tags.some(t => t.toLowerCase().includes("vbac"))) {
    reasons.push("VBAC-experienced");
  }

  // Language
  const lang = answers["language"] as string | undefined;
  if (lang === "spanish" && provider.languages.some(l => l.toLowerCase().includes("spanish"))) {
    reasons.push("Spanish-speaking");
  } else if (lang === "bilingual" && provider.languages.length >= 2) {
    reasons.push(`Speaks ${provider.languages.join(" & ")}`);
  }

  // Payment
  const payment = answers["payment"] as string | undefined;
  if (payment === "medicaid" && (provider.slidingScale || provider.insuranceAccepted.some(i => i.toLowerCase().includes("medicaid")))) {
    reasons.push("Accepts Medicaid");
  } else if (payment === "insurance" && provider.insuranceAccepted.length > 0) {
    reasons.push("Accepts insurance");
  }
  if (provider.slidingScale && payment !== "medicaid") {
    reasons.push("Sliding scale available");
  }

  // Care style
  const style = answers["care-style"] as string | undefined;
  const styleMap: Record<string, string> = {
    "hands-off": "Hands-off approach",
    balanced: "Balanced care style",
    guided: "Guided care style",
  };
  if (style && styleMap[style]) {
    const allTags = [...provider.tags, ...provider.communicationTags].map(t => t.toLowerCase());
    const styleKeywords: Record<string, string[]> = {
      "hands-off": ["hands-off", "low-intervention"],
      balanced: ["balanced", "shared decision"],
      guided: ["guided", "active"],
    };
    if ((styleKeywords[style] ?? []).some(k => allTags.some(t => t.includes(k)))) {
      reasons.push(styleMap[style]);
    }
  }

  // Top priority
  const priority = answers["top-priority"] as string | undefined;
  const priorityMap: Record<string, { label: string; keywords: string[] }> = {
    "calm-reassurance": { label: "Calm, reassuring presence", keywords: ["calm", "reassuring", "gentle"] },
    "evidence-based":   { label: "Evidence-based practice",  keywords: ["evidence-based"] },
    advocacy:           { label: "Strong patient advocate",  keywords: ["advocacy", "affirming", "empowering"] },
    holistic:           { label: "Holistic care approach",   keywords: ["holistic"] },
  };
  if (priority && priorityMap[priority]) {
    const { label, keywords } = priorityMap[priority];
    const allTags = provider.tags.map(t => t.toLowerCase());
    if (keywords.some(k => allTags.some(t => t.includes(k)))) {
      reasons.push(label);
    }
  }

  // Support preferences
  const prefs = answers["support-preferences"] as string[] | undefined;
  if (prefs && !prefs.includes("none")) {
    if (prefs.includes("lgbtq-affirming") && provider.tags.some(t => t.toLowerCase().includes("lgbtq"))) {
      reasons.push("LGBTQ+ affirming");
    }
    if (prefs.includes("trauma-informed") && provider.tags.some(t => t.toLowerCase().includes("trauma"))) {
      reasons.push("Trauma-informed care");
    }
    if (prefs.includes("culturally-specific") && provider.tags.some(t => t.toLowerCase().includes("culturally"))) {
      reasons.push("Culturally responsive care");
    }
  }

  // Fall back to mock reasons if nothing generated (e.g. no intake session)
  if (reasons.length === 0) return provider.matchReasons;

  return reasons.slice(0, 6); // Cap at 6 reasons
}

export function ProviderProfileView({ provider }: ProviderProfileViewProps) {
  const [activeTab, setActiveTab] = useState("about");
  const [modalOpen, setModalOpen] = useState(false);
  const [hasIntakeSession, setHasIntakeSession] = useState(false);
  const [matchReasons, setMatchReasons] = useState<string[]>(provider.matchReasons);

  useEffect(() => {
    const stored = loadIntakeAnswers();
    if (stored) {
      setHasIntakeSession(true);
      setMatchReasons(generateMatchReasons(provider, stored.answers));
    }
  }, [provider]);

  // Provider with dynamic match reasons for sidebar
  const enrichedProvider = { ...provider, matchReasons };

  return (
    <section className="py-8">
      <Container>
        {/* Back link */}
        {hasIntakeSession ? (
          <Link
            href="/results"
            className="inline-flex items-center gap-1 text-sm font-normal text-muted hover:text-heading"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to matches
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-normal text-muted hover:text-heading"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Browse providers
          </Link>
        )}

        {/* Header */}
        <div className="mt-6">
          <ProfileHeader provider={provider} />
        </div>

        {/* Mobile CTA */}
        <div className="mt-4 lg:hidden">
          <Button fullWidth onClick={() => setModalOpen(true)}>
            Request a consult
          </Button>
        </div>

        {/* Main content */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Tabs + content */}
          <div className="min-w-0 flex-1">
            <div className="sticky top-16 z-10 bg-white/95 backdrop-blur-sm lg:static lg:bg-transparent lg:backdrop-blur-none">
              <Tabs
                tabs={profileTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            <TabPanel id="about" activeTab={activeTab}>
              <AboutTab provider={provider} />
            </TabPanel>
            <TabPanel id="reviews" activeTab={activeTab}>
              <ReviewsTab provider={provider} />
            </TabPanel>
            <TabPanel id="pricing" activeTab={activeTab}>
              <PricingTab provider={provider} />
            </TabPanel>
          </div>

          {/* Sidebar (desktop) */}
          <div className="hidden w-full shrink-0 lg:sticky lg:top-24 lg:block lg:w-72 lg:self-start">
            <ProfileSidebar
              provider={enrichedProvider}
              onRequestConsult={() => setModalOpen(true)}
            />
          </div>

          {/* Sidebar (mobile) */}
          <div className="lg:hidden">
            <ProfileSidebar
              provider={enrichedProvider}
              onRequestConsult={() => setModalOpen(true)}
            />
          </div>
        </div>
      </Container>

      {/* Sticky bottom CTA (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-card-border bg-white/90 p-4 backdrop-blur-sm lg:hidden">
        <Button fullWidth onClick={() => setModalOpen(true)}>
          Request a consult
        </Button>
      </div>

      <ConsultRequestModal
        provider={provider}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}