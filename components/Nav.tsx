import Link from "next/link";
import { Container } from "@/components/ui";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-primary"
        >
          homebirth
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="hidden text-sm font-medium text-heading hover:text-primary sm:block"
          >
            How it works
          </Link>
          <Link
            href="/providers"
            className="hidden text-sm font-medium text-heading hover:text-primary sm:block"
          >
            For providers
          </Link>
          <Link
            href="/resources"
            className="hidden text-sm font-medium text-heading hover:text-primary sm:block"
          >
            Resources
          </Link>
          <Link
            href="/sign-in"
            className="rounded-[8px] border border-card-border px-4 py-2 text-sm font-medium text-heading transition-colors hover:border-primary hover:text-primary"
          >
            Sign in
          </Link>
        </div>
      </Container>
    </nav>
  );
}
