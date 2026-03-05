"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import { loadIntakeAnswers } from "@/lib/utils/intake-storage";
import { mockProviders } from "@/lib/data/mock-providers";
import { scoreProviders } from "@/lib/matching/score";
import { resolveCity } from "../../fork/_components/LocationBadge";
import type { IntakeAnswers } from "@/lib/types/intake";
import type { Provider } from "@/lib/types/provider";
import { ConsultRequestModal } from "@/components/ConsultRequestModal";
import { ResultsHeader } from "./ResultsHeader";
import { ProviderCard } from "./ProviderCard";
import { ResultsSidebar } from "./ResultsSidebar";

interface Filters {
  acceptingOnly: boolean;
  within10: boolean;
  slidingScale: boolean;
  vbac: boolean;
}

export function ResultsList() {
  const router = useRouter();
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [zip, setZip] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    acceptingOnly: false,
    within10: false,
    slidingScale: false,
    vbac: false,
  });
  const [sortBy, setSortBy] = useState("match");
  const [modalProviderId, setModalProviderId] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadIntakeAnswers();
    if (!stored) {
      router.replace("/intake");
      return;
    }
    setAnswers(stored.answers);
    setZip(stored.zip);
    setLoaded(true);
  }, [router]);

  const scoredProviders = useMemo(
    () => scoreProviders(mockProviders, answers),
    [answers]
  );

  const filteredProviders = useMemo(() => {
    let result = [...scoredProviders];

    if (filters.acceptingOnly) {
      result = result.filter((p) => p.acceptingClients);
    }
    if (filters.within10) {
      result = result.filter((p) => p.distance <= 10);
    }
    if (filters.slidingScale) {
      result = result.filter(
        (p) =>
          p.slidingScale ||
          p.insuranceAccepted.some((i) => i.toLowerCase().includes("medicaid"))
      );
    }
    if (filters.vbac) {
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes("vbac"))
      );
    }

    if (sortBy === "distance") {
      result.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "experience") {
      result.sort((a, b) => b.yearsExperience - a.yearsExperience);
    }

    return result;
  }, [scoredProviders, filters, sortBy]);

  function handleFilterChange(key: string, value: boolean) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleWidenSearch() {
    // Clear all active filters first
    setFilters({ acceptingOnly: false, within10: false, slidingScale: false, vbac: false });
    setSortBy("match");
    // If still no results after clearing, send back to intake
    if (scoredProviders.length === 0) {
      router.push("/intake");
    }
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Loading results...</p>
      </div>
    );
  }

  const location = resolveCity(zip) ?? zip ?? "your area";
  const modalProvider = modalProviderId
    ? filteredProviders.find((p) => p.id === modalProviderId) ?? null
    : null;

  return (
    <section className="py-8">
      <Container>
        <ResultsHeader
          count={filteredProviders.length}
          location={location}
          answers={answers}
        />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Provider cards */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {filteredProviders.map((provider: Provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onRequestConsult={setModalProviderId}
              />
            ))}

            {filteredProviders.length === 0 && (
              <div className="rounded-[12px] border border-card-border bg-white p-8 text-center">
                <p className="text-muted">
                  No providers match your current filters.
                </p>
                <button
                  type="button"
                  onClick={handleWidenSearch}
                  className="mt-3 text-sm font-medium text-primary hover:underline"
                >
                  Clear filters and try again
                </button>
              </div>
            )}

            {filteredProviders.length > 0 && (
              <p className="text-center text-sm text-muted">
                Not finding the right match?{" "}
                <button
                  type="button"
                  onClick={handleWidenSearch}
                  className="font-medium text-primary hover:underline"
                >
                  Widen search radius or adjust preferences
                </button>
              </p>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72 lg:self-start">
            <ResultsSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </Container>

      {modalProvider && (
        <ConsultRequestModal
          provider={modalProvider}
          open={!!modalProvider}
          onClose={() => setModalProviderId(null)}
        />
      )}
    </section>
  );
}