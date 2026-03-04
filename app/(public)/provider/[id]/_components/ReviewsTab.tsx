import { Badge } from "@/components/ui";
import { StarRating } from "@/components/ui/StarRating";
import type { ProviderProfile } from "@/lib/types/provider";

interface ReviewsTabProps {
  provider: ProviderProfile;
}

const sourceColors: Record<string, { bg: string; text: string; label: string }> = {
  google: { bg: "bg-blue-50", text: "text-blue-700", label: "Google" },
  yelp: { bg: "bg-red-50", text: "text-red-700", label: "Yelp" },
  facebook: { bg: "bg-indigo-50", text: "text-indigo-700", label: "Facebook" },
};

export function ReviewsTab({ provider }: ReviewsTabProps) {
  if (provider.reviewCount === 0) {
    return (
      <div className="rounded-[12px] border border-card-border p-8 text-center">
        <h3 className="text-lg font-semibold text-heading">No reviews yet</h3>
        <p className="mt-2 text-sm text-muted">
          Reviews from Google, Yelp, and Facebook will appear here once
          available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Aggregate rating */}
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <span className="text-4xl font-bold text-heading">
          {provider.aggregateRating}
        </span>
        <div>
          <StarRating rating={provider.aggregateRating} />
          <p className="mt-0.5 text-sm text-muted">
            {provider.reviewCount} reviews across{" "}
            {provider.ratingBreakdown.length} platform
            {provider.ratingBreakdown.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Source breakdown */}
      <div className="flex flex-wrap gap-3">
        {provider.ratingBreakdown.map((source) => {
          const style = sourceColors[source.source] || sourceColors.google;
          return (
            <div
              key={source.source}
              className="flex items-center gap-3 rounded-[12px] border border-card-border p-3"
            >
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}
              >
                {style.label}
              </span>
              <div className="flex items-center gap-1.5">
                <StarRating rating={source.rating} size="sm" />
                <span className="text-sm font-medium text-heading">
                  {source.rating}
                </span>
              </div>
              <span className="text-xs text-muted">
                {source.count} reviews
              </span>
            </div>
          );
        })}
      </div>

      {/* Sentiment tags */}
      {provider.sentimentTags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-heading">
            What parents mention most
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {provider.sentimentTags.map((tag, i) => (
              <Badge key={tag} variant={i < 3 ? "teal" : "gray"}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Review snippets */}
      <div className="flex flex-col gap-4">
        {provider.reviews.map((review) => {
          const style = sourceColors[review.source] || sourceColors.google;
          const initials = review.author
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div
              key={review.id}
              className="rounded-[12px] border border-card-border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-muted">
                  {initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-heading">
                      {review.author}
                    </span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}
                    >
                      {style.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="text-xs text-muted">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm italic leading-relaxed text-muted">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
