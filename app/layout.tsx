import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classic Films | 经典电影",
  description: "Discover timeless cinematic masterpieces from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col relative">
        <header className="relative z-10 border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold tracking-wide text-[var(--accent)] font-[family-name:var(--font-display)] hover:opacity-80 transition-opacity"
            >
              Classic Films
            </Link>
            <span className="text-xs tracking-widest uppercase text-[var(--muted)]">
              经典电影
            </span>
          </div>
        </header>
        <main className="flex-1 relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-[var(--border)] py-8 text-center text-xs text-[var(--muted)] tracking-wider">
          Classic Films Archive · {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
