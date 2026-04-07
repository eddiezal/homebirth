interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`text-[13px] font-bold uppercase tracking-[2.5px] text-primary ${className}`}
    >
      {children}
    </span>
  );
}
