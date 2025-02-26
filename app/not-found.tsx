import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Игра не найдена</h2>
      <p className="text-muted-foreground">
        Игра которую вы ищете возможно была удалена или ее не существует.
      </p>
      <Button asChild>
        <Link href="/">На главную страницу</Link>
      </Button>
    </div>
  );
}