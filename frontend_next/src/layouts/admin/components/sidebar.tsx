"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";

import {
  SIDEBAR_NAVIGATION,
  SidebarModule,
} from "../constants/sidebar-navigation";
import { useSidebar } from "../contexts/sidebar-context";

interface SidebarProps {
  module: SidebarModule;
}

export function Sidebar({
  module,
}: SidebarProps) {
  const pathname = usePathname();

  const items = SIDEBAR_NAVIGATION[module];
  const { open } = useSidebar();

  return (
    <aside
        className={cn(
          "flex h-screen flex-col border-r bg-background transition-all duration-300",
          open
            ? "w-72"
            : "w-0 overflow-hidden"
        )}
      >
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <Link href="/admin">
          <h1 className="text-xl font-bold tracking-tight">
            DoctorM
          </h1>

          <p className="text-sm text-muted-foreground">
            Clinic Management System
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          const isActive =
          item.href === "/admin/people"
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-5" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t px-6 py-4">
        <p className="text-xs text-muted-foreground">
          DoctorM v1.0
        </p>
      </div>
    </aside>
  );
}