"use client";

import { useState } from "react";

import { AppointmentTable } from "./appointment-table";
import { ViewAppointmentDialog } from "../dialogs/view-appointment-dialog";

import {
  DoctorAppointment,
  AppointmentStatus,
} from "../types/appointment";

import { MOCK_APPOINTMENTS } from "../constants/mock-appointments";


export function AppointmentsContent() {

  const [appointments, setAppointments] =
    useState<DoctorAppointment[]>(
      MOCK_APPOINTMENTS
    );


  const [selectedAppointment, setSelectedAppointment] =
    useState<DoctorAppointment | null>(null);



  function handleUpdateStatus(
    appointment: DoctorAppointment,
    status: AppointmentStatus
  ) {

    setAppointments((current) =>
      current.map((item) =>
        item.id === appointment.id
          ? {
              ...item,
              status,
            }
          : item
      )
    );

  }



  return (
    <>
      <AppointmentTable
        appointments={appointments}
        onView={setSelectedAppointment}
        onUpdateStatus={handleUpdateStatus}
      />


      <ViewAppointmentDialog
        open={!!selectedAppointment}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAppointment(null);
          }
        }}
        appointment={selectedAppointment}
      />
    </>
  );
}