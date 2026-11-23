"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import "swiper/css";

type StudioGalleryProps = {
  images: string[];
  title: string;
  category: string;
};

export default function StudioGallery({ images, title, category }: StudioGalleryProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const count = String(images.length).padStart(2, "0");

  return (
    <div>
      <div className="relative">
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.activeIndex)}
          spaceBetween={10}
          className="aspect-[4/3] bg-sunken md:aspect-[16/8]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image}-${index}`} className="relative">
              <Image
                src={image}
                alt={`${title} — photo ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(min-width: 1440px) 1300px, 100vw"
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <span className="pointer-events-none absolute top-0 left-0 z-10 inline-flex h-[30px] items-center bg-[#f5f0e8] px-2.5 text-[10.5px] font-semibold tracking-[0.16em] text-[#171613] uppercase">
          {category}
        </span>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2.5 md:bottom-6 md:left-6">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              disabled={active === 0}
              aria-label="Previous photo"
              className="grid size-[42px] place-items-center rounded-full bg-[#f5f0e8]/90 text-[#171613] transition-opacity disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
            </button>
            <span className="bg-[#171613]/60 px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-[#f5f0e8]">
              {String(active + 1).padStart(2, "0")} / {count}
            </span>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              disabled={active === images.length - 1}
              aria-label="Next photo"
              className="grid size-[42px] place-items-center rounded-full bg-[#f5f0e8]/90 text-[#171613] transition-opacity disabled:opacity-40"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-2.5 grid grid-cols-4 gap-2.5 md:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={`${image}-thumb-${index}`}
              type="button"
              onClick={() => swiper?.slideTo(index)}
              aria-label={`Show photo ${index + 1}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden outline-offset-2 transition-opacity",
                active === index ? "outline-2 outline-terracotta" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image src={image} alt="" fill sizes="200px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
