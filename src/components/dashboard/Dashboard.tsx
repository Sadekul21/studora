"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Building2,
  CalendarCheck,
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  Navigation,
  Plus,
  Search,
  Star,
  Ticket,
} from "lucide-react";
import EarningsChart, { earningsByMonth } from "./EarningsChart";
import BookingRequests from "./BookingRequests";
import StatusBadge from "@/components/bookings/StatusBadge";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { formatBookingDate, formatMoney, shortLocation } from "@/lib/booking-format";
import { cn } from "@/lib/utils";
import type { Booking, BookingStatus } from "@/types/booking";
import type { Studio } from "@/types/studio";

type DashboardData = {
  studios: Studio[];
  myBookings: Booking[];
  hostBookings: Booking[];
};

const pad = (n: number) => String(n).padStart(2, "0");
const todayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const byDate = (a: Booking, b: Booking) =>
  a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime);

const labelStyle = "text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase";

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiFetch<Studio[]>("/my-studios"),
      apiFetch<Booking[]>("/my-bookings"),
      apiFetch<Booking[]>("/host-bookings"),
    ])
      .then(([studios, myBookings, hostBookings]) => setData({ studios, myBookings, hostBookings }))
      .catch((err: Error) => setError(err.message));
  }, []);

  const updateRequest = (id: string, status: BookingStatus) =>
    setData((prev) =>
      prev
        ? {
            ...prev,
            hostBookings: prev.hostBookings.map((b) => (b._id === id ? { ...b, status } : b)),
          }
        : prev
    );

  const firstName = session?.user.name.split(" ")[0];
  const today = todayKey();

  const upcoming = (data?.myBookings ?? [])
    .filter((b) => (b.status === "Pending" || b.status === "Confirmed") && b.date >= today)
    .sort(byDate);
  const nextUp = upcoming[0];

  const requests = (data?.hostBookings ?? []).filter((b) => b.status === "Pending").sort(byDate);

  const months = earningsByMonth(data?.hostBookings ?? [], 2);
  const [lastMonth, thisMonth] = months;
  const change = lastMonth.total ? Math.round(((thisMonth.total - lastMonth.total) / lastMonth.total) * 100) : 0;
  const monthName = new Date().toLocaleDateString("en-US", { month: "long" });

  const bookingsPerStudio = (id: string) =>
    (data?.hostBookings ?? []).filter((b) => b.studioId === id && b.status !== "Cancelled").length;

  const stats = data
    ? [
        {
          label: "Active listings",
          icon: Building2,
          value: String(data.studios.length),
          note: data.studios.length ? "Live on Explore" : "List your first studio",
        },
        {
          label: "Upcoming bookings",
          icon: CalendarCheck,
          value: String(upcoming.length),
          note: nextUp ? `Next: ${formatBookingDate(nextUp.date).replace(/ \d{4}$/, "")}` : "Nothing booked yet",
        },
        {
          label: "Requests to review",
          icon: Bell,
          value: String(requests.length),
          note: requests.length ? "Reply within 24 hrs" : "All caught up",
        },
        {
          label: `Earnings · ${monthName}`,
          icon: DollarSign,
          value: formatMoney(thisMonth.total).replace(/\.00$/, ""),
          note: lastMonth.total
            ? `${change >= 0 ? "+" : ""}${change}% vs ${new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toLocaleDateString("en-US", { month: "long" })}`
            : "From confirmed bookings",
        },
      ]
    : [];

  return (
    <>
      <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span
            suppressHydrationWarning
            className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9"
          >
            Dashboard ·{" "}
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </span>
          <h1 className="mt-4 text-[44px] leading-[1.02] tracking-[-0.02em] md:text-6xl">
            <span suppressHydrationWarning>{greeting()}</span>
            {firstName && (
              <>
                , <em className="text-terracotta">{firstName}.</em>
              </>
            )}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/studios"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-[2px] border border-foreground px-6 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-sunken"
          >
            <Search className="size-4" /> Explore studios
          </Link>
          <Link
            href="/add-studio"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-[2px] bg-primary px-6 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
          >
            <Plus className="size-4" /> Add new studio
          </Link>
        </div>
      </div>

      {error ? (
        <div className="border bg-card px-8 py-12 text-center">
          <h4 className="mb-3 font-serif text-[28px]">Dashboard couldn’t load</h4>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : !data ? (
        <div className="animate-pulse">
          <div className="grid grid-cols-2 border-t border-b border-t-foreground lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4 py-[26px] pr-5">
                <div className="h-3 w-24 bg-muted" />
                <div className="h-12 w-20 bg-muted" />
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
            <div className="h-[380px] bg-muted" />
            <div className="h-[380px] bg-muted" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 border-t border-b border-t-foreground lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex min-w-0 flex-col gap-3 py-[22px] pr-4 sm:py-[26px] sm:pr-[26px]",
                  index % 2 === 1 && "border-l pl-4 sm:pl-[26px]",
                  index === 2 && "border-t lg:border-t-0 lg:border-l lg:pl-[26px]",
                  index === 3 && "border-t lg:border-t-0"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={labelStyle}>{stat.label}</span>
                  <stat.icon className="size-[19px] shrink-0 text-terracotta" strokeWidth={1.6} />
                </div>
                <span className="truncate font-serif text-[40px] leading-none tracking-[-0.02em] tabular-nums sm:text-[56px]">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">{stat.note}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
            <EarningsChart bookings={data.hostBookings} />

            <section className="flex flex-col border bg-card">
              <div className="border-b px-5 py-[22px] sm:px-[26px]">
                <span className={labelStyle}>Next up · as a creator</span>
                <h2 className="mt-1 truncate font-serif text-2xl leading-[1.15]">
                  {nextUp ? nextUp.studioTitle : "No upcoming bookings"}
                </h2>
              </div>
              {nextUp ? (
                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-[26px]">
                  <Link
                    href={`/studios/${nextUp.studioId}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-sunken"
                  >
                    <Image
                      src={nextUp.studioImage}
                      alt={nextUp.studioTitle}
                      fill
                      sizes="(min-width: 1024px) 360px, 100vw"
                      className="object-cover"
                    />
                    <StatusBadge status={nextUp.status} className="absolute top-0 left-0" />
                  </Link>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="size-4 text-terracotta" />
                      {formatBookingDate(nextUp.date)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="size-4 text-terracotta" />
                      {nextUp.startTime}–{nextUp.endTime}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="size-4 text-terracotta" />
                      {shortLocation(nextUp.studioLocation)}
                    </span>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Link
                      href="/my-bookings"
                      className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-[2px] border border-subtle text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-foreground"
                    >
                      <Ticket className="size-3.5" /> My bookings
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextUp.studioLocation)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-[2px] border border-subtle text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-foreground"
                    >
                      <Navigation className="size-3.5" /> Directions
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                  <CalendarDays className="size-7 text-terracotta" strokeWidth={1.5} />
                  <p className="mt-4 max-w-[260px] text-sm text-muted-foreground">
                    Book a studio and your next session will show up here.
                  </p>
                  <Link
                    href="/studios"
                    className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-[2px] border border-foreground px-4 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-sunken"
                  >
                    <Search className="size-3.5" /> Find a studio
                  </Link>
                </div>
              )}
            </section>
          </div>

          <BookingRequests requests={requests} onUpdated={updateRequest} />

          <section className="mt-5 border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-[22px] sm:px-[26px]">
              <div>
                <span className={labelStyle}>As a host</span>
                <h2 className="mt-1 font-serif text-2xl leading-[1.15]">Your listings</h2>
              </div>
              <Link href="/my-listings" className="text-sm font-semibold underline-offset-4 hover:underline">
                Manage listings
              </Link>
            </div>
            {data.studios.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <Building2 className="size-7 text-terracotta" strokeWidth={1.5} />
                <p className="mt-4 max-w-[320px] text-sm text-muted-foreground">
                  You haven’t listed a studio yet. It takes about five minutes.
                </p>
                <Link
                  href="/add-studio"
                  className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-[2px] bg-primary px-4 text-[11px] font-semibold tracking-[0.12em] text-primary-foreground uppercase"
                >
                  <Plus className="size-3.5" /> Add new studio
                </Link>
              </div>
            ) : (
              <div className="px-5 pt-2 pb-3 sm:px-[26px]">
                {data.studios.slice(0, 4).map((studio) => {
                  const count = bookingsPerStudio(studio._id);
                  return (
                    <div key={studio._id} className="flex items-center gap-3 border-b py-3 last:border-b-0">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[4px] bg-sunken">
                        <Image src={studio.image} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/studios/${studio._id}`}
                          className="block truncate font-serif text-[19px] hover:underline"
                        >
                          {studio.title}
                        </Link>
                        <span className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                          ${studio.hourlyRate}/hr · {count} {count === 1 ? "booking" : "bookings"}
                        </span>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold">
                        <Star className="size-[13px] fill-terracotta text-terracotta" />
                        {studio.rating > 0 ? studio.rating.toFixed(2) : "New"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
