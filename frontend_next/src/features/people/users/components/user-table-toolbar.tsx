"use client";
import { useState } from "react";

import { Search } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { CreateUserDialog } from "../dialogs/create-user-dialog";
import { FilterSelect } from "@/shared/components/common/filter-select";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "../constants/user-filters";

export function UserTableToolbar() {
  const [openCreateDialog, setOpenCreateDialog] =
    useState(false);
  
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9"
          />
        </div>
        <FilterSelect
          value={role}
          options={USER_ROLE_OPTIONS}
          onValueChange={setRole}
        />

        <FilterSelect
          value={status}
          options={USER_STATUS_OPTIONS}
          onValueChange={setStatus}
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