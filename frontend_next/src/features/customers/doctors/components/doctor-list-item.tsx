"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

import { MapPin, Star, BriefcaseMedical } from "lucide-react";

import type { Doctor } from "../types/doctor";

interface DoctorListItemProps {
  doctor: Doctor;
}

export function DoctorListItem({ doctor }: DoctorListItemProps) {
  const router = useRouter();
  const doctorName = doctor.userId.fullName;
  const specialtyName = doctor.specialty.name;

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-6">
        {/* Top row */}
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
            {doctor.avatar ? (
              <img
                src={doctor.avatar}
                alt={doctorName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Information */}
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold">{doctorName}</h2>

            <p className="mt-1 font-medium text-primary">{specialtyName}</p>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BriefcaseMedical className="h-4 w-4" />
                <span>{doctor.experience} years experience</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-current" />
                <span>{doctor.rating.toFixed(1)}</span>

                <span>({doctor.totalReviews} reviews)</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {doctor.degree}
            </p>

            <div className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{doctor.clinicAddress}</span>
            </div>

            <p className="mt-3 font-medium">
              Consultation fee: {doctor.consultationFee.toLocaleString("vi-VN")}{" "}
              ₫
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex justify-end gap-3 border-t pt-5">
          <Button
            variant="outline"
            onClick={() => router.push(`/customer/doctors/${doctor._id}`)}
          >
            View Profile
          </Button>

          <Button>Book Appointment</Button>
        </div>
      </CardContent>
    </Card>
  );
}
