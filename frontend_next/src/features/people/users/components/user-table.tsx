import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { MOCK_USERS } from "../constants/mock-users";
import { UserStatusBadge } from "./user-status-badge";
import { UserRowActions } from "./user-row-actions";
import { EmptyState } from "@/shared/components/common/empty-state";
import { DataPagination } from "@/shared/components/common/data-pagination";

export function UserTable() {
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
          {MOCK_USERS.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <EmptyState
                  title="No users found"
                  description="There are no users to display."
                />
              </TableCell>
            </TableRow>
          ) : (
            MOCK_USERS.map((user) => (
              <TableRow key={user.id}>
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
        currentPage={1}
        pageSize={10}
        totalItems={MOCK_USERS.length}
        resourceName="users"
      />
    </div>
  );
}