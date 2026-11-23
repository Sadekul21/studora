"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import type { Studio } from "@/types/studio";

export default function BookingCard({ studio }: { studio: Studio }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleBook = () => {
    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
  };

  return (
    <aside aria-label="Booking" className="lg:sticky lg:top-[110px] lg:self-start">
      <div className="border bg-card p-6 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-serif text-[34px] leading-none">
            ${studio.hourlyRate}{" "}
            <small className="font-sans text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              / hour
            </small>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
            <Star className="size-[13px] fill-terracotta text-terracotta" />
            {studio.rating > 0 ? studio.rating.toFixed(2) : "New"}
            {studio.reviewCount > 0 && (
              <span className="font-medium text-muted-foreground">({studio.reviewCount})</span>
            )}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex justify-between gap-4 border-b py-[13px] text-[15px]">
            <span className="text-muted-foreground">Hourly rate</span>
            <b className="font-semibold">${studio.hourlyRate}.00</b>
          </div>
          <div className="flex justify-between gap-4 border-b py-[13px] text-[15px]">
            <span className="text-muted-foreground">Security deposit</span>
            <b className="font-semibold">${studio.securityDeposit}.00</b>
          </div>
          <div className="flex justify-between gap-4 py-[13px] text-[15px]">
            <span className="text-muted-foreground">Max capacity</span>
            <b className="font-semibold">{studio.maxCapacity} people</b>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBook}
          className="mt-4 inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-[2px] bg-primary text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
        >
          Book workspace now <ArrowRight className="size-[17px]" />
        </button>
        <p className="mt-2.5 text-center text-xs text-muted-foreground">
          {session
            ? "Pick a date and your hours — the host confirms the booking."
            : "Log in to pick a date and send a booking request."}
        </p>
      </div>

      <div className="mt-4 flex gap-3 text-[13.5px] leading-[21px] text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-terracotta" strokeWidth={1.5} />
        <span>
          <b className="font-semibold text-foreground">Covered by the Studora guarantee.</b>{" "}
          The deposit is refunded after wrap if the room is left as you found it.
        </span>
      </div>
    </aside>
  );
}
