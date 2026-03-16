import { ProviderHero } from "./_components/ProviderHero";
import { SideBySide } from "./_components/SideBySide";
import { LeadPacketPreview } from "./_components/LeadPacketPreview";
import { PricingSection } from "./_components/PricingSection";
import { ProviderBottomCta } from "./_components/ProviderBottomCta";

export const metadata = {
  title: "For Providers — Homebirth.com",
  description:
    "Join the homebirth marketplace. Get matched with parents who fit your practice — not just your zip code.",
};

export default function ForProvidersPage() {
  return (
    <>
      <ProviderHero />
      <SideBySide />
      <LeadPacketPreview />
      <PricingSection />
      <ProviderBottomCta />
    </>
  );
}
