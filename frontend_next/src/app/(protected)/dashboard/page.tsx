"use client"
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/hooks/use-auth";

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { logout } = useAuth();
  return (
    <ProtectedRoute>
      <main>
        <h1>Dashboard</h1>
        <p>Welcome to DoctorM</p>

        <Button onClick={logout}>
          Logout
        </Button>
      </main>
    </ProtectedRoute>
  )
}