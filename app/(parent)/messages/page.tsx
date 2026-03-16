import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getUserProfile } from "@/lib/supabase/auth";
import { getParentThreads } from "@/lib/queries/parent-dashboard";
import { MessagesView } from "./_components/MessagesView";

export default async function ParentMessagesPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== "parent" || !profile.profile) {
    redirect("/sign-in");
  }

  const threads = await getParentThreads(profile.profile.id);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted">Loading...</p>
        </div>
      }
    >
      <MessagesView initialThreads={threads} />
    </Suspense>
  );
}
