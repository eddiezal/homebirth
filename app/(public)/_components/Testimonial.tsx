import { FadeUp } from "./FadeUp";

export function Testimonial() {
  return (
    <FadeUp className="mx-auto max-w-[680px] px-10 pb-[60px] pt-5 text-center">
      <div className="rounded-3xl border-2 border-card-border bg-white px-10 py-11 shadow-[0_4px_24px_rgba(139,95,160,0.07)]">
        <p className="mb-[22px] font-serif text-[21px] italic leading-relaxed text-heading">
          &ldquo;I was so nervous about choosing wrong. This felt like having a
          wise friend walk me through it — gently, without any pressure.&rdquo;
        </p>
        <div className="text-[15px] font-bold text-primary">Emma N.</div>
        <div className="text-sm text-faint">
          First-time homebirth, Asheville, NC
        </div>
      </div>
    </FadeUp>
  );
}
