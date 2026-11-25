import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="container-page pb-[72px] md:pb-24 lg:pb-32">
      <div className="flex flex-col items-start justify-between gap-8 bg-night px-6 py-10 text-on-night md:flex-row md:items-center md:gap-10 md:p-16">
        <h2 className="text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl [&_em]:text-night-accent">
          {children}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/studios"
            className="inline-flex h-[58px] items-center gap-2.5 rounded-[2px] bg-primary px-7 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
          >
            Explore studios <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/add-studio"
            className="inline-flex h-[58px] items-center rounded-[2px] border border-on-night/60 px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-on-night hover:text-[#171613]"
          >
            Host your space
          </Link>
        </div>
      </div>
    </section>
  );
}
