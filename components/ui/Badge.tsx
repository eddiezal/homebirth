interface BadgeProps {
  variant?: "lavender" | "teal" | "gray" | "amber" | "blue" | "green" | "red";
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  lavender: "bg-primary-lighter text-primary",
  teal: "bg-primary-lighter text-primary", // legacy alias
  gray: "bg-gray-100 text-muted",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
};

export function Badge({
  variant = "lavender",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
