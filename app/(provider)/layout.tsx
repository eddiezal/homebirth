import { redirect } from "next/navigation";
import { ProviderNav } from "@/components/ProviderNav";
import { Footer } from "@/components/Footer";
import { getUserProfile } from "@/lib/supabase/auth";
import { getLeadCountsByStatus } from "@/lib/queries/leads";

export default async function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUserProfile();

  if (!profile || profile.role !== "provider" || !profile.profile) {
    redirect("/provider-sign-in");
  }

  const counts = await getLeadCountsByStatus(profile.profile.id);
  const providerName = profile.profile.name || "Provider";

  return (
    <>
      <ProviderNav
        providerName={providerName}
        newLeadCount={counts.new}
      />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
