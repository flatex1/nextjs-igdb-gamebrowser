import { notFound } from "next/navigation";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { getGameById, formatRating, formatReleaseDate, getCoverImageUrl } from "@/lib/igdb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function GamePage({ params }: Props) {
  const { id } = await params;

  const gameId = parseInt(id);
  
  if (isNaN(gameId)) {
    return notFound();
  }

  try {
    const game = await getGameById(gameId);

    if (!game) {
      return notFound();
    }

    const coverUrl = getCoverImageUrl(game.cover?.url, "large");

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Назад к играм
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-md">
              <Image
                src={coverUrl}
                alt={game.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{game.name}</h1>

              <div className="flex flex-wrap gap-2">
                {game.rating && (
                  <Badge variant="secondary" className="text-sm">
                    ★ {formatRating(game.rating)}
                  </Badge>
                )}

                {game.first_release_date && (
                  <Badge variant="outline" className="text-sm">
                    Дата релиза: {formatReleaseDate(game.first_release_date)}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Информация по игре</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Параметр</TableHead>
                      <TableHead>Значение</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Название</TableCell>
                      <TableCell>{game.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Рейтинг</TableCell>
                      <TableCell>{game.rating ? `${formatRating(game.rating)}/10` : "Без рейтинга"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Дата релиза</TableCell>
                      <TableCell>{formatReleaseDate(game.first_release_date)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Платформа</TableCell>
                      <TableCell>
                        {game.platforms && game.platforms.length > 0
                          ? game.platforms.map((p) => p.name).join(", ")
                          : "Неизвестно"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {game.summary && (
              <Card>
                <CardHeader>
                  <CardTitle>Описание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{game.summary}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching game:", error);
    return (
      <div className="space-y-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Назад к играм
          </Link>
        </Button>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            Произошла ошибка при загрузке данных игры. Пожалуйста, попробуйте позже.
          </AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">На главную страницу</Link>
          </Button>
        </div>
      </div>
    );
  }
}
