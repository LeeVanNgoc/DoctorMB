import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import type { FeaturedDoctor } from "../types/doctor";

interface DoctorCardProps {
  doctor: FeaturedDoctor;
}

export function DoctorCard({
  doctor,
}: DoctorCardProps) {
  const Icon = doctor.icon;

  return (
    <Link
      href={doctor.href}
      className="block h-full"
    >
      <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>

          <CardTitle className="mt-4">
            {doctor.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-center">
          <p className="font-medium text-primary">
            {doctor.specialty}
          </p>

          <p className="text-sm text-muted-foreground">
            {doctor.experience}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}