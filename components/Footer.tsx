import Link from "next/link";

const familyLinks = [
  { label: "How it works", href: "#how" },
  { label: "Questions to ask", href: "/questions" },
  { label: "Beginner's guide", href: "/resources" },
  { label: "Understanding costs", href: "/resources" },
];

const providerLinks = [
  { label: "Join our network", href: "/providers" },
  { label: "How matching works", href: "/providers" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/about" },
];

export function Footer() {
  return (
    <footer className="mt-5 border-t border-primary/[0.08] px-10 pb-9 pt-[50px] text-sm text-faint">
      <div className="mx-auto mb-9 grid max-w-[1200px] gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand column */}
        <div>
          <Link
            href="/"
            className="mb-3 block font-serif text-[22px] font-bold text-primary-dark"
          >
            homebirth
          </Link>
          <p className="mb-4 max-w-[280px] font-serif text-base italic leading-relaxed text-[#b8a0c0]">
            A softer way to find the person who&apos;ll walk beside you through
            birth.
          </p>
          <p className="text-[13px] text-[#c9b8d0]">
            Built by families, for families.
          </p>
        </div>

        {/* For families */}
        <div>
          <h4 className="mb-[14px] text-[13px] font-bold uppercase tracking-[1.5px] text-primary">
            For families
          </h4>
          {familyLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="mb-[10px] block text-[15px] text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* For providers */}
        <div>
          <h4 className="mb-[14px] text-[13px] font-bold uppercase tracking-[1.5px] text-primary">
            For providers
          </h4>
          {providerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="mb-[10px] block text-[15px] text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-[10px] border-t border-primary/[0.06] pt-5 text-[13px] text-[#c9b8d0] sm:flex-row">
        <span>&copy; 2026 Homebirth.com</span>
        <div className="flex gap-5">
          <Link href="/privacy" className="text-faint hover:text-muted">
            Privacy
          </Link>
          <Link href="/terms" className="text-faint hover:text-muted">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
