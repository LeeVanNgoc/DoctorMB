import { LucideIcon } from "lucide-react";

interface WhyChooseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function WhyChooseCard({
  title,
  description,
  icon: Icon,
}: WhyChooseCardProps) {
  return (
    <div className="rounded-lg border p-6">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}