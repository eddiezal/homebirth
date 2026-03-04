interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className = "", children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 ${className}`}>
      {children}
    </div>
  );
}
