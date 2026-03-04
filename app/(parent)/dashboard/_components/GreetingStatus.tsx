interface GreetingStatusProps {
  name: string;
  status: string;
}

export function GreetingStatus({ name, status }: GreetingStatusProps) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-heading">Hi {name}</h1>
      <p className="mt-1 text-sm text-muted">{status}</p>
    </div>
  );
}
