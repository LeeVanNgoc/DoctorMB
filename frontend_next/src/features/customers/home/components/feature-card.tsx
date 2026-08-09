import Link from "next/link";
import { LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="block h-full"
    >
      <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader>
          <Icon className="mb-4 h-10 w-10 text-primary" />

          <CardTitle>{title}</CardTitle>

          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}