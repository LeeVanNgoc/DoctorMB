"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";

import { DoctorStatusBadge } from "../components/doctor-status-badge";
import { DoctorProfileStatusBadge } from "../components/doctor-profile-status-badge";
import type { Doctor, UpdateDoctorData } from "../types";
import { FormSelect } from "@/shared/components/common/form-select";
import { useSpecialties } from "@/features/specialties/hooks/use-specialties";

interface DoctorUpdateFormProps {
  doctor: Doctor;
  onSubmit: (data: UpdateDoctorData) => void;
}

export function DoctorUpdateForm({ doctor, onSubmit }: DoctorUpdateFormProps) {
  const { specialties, isLoading: isLoadingSpecialties } = useSpecialties();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateDoctorData>({
    defaultValues: {
      fullName: doctor.userId.fullName,
      email: doctor.userId.email,
      phone: doctor.userId.phone,

      specialty: doctor.specialty?._id ?? "",
      degree: doctor.degree,
      experience: doctor.experience,
      clinicAddress: doctor.clinicAddress,
      consultationFee: doctor.consultationFee,
      description: doctor.description,
    },
  });

  return (
    <form
      id="doctor-update-form"
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 py-4"
    >
      {/* Full Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label htmlFor="fullName">Full Name:</Label>

          <Input
            id="fullName"
            {...register("fullName")}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label htmlFor="phone">Phone:</Label>

          <Input id="phone" {...register("phone")} disabled={isSubmitting} />
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-2">
        <Label htmlFor="email">Email:</Label>

        <Input
          id="email"
          type="email"
          {...register("email")}
          disabled={isSubmitting}
        />
      </div>

      {/* Specialty + Degree */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label htmlFor="specialty">Specialty:</Label>

          <FormSelect
            value={watch("specialty")}
            placeholder="Select specialty"
            disabled={isSubmitting || isLoadingSpecialties}
            options={specialties.map((specialty) => ({
              value: specialty._id,
              label: specialty.name,
            }))}
            onValueChange={(value) => {
              setValue("specialty", value ?? "");
            }}
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label htmlFor="degree">Degree:</Label>

          <Input id="degree" {...register("degree")} disabled={isSubmitting} />
        </div>
      </div>

      {/* Experience + Consultation Fee */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label htmlFor="experience">Experience:</Label>

          <Input
            id="experience"
            type="number"
            {...register("experience", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label htmlFor="consultationFee">Consultation Fee:</Label>

          <Input
            id="consultationFee"
            type="number"
            {...register("consultationFee", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Clinic Address */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-2">
        <Label htmlFor="clinicAddress">Clinic Address:</Label>

        <Input
          id="clinicAddress"
          {...register("clinicAddress")}
          disabled={isSubmitting}
        />
      </div>

      {/* Description */}
      <div className="grid grid-cols-[120px_1fr] items-start gap-2">
        <Label htmlFor="description" className="pt-2">
          Description:
        </Label>

        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter doctor description"
          className="min-h-28 resize-y"
          disabled={isSubmitting}
        />
      </div>

      {/* Profile Status + Account Status */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label>Profile Status:</Label>

          <DoctorProfileStatusBadge status={doctor.profileStatus} />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <Label>Account Status:</Label>

          <DoctorStatusBadge status={doctor.userId.status} />
        </div>
      </div>
    </form>
  );
}
