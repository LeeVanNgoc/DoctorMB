"use client";

import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  UserCircle2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export function UserMenu() {
  function handleLogout() {
    localStorage.removeItem("access_token");

    window.location.href = "/login";
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 items-center gap-2 rounded-md px-2 hover:bg-accent">
        <UserCircle2 className="size-8" />

        <div className="hidden text-left md:block">
          <p className="text-sm font-medium">Administrator</p>

          <p className="text-xs text-muted-foreground">
            admin@doctorm.com
          </p>
        </div>

        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 size-4" />

          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}