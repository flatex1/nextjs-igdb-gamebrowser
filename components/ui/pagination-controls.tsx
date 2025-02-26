"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
}

export function PaginationControls({
  totalPages,
  currentPage,
}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        asChild
      >
        <Link
          href={createPageURL(currentPage - 1)}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>
      
      <span className="text-sm">
        Страница {currentPage} из {totalPages || 1}
      </span>
      
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        asChild
      >
        <Link
          href={createPageURL(currentPage + 1)}
          aria-label="Следующая страница"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}