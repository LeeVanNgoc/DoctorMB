import { api } from "../../../shared/services/api";
import type { LoginRequest, RegisterRequest } from "@/features/auth/types/auth";

export const authService = {
  login(data: LoginRequest) {
    return api.post("/api/auth/login", data);
  },

  register(data: RegisterRequest) {
    return api.post("/api/auth/register", data);
  },

  getProfile() {
    return api.get("/api/auth/profile");
  }
}