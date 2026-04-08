import { Container, SectionLabel, Button } from "@/components/ui";

export const metadata = {
  title: "Our Story | Homebirth.com",
  description:
    "Two births. Two countries. One question that wouldn't go away: why is it this hard to find someone you trust?",
};

/* ─── Placeholder avatar (initials in a colored circle) ──── */
function Avatar({
  initials,
  bg,
}: {
  initials: string;
  bg: string;
}) {
  return (
    <div
      className="flex h-28 w-28 items-center justify-center rounded-full text-2xl font-bold text-white shadow-md sm:h-32 sm:w-32"
      style={{ background: bg }}
    >
      {initials}
    </div>
  );
}

/* ─── Pull quote component ───────────────────────────────── */
function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <div className="my-10 rounded-[22px] bg-primary-bg px-8 py-8 sm:px-12">
      <p className="font-serif text-[20px] font-medium italic leading-relaxed text-heading sm:text-[22px]">
        &ldquo;{children}&rdquo;
      </p>
      {attribution && (
        <p className="mt-4 text-[14px] font-semibold text-primary">
          &ndash; {attribution}
        </p>
      )}
    </div>
  );
}

/* ─── Year marker for timeline feel ──────────────────────── */
function YearMarker({ year }: { year: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-lighter text-[13px] font-bold text-primary">
        {year}
      </div>
      <div className="h-px flex-1 bg-card-border" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="border-b border-card-border bg-white py-20">
        <Container className="max-w-[780px] text-center">
          <SectionLabel>Our story</SectionLabel>
          <h1 className="mt-4 font-serif text-[2.2rem] font-bold leading-[1.15] tracking-[-0.02em] text-heading sm:text-[2.8rem]">
            We didn&apos;t plan to build this.{" "}
            <span className="text-primary">Our births did.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-muted">
            We&apos;re Eddie and Jocelyne Zaldivar: parents, partners, and the
            people behind Homebirth.com. This is how two births, two countries,
            and one stubborn question turned into something we couldn&apos;t stop
            building.
          </p>

          {/* Founder avatars */}
          <div className="mt-10 flex items-center justify-center gap-6">
            {/* Replace with real photos */}
            <Avatar initials="EZ" bg="#8b5fa0" />
            <Avatar initials="JZ" bg="#f0cfc0" />
          </div>
          <p className="mt-4 text-[14px] text-faint">
            Eddie &amp; Jocelyne Zaldivar, San Diego, CA
          </p>
        </Container>
      </section>

      {/* ── Act 1: Marie's birth ─────────────────────────── */}
      <section className="py-16">
        <Container className="max-w-[720px]">
          <YearMarker year="2018" />

          <h2 className="font-serif text-[28px] font-semibold leading-tight text-heading sm:text-[32px]">
            The birth that changed everything
          </h2>

          <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted">
            <p>
              When Jo found out she was pregnant with our daughter Marie, we were
              in the middle of planning our wedding. We did what most people
              do: we moved the wedding up, found an OB, and figured we&apos;d
              follow the standard path. Hospital birth, epidural on standby,
              check the boxes.
            </p>

            <p>
              But something didn&apos;t sit right. The appointments felt rushed. The
              questions we had, about how labor would actually be managed, about
              who&apos;d be in the room, about what would happen if things went
              sideways, kept getting half-answered. We started looking into
              alternatives and found a birth center in Knoxville that felt completely
              different. The midwives there actually listened. They had time for us.
              For the first time, it felt like someone was building a plan{" "}
              <em>with</em> us instead of <em>for</em> us.
            </p>

            <p>
              Then, at 24 weeks, the birth center shut down.
            </p>

            <p>
              We were scrambling. We had no backup. Our only options were the
              hospital or a homebirth, something we&apos;d never even considered.
              But once we started researching, we found a midwife who felt right.
              She came to our home for the first visit, sat on our couch, and
              spent two hours answering every question we had. No clock running.
              No rush.
            </p>

            <p>
              Marie was born at home in Knoxville, surrounded by our midwife,
              Jo&apos;s parents, and me. It was the most intense and the most
              peaceful thing I&apos;ve ever been part of. Jo labored in our living
              room, moved freely, made every decision on her terms. When Marie
              arrived, we were in our own bed. Nobody was wheeling us anywhere.
              Nobody was asking us to sign forms. We were just... home.
            </p>
          </div>

          <PullQuote attribution="Jo Zaldivar">
            I didn&apos;t know I could have this. Not just the home birth, but the
            feeling of being completely in charge of my own experience. I keep
            thinking about all the women who don&apos;t know this option exists.
          </PullQuote>

          <div className="space-y-5 text-[16px] leading-[1.75] text-muted">
            <p>
              After Marie was born, we couldn&apos;t stop talking about it. Not just
              the birth itself, but how hard it had been to even{" "}
              <em>discover</em> that this was possible. We never planned on a
              homebirth. We never would have found it if our birth center
              hadn&apos;t closed. That felt backwards. Why was the best
              experience we&apos;d ever had the hardest one to find?
            </p>

            <p>
              In 2019, we bought homebirth.com.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Act 2: Nikola's birth ────────────────────────── */}
      <section className="border-t border-card-border bg-[#fdfaf6] py-16">
        <Container className="max-w-[720px]">
          <YearMarker year="2022" />

          <h2 className="font-serif text-[28px] font-semibold leading-tight text-heading sm:text-[32px]">
            Same question, different country
          </h2>

          <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted">
            <p>
              During Covid, we did what a lot of people were doing: we went
              remote. Six months as digital nomads in Costa Rica. It was
              incredible. And then Jo got pregnant again.
            </p>

            <p>
              We knew immediately that we wanted another home birth. But this
              time we were in a different country with no network, no
              recommendations, and no reliable way to find midwifery services.
              We were googling in two languages, asking expat Facebook groups,
              chasing down outdated clinic listings. Nothing felt trustworthy.
              Nothing connected.
            </p>

            <p>
              So we moved back to Miami. And what we found there surprised us
              even more than the search itself.
            </p>

            <p>
              Our midwife for Nikola&apos;s birth specialized in serving Jewish
              families. We&apos;re not Jewish, but she was wonderful, and
              working with her opened our eyes to something we hadn&apos;t fully
              understood before: families come to home birth for so many
              different reasons. For some it&apos;s religious or cultural
              tradition. For others it&apos;s autonomy and privacy. And for Black
              families in particular, it can be a matter of survival. Maternal
              mortality rates for Black women in the U.S. are significantly
              higher in hospital settings, and home birth with a trusted provider
              is one of the ways communities are taking that power back.
            </p>

            <p>
              Nikola was born in 2022 in Miami. Another beautiful birth. But
              something caught us off guard: our midwife was very hands-off.
              With Marie, our midwife had been deeply hands-on throughout
              labor. Both were great experiences, but the difference in care
              style surprised us. We never thought to ask. It never occurred to
              us that two midwives could approach the same moment so differently.
            </p>

            <p>
              That realization, on top of everything else, left us with something
              bigger than gratitude. We saw how many different communities need
              better access to this care, and how broken the discovery process is
              for all of them. The problem wasn&apos;t Miami. It wasn&apos;t
              Costa Rica. It was everywhere, for everyone. And it wasn&apos;t
              just about finding <em>a</em> midwife. It was about finding the{" "}
              <em>right</em> one.
            </p>
          </div>

          <PullQuote attribution="Eddie Zaldivar">
            We kept running into the same wall: not a lack of great midwives,
            but a lack of any real way to find them. And once we saw how many
            different families need this for how many different reasons, we
            couldn&apos;t unsee it.
          </PullQuote>
        </Container>
      </section>

      {/* ── The question / mission bridge ────────────────── */}
      <section className="py-16">
        <Container className="max-w-[720px]">
          <h2 className="font-serif text-[28px] font-semibold leading-tight text-heading sm:text-[32px]">
            So we built the thing we wished existed
          </h2>

          <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-muted">
            <p>
              Homebirth.com isn&apos;t a directory. It&apos;s not a listing site
              where providers pay to show up first. It&apos;s a matching system
              built on the idea that the right midwife for you isn&apos;t
              necessarily the closest one or the cheapest one. It&apos;s the one
              who aligns with how you want to experience birth.
            </p>

            <p>
              Parents answer a short intake about what matters to them: care
              style, communication, values, budget, birth setting. Providers
              answer the mirror version from their side. Our matching engine
              connects the two based on real compatibility, then explains{" "}
              <em>why</em> each match makes sense.
            </p>

            <p>
              Every parent gets a shortlist of providers who genuinely fit. Every
              provider gets leads from families who are actually aligned with
              their practice. No wasted consultations. No guessing. No settling
              for whoever&apos;s available.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Founder cards ────────────────────────────────── */}
      <section className="border-t border-card-border bg-white py-16">
        <Container className="max-w-[900px]">
          <div className="mb-10 text-center">
            <SectionLabel>Meet us</SectionLabel>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Eddie */}
            <div className="rounded-[22px] border-2 border-card-border p-8">
              <div className="flex items-center gap-4">
                <Avatar initials="EZ" bg="#8b5fa0" />
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-heading">
                    Eddie Zaldivar
                  </h3>
                  <p className="text-[14px] text-muted">
                    Co-founder &middot; Founder,{" "}
                    <a
                      href="https://zaldivarlabs.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Zaldivar Labs
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
                <p>
                  I&apos;m a product builder and founder based in San Diego. My
                  work sits at the intersection of technology, human behavior,
                  and real-world care, building systems that help people make
                  better decisions in moments that matter.
                </p>
                <p>
                  I run{" "}
                  <a
                    href="https://zaldivarlabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Zaldivar Labs
                  </a>
                  , where I partner with teams on strategy, data, and product
                  development. Homebirth.com grew out of the same belief that
                  drives all my work: when the right structure is in place,
                  people don&apos;t just perform better. They feel more
                  supported, more understood, and more confident in the choices
                  they make.
                </p>
              </div>
            </div>

            {/* Jo */}
            <div className="rounded-[22px] border-2 border-card-border p-8">
              <div className="flex items-center gap-4">
                <Avatar initials="JZ" bg="#f0cfc0" />
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-heading">
                    Jocelyne Zaldivar
                  </h3>
                  <p className="text-[14px] text-muted">Co-founder</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
                <p>
                  I&apos;m a licensed social worker. I work with a private
                  hospice company, supporting families through some of the most
                  vulnerable moments of their lives. That work has shaped
                  everything about how I think about trust, care, and what it
                  means to truly show up for someone.
                </p>
                <p>
                  Birth is one of those moments. I know firsthand how much it
                  matters to feel seen and heard by the person guiding you through
                  it. I bring the care perspective: the emotional intelligence,
                  the parent experience, and the stubbornness to make sure this
                  platform always puts families first.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Dual-audience closing CTA ────────────────────── */}
      <section className="py-16">
        <Container className="max-w-[900px]">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Parents */}
            <div className="rounded-[22px] bg-primary-bg p-8 text-center">
              <h3 className="font-serif text-[20px] font-semibold text-heading">
                For parents
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                If any of this sounds like your story, the uncertainty, the
                googling, the not knowing where to start, we built this for you.
                No account needed. Takes about two minutes.
              </p>
              <Button href="/intake" size="md" className="mt-6">
                Find my midwife
              </Button>
            </div>

            {/* Providers */}
            <div className="rounded-[22px] border-2 border-card-border bg-white p-8 text-center">
              <h3 className="font-serif text-[20px] font-semibold text-heading">
                For providers
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                We&apos;re not here to send you random leads. We&apos;re here to
                send you the right families, the ones whose needs actually
                match your practice. Free during beta.
              </p>
              <Button
                href="/providers"
                variant="outlined"
                size="md"
                className="mt-6"
              >
                Learn more
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
