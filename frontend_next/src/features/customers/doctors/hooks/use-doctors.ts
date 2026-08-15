"use client";

import { useEffect, useState } from "react";

import { getDoctors } from "../services/doctor-service";

import type { Doctor, DoctorsPagination } from "../types/doctor";

import type { DoctorFilter } from "../types/doctor-filter";

export function useDoctors(filters: DoctorFilter) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pagination, setPagination] = useState<DoctorsPagination | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDoctors() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getDoctors(filters);

        if (cancelled) {
          return;
        }

        setDoctors(response.data);
        setPagination(response.pagination);
      } catch {
        if (!cancelled) {
          setError("Failed to load doctors.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchDoctors();

    return () => {
      cancelled = true;
    };
  }, [
    filters.search,
    filters.specialty,
    filters.experience,
    filters.page,
    filters.limit,
  ]);

  return {
    doctors,
    pagination,
    isLoading,
    error,
  };
}
