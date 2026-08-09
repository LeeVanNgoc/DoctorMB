import { Badge } from "@/shared/components/ui/badge";

import { ReceptionistStatus } from "../types/receptionist";

interface ReceptionistStatusBadgeProps {
  status: ReceptionistStatus;
}

export function ReceptionistStatusBadge({
  status,
}: ReceptionistStatusBadgeProps) {
  return (
    <Badge
      variant={
        status === "active"
          ? "default"
          : "secondary"
      }
    >
      {status === "active"
        ? "Active"
        : "Inactive"}
    </Badge>
  );
}