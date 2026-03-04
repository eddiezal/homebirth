"use client";

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
}

export function ResultsSidebar({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
}: ResultsSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Map placeholder */}
      <div className="flex h-48 items-center justify-center rounded-[12px] border border-card-border bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-8 w-8 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <p className="mt-2 text-xs text-muted">Map coming soon</p>
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
