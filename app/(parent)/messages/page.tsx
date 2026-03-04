"use client";

import { Suspense } from "react";
import { MessagesView } from "./_components/MessagesView";

export default function ParentMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted">Loading...</p>
        </div>
      }
    >
      <MessagesView />
    </Suspense>
  );
}
