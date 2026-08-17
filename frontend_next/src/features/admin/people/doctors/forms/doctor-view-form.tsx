"use client";

import { Textarea } from "@/shared/components/ui/textarea";

import { Doctor } from "../types";
import { DoctorStatusBadge } from "../components/doctor-status-badge";
import { DoctorProfileStatusBadge } from "../components/doctor-profile-status-badge";

interface DoctorViewProps {
  doctor: Doctor;
}

export function DoctorView({ doctor }: DoctorViewProps) {
  return (
    <div className="grid gap-5 py-4">
      {/* Full Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Full Name:
          </span>

          <span className="min-w-0">
            {doctor.userId.fullName || "-"}
          </span>
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Phone:
          </span>

          <span className="min-w-0">
            {doctor.userId.phone || "-"}
          </span>
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-2">
        <span className="font-medium text-muted-foreground">
          Email:
        </span>

        <span className="min-w-0 break-all">
          {doctor.userId.email || "-"}
        </span>
      </div>

      {/* Specialty + Degree */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Specialty:
          </span>

          <span className="min-w-0">
            {doctor.specialty?.name || "-"}
          </span>
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Degree:
          </span>

          <span className="min-w-0">
            {doctor.degree || "-"}
          </span>
        </div>
      </div>

      {/* Experience + Consultation Fee */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Experience:
          </span>

          <span>
            {doctor.experience} years
          </span>
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Consultation Fee:
          </span>

          <span>
            {doctor.consultationFee}
          </span>
        </div>
      </div>

      {/* Clinic Address */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-2">
        <span className="font-medium text-muted-foreground">
          Clinic Address:
        </span>

        <span className="min-w-0">
          {doctor.clinicAddress || "-"}
        </span>
      </div>

      {/* Description */}
      <div className="grid grid-cols-[120px_1fr] items-start gap-2">
        <span className="font-medium text-muted-foreground">
          Description:
        </span>

        <Textarea
          value={doctor.description || ""}
          disabled
          placeholder="No description"
          className="min-h-24 resize-none"
        />
      </div>

      {/* Rating + Total Reviews */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Rating:
          </span>

          <span>
            ⭐ {doctor.rating}
          </span>
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Reviews:
          </span>

          <span>
            {doctor.totalReviews} reviews
          </span>
        </div>
      </div>

      {/* Profile Status + Account Status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Profile Status:
          </span>

          <DoctorProfileStatusBadge
            status={doctor.profileStatus}
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <span className="font-medium text-muted-foreground">
            Account Status:
          </span>

          <DoctorStatusBadge
            status={doctor?.userId.status ?? "active"}
          />
        </div>
      </div>
    </div>
  );
}