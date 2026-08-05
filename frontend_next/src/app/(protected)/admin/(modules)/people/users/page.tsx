import { UserTable } from "@/features/people/users/components/user-table";
import { UserTableToolbar } from "@/features/people/users/components/user-table-toolbar";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          User Management
        </h1>

        <p className="text-muted-foreground">
          Manage all system users.
        </p>
      </div>
      <UserTableToolbar />

      <UserTable />
    </div>
  );
}