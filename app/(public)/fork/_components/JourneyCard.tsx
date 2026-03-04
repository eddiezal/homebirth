import Link from "next/link";

interface JourneyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  bgClass: string;
}

export function JourneyCard({
  icon,
  title,
  description,
  linkText,
  linkHref,
  bgClass,
}: JourneyCardProps) {
  return (
    <Link
      href={linkHref}
      className={`group flex flex-1 flex-col rounded-[12px] border border-card-border p-8 transition-all hover:border-primary hover:shadow-md ${bgClass}`}
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="mt-4 text-xl font-semibold text-heading">{title}</h3>
      <p className="mt-2 flex-1 text-muted">{description}</p>
      <span className="mt-6 font-medium text-primary group-hover:underline">
        {linkText} →
      </span>
    </Link>
  );
}
