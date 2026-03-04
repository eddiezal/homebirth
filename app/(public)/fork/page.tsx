import { Container } from "@/components/ui";
import { LocationBadge } from "./_components/LocationBadge";
import { JourneyCard } from "./_components/JourneyCard";

interface ForkPageProps {
  searchParams: Promise<{ zip?: string }>;
}

export default async function ForkPage({ searchParams }: ForkPageProps) {
  const { zip = "" } = await searchParams;

  return (
    <section className="py-16">
      <Container className="flex flex-col items-center text-center">
        <LocationBadge zip={zip} />

        <h1 className="mt-8 text-[2rem] font-semibold tracking-[-0.015em] text-heading sm:text-[2.5rem]">
          Where are you in your journey?
        </h1>
        <p className="mt-3 max-w-lg text-muted">
          We&apos;ll tailor your experience so you get exactly what&apos;s
          useful right now.
        </p>

        <div className="mt-12 flex w-full max-w-3xl flex-col gap-6 sm:flex-row">
          <JourneyCard
            icon={
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
            title="I'm exploring"
            description="Not sure if homebirth is right for me. I want to learn before I commit."
            linkText="Show me resources"
            linkHref="/resources"
            bgClass="bg-white"
          />
          <JourneyCard
            icon={
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            }
            title="I'm ready to match"
            description="I want to find and compare providers who fit my needs."
            linkText="Start matching"
            linkHref={`/intake?zip=${encodeURIComponent(zip)}`}
            bgClass="bg-primary-light/50"
          />
        </div>
      </Container>
    </section>
  );
}
