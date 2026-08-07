import { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface PageBannerProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageBanner({
  title,
  description,
  children,
  className,
}: PageBannerProps) {
  return (
    <section
      className={cn(
        "border-b bg-muted/30",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {description}
          </p>
        )}

        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}