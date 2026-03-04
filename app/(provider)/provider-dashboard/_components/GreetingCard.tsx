interface GreetingCardProps {
  greeting: string;
}

export function GreetingCard({ greeting }: GreetingCardProps) {
  // Parse markdown-style bold (**text**) in the greeting
  const parts = greeting.split(/(\*\*[^*]+\*\*)/g);

  return (
    <div className="rounded-[12px] border border-card-border bg-white p-6">
      <p className="text-sm leading-relaxed text-heading">
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-primary">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    </div>
  );
}
