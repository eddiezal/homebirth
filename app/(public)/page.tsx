import { HeroSection } from "./_components/HeroSection";
import { StartHereHub } from "./_components/StartHereHub";
import { QuestionsToAsk } from "./_components/QuestionsToAsk";
import { HowItWorks } from "./_components/HowItWorks";
import { VerificationExplainer } from "./_components/VerificationExplainer";
import { BottomCta } from "./_components/BottomCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StartHereHub />
      <QuestionsToAsk />
      <HowItWorks />
      <VerificationExplainer />
      <BottomCta />
    </>
  );
}
