"use client";

import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui/input";

interface DoctorSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DoctorSearch({
  value,
  onChange,
}: DoctorSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        placeholder="Search doctors by name or specialty..."
        className="pl-10"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}