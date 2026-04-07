import Link from "next/link";
import { FadeUp } from "./FadeUp";

export function ProviderCallout() {
  return (
    <FadeUp className="px-10 pb-[60px]" id="providers">
      <div className="mx-auto flex max-w-[800px] items-center justify-between gap-[30px] rounded-[22px] border-2 border-card-border bg-white p-10 transition-colors hover:border-card-border-hover max-sm:flex-col max-sm:text-center">
        <div className="flex-1">
          <div className="mb-2 text-xs font-bold uppercase tracking-[2px] text-primary">
            For midwives
          </div>
          <h3 className="mb-2 font-serif text-2xl text-heading">
            Are you a homebirth provider?
          </h3>
          <p className="text-[15px] leading-relaxed text-muted">
            Join a network of vetted midwives and connect with families who
            already know what they&apos;re looking for. Free to list, always.
          </p>
        </div>
        <Link
          href="/providers"
          className="shrink-0 rounded-2xl bg-primary-lighter px-7 py-[14px] text-[15px] font-bold text-primary-dark transition-colors hover:bg-[#eddcf5]"
        >
          Learn more
        </Link>
      </div>
    </FadeUp>
  );
}
