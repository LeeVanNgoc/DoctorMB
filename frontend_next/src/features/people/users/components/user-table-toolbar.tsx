"use client";
import { useState } from "react";

import { Plus, Search } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { CreateUserDialog } from "../dialogs/create-user-dialog";

export function UserTableToolbar() {
  const [openCreateDialog, setOpenCreateDialog] =
    useState(false);
  
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
        <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Roles
              </SelectItem>

              <SelectItem value="admin">
                Admin
              </SelectItem>

              <SelectItem value="doctor">
                Doctor
              </SelectItem>

              <SelectItem value="patient">
                Patient
              </SelectItem>

              <SelectItem value="receptionist">
                Receptionist
              </SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Status
              </SelectItem>

              <SelectItem value="active">
                Active
              </SelectItem>

              <SelectItem value="inactive">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
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