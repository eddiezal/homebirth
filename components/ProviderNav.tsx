"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui";

const providerTabs = [
  { label: "Dashboard", href: "/provider-dashboard" },
  { label: "Inbox", href: "/provider-inbox" },
  { label: "Profile", href: "/provider-profile" },
];

interface ProviderNavProps {
  providerName: string;
  newLeadCount: number;
}

export function ProviderNav({ providerName, newLeadCount }: ProviderNavProps) {
  const pathname = usePathname();

  const initials = providerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-primary"
        >
          homebirth
        </Link>

        <div className="flex items-center gap-1">
          {providerTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative rounded-[8px] px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-light text-primary"
                    : "text-heading hover:text-primary"
                }`}
              >
                {tab.label}
                {tab.label === "Inbox" && newLeadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {newLeadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
            {initials}
          </div>
          <span className="hidden text-sm font-medium text-heading sm:block">
            {providerName}
          </span>
        </div>
      </Container>
    </nav>
  );
}
