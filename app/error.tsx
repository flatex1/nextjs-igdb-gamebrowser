"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
      <h1 className="text-2xl font-bold">Упс! Что-то пошло не по плану.</h1>
      <p className="text-muted-foreground">
        Во время загрузки страницы произошла ошибка. Пожалуйста, попробуйте еще раз.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          Попробовать еще раз
        </Button>
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
}