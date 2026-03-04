import { Suspense } from "react";
import { ConfirmationView } from "./_components/ConfirmationView";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted">Loading...</p>
        </div>
      }
    >
      <ConfirmationView />
    </Suspense>
  );
}
