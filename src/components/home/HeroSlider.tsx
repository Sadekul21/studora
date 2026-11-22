"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Headset,
  Maximize2,
  Plus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/images/music-suite.jpg",
    alt: "The Copperline Recording Suite control room",
    position: "50% 62%",
    eyebrow: "Creative studio rentals · By the hour",
    title: "Where the work finds its",
    accent: "room.",
    text: "Photo cycs, sound stages, podcast lounges and music suites — listed by the people who built them, booked by the hour.",
    room: "Copperline",
    name: "Copperline Recording Suite",
    description: "Analog console, tuned live room, engineer on call.",
    stats: [
      { icon: DollarSign, value: "$120 / hr", label: "Rate" },
      { icon: Users, value: "8 people", label: "Capacity" },
      { icon: Maximize2, value: "1,100 sq ft", label: "Floor" },
    ],
  },
  {
    image: "/images/creators-in-studio.jpg",
    alt: "A photographer shooting a model at Glasshouse Studios",
    position: "50% 30%",
    eyebrow: "Now booking · Photo studios",
    title: "Space for the shot you",
    accent: "imagined.",
    text: "From a two-hour headshot session to a three-day campaign — rates, deposits and house rules up front.",
    room: "Glasshouse",
    name: "Glasshouse Studios",
    description: "A 24 ft hard cyc and a wall of north light.",
    stats: [
      { icon: DollarSign, value: "$130 / hr", label: "Rate" },
      { icon: Users, value: "25 people", label: "Capacity" },
      { icon: Maximize2, value: "2,400 sq ft", label: "Floor" },
    ],
  },
  {
    image: "/images/host-cyc-studio.jpg",
    alt: "An empty daylight cyc studio with tall windows",
    position: "40% 50%",
    eyebrow: "For hosts · List your space",
    title: "Your empty hours, someone’s next",
    accent: "set.",
    text: "Listing is free. You set the rate, the minimum and the rules — and you choose which bookings to confirm.",
    room: "Host your space",
    name: "Become a host",
    description: "Free to list. Paid two days after every wrap.",
    stats: [
      { icon: Plus, value: "Free", label: "To list" },
      { icon: DollarSign, value: "Your rate", label: "You set it" },
      { icon: Headset, value: "24/7", label: "Host support" },
    ],
  },
];

export default function HeroSlider() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section
      aria-label="Featured spaces"
      className="relative -mt-16 h-[880px] overflow-hidden bg-[#171613] text-[#f5f0e8] md:h-[1000px] lg:-mt-20 xl:h-[1010px]"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.name} className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.position }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,22,19,.55)_0%,rgba(23,22,19,.05)_24%,rgba(23,22,19,.1)_50%,rgba(23,22,19,.86)_100%),linear-gradient(90deg,rgba(23,22,19,.72)_0%,rgba(23,22,19,.25)_45%,rgba(23,22,19,0)_66%)]" />

            <div className="absolute inset-x-0 top-32 z-10 md:top-[170px] xl:top-44">
              <div className="container-page">
                <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-[#d8c4ae] uppercase before:h-px before:w-[22px] before:bg-[#d08a5f] md:before:w-9">
                  {slide.eyebrow}
                </span>
                <h1 className="mt-[18px] max-w-[1000px] text-[52px] leading-[0.98] tracking-[-0.03em] md:mt-[26px] md:text-[76px] md:leading-[0.94] lg:text-[92px] xl:text-[116px]">
                  {slide.title}{" "}
                  <em className="text-[#e2a27a]">{slide.accent}</em>
                </h1>
                <p className="mt-[18px] max-w-[500px] text-[15.5px] leading-[25px] text-[#f5f0e8]/85 md:mt-7 md:text-lg md:leading-[30px]">
                  {slide.text}
                </p>
                <div className="mt-[26px] flex flex-wrap gap-3 md:mt-10">
                  <Link
                    href="/studios"
                    className="inline-flex h-[58px] flex-1 items-center justify-center gap-3 rounded-[2px] bg-primary px-3 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap text-primary-foreground uppercase transition-colors hover:bg-primary/90 md:flex-none md:px-8 md:text-xs md:tracking-[0.16em]"
                  >
                    Explore studios <ArrowRight className="hidden size-[17px] sm:block" />
                  </Link>
                  <Link
                    href="/studios"
                    className="inline-flex h-[58px] flex-1 items-center justify-center rounded-[2px] border border-[#f5f0e8]/60 px-3 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors hover:bg-[#f5f0e8] hover:text-[#171613] md:flex-none md:px-8 md:text-xs md:tracking-[0.16em]"
                  >
                    Host your space
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-5 bottom-6 z-20 md:inset-x-11 md:bottom-10 lg:right-11 lg:bottom-14 lg:left-auto xl:right-[72px]">
              <div className="w-full max-w-[560px] bg-[#f7f3eb] text-[#171613] lg:w-[440px]">
                <div className="px-5 pt-5 pb-4 md:px-7 md:pt-[26px] md:pb-[22px]">
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-[#6b6359] uppercase">
                    ({String(index + 1).padStart(2, "0")}) Now showing
                  </span>
                  <h3 className="mt-2.5 text-2xl leading-[1.1] md:text-[30px]">
                    {slide.name}
                  </h3>
                  <p className="mt-1.5 mb-4 hidden text-sm leading-[22px] text-[#6b6359] md:block">
                    {slide.description}
                  </p>
                  <Link
                    href="/studios"
                    className="mt-3 inline-flex items-center gap-2 border-b border-current pb-[5px] text-[11.5px] font-semibold tracking-[0.18em] uppercase transition-all hover:gap-3 hover:text-[#9c5632] md:mt-0"
                  >
                    View studio <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-3 border-t border-[#dccfbe]">
                  {slide.stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={cn(
                        "flex items-center gap-2 p-3 md:gap-2.5 md:px-[18px] md:py-3.5",
                        i > 0 && "border-l border-[#dccfbe]"
                      )}
                    >
                      <stat.icon className="hidden size-5 shrink-0 text-[#b66d43] md:block" strokeWidth={1.5} />
                      <span>
                        <b className="block text-[15px] leading-[18px] font-medium">
                          {stat.value}
                        </b>
                        <span className="block text-[11.5px] leading-[15px] text-[#6b6359]">
                          {stat.label}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 top-[76px] z-30 md:top-[100px] lg:top-auto lg:bottom-14">
        <div className="container-page flex justify-end lg:justify-start">
          <div className="pointer-events-auto">
            <div className="hidden flex-col gap-0.5 lg:flex">
              <span className="mb-1.5 text-[10.5px] font-medium tracking-[0.2em] text-[#f5f0e8]/60 uppercase">
                Studio
              </span>
              {slides.map((slide, index) => (
                <button
                  key={slide.room}
                  type="button"
                  onClick={() => swiper?.slideToLoop(index)}
                  className={cn(
                    "flex items-baseline gap-3.5 text-left transition-colors",
                    active === index
                      ? "text-[#f5f0e8]"
                      : "text-[#f5f0e8]/40 hover:text-[#f5f0e8]/85"
                  )}
                >
                  <small className="text-[11px] font-medium tracking-[0.1em]">
                    ({String(index + 1).padStart(2, "0")})
                  </small>
                  <b className="flex items-center font-serif text-[30px] leading-[1.25] font-normal">
                    {active === index && (
                      <span className="mr-3 inline-block size-[7px] bg-[#d08a5f]" />
                    )}
                    {slide.room}
                  </b>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5 lg:mt-[22px]">
              <span className="mr-1.5 text-xs font-medium tracking-[0.14em]">
                {String(active + 1).padStart(2, "0")}{" "}
                <span className="text-[#f5f0e8]/50">/ 03</span>
              </span>
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous slide"
                className="grid size-[38px] place-items-center rounded-full border border-[#f5f0e8]/45 transition-colors hover:bg-[#f5f0e8] hover:text-[#171613]"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                aria-label="Next slide"
                className="grid size-[38px] place-items-center rounded-full border border-[#f5f0e8]/45 transition-colors hover:bg-[#f5f0e8] hover:text-[#171613]"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
