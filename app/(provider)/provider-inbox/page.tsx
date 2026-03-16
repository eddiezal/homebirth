import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/supabase/auth";
import { getProviderLeads } from "@/lib/queries/leads";
import { InboxView } from "./_components/InboxView";

export default async function ProviderInboxPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== "provider" || !profile.profile) {
    redirect("/provider-sign-in");
  }

  const providerId = profile.profile.id;
  const leads = await getProviderLeads(providerId);

  return <InboxView initialLeads={leads} />;
}
