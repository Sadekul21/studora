import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import ClapperArt from "@/components/shared/ClapperArt";

export const metadata: Metadata = {
  title: "Page not found — Studora",
};

export default function NotFound() {
  return (
    <main className="container-page grid items-center gap-14 pt-[72px] pb-[104px] lg:grid-cols-2 lg:gap-24 lg:pt-[104px] lg:pb-[136px]">
      <div className="relative aspect-square overflow-hidden bg-night dark:ring-1 dark:ring-border">
        <ClapperArt />
      </div>

      <div className="flex flex-col gap-6">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
          Error 404 · Scene not found
        </span>
        <h1 className="text-[48px] leading-[1.02] tracking-[-0.02em] md:text-7xl">
          This set doesn’t <em className="text-terracotta">exist.</em>
        </h1>
        <p className="max-w-[460px] text-lg leading-[1.6] text-muted-foreground">
          The page you’re looking for was struck, moved or never built. Let’s get you back to the lot.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-[58px] items-center gap-2.5 rounded-[2px] bg-primary px-7 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="size-4" /> Return to home
          </Link>
          <Link
            href="/studios"
            className="inline-flex h-[58px] items-center gap-2.5 rounded-[2px] border border-foreground px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-sunken"
          >
            <Search className="size-4" /> Explore studios
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap gap-6 border-t pt-6 text-sm text-muted-foreground">
          <Link href="/how-it-works" className="underline-offset-4 hover:text-foreground hover:underline">
            How it works
          </Link>
          <Link href="/about" className="underline-offset-4 hover:text-foreground hover:underline">
            About us
          </Link>
          <a href="mailto:support@studora.com" className="underline-offset-4 hover:text-foreground hover:underline">
            Contact support
          </a>
        </div>
      </div>
    </main>
  );
}
