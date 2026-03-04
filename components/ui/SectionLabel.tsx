interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-primary ${className}`}
    >
      {children}
    </span>
  );
}
