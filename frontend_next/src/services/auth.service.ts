import { api } from "./api";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

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