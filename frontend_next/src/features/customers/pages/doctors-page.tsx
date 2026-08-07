"use client";

import { useState } from "react";

import { EmptyState } from "@/shared/components/common/empty-state";
import { PageBanner } from "@/shared/components/common/page-banner";
import { SectionContainer } from "@/shared/components/common/section-container";

import { DoctorCard } from "../components/doctor-card";
import { DoctorFilters } from "../components/doctor-filters";
import { DoctorSearch } from "../components/doctor-search";
import {
  EXPERIENCE_OPTIONS,
  SPECIALTY_OPTIONS,
} from "../constants/doctor-filters";
import { FEATURED_DOCTORS } from "../constants/featured-doctors";

interface DoctorFiltersState {
  search: string;
  specialty: string;
  experience: string;
}

export function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFiltersState>({
    search: "",
    specialty: "",
    experience: "",
  });

  // TODO: Replace with API data
  const doctors = FEATURED_DOCTORS;

  return (
    <>
      <PageBanner
        title="Find Doctors"
        description="Browse experienced doctors by specialty and book your appointment online."
      />

      <SectionContainer spacing="md">
        <DoctorSearch
          value={filters.search}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              search: value,
            }))
          }
        />

        <DoctorFilters
          specialty={filters.specialty}
          experience={filters.experience}
          specialtyOptions={SPECIALTY_OPTIONS}
          experienceOptions={EXPERIENCE_OPTIONS}
          onSpecialtyChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              specialty: value,
            }))
          }
          onExperienceChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              experience: value,
            }))
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState
                title="No doctors found"
                description="Try changing your search criteria."
              />
            </div>
          )}
        </div>
      </SectionContainer>
    </>
  );
}