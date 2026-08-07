import { Star, BriefcaseBusiness, Building2, Wallet } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

import type { DoctorDetail } from "../types/doctor-detail";

interface DoctorProfileCardProps {
  doctor: DoctorDetail;
}

export function DoctorProfileCard({
  doctor,
}: DoctorProfileCardProps) {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex justify-center">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="text-3xl">
                {doctor.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-5">
            <div>
              <h1 className="text-3xl font-bold">
                {doctor.name}
              </h1>

              <p className="text-lg text-primary">
                {doctor.specialty}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span>{doctor.hospital}</span>
              </div>

              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-primary" />
                <span>
                  {doctor.yearsOfExperience} Years Experience
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {doctor.rating} ({doctor.totalReviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                <span>${doctor.consultationFee}</span>
              </div>
            </div>

            <Button size="lg">
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}