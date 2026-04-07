import Link from "next/link";
import { Container } from "@/components/ui";

export function FoundersSnippet() {
  return (
    <section className="py-16">
      <Container narrow>
        <div className="flex flex-col items-center text-center">
          {/* Avatars — replace with real photos */}
          <div className="flex -space-x-3">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-bg text-lg font-bold text-white shadow-sm"
              style={{ background: "#8b5fa0" }}
            >
              EZ
            </div>
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-bg text-lg font-bold text-white shadow-sm"
              style={{ background: "#f0cfc0" }}
            >
              JZ
            </div>
          </div>

          <p className="mt-5 max-w-[480px] font-serif text-[20px] font-semibold leading-snug text-heading sm:text-[22px]">
            Built by parents who went looking for a midwife and couldn&apos;t
            find one.
          </p>

          <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-muted">
            Two births. Two countries. One question that wouldn&apos;t go away.
          </p>

          <Link
            href="/about"
            className="mt-5 text-[15px] font-medium text-primary hover:underline"
          >
            Read our story &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
