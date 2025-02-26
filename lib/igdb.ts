import { cache } from 'react';

export interface Game {
  id: number;
  name: string;
  cover?: {
    id: number;
    url: string;
  };
  rating?: number;
  summary?: string;
  first_release_date?: number;
  platforms?: {
    id: number;
    name: string;
  }[];
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
}

async function fetchFromIGDB(endpoint: string, query: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/igdb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ endpoint, query }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`API error (${response.status}):`, errorData);
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from IGDB:', error);
    throw error;
  }
}

export const getTopGames = cache(async (limit: number = 10): Promise<Game[]> => {
  try {
    const query = `
      fields name, cover.url, rating, summary, first_release_date, platforms.name;
      where rating != null & cover != null;
      sort rating desc;
      limit ${limit};
    `;
    
    return await fetchFromIGDB('games', query);
  } catch (error) {
    console.error('Error fetching top games:', error);
    return [];
  }
});

export const searchGames = cache(async ({ query, page = 1, limit = 10 }: SearchParams): Promise<Game[]> => {
  if (!query) return [];
  
  try {
    const offset = (page - 1) * limit;
    const searchQuery = `
      search "${query}";
      fields name, cover.url, rating, summary, first_release_date, platforms.name;
      where cover != null;
      limit ${limit};
      offset ${offset};
    `;
    
    return await fetchFromIGDB('games', searchQuery);
  } catch (error) {
    console.error('Error searching games:', error);
    return [];
  }
});
export const getGameById = cache(async (id: number): Promise<Game | null> => {
  try {
    const query = `
      fields name, cover.url, rating, summary, first_release_date, platforms.name;
      where id = ${id};
    `;
    
    const games = await fetchFromIGDB('games', query);
    return games[0] || null;
  } catch (error) {
    console.error(`Error fetching game with ID ${id}:`, error);
    throw error;
  }
});

export const getGameSuggestions = cache(async (query: string): Promise<Game[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const searchQuery = `
      search "${query}";
      fields name, cover.url;
      where cover != null;
      limit 5;
    `;
    
    return await fetchFromIGDB('games', searchQuery);
  } catch (error) {
    console.error('Error fetching game suggestions:', error);
    throw error;
  }
});

export const getGamesCount = cache(async (query: string): Promise<number> => {
  if (!query) return 0;
  
  try {
    const countQuery = `
      search "${query}";
      fields name;
      where cover != null;
      limit 500;
    `;
    
    const games = await fetchFromIGDB('games', countQuery);
    return games.length;
  } catch (error) {
    console.error('Error counting games:', error);
    return 0;
  }
});

export function formatReleaseDate(timestamp?: number): string {
  if (!timestamp) return 'Дата выхода неизвестна';
  return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRating(rating?: number): string {
  if (!rating) return 'Без рейтинга';
  return (rating / 10).toFixed(1);
}

export function getCoverImageUrl(url?: string, size: 'small' | 'large' = 'small'): string {
  if (!url) return '/placeholder-game.jpg';

  const httpsUrl = `https:${url}`;
  
  if (size === 'small') {
    return httpsUrl.replace('/t_thumb/', '/t_cover_big/');
  } else {
    return httpsUrl.replace('/t_thumb/', '/t_cover_big/');
  }
}