import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface DoctorStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
}

export function DoctorStatCard({
  title,
  value,
  description,
  icon: Icon,
}: DoctorStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>

        <Icon className="size-5 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          {value}
        </div>

        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}