import { HeroSection } from "./_components/HeroSection";
import { ScrollIndicator } from "./_components/ScrollIndicator";
import { StartHereHub } from "./_components/StartHereHub";
import { HowItWorks } from "./_components/HowItWorks";
import { QuestionsToAsk } from "./_components/QuestionsToAsk";
import { Testimonial } from "./_components/Testimonial";
import { VerificationExplainer } from "./_components/VerificationExplainer";
import { ProviderCallout } from "./_components/ProviderCallout";
import { FoundersSnippet } from "./_components/FoundersSnippet";
import { BottomCta } from "./_components/BottomCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrollIndicator />
      <StartHereHub />
      <HowItWorks />
      <QuestionsToAsk />
      <Testimonial />
      <VerificationExplainer />
      <ProviderCallout />
      <FoundersSnippet />
      <BottomCta />
    </>
  );
}
