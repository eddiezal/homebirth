import { Suspense } from "react";
import { ResultsList } from "./_components/ResultsList";

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted">Loading results...</p>
        </div>
      }
    >
      <ResultsList />
    </Suspense>
  );
}
