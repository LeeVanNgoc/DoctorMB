
import { api } from "@/shared/services/api";


import type {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "../types";

export interface UserListResponse {
  data: User[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const userService = {
  getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }) {
    return api.get<UserListResponse>(
      "/api/users",
      {
        params,
      }
    );
  },

  getUserById(id: string) {
    return api.get<User>(
      `/api/users/${id}`
    );
  },

  createUser(
    data: CreateUserRequest
  ) {
    return api.post<User>(
      "/api/users",
      data
    );
  },

  updateUser(
    id: string,
    data: UpdateUserRequest
  ) {
    return api.patch<User>(
      `/api/users/${id}`,
      data
    );
  },

  deleteUser(id: string) {
    return api.delete(
      `/api/users/${id}`
    );
  },
};