"use client";

import { Button } from "@/shared/components/ui/button";

interface DataPaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  resourceName: string;

  onPrevious?: () => void;
  onNext?: () => void;
}

export function DataPagination({
  currentPage,
  pageSize,
  totalItems,
  resourceName,
  onPrevious,
  onNext,
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
      <p className="text-sm text-muted-foreground">
        Showing {start} to {end} of {totalItems}{" "}
        {resourceName}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
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
          onClick={onNext}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}