import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { SectionContainer } from "@/shared/components/common/section-container";
import { SectionHeader } from "@/shared/components/common/section-header";

import { DoctorCard } from "../../components/doctor-card";
import { FEATURED_DOCTORS } from "../../constants/featured-doctors";

export function FeaturedDoctorsSection() {
  return (
    <SectionContainer>
      <SectionHeader
        title="Featured Doctors"
        description="Meet our experienced doctors across multiple specialties."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_DOCTORS.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/customer/doctors">
          <Button variant="outline">
            View All Doctors
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}