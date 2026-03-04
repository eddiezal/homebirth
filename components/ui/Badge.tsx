interface BadgeProps {
  variant?: "teal" | "gray" | "amber" | "blue" | "green" | "red";
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  teal: "bg-primary-light text-primary",
  gray: "bg-gray-100 text-muted",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
};

export function Badge({
  variant = "teal",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
