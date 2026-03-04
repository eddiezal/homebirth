interface CardProps {
  variant?: "default" | "teal";
  padding?: string;
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-white border border-card-border",
  teal: "bg-primary-light",
};

export function Card({
  variant = "default",
  padding = "p-6",
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`rounded-[12px] ${variantStyles[variant]} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
