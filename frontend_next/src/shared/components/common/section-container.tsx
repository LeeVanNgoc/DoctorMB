import { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg";
}

const spacingClasses = {
  sm: "py-12",
  md: "py-16",
  lg: "py-20",
};

export function SectionContainer({
  children,
  className,
  spacing = "lg",
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-7xl px-4",
        spacingClasses[spacing],
        className,
      )}
    >
      {children}
    </section>
  );
}