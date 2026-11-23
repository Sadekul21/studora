import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import StudioCard from "@/components/studios/StudioCard";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/types/studio";

async function getFeaturedStudios() {
  try {
    return await apiFetch<Studio[]>("/studios/featured", { cache: "no-store" });
  } catch {
    return null;
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="bg-sunken py-[72px] md:py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="02 — Featured studios"
          title={
            <>
              Top-rated rooms this <em>week.</em>
            </>
          }
          action={
            <Link
              href="/studios"
              className="inline-flex w-fit items-center gap-2 border-b border-current pb-[5px] text-[11.5px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-all hover:gap-3 hover:text-primary"
            >
              View all studios <ArrowRight className="size-4" />
            </Link>
          }
        />

        {studios === null ? (
          <p className="border-t pt-8 text-muted-foreground">
            Studios couldn’t be loaded right now. Please refresh the page in a moment.
          </p>
        ) : studios.length === 0 ? (
          <p className="border-t pt-8 text-muted-foreground">
            No studios have been listed yet.{" "}
            <Link href="/add-studio" className="font-semibold text-primary underline underline-offset-4">
              Be the first host
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-x-7 gap-y-11 md:grid-cols-2 md:gap-y-14 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
