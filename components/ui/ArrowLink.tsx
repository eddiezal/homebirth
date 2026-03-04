import Link from "next/link";

interface ArrowLinkProps {
  href: string;
  children: string;
  variant?: "teal" | "muted";
  className?: string;
}

const variantStyles = {
  teal: "text-primary font-medium",
  muted: "text-muted font-normal",
};

export function ArrowLink({
  href,
  children,
  variant = "teal",
  className = "",
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`hover:underline ${variantStyles[variant]} ${className}`}
    >
      {children} →
    </Link>
  );
}
