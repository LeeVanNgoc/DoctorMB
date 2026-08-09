"use client";

import {
  MoreHorizontal,
  Eye,
  Check,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { AppointmentStatus, DoctorAppointment } from "../types/appointment";


interface AppointmentRowActionsProps {
  appointment: DoctorAppointment;

  onView: (
    appointment: DoctorAppointment
  ) => void;

  onUpdateStatus: (
    appointment: DoctorAppointment,
    status: AppointmentStatus
  ) => void;
}


export function AppointmentRowActions({
  appointment,
  onView,
  onUpdateStatus,
}: AppointmentRowActionsProps) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger
        className="
          inline-flex
          h-9
          w-9
          items-center
          justify-center
          rounded-md
          transition-colors
          hover:bg-accent
          hover:text-accent-foreground
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
        "
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>


      <DropdownMenuContent align="end">

        <DropdownMenuItem
          onClick={() => onView(appointment)}
        >
          <Eye className="mr-2 size-4" />

          View Details
        </DropdownMenuItem>


        {appointment.status === "pending" && (
          <DropdownMenuItem
            onClick={() =>
              onUpdateStatus(
                appointment,
                "confirmed"
              )
            }
          >
            <Check className="mr-2 size-4" />

            Confirm
          </DropdownMenuItem>
        )}


        {appointment.status !== "completed" &&
          appointment.status !== "cancelled" && (
            <DropdownMenuItem
              onClick={() =>
                onUpdateStatus(
                  appointment,
                  "cancelled"
                )
              }
            >
              <X className="mr-2 size-4" />

              Cancel
            </DropdownMenuItem>
          )}

      </DropdownMenuContent>

    </DropdownMenu>
  );
}