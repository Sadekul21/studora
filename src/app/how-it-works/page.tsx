import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, DollarSign, Plus, Search } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CtaBand from "@/components/shared/CtaBand";
import StatusBadge from "@/components/bookings/StatusBadge";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/booking";

export const metadata: Metadata = {
  title: "How it works — Studora",
  description: "How creators book studios by the hour and how hosts list and confirm bookings on Studora.",
};

const miniStyle = "mt-auto flex flex-col gap-2.5 border bg-card p-4";
const slotStyle = "grid h-10 place-items-center border border-subtle text-[13px] font-medium tabular-nums";

const creatorSteps = [
  {
    title: "Discover spaces",
    text: "Filter by category, city, price and capacity. Every listing shows the real room, the full amenity list and the host.",
    preview: (
      <div className={miniStyle}>
        <div className="flex h-10 items-center gap-2 border border-subtle px-3 text-sm text-muted-foreground">
          <Search className="size-4" /> Podcast room, Austin
        </div>
        <div className="flex gap-2">
          <span className="border border-foreground bg-foreground px-2.5 py-1 text-[11px] font-semibold text-background">
            Podcast
          </span>
          <span className="border border-subtle px-2.5 py-1 text-[11px] font-semibold">Under $80</span>
        </div>
      </div>
    ),
  },
  {
    title: "Select shoot hours",
    text: "Pick a date, then your call and wrap times. Hours already confirmed for someone else are blocked, and the total is on screen before you send.",
    preview: (
      <div className={miniStyle}>
        <div className="grid grid-cols-4 gap-1.5">
          <span
            className={cn(
              slotStyle,
              "border-dashed border-border text-subtle bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--border)_6px_7px)]"
            )}
          >
            17:00
          </span>
          <span className={cn(slotStyle, "border-foreground bg-foreground text-background")}>18:00</span>
          <span className={cn(slotStyle, "border-terracotta bg-terracotta/15")}>19:00</span>
          <span className={cn(slotStyle, "border-foreground bg-foreground text-background")}>20:00</span>
        </div>
        <span className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          Call 18:00 · Wrap 21:00
        </span>
      </div>
    ),
  },
  {
    title: "Send the request",
    text: "Your booking is saved as Pending and the host gets it in their dashboard. You can cancel for free while it’s pending.",
    preview: (
      <div className={miniStyle}>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status="Pending" />
          <ArrowRight className="size-3.5 text-muted-foreground" />
          <StatusBadge status="Confirmed" />
        </div>
        <span className="text-xs text-muted-foreground">Most hosts reply within a few hours</span>
      </div>
    ),
  },
  {
    title: "Create & produce",
    text: "Load in, light it, make the work. After the session the booking moves to Completed and stays in My bookings.",
    preview: (
      <div className={miniStyle}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold">Booking #SD-24817</span>
          <span className="font-serif text-lg tabular-nums">$520.00</span>
        </div>
        <StatusBadge status="Completed" className="self-start" />
      </div>
    ),
  },
];

const hostSteps = [
  {
    title: "List your space",
    text: "Add a cover photo, a gallery, amenities and a short overview. It takes about ten minutes.",
    icon: Plus,
    hint: "Add new studio form",
  },
  {
    title: "Set price & deposit",
    text: "Choose an hourly rate, a refundable security deposit and how many people the room fits.",
    icon: DollarSign,
    hint: "Rate · Deposit · Capacity",
  },
  {
    title: "Confirm requests",
    text: "Every request lands in your dashboard as Pending. Confirm or decline it in a tap.",
    icon: Check,
    hint: "Dashboard → Booking requests",
  },
  {
    title: "Track earnings",
    text: "Your dashboard adds up confirmed bookings month by month, so you can see which rooms earn the most.",
    icon: BarChart3,
    hint: "Dashboard → Earnings",
  },
];

const statuses: { status: BookingStatus; text: string }[] = [
  { status: "Pending", text: "You’ve sent the request. Nothing is locked yet and you can cancel it for free." },
  { status: "Confirmed", text: "The host accepted. The hours are locked — no one else can book them." },
  { status: "Completed", text: "The date has passed and you’ve wrapped. It stays in My bookings for your records." },
  { status: "Cancelled", text: "Cancelled by you, or declined by the host. Nothing is charged." },
];

const faqs = [
  {
    question: "What happens if two people want the same hours?",
    answer:
      "Requests can overlap while they’re Pending, but a host can only confirm one of them. Once a booking is confirmed those hours are blocked, and any request that collides with them is turned away with a clear message — so double-booking can’t happen.",
  },
  {
    question: "Am I charged when I send a request?",
    answer:
      "No. A Pending booking costs nothing. The total you see in the booking window — hourly rate × hours, plus the refundable deposit — is what applies once the host confirms.",
  },
  {
    question: "How does the security deposit work?",
    answer:
      "Every listing shows its deposit up front. It’s refunded after the session as long as the room is left the way you found it.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Pending bookings can be cancelled any time from My bookings, free of charge. Once a host confirms, get in touch with them directly if your plans change.",
  },
  {
    question: "Can I book my own studio?",
    answer:
      "No. Hosts see an “Edit your listing” button on their own studios instead of the booking button.",
  },
];

function StepGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid border-t border-foreground md:grid-cols-2 lg:grid-cols-4">{children}</div>;
}

const stepCell = (index: number) =>
  cn(
    "flex flex-col gap-4 border-b py-7 md:pr-7 lg:border-b-0 lg:pb-2",
    index % 2 === 1 && "md:border-l md:pl-7",
    index === 2 && "lg:border-l lg:pl-7"
  );

export default function HowItWorksPage() {
  return (
    <main>
      <section className="container-page pt-12 pb-8 md:pt-24 md:pb-14">
        <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
          How it works
        </span>
        <h1 className="mt-6 max-w-[15ch] text-[46px] leading-[0.98] tracking-[-0.025em] md:text-[62px] lg:text-[84px]">
          Simple on both sides of the <em className="text-terracotta">camera.</em>
        </h1>
        <p className="mt-6 max-w-[56ch] text-[16.5px] leading-[27px] text-muted-foreground md:text-lg md:leading-[30px]">
          Creators find and book rooms by the hour. Hosts list their space and confirm the bookings
          they want. Here’s exactly how it goes.
        </p>
        <div className="mt-8 inline-flex rounded-full border border-subtle p-[3px]">
          <a
            href="#creators"
            className="inline-flex h-[34px] items-center rounded-full bg-foreground px-[15px] text-[11px] font-semibold tracking-[0.12em] text-background uppercase"
          >
            For creators
          </a>
          <a
            href="#hosts"
            className="inline-flex h-[34px] items-center rounded-full px-[15px] text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase hover:text-foreground"
          >
            For hosts
          </a>
        </div>
      </section>

      <section id="creators" className="container-page scroll-mt-24 pt-6 pb-[72px] md:pb-24">
        <SectionHeading
          eyebrow="For creators"
          title={
            <>
              Book a room in four <em>steps.</em>
            </>
          }
        />
        <StepGrid>
          {creatorSteps.map((step, index) => (
            <div key={step.title} className={stepCell(index)}>
              <span className="font-serif text-[56px] leading-[0.9] text-terracotta italic">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[28px] leading-[1.12]">{step.title}</h3>
              <p className="text-[14.5px] leading-[23px] text-muted-foreground">{step.text}</p>
              {step.preview}
            </div>
          ))}
        </StepGrid>
      </section>

      <section id="hosts" className="scroll-mt-16 bg-sunken py-[72px] md:py-24 lg:py-32">
        <div className="container-page">
          <div className="mb-14 grid items-center gap-11 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
                For hosts
              </span>
              <h2 className="text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
                Turn empty hours into <em className="text-terracotta">income.</em>
              </h2>
              <p className="max-w-[56ch] text-[16.5px] leading-[27px] text-muted-foreground md:text-lg md:leading-[30px]">
                Listing is free. You set the rate, the deposit and the capacity — and you decide which
                bookings to confirm.
              </p>
              <Link
                href="/add-studio"
                className="inline-flex h-[52px] w-fit items-center gap-2.5 rounded-[2px] bg-primary px-6 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
              >
                Host your space <ArrowRight className="size-4" />
              </Link>
            </div>
            <figure className="relative aspect-[3/2] overflow-hidden rounded-[6px]">
              <Image
                src="/images/green-screen.jpg"
                alt="A green screen stage with a full lighting grid"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </figure>
          </div>

          <StepGrid>
            {hostSteps.map((step, index) => (
              <div key={step.title} className={stepCell(index)}>
                <span className="font-serif text-[56px] leading-[0.9] text-terracotta italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-[28px] leading-[1.12]">{step.title}</h3>
                <p className="text-[14.5px] leading-[23px] text-muted-foreground">{step.text}</p>
                <div className="mt-auto flex items-center gap-2.5 border bg-card p-4">
                  <step.icon className="size-4 shrink-0 text-terracotta" />
                  <span className="text-xs text-muted-foreground">{step.hint}</span>
                </div>
              </div>
            ))}
          </StepGrid>
        </div>
      </section>

      <section className="container-page py-[72px] md:py-24 lg:py-32">
        <SectionHeading
          eyebrow="Booking status"
          title={
            <>
              What each status <em>means.</em>
            </>
          }
        />
        <div className="grid border-y border-t-foreground md:grid-cols-2 lg:grid-cols-4">
          {statuses.map((item, index) => (
            <div
              key={item.status}
              className={cn(
                "flex flex-col items-start gap-3.5 py-6 md:py-8 md:pr-7",
                index > 0 && "border-t md:border-t-0",
                index % 2 === 1 && "md:border-l md:pl-7",
                index >= 2 && "md:border-t lg:border-t-0",
                index === 2 && "lg:border-l lg:pl-7"
              )}
            >
              <StatusBadge status={item.status} />
              <p className="text-[14.5px] leading-[23px] text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-[72px] md:pb-24 lg:pb-32">
        <div className="grid items-start gap-11 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
              FAQ
            </span>
            <h2 className="text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
              Questions, <em className="text-terracotta">answered.</em>
            </h2>
            <p className="text-muted-foreground">
              Can’t find it here? Write to support@studora.com and we’ll get back to you.
            </p>
          </div>

          <div className="border-t border-foreground">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0} className="group border-b py-[22px] md:py-[26px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-[21px] leading-[1.2] md:text-[26px] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:text-terracotta" />
                </summary>
                <p className="mt-3.5 max-w-[62ch] text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand>
        Ready when you <em>are.</em>
      </CtaBand>
    </main>
  );
}
