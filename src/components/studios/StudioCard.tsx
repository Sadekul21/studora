import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { Studio } from "@/types/studio";

const shortLocation = (location: string) =>
  location.split(",").slice(-2).join(",").trim();

export default function StudioCard({ studio }: { studio: Studio }) {
  const detailsUrl = `/studios/${studio._id}`;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-sunken">
        <Link href={detailsUrl} aria-label={studio.title} className="block size-full">
          <Image
            src={studio.image}
            alt={`${studio.title} — ${studio.category}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        <span className="absolute top-0 left-0 inline-flex h-[30px] items-center bg-[#f5f0e8] px-2.5 text-[10.5px] font-semibold tracking-[0.16em] whitespace-nowrap text-[#171613] uppercase">
          {studio.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 pt-5">
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {shortLocation(studio.location)}
            <span className="mx-2.5 inline-block size-[3px] rounded-full bg-current align-middle opacity-55" />
            Up to {studio.maxCapacity}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold tabular-nums">
            <Star className="size-[13px] fill-terracotta text-terracotta" />
            {studio.rating > 0 ? studio.rating.toFixed(2) : "New"}
            {studio.reviewCount > 0 && (
              <span className="font-medium text-muted-foreground">
                ({studio.reviewCount})
              </span>
            )}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-16 text-[27px] leading-8 tracking-[-0.01em]">
          <Link
            href={detailsUrl}
            className="decoration-1 underline-offset-[5px] group-hover:underline"
          >
            {studio.title}
          </Link>
        </h3>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <span className="text-[17px] font-medium tabular-nums">
            ${studio.hourlyRate}{" "}
            <small className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              / hour
            </small>
          </span>
          <Link
            href={detailsUrl}
            className="inline-flex items-center gap-2 border-b border-current pb-[5px] text-[11.5px] font-semibold tracking-[0.18em] uppercase transition-all hover:gap-3 hover:text-primary"
          >
            View details <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
