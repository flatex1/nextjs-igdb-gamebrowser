import { Game } from "@/lib/igdb";
import { GameCard } from "@/components/game-card";

interface GameGridProps {
  games: Game[];
  title: string;
}

export function GameGrid({ games, title }: GameGridProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      
      {games.length === 0 ? (
        <p className="text-muted-foreground">Игр не найдено.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}