import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Mic,
  Music,
  Palette,
  Shirt,
  Sofa,
  Video,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CtaBand from "@/components/shared/CtaBand";
import { apiFetch } from "@/lib/api";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

export const metadata: Metadata = {
  title: "About us — Studora",
  description: "Studora is a marketplace for creative space — photo studios, stages, podcast rooms and more, booked by the hour.",
};

const categoryIcons = [Camera, Clapperboard, Mic, Music, Palette, Sofa, Video, Shirt];

const values = [
  {
    title: "Real rooms, real photos",
    text: "Every listing is photographed as it is. If it isn’t in the pictures, it isn’t in the room.",
  },
  {
    title: "Prices up front",
    text: "Hourly rate and deposit are on the listing before you book. No quotes, no surprises at wrap.",
  },
  {
    title: "Hosts are partners",
    text: "Hosts choose which bookings to confirm, set their own rate and keep control of their space.",
  },
  {
    title: "Make more work",
    text: "Fewer emails about availability means more time on set. That’s the whole point.",
  },
];

const collage = [
  { src: "/images/creators-on-location.jpg", alt: "A film crew on location at sunset", label: "On location", position: "46% 50%" },
  { src: "/images/art-workshop.jpg", alt: "A sunlit art workshop full of easels", label: "Art workshop", position: "50% 60%" },
  { src: "/images/podcast-room.jpg", alt: "A podcast room with four microphones", label: "Podcast room", position: "50% 55%" },
];

async function getStudios() {
  try {
    return await apiFetch<Studio[]>("/studios", { cache: "no-store" });
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const studios = await getStudios();
  const countFor = (category: string) => studios?.filter((s) => s.category === category).length;

  return (
    <main>
      <section className="container-page pt-12 pb-8 md:pt-24 md:pb-14">
        <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
          About us
        </span>
        <h1 className="mt-6 max-w-[18ch] text-[46px] leading-[0.98] tracking-[-0.025em] md:text-[62px] lg:text-[84px]">
          Every idea deserves a good <em className="text-terracotta">room.</em>
        </h1>
        <p className="mt-6 max-w-[56ch] text-[16.5px] leading-[27px] text-muted-foreground md:text-lg md:leading-[30px]">
          Studora is a marketplace for creative space — built by people who spent too many
          afternoons emailing studios to ask if Thursday was free.
        </p>
      </section>

      <section className="container-page pb-[72px] md:pb-[104px]">
        <div className="grid gap-3.5 md:grid-cols-[1.55fr_1fr] md:grid-rows-[290px_250px] lg:grid-rows-[330px_290px]">
          {collage.map((photo, index) => (
            <figure
              key={photo.src}
              className={cn(
                "relative h-[220px] overflow-hidden md:h-auto",
                index === 0 && "h-[280px] md:row-span-2"
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
              <figcaption className="absolute bottom-0 left-0 bg-[#f5f0e8] px-2.5 py-1.5 text-[10.5px] font-semibold tracking-[0.16em] text-[#171613] uppercase">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-sunken py-[72px] md:py-24 lg:py-32">
        <div className="container-page grid items-start gap-11 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
              Our mission
            </span>
            <h2 className="text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
              Make creative space as easy to book as a <em className="text-terracotta">table.</em>
            </h2>
          </div>
          <div className="space-y-[18px] text-[16.5px] leading-[29px] text-muted-foreground">
            <p>
              <b className="font-semibold text-foreground">The best rooms are often hiding in plain sight</b>{" "}
              — a photographer’s daylight loft that sits empty on Tuesdays, a tracking room between
              albums, a stage between shoots.
            </p>
            <p>
              Studora gives those rooms a page, a calendar and a fair price, and gives creators a single
              place to find them. Hosts fill their quiet hours. Creators stop compromising on the space.
              Everyone spends more time making things.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-[72px] md:py-24 lg:py-32">
        <SectionHeading
          eyebrow="What we stand for"
          title={
            <>
              Four rules we <em>keep.</em>
            </>
          }
        />
        <div className="grid border-t border-foreground md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={cn(
                "flex flex-col gap-3.5 py-[26px] md:pr-7 lg:pt-8 lg:pb-0",
                index > 0 && "border-t md:border-t-0",
                index % 2 === 1 && "md:border-l md:pl-7",
                index >= 2 && "md:border-t lg:border-t-0",
                index === 2 && "lg:border-l lg:pl-7"
              )}
            >
              <span className="font-serif text-xl text-terracotta italic">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[28px] leading-[1.1]">{value.title}</h3>
              <p className="text-[15px] leading-[25px] text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-[72px] md:pb-24 lg:pb-32">
        <div className="grid items-start gap-11 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
              What you can book
            </span>
            <h2 className="text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
              Eight kinds of <em className="text-terracotta">room.</em>
            </h2>
            <p className="text-muted-foreground">
              From a two-person podcast lounge to a forty-person sound stage.
            </p>
          </div>

          <div className="border-t">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index];
              const count = countFor(category);
              return (
                <Link
                  key={category}
                  href={`/studios?category=${encodeURIComponent(category)}`}
                  className="group flex items-center justify-between gap-3 border-b py-4"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-[18px] text-terracotta" strokeWidth={1.6} />
                    <span className="font-serif text-2xl transition-colors group-hover:text-primary">
                      {category}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {count !== undefined && `${count} ${count === 1 ? "studio" : "studios"}`}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand>
        Find your next <em>room.</em>
      </CtaBand>
    </main>
  );
}
