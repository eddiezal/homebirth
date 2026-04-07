import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-primary/[0.06] bg-bg/[0.92] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-10">
        <Link
          href="/"
          className="font-serif text-[26px] font-bold text-primary-dark"
        >
          homebirth
        </Link>

        <div className="flex items-center gap-7">
          <Link
            href="/#how"
            className="hidden text-[15px] font-semibold text-[#6b5a5a] transition-colors hover:text-primary sm:block"
          >
            How it works
          </Link>
          <Link
            href="/providers"
            className="hidden text-[15px] font-semibold text-[#6b5a5a] transition-colors hover:text-primary sm:block"
          >
            For providers
          </Link>
          <Link
            href="/resources"
            className="hidden text-[15px] font-semibold text-[#6b5a5a] transition-colors hover:text-primary sm:block"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="hidden text-[15px] font-semibold text-[#6b5a5a] transition-colors hover:text-primary sm:block"
          >
            Our story
          </Link>
          <Link
            href="/sign-in"
            className="rounded-3xl bg-primary-dark px-[22px] py-[10px] text-sm font-bold text-white transition-colors hover:bg-primary-darker"
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
