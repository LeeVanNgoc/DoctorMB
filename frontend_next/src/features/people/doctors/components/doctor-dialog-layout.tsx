"use client";

import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface DoctorDialogLayoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  children: ReactNode;
}

export function DoctorDialogLayout({
  open,
  onOpenChange,
  title,
  description,
  children,
}: DoctorDialogLayoutProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>

          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}