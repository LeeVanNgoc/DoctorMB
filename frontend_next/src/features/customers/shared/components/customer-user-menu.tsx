"use client";

import { LogOut, User, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function CustomerUserMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleAccountClick = () => {
    router.push("/customer/account");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium">
        <UserCircle2 className="h-6 w-6" />

        <span className="hidden md:inline">
          {user.fullName}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleAccountClick}>
          <User className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}