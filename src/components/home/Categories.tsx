"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

const categoryList = [
  {
    name: "Photo Studios",
    value: "Photo studio",
    tag: "Cyc walls",
    text: "Cyc walls, daylight floors and strobes ready to fire.",
    image: "/images/photo-studio-northlight.jpg",
    position: "48% 50%",
  },
  {
    name: "Film & Sound Stages",
    value: "Film stage",
    tag: "Silent stages",
    text: "Silent stages with grid, power and drive-in load.",
    image: "/images/film-stage.jpg",
    position: "34% 50%",
  },
  {
    name: "Podcast Rooms",
    value: "Podcast room",
    tag: "Treated rooms",
    text: "Treated rooms, broadcast mics, cameras on request.",
    image: "/images/podcast-room.jpg",
    position: "50% 55%",
  },
  {
    name: "Music Suites",
    value: "Music suite",
    tag: "Live rooms",
    text: "Tracking rooms, control rooms and real consoles.",
    image: "/images/music-suite.jpg",
    position: "50% 60%",
  },
  {
    name: "Art Workshops",
    value: "Art workshop",
    tag: "North light",
    text: "North light, easels, sinks and long work tables.",
    image: "/images/art-workshop.jpg",
    position: "50% 60%",
  },
  {
    name: "Creative Lofts",
    value: "Creative loft",
    tag: "Furnished sets",
    text: "Furnished sets that double as lounges and offices.",
    image: "/images/creative-loft.jpg",
    position: "38% 55%",
  },
  {
    name: "Green Screen",
    value: "Green screen",
    tag: "Keyed cycs",
    text: "Keyed hard cycs with lighting grids overhead.",
    image: "/images/green-screen.jpg",
    position: "50% 50%",
  },
  {
    name: "Fashion Studios",
    value: "Fashion studio",
    tag: "Glam ready",
    text: "Ring lights, rails, steamers and a glam station.",
    image: "/images/fashion-studio.jpg",
    position: "50% 50%",
  },
];

const studiosLink = (value: string) =>
  `/studios?category=${encodeURIComponent(value)}`;

export default function Categories() {
  const [active, setActive] = useState(0);

  return (
    <section className="pb-[72px] md:pb-24 lg:pb-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="01 — Browse by category"
          title={
            <>
              Eight kinds of room, one standard of <em>care.</em>
            </>
          }
          action={
            <Link
              href="/studios"
              className="inline-flex w-fit items-center gap-2 border-b border-current pb-[5px] text-[11.5px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-all hover:gap-3 hover:text-primary"
            >
              All categories <ArrowRight className="size-4" />
            </Link>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[72px]">
          <ol className="border-t">
            {categoryList.map((category, index) => (
              <li key={category.value}>
                <Link
                  href={studiosLink(category.value)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cn(
                    "grid grid-cols-[36px_minmax(0,1fr)_20px] items-center gap-4 border-b py-4 transition-all duration-300 hover:pl-3.5 md:grid-cols-[52px_minmax(0,1fr)_auto_24px] md:py-5",
                    active === index && "pl-3.5"
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-[15px] leading-none italic",
                      active === index ? "text-terracotta" : "text-subtle"
                    )}
                  >
                    ({String(index + 1).padStart(2, "0")})
                  </span>
                  <b
                    className={cn(
                      "font-serif text-2xl leading-[1.15] font-normal md:text-[30px]",
                      active === index && "text-primary italic"
                    )}
                  >
                    {category.name}
                  </b>
                  <span className="hidden text-[11px] font-semibold tracking-[0.18em] whitespace-nowrap text-muted-foreground uppercase md:block">
                    {category.tag}
                  </span>
                  <ArrowRight
                    className={cn(
                      "size-5 transition-transform duration-300",
                      active === index
                        ? "translate-x-1 text-terracotta"
                        : "text-subtle"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ol>

          <div className="relative min-h-[400px] md:min-h-[520px] lg:min-h-[640px]">
            {categoryList.map((category, index) => (
              <figure
                key={category.value}
                aria-hidden={active !== index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  active === index ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <div className="relative h-[calc(100%-140px)] md:h-[calc(100%-92px)]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: category.position }}
                  />
                </div>
                <figcaption className="flex flex-col items-start gap-3.5 pt-5 md:flex-row md:justify-between md:gap-6">
                  <p className="max-w-[38ch] text-[15px] leading-6 text-muted-foreground">
                    {category.text}
                  </p>
                  <Link
                    href={studiosLink(category.value)}
                    tabIndex={active === index ? 0 : -1}
                    className="inline-flex items-center gap-2 border-b border-current pb-[5px] text-[11.5px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-all hover:gap-3 hover:text-primary"
                  >
                    Explore {category.name.toLowerCase()}{" "}
                    <ArrowRight className="size-4" />
                  </Link>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
