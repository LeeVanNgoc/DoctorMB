import { cn } from "@/shared/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  badge,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {badge && (
        <span className="inline-flex rounded-full border px-3 py-1 text-sm font-medium">
          {badge}
        </span>
      )}

      <h2 className="text-3xl font-bold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}