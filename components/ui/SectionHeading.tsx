interface SectionHeadingProps {
  as?: "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}

export function SectionHeading({
  as: Tag = "h2",
  className = "",
  children,
}: SectionHeadingProps) {
  return (
    <Tag
      className={`text-[2rem] font-semibold tracking-[-0.015em] text-heading ${className}`}
    >
      {children}
    </Tag>
  );
}
