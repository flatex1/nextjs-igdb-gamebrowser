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
    <Link href={`/game/${game.id}`} className="block transition-transform hover:scale-105">
      <Card className="h-full overflow-hidden">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{game.name}</h3>
          <div className="flex items-center justify-between mt-2">
            {game.rating ? (
              <Badge className="font-medium">
                ★ {formatRating(game.rating)}
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">Нет рейтинга</span>
            )}
            <span className="text-sm text-muted-foreground">
              {formatReleaseDate(game.first_release_date)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}