"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CalendarX2, Clock, MapPin, Navigation, RotateCcw, Search, Users, X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import CancelBookingDialog from "./CancelBookingDialog";
import { apiFetch } from "@/lib/api";
import { bookingCode, formatBookingDate, formatMoney, shortLocation } from "@/lib/booking-format";
import { cn } from "@/lib/utils";
import type { Booking, BookingStatus } from "@/types/booking";

const TABS: ("All" | BookingStatus)[] = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const statusNote = (booking: Booking) => {
  const host = booking.hostName.split(" ")[0];
  switch (booking.status) {
    case "Pending":
      return `Waiting for ${host} to confirm.`;
    case "Confirmed":
      return `Confirmed by ${host} · Booking #${bookingCode(booking._id)}`;
    case "Completed":
      return "Wrapped · Deposit refunded after the session";
    default:
      return "Cancelled · No charge";
  }
};

const actionStyle =
  "inline-flex h-9 items-center gap-1.5 rounded-[2px] border px-3 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors";

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [toCancel, setToCancel] = useState<Booking | null>(null);

  useEffect(() => {
    apiFetch<Booking[]>("/my-bookings")
      .then(setBookings)
      .catch((err: Error) => setError(err.message));
  }, []);

  const count = (status: (typeof TABS)[number]) =>
    status === "All"
      ? (bookings ?? []).length
      : (bookings ?? []).filter((booking) => booking.status === status).length;

  const visible = (bookings ?? []).filter((booking) => tab === "All" || booking.status === tab);

  const markCancelled = (id: string) =>
    setBookings(
      (prev) =>
        prev?.map((booking) => (booking._id === id ? { ...booking, status: "Cancelled" } : booking)) ??
        null
    );

  return (
    <>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
            As a creator
          </span>
          <h1 className="mt-4 text-[44px] leading-[1.02] tracking-[-0.02em] md:text-6xl">
            My <em className="text-terracotta">bookings.</em>
          </h1>
          <p className="mt-3 max-w-[520px] text-muted-foreground">
            Pending bookings can be cancelled free of charge. Hosts usually reply within a few hours.
          </p>
        </div>
        <Link
          href="/studios"
          className="inline-flex h-[52px] items-center gap-2.5 rounded-[2px] bg-primary px-6 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
        >
          <Search className="size-4" /> Book another studio
        </Link>
      </div>

      {error ? (
        <div className="border bg-card px-8 py-12 text-center">
          <h4 className="mb-3 font-serif text-[28px]">Bookings couldn’t load</h4>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : bookings === null ? (
        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="grid animate-pulse gap-4 border-b py-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-9"
            >
              <div className="aspect-[16/10] bg-muted md:aspect-auto md:h-[165px]" />
              <div className="space-y-3 py-2">
                <div className="h-6 w-28 bg-muted" />
                <div className="h-8 w-2/3 bg-muted" />
                <div className="h-4 w-1/2 bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center border bg-card px-8 py-14 text-center">
          <span className="grid size-14 place-items-center rounded-full border border-subtle">
            <CalendarX2 className="size-6 text-terracotta" strokeWidth={1.5} />
          </span>
          <h4 className="mt-[22px] mb-3 font-serif text-[30px] leading-[1.1]">No bookings yet</h4>
          <p className="mb-[26px] max-w-[380px] text-[15px] leading-6 text-muted-foreground">
            Find a room you like, pick your hours and send a request — it shows up here right away.
          </p>
          <Link
            href="/studios"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-[2px] bg-primary px-[26px] text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase"
          >
            <Search className="size-4" /> Explore studios
          </Link>
        </div>
      ) : (
        <>
          <nav
            aria-label="Booking status"
            className="mb-2 flex gap-7 overflow-x-auto border-b [scrollbar-width:none]"
          >
            {TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                aria-pressed={tab === item}
                className={cn(
                  "-mb-px inline-flex h-[52px] items-center gap-2 border-b px-0.5 text-[11.5px] font-semibold tracking-[0.15em] whitespace-nowrap uppercase transition-colors",
                  tab === item
                    ? "border-terracotta text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {item}
                <span className="text-xs font-medium tracking-normal text-subtle">{count(item)}</span>
              </button>
            ))}
          </nav>

          {visible.length === 0 ? (
            <p className="py-10 text-muted-foreground">No {tab.toLowerCase()} bookings right now.</p>
          ) : (
            <div>
              {visible.map((booking) => (
                <article
                  key={booking._id}
                  className="grid gap-4 border-b py-6 md:grid-cols-[200px_minmax(0,1fr)] md:items-center md:gap-8 md:py-7 xl:grid-cols-[220px_minmax(0,1fr)_auto] xl:gap-9"
                >
                  <Link
                    href={`/studios/${booking.studioId}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-sunken md:aspect-[4/3]"
                  >
                    <Image
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="object-cover"
                    />
                  </Link>

                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge status={booking.status} />
                      <span className="inline-flex h-[26px] items-center border border-subtle px-2.5 text-[10.5px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase">
                        {booking.studioCategory}
                      </span>
                    </div>
                    <h3 className="mt-3.5 mb-3.5 font-serif text-[28px] leading-[1.08] md:text-[32px]">
                      <Link href={`/studios/${booking.studioId}`} className="hover:underline">
                        {booking.studioTitle}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="size-4 text-terracotta" />
                        {formatBookingDate(booking.date)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="size-4 text-terracotta" />
                        {booking.startTime}–{booking.endTime} · {booking.hours}{" "}
                        {booking.hours === 1 ? "hr" : "hrs"}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Users className="size-4 text-terracotta" />
                        {booking.guests} {booking.guests === 1 ? "person" : "people"}
                      </span>
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-terracotta" />
                        <span className="truncate">{shortLocation(booking.studioLocation)}</span>
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs text-muted-foreground">{statusNote(booking)}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3.5 md:col-start-2 xl:col-start-auto xl:min-w-[200px] xl:flex-col xl:items-end">
                    <div className="xl:text-right">
                      <span className="block font-serif text-[30px] leading-none tabular-nums">
                        {formatMoney(booking.totalPrice)}
                      </span>
                      <span className="mt-1.5 block text-xs text-muted-foreground">
                        + {formatMoney(booking.securityDeposit)} deposit
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 xl:justify-end">
                      {booking.status === "Pending" && (
                        <button
                          type="button"
                          onClick={() => setToCancel(booking)}
                          className={`${actionStyle} border-cancelled text-cancelled hover:bg-cancelled hover:text-white dark:hover:text-[#171613]`}
                        >
                          <X className="size-3.5" /> Cancel booking
                        </button>
                      )}
                      {booking.status === "Confirmed" && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.studioLocation)}`}
                          target="_blank"
                          rel="noreferrer"
                          className={`${actionStyle} border-subtle hover:border-foreground`}
                        >
                          <Navigation className="size-3.5" /> Directions
                        </a>
                      )}
                      {(booking.status === "Completed" || booking.status === "Cancelled") && (
                        <Link
                          href={`/studios/${booking.studioId}`}
                          className={`${actionStyle} border-subtle hover:border-foreground`}
                        >
                          <RotateCcw className="size-3.5" /> Book again
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      <CancelBookingDialog
        booking={toCancel}
        onClose={() => setToCancel(null)}
        onCancelled={markCancelled}
      />
    </>
  );
}
