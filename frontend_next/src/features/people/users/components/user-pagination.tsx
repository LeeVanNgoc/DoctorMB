import { Button } from "@/shared/components/ui/button";

export function UserPagination() {
  return (
    <div className="flex items-center justify-between border-t px-6 py-4">
      <p className="text-sm text-muted-foreground">
        Showing 1–10 of 125 users
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
        >
          Previous
        </Button>

        <Button
          size="sm"
        >
          1
        </Button>

        <Button
          variant="outline"
          size="sm"
        >
          2
        </Button>

        <Button
          variant="outline"
          size="sm"
        >
          3
        </Button>

        <Button
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}