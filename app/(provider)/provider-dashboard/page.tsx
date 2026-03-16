import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/supabase/auth";
import { getProviderDashboard } from "@/lib/queries/dashboard";
import { getProviderLeads } from "@/lib/queries/leads";
import { DashboardView } from "./_components/DashboardView";

export default async function ProviderDashboardPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== "provider" || !profile.profile) {
    redirect("/provider-sign-in");
  }

  const providerId = profile.profile.id;

  const [dashboardData, newLeads] = await Promise.all([
    getProviderDashboard(providerId),
    getProviderLeads(providerId, "new"),
  ]);

  return <DashboardView data={dashboardData} newLeads={newLeads} />;
}
