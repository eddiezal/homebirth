import type { ProviderDashboardData } from "@/lib/types/dashboard";

export const mockDashboardData: ProviderDashboardData = {
  providerName: "Sarah",
  greeting:
    'Good afternoon, Sarah. You have **2 new leads** waiting for a response. Your profile was viewed **142 times** this month — up 23% from February. You\'ve booked **1 client** through the platform so far.',
  newLeadCount: 2,
  profileViews: 142,
  profileViewsChange: 23,
  totalBooked: 1,
  monthLabel: "March at a glance",
  metrics: {
    views: 142,
    requests: 7,
    booked: 3,
    responseTime: "8h",
  },
  pipeline: {
    new: 2,
    contacted: 1,
    scheduled: 1,
    booked: 1,
  },
  activity: [
    {
      id: "act-1",
      type: "request",
      title: "Jessica M. requested a consult",
      detail: "97% match · VBAC, Insurance, June 2026",
      timestamp: "2 hours ago",
    },
    {
      id: "act-2",
      type: "request",
      title: "Priya S. requested a consult",
      detail: "94% match · First-time parent, Self-pay, July 2026",
      timestamp: "Yesterday",
    },
    {
      id: "act-3",
      type: "response",
      title: "You responded to Dana K.",
      detail: "3 availability slots offered",
      timestamp: "3 days ago",
    },
    {
      id: "act-4",
      type: "scheduled",
      title: "Consult scheduled with Maria L.",
      detail: "Wednesday, Mar 5 at 9:00 AM",
      timestamp: "5 days ago",
    },
    {
      id: "act-5",
      type: "booked",
      title: "Ashley T. booked!",
      detail: "September 2026 due date · VBAC",
      timestamp: "1 week ago",
    },
    {
      id: "act-6",
      type: "system",
      title: "Your profile was verified",
      detail: "License verified — California state records",
      timestamp: "2 weeks ago",
    },
  ],
  profileHealth: [
    { id: "photo", label: "Profile photo", completed: true, impactBadge: "2x more clicks" },
    { id: "tagline", label: "Tagline", completed: true },
    { id: "philosophy", label: "Philosophy", completed: true },
    { id: "pricing", label: "Pricing", completed: true },
    { id: "verification", label: "Verification", completed: true, impactBadge: "3x more consults" },
    { id: "reviews", label: "Review URLs", completed: false, impactBadge: "Builds trust" },
  ],
  aggregateRating: 4.9,
  reviewCount: 47,
  sentimentTags: ["Great communicator (18)", "Made me feel safe (15)", "Knowledgeable (14)"],
  viewsHistory: [89, 95, 102, 118, 130, 142],
  insight:
    "Your VBAC tag is driving 60% of your matches this month. Parents searching for VBAC experience are 2x more likely to request a consult.",
};
