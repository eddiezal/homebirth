export type ActivityEventType = "request" | "response" | "scheduled" | "booked" | "system";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  title: string;
  detail: string;
  timestamp: string;
}

export interface PipelineSummary {
  new: number;
  contacted: number;
  scheduled: number;
  booked: number;
}

export interface MonthlyMetrics {
  views: number;
  requests: number;
  booked: number;
  responseTime: string;
}

export interface ProfileHealthItem {
  id: string;
  label: string;
  completed: boolean;
  impactBadge?: string;
}

export interface ProviderDashboardData {
  providerName: string;
  greeting: string;
  newLeadCount: number;
  profileViews: number;
  profileViewsChange: number;
  totalBooked: number;
  monthLabel: string;
  metrics: MonthlyMetrics;
  pipeline: PipelineSummary;
  activity: ActivityEvent[];
  profileHealth: ProfileHealthItem[];
  aggregateRating: number;
  reviewCount: number;
  sentimentTags: string[];
  viewsHistory: number[];
  insight: string;
}
