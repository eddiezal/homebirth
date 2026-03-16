"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Container, Button, Tabs, TabPanel, Input, ChipSelect, Textarea, Badge } from "@/components/ui";
import type { ProviderEditData } from "@/lib/queries/provider-profile";
import { updateProviderProfile } from "@/lib/queries/provider-profile";
import {
  SPECIALTY_OPTIONS,
  VALUES_OPTIONS,
  BIRTH_SETTING_OPTIONS,
  WHATS_INCLUDED_OPTIONS,
  PAYMENT_OPTIONS,
} from "@/lib/types/onboarding";

interface ProfileEditViewProps {
  provider: ProviderEditData;
}

export function ProfileEditView({ provider }: ProfileEditViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("about");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable fields initialized from real provider data
  const [fullName, setFullName] = useState(provider.name);
  const [tagline, setTagline] = useState(provider.tagline);
  const [philosophy, setPhilosophy] = useState(provider.philosophy);
  const [specialties, setSpecialties] = useState<string[]>(provider.specialties);
  const [values, setValues] = useState<string[]>(provider.valuesTags);
  const [birthSettings, setBirthSettings] = useState<string[]>(provider.birthSettings);
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>(provider.whatsIncluded);
  const [paymentOptions, setPaymentOptions] = useState<string[]>(provider.paymentOptions);

  async function handleSave() {
    setSaving(true);
    const result = await updateProviderProfile(provider.id, {
      name: fullName,
      tagline,
      philosophy,
      specialties,
      valuesTags: values,
      birthSettings,
      whatsIncluded,
      paymentOptions,
    });

    setSaving(false);

    if (!result.error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      startTransition(() => {
        router.refresh();
      });
    }
  }

  const tabs = [
    { id: "about", label: "About" },
    { id: "pricing", label: "Pricing" },
    { id: "verification", label: "Verification" },
  ];

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left column — editable profile */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-heading">Edit profile</h1>
              <div className="flex items-center gap-3">
                {saved && (
                  <span className="text-sm text-primary">Saved!</span>
                )}
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>

            {/* Profile header card */}
            <div className="mt-6 rounded-[12px] border border-card-border bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-light text-xl font-semibold text-primary">
                  {fullName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <Input
                    label="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-muted">
                    {provider.credentials} · {provider.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

              <TabPanel id="about" activeTab={activeTab}>
                <div className="flex flex-col gap-6">
                  <Input
                    label="Tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    hint="One sentence that describes your practice"
                  />

                  <Textarea
                    label="Care philosophy"
                    value={philosophy}
                    onChange={(e) => setPhilosophy(e.target.value)}
                    hint="2-3 sentences about your approach"
                  />

                  <div>
                    <label className="block text-sm font-medium text-heading">
                      Specialties
                    </label>
                    <ChipSelect
                      options={SPECIALTY_OPTIONS}
                      selected={specialties}
                      onToggle={(s) =>
                        setSpecialties((prev) =>
                          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                        )
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading">
                      Values
                    </label>
                    <ChipSelect
                      options={VALUES_OPTIONS}
                      selected={values}
                      onToggle={(v) =>
                        setValues((prev) =>
                          prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
                        )
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading">
                      Birth settings
                    </label>
                    <ChipSelect
                      options={BIRTH_SETTING_OPTIONS}
                      selected={birthSettings}
                      onToggle={(bs) =>
                        setBirthSettings((prev) =>
                          prev.includes(bs) ? prev.filter((x) => x !== bs) : [...prev, bs]
                        )
                      }
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabPanel>

              <TabPanel id="pricing" activeTab={activeTab}>
                <div className="flex flex-col gap-6">
                  <div className="rounded-[8px] bg-gray-50 px-4 py-3">
                    <p className="text-sm text-heading">
                      Current range: <strong>{provider.priceRange || "Not set"}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading">
                      What&apos;s included
                    </label>
                    <ChipSelect
                      options={WHATS_INCLUDED_OPTIONS}
                      selected={whatsIncluded}
                      onToggle={(item) =>
                        setWhatsIncluded((prev) =>
                          prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
                        )
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading">
                      Payment options
                    </label>
                    <ChipSelect
                      options={PAYMENT_OPTIONS}
                      selected={paymentOptions}
                      onToggle={(item) =>
                        setPaymentOptions((prev) =>
                          prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
                        )
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading">
                      Insurance accepted
                    </label>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {provider.insuranceAccepted.length > 0 ? (
                        provider.insuranceAccepted.map((ins) => (
                          <Badge key={ins} variant="gray">{ins}</Badge>
                        ))
                      ) : (
                        <p className="text-xs text-muted">None added yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel id="verification" activeTab={activeTab}>
                <div className="flex flex-col gap-4">
                  {[
                    { type: "identity" as const, verified: provider.identityVerified, detail: "Government-issued ID verification" },
                    { type: "license" as const, verified: provider.licenseVerified, detail: "State license/certification check" },
                    { type: "practice" as const, verified: provider.practiceVerified, detail: "NPI or website URL confirmed" },
                  ].map((v) => (
                    <div
                      key={v.type}
                      className={`rounded-[12px] border p-4 ${
                        v.verified
                          ? "border-primary bg-primary-light"
                          : "border-card-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {v.verified ? (
                            <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-card-border" />
                          )}
                          <span className="text-sm font-medium capitalize text-heading">
                            {v.type} verification
                          </span>
                        </div>
                        <Badge variant={v.verified ? "teal" : "gray"}>
                          {v.verified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs text-muted">{v.detail}</p>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </div>
          </div>

          {/* Right sidebar — profile preview */}
          <div className="hidden w-[320px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-[12px] border border-card-border bg-white p-5">
              <p className="text-xs font-medium text-muted">Profile preview</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                  {fullName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-heading">{fullName}</p>
                  <p className="text-xs text-muted">{provider.credentials}</p>
                </div>
              </div>
              {tagline && (
                <p className="mt-3 text-xs italic text-muted">
                  &ldquo;{tagline}&rdquo;
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-1">
                {specialties.map((s) => (
                  <Badge key={s} variant="teal">{s}</Badge>
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-heading">
                {provider.priceRange || "Price not set"}
              </p>
              <p className="mt-1 text-xs text-muted">
                {provider.location}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
