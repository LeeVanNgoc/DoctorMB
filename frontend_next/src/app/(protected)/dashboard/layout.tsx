"use client"

import { ReactNode, useState } from "react";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { NavBar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}


export default function DashboardPage({
  children,
}: DashboardLayoutProps) {

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        {/* Navbar */}
        <NavBar onToggleSidebar={() => 
          setIsSideBarOpen((prev) => !prev)
        }></NavBar>

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar isOpen={isSideBarOpen}></Sidebar>

          {/* Main content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
        


      </div>
    </ProtectedRoute>
  )
}