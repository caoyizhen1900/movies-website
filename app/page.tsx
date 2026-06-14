"use client";

import { useState, useMemo } from "react";
import { getAllMovies, Movie } from "@/lib/movies";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");

  const allMovies = useMemo(() => getAllMovies(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allMovies;
    const q = query.toLowerCase().trim();
    return allMovies.filter((m) => {
      return (
        m.title.toLowerCase().includes(q) ||
        m.director.name.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q))
      );
    });
  }, [query, allMovies]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-14 animate-fade-in">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--fg)] mb-3">
          经典电影档案
        </h1>
        <p className="text-sm text-[var(--muted)] tracking-wide max-w-lg">
          Discover timeless masterpieces — browse by title, director, or genre.
        </p>
      </div>

      <div className="mb-10 max-w-md animate-fade-in stagger-1">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索片名、导演、类型…"
            className="search-input w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg py-3 pl-11 pr-4 text-sm text-[var(--fg)] placeholder:text-[var(--muted)] outline-none transition-all duration-200"
          />
        </div>
        {query.trim() && (
          <p className="mt-2 text-xs text-[var(--muted)]">
            找到 {filtered.length} 部相关电影
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center animate-fade-in">
          <p className="text-[var(--muted)] text-sm">没有找到匹配的电影</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((movie, displayIndex) => {
            const movieIndex = allMovies.indexOf(movie);
            return <MovieCard key={movieIndex} movie={movie} index={movieIndex} displayIndex={displayIndex} />;
          })}
        </div>
      )}
    </div>
  );
}

function MovieCard({ movie, index, displayIndex }: { movie: Movie; index: number; displayIndex: number }) {
  const staggerClass =
    displayIndex < 10 ? `stagger-${displayIndex + 1}` : "stagger-10";

  return (
    <Link
      href={`/movie/${index}`}
      className={`movie-card group block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 animate-fade-in-up ${staggerClass}`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-200">
          {movie.title}
        </h2>
        <span className="shrink-0 text-sm font-medium text-[var(--accent)] tabular-nums">
          {movie.rating}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
        <span>{movie.year}</span>
        <span className="text-[var(--border)]">·</span>
        <span>{movie.director.name}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {movie.genre.slice(0, 3).map((g) => (
          <span
            key={g}
            className="text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-full bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]"
          >
            {g}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-xs text-[var(--muted)]">
        <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
        <span className="text-[var(--border)]">·</span>
        <span>{movie.region[0]}</span>
      </div>
    </Link>
  );
}
