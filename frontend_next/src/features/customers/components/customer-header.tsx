import Link from "next/link";

import { CustomerNavigation } from "./customer-navigation";

export function CustomerHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-primary"
        >
          DoctorM
        </Link>

        {/* Navigation */}
        <CustomerNavigation />

        {/* Actions */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
}