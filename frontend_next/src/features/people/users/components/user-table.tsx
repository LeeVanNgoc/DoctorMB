"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { UserStatusBadge } from "./user-status-badge";
import { UserRowActions } from "./user-row-actions";
import { EmptyState } from "@/shared/components/common/empty-state";
import { DataPagination } from "@/shared/components/common/data-pagination";
import { useUsers } from "../hooks/use-users";
import { User } from "../types";

interface UserTableProps {
  page: number;
  limit: number;

  search: string;
  role: string;
  status: string;

  onPageChange: (page: number) => void;

  onPageSizeChange: (size: number) => void;
}

export function UserTable({
  page,
  limit,
  search,
  role,
  status,
  onPageChange,
  onPageSizeChange,
}: UserTableProps) {
  
  const {
    data,
    isLoading,
    isError
  } = useUsers({
    page,
    limit,
    search,
    role:
      role === "all"
        ? undefined
        : role,
    status:
      status === "all"
        ? undefined
        : status,
  });

  const users = data?.data ?? [];
  const pagination = data?.pagination;
  console.log(users)


  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-6">
        Loading users...
      </div>
    );
  }


  if (isError) {
    return (
      <div className="rounded-lg border bg-background p-6">
        Failed to load users.
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Role</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="w-24 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <EmptyState
                  title="No users found"
                  description="There are no users to display."
                />
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>{user.fullName}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.role}</TableCell>

                <TableCell>
                  <UserStatusBadge
                    status={user.status}
                  />
                </TableCell>

                <TableCell className="text-right">
                  <UserRowActions user={user} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <DataPagination
        currentPage={
          pagination?.page ?? page
        }
        pageSize={
          pagination?.limit ?? limit
        }
        totalItems={
          pagination?.total ?? 0
        }
        resourceName="users"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}