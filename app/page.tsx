import { getAllMovies } from "@/lib/movies";
import { MovieList } from "./movie-list";

export const dynamic = "force-dynamic";

export default function Home() {
  const movies = getAllMovies();
  return <MovieList movies={movies} />;
}
