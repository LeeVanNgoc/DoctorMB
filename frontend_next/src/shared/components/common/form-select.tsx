"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  value?: string;
  placeholder: string;
  options: FormSelectOption[];
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string | null) => void;
}

export function FormSelect({
  value,
  placeholder,
  options,
  disabled,
  className,
  onValueChange,
}: FormSelectProps) {
  return (
    <Select
      items={options}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
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
