/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";

import { getAdminDoctors } from "../services/admin-doctor-service";

import type { Doctor, DoctorFilter, DoctorPagination } from "../types";

const DEFAULT_PAGINATION: DoctorPagination = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
};

export function useAdminDoctors(params?: DoctorFilter) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pagination, setPagination] =
    useState<DoctorPagination>(DEFAULT_PAGINATION);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setError(null);

      const response = await getAdminDoctors(params);

      setDoctors(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setError("Failed to load doctors.");
    }
  }, [
    params?.search,
    params?.specialty,
    params?.status,
    params?.page,
    params?.limit,
  ]);

  useEffect(() => {
    let cancelled = false;

    async function loadDoctors() {
      try {
        const response = await getAdminDoctors(params);

        if (cancelled) {
          return;
        }

        setDoctors(response.data);
        setPagination(response.pagination);
        setError(null);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch doctors:", error);
          setError("Failed to load doctors.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadDoctors();

    return () => {
      cancelled = true;
    };
  }, [
    params?.search,
    params?.specialty,
    params?.status,
    params?.page,
    params?.limit,
  ]);

  return {
    doctors,
    pagination,
    isLoading,
    error,
    refetch,
  };
}
