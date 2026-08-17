/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import type { Doctor } from "../types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const doctorName = doctor.userId.fullName;
  const specialtyName = doctor.specialty?.name ?? "No specialty";

  return (
    <Link href={`/customer/doctors/${doctor._id}`} className="block h-full">
      <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary/10">
            {doctor.avatar ? (
              <img
                src={doctor.avatar}
                alt={doctorName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-2xl font-semibold text-primary">
                  {doctorName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <CardTitle className="mt-4">{doctorName}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-center">
          <p className="font-medium text-primary">{specialtyName}</p>

          <p className="text-sm text-muted-foreground">
            {doctor.experience != null
              ? `${doctor.experience} years of experience`
              : "Experience not available"}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="font-medium">★ {doctor.rating.toFixed(1)}</span>

            <span className="text-muted-foreground">
              ({doctor.totalReviews} reviews)
            </span>
          </div>

          <p className="font-medium">
            {doctor.consultationFee != null
              ? `${doctor.consultationFee.toLocaleString()} VND`
              : "Consultation fee not available"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
