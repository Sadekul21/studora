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
        r="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        {blades.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 text-foreground", className)}
    >
      <ApertureMark className="size-8" />
      <span className="font-serif text-2xl tracking-[0.08em]">STUDORA</span>
    </Link>
  );
}
