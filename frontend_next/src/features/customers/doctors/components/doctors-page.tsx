"use client";

import { useState } from "react";

import { EmptyState } from "@/shared/components/common/empty-state";
import { PageBanner } from "@/shared/components/common/page-banner";
import { SectionContainer } from "@/shared/components/common/section-container";

import { useDoctors } from "../hooks/use-doctors";
import { useSpecialties } from "../../../specialties/hooks/use-specialties";
import { EXPERIENCE_OPTIONS } from "../constants/doctor-filters";

import { DoctorFilters } from "./doctor-filters";
import { DoctorSearch } from "./doctor-search";
import { DoctorListItem } from "./doctor-list-item";

interface DoctorFiltersState {
  search: string;
  specialty: string;
  experience?: number;
}

const PAGE_SIZE = 12;

export function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFiltersState>({
    search: "",
    specialty: "",
    experience: 0,
  });

  const [page, setPage] = useState(1);

  const { doctors, pagination, isLoading, error } = useDoctors({
    search: filters.search || undefined,
    specialty: filters.specialty || undefined,
    experience: filters.experience || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const {
    specialties,
    isLoading: isSpecialtiesLoading,
    error: specialtiesError,
  } = useSpecialties();

  const specialtyOptions = specialties.map((specialty) => ({
    label: specialty.name,
    value: specialty.slug,
  }));

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));

    setPage(1);
  };

  const handleExperienceChange = (value: number | undefined) => {
    setFilters((prev) => ({
      ...prev,
      experience: value,
    }));

    setPage(1);
  };

  const handleSpecialtyChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      specialty: value,
    }));

    setPage(1);
  };

  return (
    <>
      <PageBanner
        title="Find Doctors"
        description="Browse experienced doctors by specialty and book your appointment online."
      />

      <SectionContainer spacing="md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <DoctorSearch
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="w-full lg:w-auto">
            <DoctorFilters
              specialty={filters.specialty}
              experience={filters.experience}
              specialtyOptions={specialtyOptions}
              experienceOptions={EXPERIENCE_OPTIONS}
              onSpecialtyChange={handleSpecialtyChange}
              onExperienceChange={handleExperienceChange}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-10">
            <EmptyState title="Unable to load doctors" description={error} />
          </div>
        ) : doctors.length > 0 ? (
          <>
            <div className="mt-10 space-y-6">
              {doctors.map((doctor) => (
                <DoctorListItem key={doctor._id} doctor={doctor} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="No doctors found"
              description="Try changing your search criteria."
            />
          </div>
        )}
      </SectionContainer>
    </>
  );
}
