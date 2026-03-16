import { redirect } from "next/navigation";
import { ParentNav } from "@/components/ParentNav";
import { Footer } from "@/components/Footer";
import { getUserProfile } from "@/lib/supabase/auth";

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUserProfile();

  if (!profile || !profile.profile) {
    redirect("/sign-in");
  }

  const parentName = profile.profile.name || "User";

  return (
    <>
      <ParentNav parentName={parentName} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
