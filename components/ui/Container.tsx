interface ContainerProps {
  className?: string;
  narrow?: boolean;
  children: React.ReactNode;
}

export function Container({ className = "", narrow = false, children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${narrow ? "max-w-[1000px]" : "max-w-[1200px]"} px-10 ${className}`}>
      {children}
    </div>
  );
}
