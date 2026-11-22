import Link from "next/link";
import { ArrowRight, Camera, Headset, ShieldCheck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const promises = [
  {
    icon: ShieldCheck,
    title: "Liability protection",
    text: "Every confirmed booking is covered for accidental property damage and third-party liability.",
  },
  {
    icon: UserCheck,
    title: "Verified profiles",
    text: "Hosts and creators verify ID and a payment method before their first booking.",
  },
  {
    icon: Camera,
    title: "Equipment safety",
    text: "Gear lists are checked at listing; condition is logged at check-in and at wrap.",
  },
  {
    icon: Headset,
    title: "24/7 host support",
    text: "A real person on call around the clock, by chat or phone, for both sides.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-night py-[72px] text-on-night md:py-24 lg:py-32">
      <div className="container-page">
        <div className="grid items-end gap-7 border-b border-night-line pb-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[72px]">
          <div>
            <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-on-night-muted uppercase before:h-px before:w-[22px] before:bg-night-accent md:before:w-9">
              04 — Host guarantee &amp; creator support
            </span>
            <h2 className="mt-[22px] max-w-[15ch] text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
              Covered on both sides of the{" "}
              <em className="text-night-accent">camera.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="max-w-[46ch] text-[17px] leading-[29px] text-on-night-muted">
              Whether you’re lending your room or filling it, every confirmed
              booking comes with protection, verified people and someone to
              call at 3 a.m.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/add-studio"
                className="inline-flex h-[52px] items-center gap-3 rounded-[2px] bg-primary px-[26px] text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
              >
                Host your space <ArrowRight className="size-[17px]" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex h-[52px] items-center rounded-[2px] border border-on-night/60 px-[26px] text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-on-night hover:text-night"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "flex flex-col gap-3.5 py-7 sm:px-8 sm:pt-12 sm:pb-2",
                index > 0 && "border-t border-night-line sm:border-t-0",
                index % 2 === 0 ? "sm:pl-0" : "sm:border-l sm:border-night-line",
                index === 2 && "sm:mt-6 sm:border-t lg:mt-0 lg:border-t-0 lg:border-l lg:pl-8",
                index === 3 && "sm:mt-6 sm:border-t lg:mt-0 lg:border-t-0"
              )}
            >
              <span className="grid size-14 place-items-center rounded-full border border-sand/45 text-sand">
                <item.icon className="size-6" strokeWidth={1.4} />
              </span>
              <h4 className="mt-2.5 text-xs leading-[18px] font-semibold tracking-[0.18em] uppercase">
                {item.title}
              </h4>
              <p className="text-[14.5px] leading-6 text-on-night-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 flex items-center gap-3.5 text-sm text-on-night-muted">
          <span className="size-2 shrink-0 rounded-full bg-[#a9c79a] shadow-[0_0_0_4px_rgba(169,199,154,.18)]" />
          <span>
            <b className="font-semibold text-on-night">Support is online now.</b>{" "}
            Average first reply: under 4 minutes.
          </span>
        </p>
      </div>
    </section>
  );
}
