import { FadeUp } from "./FadeUp";

export function BottomCta() {
  return (
    <FadeUp className="px-10 pb-[60px] pt-5">
      <div className="relative mx-auto max-w-[720px] overflow-hidden rounded-[28px] bg-gradient-to-br from-primary to-[#a67bb5] px-[50px] py-16 text-center text-white">
        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-[30px] -left-[30px] h-[120px] w-[120px] rounded-full bg-white/[0.04]" />

        <h2 className="relative z-10 mb-[14px] font-serif text-[38px] font-semibold">
          Ready when you are
        </h2>
        <p className="relative z-10 mb-7 text-[17px] opacity-85">
          No rush. No pressure. Just a better way to find your midwife.
        </p>
        <a
          href="/#hero"
          className="relative z-10 inline-block rounded-[20px] bg-white px-[38px] py-4 text-base font-bold text-primary-dark transition-transform hover:-translate-y-px"
        >
          Start your match
        </a>
      </div>
    </FadeUp>
  );
}
