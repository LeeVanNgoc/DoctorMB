import type { ReactNode } from "react";

import { DoctorNavbar } from "./components/navbar";
import { DoctorSidebar } from "./components/sidebar";
import { SidebarProvider } from "./contexts/sidebar-context";

interface DoctorLayoutProps {
  children: ReactNode;
}

export function DoctorLayout({
  children,
}: DoctorLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DoctorSidebar module="management" />

        <div className="flex flex-1 flex-col">
          <DoctorNavbar />

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}