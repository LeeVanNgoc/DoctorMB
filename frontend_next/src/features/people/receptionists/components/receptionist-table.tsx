"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { ReceptionistStatusBadge } from "./receptionist-status-badge";
import { ReceptionistRowActions } from "./receptionist-row-actions";

import { Receptionist } from "../types/receptionist";

interface ReceptionistTableProps {
  data: Receptionist[];
}

export function ReceptionistTable({
  data,
}: ReceptionistTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Employee Code
            </TableHead>

            <TableHead>
              Full Name
            </TableHead>

            <TableHead>
              Email
            </TableHead>

            <TableHead>
              Phone
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((receptionist) => (
            <TableRow key={receptionist.id}>
              <TableCell className="font-medium">
                {receptionist.employeeCode}
              </TableCell>

              <TableCell>
                {receptionist.fullName}
              </TableCell>

              <TableCell>
                {receptionist.email}
              </TableCell>

              <TableCell>
                {receptionist.phone}
              </TableCell>

              <TableCell>
                <ReceptionistStatusBadge
                  status={receptionist.status}
                />
              </TableCell>

              <TableCell className="text-right">
                <ReceptionistRowActions
                  receptionist={receptionist}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}