import Link from "next/link";
import Image from "next/image";
import { formatRating, formatReleaseDate, getCoverImageUrl, Game } from "@/lib/igdb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const coverUrl = getCoverImageUrl(game.cover?.url);
  
  return (
    <Link href={`/game/${game.id}`} className="block transition-transform hover:scale-105 sm:hover:scale-105 touch-none">
      <Card className="h-full overflow-hidden">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={game.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <CardContent className="p-2 sm:p-4">
          <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{game.name}</h3>
          <div className="flex items-center justify-between mt-1 sm:mt-2">
            {game.rating ? (
              <Badge className="font-medium text-xs sm:text-sm">
                ★ {formatRating(game.rating)}
              </Badge>
            ) : (
              <span className="text-xs sm:text-sm text-muted-foreground">Нет рейтинга</span>
            )}
            <span className="text-xs sm:text-sm text-muted-foreground">
              {formatReleaseDate(game.first_release_date)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}