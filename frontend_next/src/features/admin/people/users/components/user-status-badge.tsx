import { Badge } from "@/shared/components/ui/badge";

interface UserStatusBadgeProps {
  status: "active" | "inactive";
}

export function UserStatusBadge({
  status,
}: UserStatusBadgeProps) {
  const isActive = status === "active";

  return (
    <Badge
      variant={isActive ? "default" : "secondary"}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}