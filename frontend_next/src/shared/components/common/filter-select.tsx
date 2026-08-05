"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  placeholder?: string;
  className?: string;
  options: FilterOption[];
  onValueChange: (value: string) => void;
}

export function FilterSelect({
  value,
  placeholder,
  className = "w-full sm:w-44",
  options,
  onValueChange,
}: FilterSelectProps) {
  return (
    <Select
      items={options}
      value={value}
      onValueChange={(value) =>
        onValueChange(value ?? "")
      }
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}