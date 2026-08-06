"use client";
import { useState } from "react";

import { Search } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { CreateUserDialog } from "../dialogs/create-user-dialog";
import { FilterSelect } from "@/shared/components/common/filter-select";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "../constants/user-filters";

interface UserTableToolbarProps {
  search: string;
  role: string;
  status: string;

  onSearchChange: (value: string) => void;

  onRoleChange: (value: string) => void;

  onStatusChange: (value: string) => void;
}


export function UserTableToolbar({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: UserTableToolbarProps) {
  const [openCreateDialog, setOpenCreateDialog] =
    useState(false);
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search users..."
            className="pl-9"
          />
        </div>
        <FilterSelect
          value={role ?? "all"}
          options={USER_ROLE_OPTIONS}
          onValueChange={onRoleChange}
        />

        <FilterSelect
          value={status ?? "all"}
          options={USER_STATUS_OPTIONS}
          onValueChange={onStatusChange}
        />
      </div>

      <Button onClick={() => setOpenCreateDialog(true)}>
        Create User
      </Button>

      <CreateUserDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
    </div>
  );
}