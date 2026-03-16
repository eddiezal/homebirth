import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/supabase/auth";
import { getProviderEditProfile } from "@/lib/queries/provider-profile";
import { ProfileEditView } from "./_components/ProfileEditView";

export default async function ProviderProfilePage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== "provider" || !profile.profile) {
    redirect("/provider-sign-in");
  }

  const providerData = await getProviderEditProfile(profile.profile.id);

  if (!providerData) {
    redirect("/provider-sign-in");
  }

  return <ProfileEditView provider={providerData} />;
}
