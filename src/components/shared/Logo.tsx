import Link from "next/link";
import { cn } from "@/lib/utils";

const blades = [
  [16, 10.8, 29.73, 18.73],
  [20.5, 13.4, 20.5, 29.26],
  [20.5, 18.6, 6.77, 26.53],
  [16, 21.2, 2.27, 13.27],
  [11.5, 18.6, 11.5, 2.74],
  [11.5, 13.4, 25.23, 5.47],
];

export function ApertureMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <polygon
        points="16,10.8 20.5,13.4 20.5,18.6 16,21.2 11.5,18.6 11.5,13.4"
        className="fill-terracotta"
      />
      <circle
        cx="16"
        cy="16"
        r="14.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        {blades.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  tagline?: boolean;
};

export default function Logo({ className, tagline = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center gap-3 text-foreground",
        className
      )}
    >
      <ApertureMark className="size-[22px] md:size-[26px]" />
      <span className="font-serif text-[17px] leading-none font-medium tracking-[0.2em] uppercase md:text-[21px] md:tracking-[0.24em]">
        Studora
      </span>
      {tagline && (
        <small className="hidden border-l border-current/30 pl-3 text-[10px] leading-none font-medium tracking-[0.2em] uppercase opacity-70 xl:inline">
          Creative spaces
        </small>
      )}
    </Link>
  );
}
