interface CardProps {
  variant?: "default" | "accent" | "teal";
  padding?: string;
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-white border-2 border-card-border",
  accent: "bg-primary-lighter",
  teal: "bg-primary-lighter", // legacy alias
};

export function Card({
  variant = "default",
  padding = "p-6",
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`rounded-[22px] ${variantStyles[variant]} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
