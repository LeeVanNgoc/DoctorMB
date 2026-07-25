"use client"
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div>
        <LoginForm />

        <div>
          <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>

          <p>User: {user?.fullName}</p>

          <p>Email: {user?.email}</p>

          <p>Role: {user?.role}</p>
        </div>

        <button onClick={logout}>
          Logout
        </button>
        </div>
    </main>
  );
}