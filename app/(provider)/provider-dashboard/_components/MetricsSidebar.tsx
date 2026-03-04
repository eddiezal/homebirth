import { Card, Badge, StarRating } from "@/components/ui";
import type { ProviderDashboardData } from "@/lib/types/dashboard";

interface MetricsSidebarProps {
  data: ProviderDashboardData;
}

const statusColors: Record<string, string> = {
  new: "bg-primary text-white",
  contacted: "bg-amber-400 text-white",
  scheduled: "bg-blue-500 text-white",
  booked: "bg-green-500 text-white",
};

export function MetricsSidebar({ data }: MetricsSidebarProps) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      {/* Monthly metrics */}
      <Card>
        <h3 className="text-sm font-semibold text-heading">{data.monthLabel}</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <MetricBox label="Views" value={String(data.metrics.views)} accent={false} />
          <MetricBox label="Requests" value={String(data.metrics.requests)} accent />
          <MetricBox label="Booked" value={String(data.metrics.booked)} accent />
          <MetricBox label="Response time" value={data.metrics.responseTime} accent={false} />
        </div>
      </Card>

      {/* Pipeline summary */}
      <Card>
        <h3 className="text-sm font-semibold text-heading">Pipeline</h3>
        <div className="mt-3 flex flex-col gap-2">
          {(["new", "contacted", "scheduled", "booked"] as const).map((status) => (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${statusColors[status]}`} />
                <span className="text-sm capitalize text-heading">{status}</span>
              </div>
              <span className="text-sm font-semibold text-heading">
                {data.pipeline[status]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Profile health */}
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-heading">Profile health</h3>
          <span className="text-xs text-muted">
            {data.profileHealth.filter((h) => h.completed).length}/{data.profileHealth.length}
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${(data.profileHealth.filter((h) => h.completed).length / data.profileHealth.length) * 100}%`,
            }}
          />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {data.profileHealth.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.completed ? (
                  <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="h-4 w-4 rounded-full border border-card-border" />
                )}
                <span className={`text-sm ${item.completed ? "text-muted" : "text-heading"}`}>
                  {item.label}
                </span>
              </div>
              {!item.completed && item.impactBadge && (
                <span className="text-xs text-primary">Add →</span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Reviews summary */}
      <Card>
        <h3 className="text-sm font-semibold text-heading">Your reviews</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl font-bold text-heading">{data.aggregateRating}</span>
          <div>
            <StarRating rating={data.aggregateRating} />
            <p className="text-xs text-muted">{data.reviewCount} reviews</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {data.sentimentTags.map((tag) => (
            <Badge key={tag} variant="teal">{tag}</Badge>
          ))}
        </div>
      </Card>

      {/* Views chart (simple bar) */}
      <Card>
        <h3 className="text-sm font-semibold text-heading">Profile views</h3>
        <div className="mt-3 flex items-end gap-1.5" style={{ height: 60 }}>
          {data.viewsHistory.map((views, i) => {
            const max = Math.max(...data.viewsHistory);
            const height = (views / max) * 100;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t ${
                  i === data.viewsHistory.length - 1
                    ? "bg-primary"
                    : "bg-primary-light"
                }`}
                style={{ height: `${height}%` }}
                title={`${views} views`}
              />
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted">Last 6 months</p>
      </Card>
    </div>
  );
}

function MetricBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: boolean;
}) {
  return (
    <div
      className={`rounded-[8px] p-3 ${
        accent ? "bg-primary-light" : "bg-gray-50"
      }`}
    >
      <p className="text-lg font-bold text-heading">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
