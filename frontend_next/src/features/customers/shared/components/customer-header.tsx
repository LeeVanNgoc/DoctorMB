"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import { CustomerNavigation } from "./customer-navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { CustomerUserMenu } from "./customer-user-menu";

export function CustomerHeader() {
  const { isAuthenticated, isInitializing } = useAuth();

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          DoctorM
        </Link>

        {/* Navigation */}
        <CustomerNavigation />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </button>

          {!isInitializing && !isAuthenticated && (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}

          {!isInitializing && isAuthenticated && (
            <>
              <CustomerUserMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
}