"use client";

import { useState } from "react";
import { MapView, providersToMapPins } from "@/components/MapView";
import type { Provider } from "@/lib/types/provider";

interface ResultsSidebarProps {
  filters: {
    acceptingOnly: boolean;
    within10: boolean;
    slidingScale: boolean;
    vbac: boolean;
  };
  onFilterChange: (key: string, value: boolean) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  providers?: Provider[];
  highlightedId?: string | null;
  onPinHover?: (id: string | null) => void;
  onPinClick?: (id: string) => void;
}

export function ResultsSidebar({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  providers = [],
  highlightedId,
  onPinHover,
  onPinClick,
}: ResultsSidebarProps) {
  // Collapsed by default on mobile per spec, always visible on desktop
  const [showMap, setShowMap] = useState(false);
  const pins = providersToMapPins(providers);

  return (
    <div className="flex flex-col gap-6">
      {/* Map — toggleable on mobile, always on desktop */}
      <div className="lg:block">
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="mb-2 text-sm font-medium text-primary hover:underline lg:hidden"
        >
          {showMap ? "Hide map" : "Show map"}
        </button>
        <div className={`${showMap ? "block" : "hidden"} lg:block`}>
          <MapView
            pins={pins}
            highlightedId={highlightedId}
            onPinClick={onPinClick}
            onPinHover={onPinHover}
            className="h-48"
          />
        </div>
      </div>

      {/* Quick filters */}
      <div>
        <h3 className="text-sm font-semibold text-heading">Quick filters</h3>
        <div className="mt-3 flex flex-col gap-2">
          {[
            { key: "acceptingOnly", label: "Accepting clients only", checked: filters.acceptingOnly },
            { key: "within10", label: "Within 10 miles", checked: filters.within10 },
            { key: "slidingScale", label: "Sliding scale / Medicaid", checked: filters.slidingScale },
            { key: "vbac", label: "VBAC experienced", checked: filters.vbac },
          ].map((filter) => (
            <label
              key={filter.key}
              className="flex cursor-pointer items-center gap-2 text-sm text-heading"
            >
              <input
                type="checkbox"
                checked={filter.checked}
                onChange={(e) =>
                  onFilterChange(filter.key, e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300 text-primary accent-primary"
              />
              {filter.label}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-heading">Sort by</h3>
        <div className="mt-2 flex flex-col gap-1">
          {[
            { value: "match", label: "Best match" },
            { value: "distance", label: "Distance" },
            { value: "experience", label: "Experience" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm text-heading"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={() => onSortChange(option.value)}
                className="h-4 w-4 border-gray-300 text-primary accent-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
