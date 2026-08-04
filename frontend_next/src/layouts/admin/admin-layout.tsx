import { ReactNode } from "react";

import { Navbar } from "./components/navbar";
import { Sidebar } from "./components/sidebar";
import { SidebarModule } from "./constants/sidebar-navigation";
import { SidebarProvider } from "./contexts/sidebar-context";

interface AdminLayoutProps {
  children: ReactNode;
  module: SidebarModule;
}

export function AdminLayout({
  children,
  module,
}: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar module={module} />

        <main className="flex min-w-0 flex-1 flex-col">
          <Navbar />

          <section className="flex-1 p-6">
            {children}
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
}