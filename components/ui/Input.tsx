interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-heading"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`mt-1.5 w-full rounded-[8px] border px-3 py-2.5 text-sm text-heading placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-card-border focus:border-primary"
        }`}
        {...props}
      />
      {hint && !error && (
        <p className="mt-1 text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
