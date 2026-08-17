import { api } from "@/shared/services/api";

import type { Specialty } from "../types/specialty";

export async function getSpecialties(): Promise<Specialty[]> {
  const response = await api.get<Specialty[]>("/api/specialties");

  return response.data;
}
