"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userService } from '../services/user.service';

import type {
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user";


export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export function useUsers(
  params: UserQuery
) {
  return useQuery({
    queryKey: [
      "users",
      params,
    ],

    queryFn: async () => {
      const response =
        await userService.getUsers(params);

      return response.data;
    },
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response =
        await userService.getUserById(id);

      return response.data;
    },
    enabled: !!id,
  });
}


export function useCreateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      (data: CreateUserRequest) =>
        userService.createUser(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}


export function useUpdateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateUserRequest;
    }) =>
      userService.updateUser(
        id,
        data
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}


export function useDeleteUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      (id: string) =>
        userService.deleteUser(id),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}