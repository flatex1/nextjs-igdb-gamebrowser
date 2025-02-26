"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Game, getGameSuggestions } from "@/lib/igdb";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { DialogTitle } from "@/components/ui/dialog";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [input, setInput] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedInput = useDebounce(input, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedInput.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const results = await getGameSuggestions(debouncedInput);
        setSuggestions(results || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Ошибка при загрузке предложений. Пожалуйста, попробуйте позже.");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedInput.length >= 2) {
      fetchSuggestions();
    }
  }, [debouncedInput]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      router.push(`/?query=${encodeURIComponent(input.trim())}`);
      setOpen(false);
    }
  };

  const handleSelect = (id: number) => {
    setOpen(false);
    router.push(`/game/${id}`);
  };

  const handleRetry = () => {
    setError(null);
    // Повторно запускаем поиск, если есть debouncedInput
    if (debouncedInput.length >= 2) {
      setLoading(true);
      getGameSuggestions(debouncedInput)
        .then(results => {
          setSuggestions(results || []);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error retrying fetch:", error);
          setError("Не удалось загрузить данные. Проверьте подключение к интернету.");
          setLoading(false);
        });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-lg items-center space-x-2"
      >
        
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Найти по названию..."
            className="w-full pl-10 pr-4"
            onClick={() => setOpen(true)}
          />
        </div>
        <Button type="submit">Найти</Button>
      </form>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Поиск игр</DialogTitle>
        <CommandInput
          value={input}
          onValueChange={setInput}
          placeholder="Найти по названию..."
        />
        <CommandList>
          {loading && (
            <div className="py-6 text-center text-sm">Загружаем подходящие игры...</div>
          )}
          {error && (
            <div className="py-6 text-center text-sm">
              <p className="text-destructive mb-2">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="mt-2"
              >
                Попробовать снова
              </Button>
            </div>
          )}
          {!loading && !error && debouncedInput.length < 2 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Введите минимум 2 символа для поиска
            </div>
          )}
          {!loading && !error && debouncedInput.length >= 2 && suggestions.length === 0 && (
            <CommandEmpty>Игр по вашему запросу не найдено.</CommandEmpty>
          )}
          {!loading && !error && suggestions.length > 0 && (
            <CommandGroup heading="Игры">
              {suggestions.map((game) => (
                <CommandItem
                  key={game.id}
                  onSelect={() => handleSelect(game.id)}
                >
                  {game.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}