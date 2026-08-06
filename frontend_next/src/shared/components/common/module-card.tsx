import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

import { PortalModule } from "@/shared/types/portal-module";

interface ModuleCardProps {
  module: PortalModule;
}
export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon;

  const card = (
    <Card
      className={cn(
        "h-full transition-all duration-200",
        module.enabled
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg"
          : "cursor-not-allowed opacity-60"
      )}
    >
      <CardHeader className="items-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
          <Icon className="size-10" />
        </div>

        <CardTitle>{module.title}</CardTitle>

        <CardDescription>
          {module.enabled
            ? module.description
            : module.coming}
        </CardDescription>
      </CardHeader>

      <CardFooter className="justify-center">
        <span
          className={cn(
            "text-sm font-medium",
            module.enabled
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {module.enabled ? "Open →" : module.coming}
        </span>
      </CardFooter>
    </Card>
  );

  if (!module.enabled) {
    return <div>{card}</div>;
  }

  return <Link href={module.href}>{card}</Link>;
}