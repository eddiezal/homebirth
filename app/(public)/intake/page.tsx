import { Suspense } from "react";
import { IntakeWizard } from "./_components/IntakeWizard";

export default function IntakePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted">Loading intake...</p>
        </div>
      }
    >
      <IntakeWizard />
    </Suspense>
  );
}
