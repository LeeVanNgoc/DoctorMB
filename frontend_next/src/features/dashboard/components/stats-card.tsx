import { Card, CardContent } from "@/shared/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
}: StatsCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}