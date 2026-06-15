import { readFileSync } from "fs";
import { join } from "path";

export interface MovieDirector {
  name: string;
  region: string;
}

export interface Movie {
  title: string;
  director: MovieDirector;
  year: number;
  genre: string[];
  rating: number;
  duration: number;
  region: string[];
  summary: string;
}

interface MoviesData {
  movies: Movie[];
}

function readMoviesData(): MoviesData {
  const filePath = join(process.cwd(), "movies.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as MoviesData;
}

export function getAllMovies(): Movie[] {
  return readMoviesData().movies;
}

export function getMovieByIndex(index: number): Movie | null {
  const movies = getAllMovies();
  if (index < 0 || index >= movies.length) return null;
  return movies[index];
}

export function searchMovies(query: string): Movie[] {
  if (!query.trim()) return getAllMovies();

  const q = query.toLowerCase().trim();
  return getAllMovies().filter((movie) => {
    const matchTitle = movie.title.toLowerCase().includes(q);
    const matchDirector = movie.director.name.toLowerCase().includes(q);
    const matchGenre = movie.genre.some((g) => g.toLowerCase().includes(q));
    return matchTitle || matchDirector || matchGenre;
  });
}
