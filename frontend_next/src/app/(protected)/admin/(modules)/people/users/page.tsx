import { UsersContent } from "@/features/people/users/components/users-content";


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

      <UsersContent />
    </div>
  );
}