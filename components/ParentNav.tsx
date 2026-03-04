"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import { getUnreadMessageCount } from "@/lib/utils/notifications";

export function ParentNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    setUnreadCount(getUnreadMessageCount());
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("homebirth_auth_session");
      if (session) {
        try {
          const parsed = JSON.parse(session);
          setUserName(parsed.name || "User");
        } catch { /* ignore */ }
      }
    }
  }, [pathname]);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  function handleSignOut() {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("homebirth_auth_session");
    }
    router.push("/");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xl font-bold tracking-tight text-primary"
        >
          homebirth
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/messages"
            className={`relative text-sm font-medium transition-colors ${
              pathname === "/messages"
                ? "text-primary"
                : "text-heading hover:text-primary"
            }`}
          >
            Messages
            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Avatar dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {initials}
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-12 z-50 w-48 rounded-[8px] border border-card-border bg-white py-1 shadow-lg">
                  <Link
                    href="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-sm text-heading hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/results"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-sm text-heading hover:bg-gray-50"
                  >
                    My matches
                  </Link>
                  <div className="my-1 h-px bg-card-border" />
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-sm text-muted hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
