import { Suspense } from "react";
import { getGamesCount, getTopGames, searchGames } from "@/lib/igdb";
import { GameGrid } from "@/components/game-grid";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ITEMS_PER_PAGE = 10;

interface HomePageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  
  let games: any[] = [];
  let totalGames = 0;
  let totalPages = 1;
  let error: string | null = null;
  
  try {
    if (query) {
      // Режим поиска
      games = await searchGames({
        query,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      });
      
      totalGames = await getGamesCount(query);
      totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE);
    } else {
      // Стандартное отображение - топ 10 игр
      games = await getTopGames(ITEMS_PER_PAGE);
    }
  } catch (err) {
    console.error("Error loading games:", err);
    error = "Ошибка при загрузке игр. Попробуйте позже.";
  }
  
  const title = query 
    ? `Результаты поиска по запросу "${query}"`
    : "Лучшие игры по рейтингу на 2025 год";

  return (
    <div className="space-y-8">
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <Suspense fallback={<GameGridSkeleton />}>
            <GameGrid games={games} title={title} />
          </Suspense>
          
          {query && (
            <div className="text-center text-sm text-muted-foreground">
              Найдено {totalGames} игр(ы) по вашему запросу.
            </div>
          )}
          
          {totalPages > 1 && (
            <PaginationControls
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

function GameGridSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}