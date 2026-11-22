import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    title: "Discover spaces",
    tag: "Search · Filter · Compare",
    text: "Filter by category, city, price and capacity. Every listing shows the real room, the full gear list and the house rules.",
  },
  {
    title: "Select shoot hours",
    tag: "Date · Call time · Wrap",
    text: "Pick a date, then your call and wrap times. The hourly total, deposit and service fee are on screen before you commit.",
  },
  {
    title: "Book instantly",
    tag: "Pending → Confirmed",
    text: "Send the booking in one tap. It’s saved as Pending and confirmed by the host — most reply within the hour.",
  },
  {
    title: "Create & produce",
    tag: "Shoot · Wrap · Invoice",
    text: "Load in, light it, make the work. Your invoice is waiting in My bookings the moment you wrap.",
  },
];

export default function HowBooking() {
  return (
    <section className="py-[72px] md:py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="03 — How booking works"
          title={
            <>
              From first look to <em>wrap,</em> in four steps.
            </>
          }
          action={
            <Link
              href="/how-it-works"
              className="inline-flex w-fit items-center gap-2 border-b border-current pb-[5px] text-[11.5px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-all hover:gap-3 hover:text-primary"
            >
              The full guide <ArrowRight className="size-4" />
            </Link>
          }
        />

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-[88px]">
          <div className="lg:sticky lg:top-[110px]">
            <figure className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/creators-on-location.jpg"
                alt="A film crew setting up a camera slider at sunset"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "46% 50%" }}
              />
            </figure>
            <div className="mt-4 flex flex-wrap justify-between gap-4 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              <span>(04) Create &amp; produce</span>
              <span>On location · Base camp booked on Studora</span>
            </div>
          </div>

          <ol className="border-t">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[56px_1fr] items-start gap-3 border-b py-[26px] md:grid-cols-[96px_1fr] md:gap-5 md:py-8"
              >
                <span className="font-serif text-[40px] leading-[0.9] text-terracotta italic md:text-[56px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="mb-3 block text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {step.tag}
                  </span>
                  <h3 className="mb-2.5 text-[26px] leading-[1.1] md:text-[30px]">
                    {step.title}
                  </h3>
                  <p className="max-w-[46ch] text-[15.5px] leading-[26px] text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
