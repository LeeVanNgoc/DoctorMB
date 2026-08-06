"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      {segments.map((segment, index) => {
        const href =
          "/" + segments.slice(0, index + 1).join("/");

        const label =
          segment.charAt(0).toUpperCase() +
          segment.slice(1);

        const isLast =
          index === segments.length - 1;

        return (
          <div
            key={href}
            className="flex items-center gap-2"
          >
            {isLast ? (
              <span className="font-medium text-foreground">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground"
              >
                {label}
              </Link>
            )}

            {!isLast && (
              <ChevronRight className="size-4" />
            )}
          </div>
        );
      })}
    </nav>
  );
}