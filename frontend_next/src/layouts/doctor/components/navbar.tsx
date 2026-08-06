"use client";

import { Bell, Menu } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { Breadcrumb } from "./breadcrumb";
import { UserMenu } from "./user-menu";
import { useSidebar } from "../contexts/sidebar-context";


export function DoctorNavbar() {
  const { toggle } = useSidebar();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
        >
          <Menu className="size-5" />
        </Button>

        <Breadcrumb />
      </div>


      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
        >
          <Bell className="size-5" />
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}