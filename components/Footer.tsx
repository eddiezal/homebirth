import Link from "next/link";
import { Container } from "@/components/ui";

const footerLinks = [
  { label: "For providers", href: "/providers" },
  { label: "Questions to ask", href: "/questions" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-white">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-primary"
        >
          homebirth
        </Link>

        <div className="flex flex-wrap items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-primary hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
