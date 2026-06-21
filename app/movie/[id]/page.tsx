import { getAllMovies, getMovieByIndex } from "@/lib/movies";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllMovies().map((_, index) => ({ id: String(index) }));
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = parseInt(id, 10);
  const movie = getMovieByIndex(index);

  if (!movie || isNaN(index)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-wide uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-10 animate-fade-in"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        返回列表
      </Link>

      <article className="animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--fg)] leading-tight">
              {movie.title}
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {movie.director.name} · {movie.year}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-4xl font-light text-[var(--accent)] tabular-nums">
              {movie.rating}
            </span>
            <span className="text-xs text-[var(--muted)]">/ 10</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <InfoItem label="年份" value={String(movie.year)} />
          <InfoItem
            label="时长"
            value={`${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m`}
          />
          <InfoItem label="地区" value={movie.region.join(" / ")} />
          <InfoItem label="导演" value={movie.director.name} />
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="text-xs tracking-wide uppercase px-3 py-1 rounded-full bg-[var(--bg)] text-[var(--accent)] border border-[var(--border)]"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--fg)] mb-4">
            剧情简介
          </h2>
          <p className="text-sm leading-relaxed text-[var(--muted)] max-w-2xl">
            {movie.summary}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <p className="text-[11px] tracking-widest uppercase text-[var(--muted)]">
            Director Region: {movie.director.region}
          </p>
        </div>
      </article>

      <div className="mt-16 flex justify-center animate-fade-in stagger-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
        >
          返回电影列表
        </Link>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">
        {label}
      </dt>
      <dd className="text-sm text-[var(--fg)]">{value}</dd>
    </div>
  );
}
