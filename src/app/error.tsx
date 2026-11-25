"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container-page flex flex-col items-start gap-6 pt-[72px] pb-[104px] lg:pt-[120px] lg:pb-[160px]">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
        Something went wrong
      </span>
      <h1 className="max-w-[14ch] text-[48px] leading-[1.02] tracking-[-0.02em] md:text-7xl">
        We lost the <em className="text-terracotta">signal.</em>
      </h1>
      <p className="max-w-[480px] text-lg leading-[1.6] text-muted-foreground">
        This page couldn’t load just now. It’s usually a quick hiccup — try again, or head back
        home and pick up from there.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-[58px] items-center gap-2.5 rounded-[2px] bg-primary px-7 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
        >
          <RotateCcw className="size-4" /> Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-[58px] items-center gap-2.5 rounded-[2px] border border-foreground px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-sunken"
        >
          <ArrowLeft className="size-4" /> Return to home
        </Link>
      </div>
    </main>
  );
}
