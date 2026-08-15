"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { SectionContainer } from "@/shared/components/common/section-container";
import { SectionHeader } from "@/shared/components/common/section-header";

import { DoctorCard } from "../../doctors/components/doctor-card";

import { useDoctors } from "../../doctors/hooks/use-doctors";

const PAGE_SIZE = 6;

export function FeaturedDoctorsSection() {
  const [page, setPage] = useState(1);

  const { doctors } = useDoctors({
    page,
    limit: PAGE_SIZE,
  });

  return (
    <SectionContainer>
      <SectionHeader
        title="Featured Doctors"
        description="Meet our experienced doctors across multiple specialties."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/customer/doctors">
          <Button variant="outline">View All Doctors</Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
