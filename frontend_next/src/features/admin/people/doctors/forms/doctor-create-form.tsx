"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

const createDoctorAccountSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name is too long"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  phone: z.string().min(1, "Phone is required"),
});

export type CreateDoctorFormValues = z.infer<
  typeof createDoctorAccountSchema
>;

interface CreateDoctorFormProps {
  onSubmit: (values: CreateDoctorFormValues) => void | Promise<void>;
}

export function CreateDoctorForm({
  onSubmit,
}: CreateDoctorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDoctorFormValues>({
    resolver: zodResolver(createDoctorAccountSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  return (
    <form
      id="create-doctor-account-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>

        <Input
          id="fullName"
          placeholder="Enter doctor's full name"
          {...register("fullName")}
        />

        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="doctor@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>

        <Input
          id="phone"
          placeholder="Enter doctor's phone number"
          {...register("phone")}
        />

        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>
    </form>
  );
}
