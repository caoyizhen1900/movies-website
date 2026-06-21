import { getAllMovies } from "@/lib/movies";
import { MovieList } from "./movie-list";

export default function Home() {
  const movies = getAllMovies();
  return <MovieList movies={movies} />;
}
