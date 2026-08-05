import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-3">
      <Inbox className="size-12 text-muted-foreground" />

      <div className="text-center">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}