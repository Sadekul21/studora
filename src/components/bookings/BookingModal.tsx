"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { labelStyle } from "@/components/auth/formStyles";
import { ApiError, apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

type Slot = { startTime: string; endTime: string };

type BookingModalProps = {
  studio: Studio;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const OPEN_HOUR = 8;
const CLOSE_HOUR = 23;
const HOURS = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i);
const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const pad = (n: number) => String(n).padStart(2, "0");
const toTime = (hour: number) => `${pad(hour)}:00`;
const toHour = (time: string) => Number(time.split(":")[0]) + Number(time.split(":")[1]) / 60;
const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export default function BookingModal({ studio, open, onOpenChange }: BookingModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const now = new Date();
  const todayKey = toDateKey(now);

  const [month, setMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [booked, setBooked] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [conflict, setConflict] = useState("");
  const [sending, setSending] = useState(false);

  const dateKey = date ? toDateKey(date) : "";

  const loadBooked = async (key: string) => {
    setLoadingSlots(true);
    try {
      const slots = await apiFetch<Slot[]>(`/studios/${studio._id}/booked?date=${key}`);
      setBooked(slots);
      return slots;
    } catch {
      setBooked([]);
      return [];
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (!dateKey) return;
    let ignore = false;
    apiFetch<Slot[]>(`/studios/${studio._id}/booked?date=${dateKey}`)
      .then((slots) => !ignore && setBooked(slots))
      .catch(() => !ignore && setBooked([]))
      .finally(() => !ignore && setLoadingSlots(false));
    return () => {
      ignore = true;
    };
  }, [dateKey, studio._id]);

  const isTaken = (hour: number, slots = booked) =>
    slots.some((slot) => toHour(slot.startTime) < hour + 1 && toHour(slot.endTime) > hour);

  const isPast = (hour: number) => dateKey === todayKey && hour <= now.getHours();

  const isBlocked = (hour: number) => isTaken(hour) || isPast(hour);

  const pickDate = (day: Date) => {
    setDate(day);
    setStart(null);
    setEnd(null);
    setConflict("");
    setLoadingSlots(true);
  };

  const pickHour = (hour: number) => {
    setConflict("");
    const isSingle = start !== null && end === start + 1;
    if (isSingle && hour > start) {
      const between = HOURS.filter((h) => h > start && h <= hour);
      if (between.every((h) => !isBlocked(h))) {
        setEnd(hour + 1);
        return;
      }
    }
    setStart(hour);
    setEnd(hour + 1);
  };

  const resetForm = () => {
    setDate(null);
    setBooked([]);
    setStart(null);
    setEnd(null);
    setGuests(1);
    setNote("");
    setConflict("");
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const handleOpenChange = (next: boolean) => {
    if (sending) return;
    if (!next) resetForm();
    onOpenChange(next);
  };

  const hours = start !== null && end !== null ? end - start : 0;
  const subtotal = studio.hourlyRate * hours;
  const hostFirstName = studio.ownerName.split(" ")[0];

  const handleSubmit = async () => {
    if (!date || start === null || end === null) {
      toast.error("Pick a date and your hours first.");
      return;
    }

    setSending(true);
    setConflict("");
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({
          studioId: studio._id,
          date: dateKey,
          startTime: toTime(start),
          endTime: toTime(end),
          guests,
          note,
        }),
      });
      toast.success(`Request sent! It stays Pending until ${hostFirstName} confirms.`);
      resetForm();
      onOpenChange(false);
      router.push("/my-bookings");
    } catch (error) {
      const err = error as ApiError;
      if (err.status === 401) {
        toast.error("Your session ended. Please log in again.");
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (err.status === 409) {
        setConflict(err.message);
        const slots = await loadBooked(dateKey);
        if (start !== null && HOURS.some((h) => h >= start && h < end && isTaken(h, slots))) {
          setStart(null);
          setEnd(null);
        }
      } else {
        toast.error(err.message);
      }
    } finally {
      setSending(false);
    }
  };

  const firstWeekday = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const isCurrentMonth =
    month.getFullYear() === now.getFullYear() && month.getMonth() === now.getMonth();

  const changeMonth = (step: number) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + step, 1));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden rounded-[2px] border-border bg-card p-0 sm:max-w-[760px]"
      >
        <div className="flex items-center gap-4 border-b px-5 py-5 sm:gap-[18px] sm:px-8 sm:py-6">
          <div className="relative h-[45px] w-[60px] shrink-0 overflow-hidden bg-sunken sm:h-[57px] sm:w-[76px]">
            <Image src={studio.image} alt="" fill sizes="76px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <span className={labelStyle}>Book workspace</span>
            <DialogTitle className="mt-1 truncate font-serif text-2xl leading-tight font-normal sm:text-[28px]">
              {studio.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Pick a date, your hours and crew size to send a booking request.
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            aria-label="Close"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-subtle transition-colors hover:bg-sunken"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        <div className="flex flex-col gap-[26px] overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
          {conflict && (
            <div role="alert" className="flex gap-3 bg-cancelled-bg px-[18px] py-4 text-sm leading-[21px] text-cancelled">
              <AlertCircle className="mt-px size-[18px] shrink-0" />
              <span>
                <b className="block font-bold">Those hours overlap a confirmed booking.</b>
                {conflict}
              </span>
            </div>
          )}

          <div className="grid gap-[26px] md:grid-cols-2 md:gap-8">
            <div>
              <div className="mb-3.5 flex items-center justify-between">
                <b className="font-serif text-2xl leading-none font-normal">
                  {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </b>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    disabled={isCurrentMonth}
                    aria-label="Previous month"
                    className="grid size-9 place-items-center rounded-full border border-subtle transition-colors hover:bg-sunken disabled:opacity-35 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    aria-label="Next month"
                    className="grid size-9 place-items-center rounded-full border border-subtle transition-colors hover:bg-sunken"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEK_DAYS.map((day) => (
                  <span
                    key={day}
                    className="py-1 text-[9.5px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
                  >
                    {day}
                  </span>
                ))}
                {Array.from({ length: firstWeekday }).map((_, i) => (
                  <span key={`pad-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = new Date(month.getFullYear(), month.getMonth(), i + 1);
                  const key = toDateKey(day);
                  const past = key < todayKey;
                  const selected = key === dateKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={past}
                      onClick={() => pickDate(day)}
                      aria-label={day.toDateString()}
                      aria-pressed={selected}
                      className={cn(
                        "h-10 rounded-full text-[13.5px] font-medium tabular-nums transition-colors hover:bg-sunken",
                        key === todayKey && !selected && "ring-1 ring-subtle ring-inset",
                        past && "text-subtle line-through hover:bg-transparent",
                        selected && "bg-primary text-primary-foreground hover:bg-primary"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3.5 flex min-h-9 flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <b className="font-serif text-2xl leading-none font-normal">
                  {date
                    ? date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })
                    : "Your hours"}
                </b>
                {start !== null && end !== null && (
                  <span className={labelStyle}>
                    Call {toTime(start)} · Wrap {toTime(end)}
                  </span>
                )}
              </div>

              {!date ? (
                <div className="grid h-[244px] place-items-center border border-dashed border-subtle px-6 text-center text-sm text-muted-foreground">
                  Pick a date to see which hours are free.
                </div>
              ) : loadingSlots ? (
                <div className="grid grid-cols-3 gap-1.5">
                  {HOURS.map((hour) => (
                    <div key={hour} className="h-[42px] animate-pulse bg-muted" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {HOURS.map((hour) => {
                    const taken = isTaken(hour);
                    const blocked = taken || isPast(hour);
                    const edge = hour === start || (end !== null && hour === end - 1);
                    const inside = start !== null && end !== null && hour > start && hour < end - 1;
                    return (
                      <button
                        key={hour}
                        type="button"
                        disabled={blocked}
                        onClick={() => pickHour(hour)}
                        className={cn(
                          "h-[42px] border border-subtle text-[13.5px] font-medium tabular-nums transition-colors hover:border-foreground",
                          blocked && "border-dashed border-border text-subtle hover:border-border",
                          taken &&
                            "bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--border)_6px_7px)]",
                          inside && "border-terracotta bg-terracotta/15",
                          edge && "border-foreground bg-foreground text-background"
                        )}
                      >
                        {toTime(hour)}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-x-[18px] gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <i className="size-3 border border-foreground bg-foreground" /> Your hours
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="size-3 border border-dashed border-subtle bg-[repeating-linear-gradient(135deg,transparent_0_3px,var(--border)_3px_4px)]" />
                  Already booked
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Tap a start hour, then tap the last hour you need.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)]">
            <div className="flex flex-col gap-2">
              <span className={labelStyle}>Crew size</span>
              <div className="inline-flex h-[52px] items-center self-start rounded-[2px] border border-subtle">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  aria-label="Fewer people"
                  className="grid h-full w-[46px] place-items-center disabled:opacity-35"
                >
                  <Minus className="size-4" />
                </button>
                <span className="grid h-full min-w-[52px] place-items-center border-x text-base font-medium tabular-nums">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(studio.maxCapacity, g + 1))}
                  disabled={guests >= studio.maxCapacity}
                  aria-label="More people"
                  className="grid h-full w-[46px] place-items-center disabled:opacity-35"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">Up to {studio.maxCapacity} people</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="booking-note" className={labelStyle}>
                Note for {hostFirstName} <span className="tracking-normal normal-case">(optional)</span>
              </label>
              <textarea
                id="booking-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="What are you shooting? Any gear you’ll bring?"
                className="min-h-[52px] resize-none rounded-[2px] border border-subtle bg-card px-4 py-3 text-[15px] outline-none placeholder:text-subtle focus:border-foreground"
              />
            </div>
          </div>

          <div className="rounded-[4px] border bg-background px-[18px] py-1">
            <div className="flex items-baseline justify-between gap-4 border-b py-[13px] text-[15px]">
              <span className="text-muted-foreground">
                ${studio.hourlyRate} × {hours} {hours === 1 ? "hour" : "hours"}
              </span>
              <b className="font-semibold tabular-nums">${subtotal.toFixed(2)}</b>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b py-[13px] text-[15px]">
              <span className="text-muted-foreground">Security deposit · refunded after wrap</span>
              <b className="font-semibold tabular-nums">${studio.securityDeposit.toFixed(2)}</b>
            </div>
            <div className="flex items-baseline justify-between gap-4 pt-[18px] pb-[13px]">
              <span className="font-semibold">Due if confirmed</span>
              <b className="font-serif text-2xl leading-none font-normal tabular-nums">
                ${(hours ? subtotal + studio.securityDeposit : 0).toFixed(2)}
              </b>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t bg-background px-5 py-5 sm:px-8">
          <p className="w-full text-[13px] leading-5 text-muted-foreground sm:mr-auto sm:w-auto sm:max-w-[300px]">
            Saved as <b className="font-semibold text-foreground">Pending</b> until {hostFirstName}{" "}
            confirms. You can cancel any time while it’s pending.
          </p>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            disabled={sending}
            className="h-12 flex-1 rounded-[2px] border border-foreground px-3 text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-sunken sm:flex-none sm:px-6 sm:tracking-[0.14em]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={sending || hours === 0}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-[2px] bg-primary px-3 text-xs font-semibold tracking-[0.12em] whitespace-nowrap text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-50 sm:flex-none sm:px-6 sm:tracking-[0.14em]"
          >
            {sending ? <Loader2 className="size-4 animate-spin" /> : null}
            {sending ? "Sending…" : "Request booking"}
            {!sending && <ArrowRight className="hidden size-4 sm:block" />}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
