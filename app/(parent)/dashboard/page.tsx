import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/supabase/auth";
import { getParentConsultCards } from "@/lib/queries/parent-dashboard";
import { DashboardView } from "./_components/DashboardView";

export default async function ParentDashboardPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== "parent" || !profile.profile) {
    redirect("/sign-in");
  }

  const parentName = profile.profile.name || "there";
  const consults = await getParentConsultCards(profile.profile.id);

  return <DashboardView parentName={parentName} initialConsults={consults} />;
}
