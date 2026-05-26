import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgenticFi Dashboard",
  description: "Kite agentic economy dashboard and stats connector status.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary text-lg font-bold leading-none text-primary-foreground">
                K
              </span>
              <span className="text-xl font-bold text-foreground">AgenticFi</span>
              <span className="hidden h-4 w-px bg-border sm:inline-block" />
              <span className="hidden text-xs font-bold uppercase text-primary sm:inline-block">
                Kite economy
              </span>
            </Link>
            <nav className="flex items-center gap-5 text-xs font-bold uppercase text-muted-foreground">
              <Link href="/products" className="transition-colors hover:text-foreground">
                Products
              </Link>
              <Link href="/widget" className="transition-colors hover:text-foreground">
                Widget
              </Link>
              <a
                href="https://github.com/gnanam1990/agenticfi_dashboard-app"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-card/30 py-6 text-xs text-muted-foreground">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>Public Kite agentic economy dashboard.</p>
            <a
              href="https://docs.gokite.ai"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:text-foreground"
            >
              docs.gokite.ai
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
