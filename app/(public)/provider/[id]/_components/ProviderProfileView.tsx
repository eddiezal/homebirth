"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Tabs, TabPanel, Button } from "@/components/ui";
import { ConsultRequestModal } from "@/components/ConsultRequestModal";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSidebar } from "./ProfileSidebar";
import { AboutTab } from "./AboutTab";
import { ReviewsTab } from "./ReviewsTab";
import { PricingTab } from "./PricingTab";
import type { ProviderProfile } from "@/lib/types/provider";

interface ProviderProfileViewProps {
  provider: ProviderProfile;
}

const profileTabs = [
  { id: "about", label: "About" },
  { id: "reviews", label: "Reviews" },
  { id: "pricing", label: "Pricing" },
];

export function ProviderProfileView({ provider }: ProviderProfileViewProps) {
  const [activeTab, setActiveTab] = useState("about");
  const [modalOpen, setModalOpen] = useState(false);
  const [hasIntakeSession, setHasIntakeSession] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasIntakeSession(!!sessionStorage.getItem("homebirth_intake"));
    }
  }, []);

  return (
    <section className="py-8">
      <Container>
        {/* Back link */}
        {hasIntakeSession ? (
          <Link
            href="/results"
            className="inline-flex items-center gap-1 text-sm font-normal text-muted hover:text-heading"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to matches
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-normal text-muted hover:text-heading"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Browse providers
          </Link>
        )}

        {/* Header */}
        <div className="mt-6">
          <ProfileHeader provider={provider} />
        </div>

        {/* Mobile CTA (below header, visible only on small screens) */}
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
              provider={provider}
              onRequestConsult={() => setModalOpen(true)}
            />
          </div>

          {/* Sidebar content (mobile, below tabs) */}
          <div className="lg:hidden">
            <ProfileSidebar
              provider={provider}
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

      {/* Consult Request Modal */}
      <ConsultRequestModal
        provider={provider}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
