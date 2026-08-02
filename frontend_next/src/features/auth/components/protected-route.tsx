"use client"

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/use-auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !isInitializing) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}