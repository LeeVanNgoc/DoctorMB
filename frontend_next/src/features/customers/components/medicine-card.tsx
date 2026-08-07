import Link from "next/link";
import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface MedicineCardProps {
  name: string;
  category: string;
  price: string;
  href: string;
  icon: LucideIcon;
}

export function MedicineCard({
  name,
  category,
  price,
  href,
  icon: Icon,
}: MedicineCardProps) {
  return (
    <Link
      href={href}
      className="block h-full"
    >
      <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>

          <CardTitle className="mt-4">
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            {category}
          </p>

          <p className="font-semibold text-primary">
            {price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}