"use client";

import { useEffect, useState } from "react";

import { getSpecialties } from "../services/specialty-service";

import type { Specialty } from "../types/specialty";

export function useSpecialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSpecialties() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getSpecialties();

        if (cancelled) {
          return;
        }

        setSpecialties(data);
      } catch {
        if (!cancelled) {
          setError("Failed to load specialties.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchSpecialties();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    specialties,
    isLoading,
    error,
  };
}
