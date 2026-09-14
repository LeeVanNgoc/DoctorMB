"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { patientService } from "../services/patient.service";

import type { CreatePatientRequest, UpdatePatientRequest } from "../types";

export interface PatientQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export function usePatients(params: PatientQuery) {
  return useQuery({
    queryKey: ["patients", params],

    queryFn: async () => {
      const response = await patientService.getPatients(params);

      return response.data;
    },
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patients", id],

    queryFn: async () => {
      const response = await patientService.getPatientById(id);

      return response.data.patient;
    },

    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePatientRequest) =>
      patientService.createPatient(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePatientRequest }) =>
      patientService.updatePatient(id, data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientService.deletePatient(id),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
  });
}

export function usePatientUsers(params: { search?: string; page?: number }) {
  return useQuery({
    queryKey: ["patient-users", params],

    queryFn: async () => {
      const response = await patientService.getPatientUsers({
        search: params.search,
        page: params.page ?? 1,
        limit: 5,
      });

      return response.data;
    },
  });
}
