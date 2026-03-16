"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Container, Stepper, Button } from "@/components/ui";
import type { OnboardingData } from "@/lib/types/onboarding";
import { ONBOARDING_STEPS } from "@/lib/types/onboarding";
import {
  loadOnboardingData,
  loadOnboardingStep,
  saveOnboardingData,
  saveOnboardingStep,
  clearOnboardingData,
} from "@/lib/utils/onboarding-storage";
import { saveProviderOnboarding } from "@/lib/queries/provider-profile";
import { Step1Name } from "./Step1Name";
import { Step2Location } from "./Step2Location";
import { Step3Tagline } from "./Step3Tagline";
import { Step4Approach } from "./Step4Approach";
import { Step5Values } from "./Step5Values";
import { Step6Pricing } from "./Step6Pricing";
import { Step7Matching } from "./Step7Matching";
import { Step8Verification } from "./Step8Verification";
import { LivePreview } from "./LivePreview";

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(() => loadOnboardingStep());
  const [data, setData] = useState<OnboardingData>(() => loadOnboardingData());
  const [showPreview, setShowPreview] = useState(false);

  const updateData = useCallback(
    (partial: Partial<OnboardingData>) => {
      setData((prev) => {
        const next = { ...prev, ...partial };
        saveOnboardingData(next);
        return next;
      });
    },
    []
  );

  function handleNext() {
    if (currentStep < 8) {
      const next = currentStep + 1;
      setCurrentStep(next);
      saveOnboardingStep(next);
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      saveOnboardingStep(prev);
    }
  }

  const [launching, setLaunching] = useState(false);
  const [launchError, setLaunchError] = useState("");

  async function handleLaunch() {
    setLaunching(true);
    setLaunchError("");

    const result = await saveProviderOnboarding(data);

    if (result.error) {
      setLaunchError(result.error);
      setLaunching(false);
      return;
    }

    clearOnboardingData();
    router.push("/provider-dashboard");
  }

  function handleSaveExit() {
    saveOnboardingData(data);
    saveOnboardingStep(currentStep);
    router.push("/");
  }

  const stepTitle = ONBOARDING_STEPS[currentStep - 1]?.title || "";

  const stepComponent = (() => {
    switch (currentStep) {
      case 1: return <Step1Name data={data} onChange={updateData} />;
      case 2: return <Step2Location data={data} onChange={updateData} />;
      case 3: return <Step3Tagline data={data} onChange={updateData} />;
      case 4: return <Step4Approach data={data} onChange={updateData} />;
      case 5: return <Step5Values data={data} onChange={updateData} />;
      case 6: return <Step6Pricing data={data} onChange={updateData} />;
      case 7: return <Step7Matching data={data} onChange={updateData} />;
      case 8: return <Step8Verification data={data} onChange={updateData} />;
      default: return null;
    }
  })();

  // Mobile preview overlay
  if (showPreview) {
    return (
      <section className="py-8">
        <Container>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-heading">Profile preview</h2>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="text-sm font-medium text-primary hover:underline"
            >
              Close preview
            </button>
          </div>
          <LivePreview data={data} />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-8">
      <Container>
        {/* Top bar: progress + save & exit */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <Stepper currentStep={currentStep} totalSteps={8} className="flex-1" />
          <button
            type="button"
            onClick={handleSaveExit}
            className="shrink-0 text-sm font-medium text-muted hover:text-heading"
          >
            Save &amp; exit
          </button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: form */}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold text-heading">{stepTitle}</h1>

            <div className="mt-6">{stepComponent}</div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                {currentStep > 1 && (
                  <Button variant="ghost" onClick={handleBack}>
                    ← Back
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile preview link */}
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="text-sm font-medium text-primary hover:underline lg:hidden"
                >
                  Preview so far
                </button>
                {currentStep < 8 ? (
                  <Button onClick={handleNext}>Continue</Button>
                ) : (
                  <Button onClick={handleLaunch} disabled={launching}>
                    {launching ? "Launching..." : "Launch my profile →"}
                  </Button>
                )}
                {launchError && (
                  <p className="mt-2 text-sm text-red-500">{launchError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: live preview (desktop only) */}
          <div className="hidden w-[340px] shrink-0 lg:block">
            <div className="sticky top-24">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-heading">Your profile</span>
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                  Parents see this
                </span>
              </div>
              <LivePreview data={data} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
