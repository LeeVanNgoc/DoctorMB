"use client";

import { Button } from "@/shared/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface DataPaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  resourceName: string;
  
  onPageChange?: (page: number) => void;

  onPageSizeChange?: (size: number) => void;
}

export function DataPagination({
  currentPage,
  pageSize,
  totalItems,
  resourceName,
  onPageChange,
  onPageSizeChange
}: DataPaginationProps) {
  const start =
    totalItems === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalItems
  );

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  return (
  <div className="flex items-center justify-between border-t px-6 py-4">
      
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {start} to {end} of {totalItems}{" "}
          {resourceName}
        </p>

        <Select
          value={String(pageSize)}
          onValueChange={(value) =>
            onPageSizeChange?.(Number(value))
          }
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">
              10
            </SelectItem>

            <SelectItem value="20">
              20
            </SelectItem>

            <SelectItem value="50">
              50
            </SelectItem>

            <SelectItem value="100">
              100
            </SelectItem>
          </SelectContent>
        </Select>
      </div>


      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onPageChange?.(currentPage - 1)
          }
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onPageChange?.(currentPage + 1)
          }
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>

    </div>
  );
}