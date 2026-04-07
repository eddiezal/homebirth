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
      className={`font-serif text-[38px] font-semibold leading-[1.2] text-heading ${className}`}
    >
      {children}
    </Tag>
  );
}
