"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Inbox, Info, Loader2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import StatusBadge from "@/components/bookings/StatusBadge";
import { UserAvatar } from "@/components/shared/UserMenu";
import { apiFetch } from "@/lib/api";
import { formatBookingDate, formatMoney } from "@/lib/booking-format";
import type { Booking, BookingStatus } from "@/types/booking";

type BookingRequestsProps = {
  requests: Booking[];
  onUpdated: (id: string, status: BookingStatus) => void;
};

const buttonStyle =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-[2px] border px-3 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors disabled:opacity-50";

export default function BookingRequests({ requests, onUpdated }: BookingRequestsProps) {
  const [busyId, setBusyId] = useState("");
  const [toDecline, setToDecline] = useState<Booking | null>(null);

  const updateStatus = async (booking: Booking, status: "Confirmed" | "Cancelled") => {
    setBusyId(booking._id);
    try {
      await apiFetch(`/bookings/${booking._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success(
        status === "Confirmed"
          ? `Confirmed — ${booking.userName.split(" ")[0]}'s hours are now locked.`
          : "Request declined."
      );
      onUpdated(booking._id, status);
      setToDecline(null);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusyId("");
    }
  };

  const actions = (booking: Booking) => (
    <div className="flex gap-2 md:justify-end">
      <button
        type="button"
        onClick={() => setToDecline(booking)}
        disabled={busyId === booking._id}
        className={`${buttonStyle} flex-1 border-subtle hover:border-foreground md:flex-none`}
      >
        Decline
      </button>
      <button
        type="button"
        onClick={() => updateStatus(booking, "Confirmed")}
        disabled={busyId === booking._id}
        className={`${buttonStyle} flex-1 border-primary bg-primary text-primary-foreground hover:bg-primary/90 md:flex-none`}
      >
        {busyId === booking._id ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Check className="size-3.5" />
        )}
        Confirm
      </button>
    </div>
  );

  return (
    <section className="mt-5 border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-[22px] sm:px-[26px]">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            As a host
          </span>
          <h2 className="mt-1 font-serif text-2xl leading-[1.15]">Booking requests</h2>
        </div>
        <Link href="/my-listings" className="text-sm font-semibold underline-offset-4 hover:underline">
          Your listings
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-12 text-center">
          <Inbox className="size-7 text-terracotta" strokeWidth={1.5} />
          <h3 className="mt-4 font-serif text-2xl">No requests waiting</h3>
          <p className="mt-2 max-w-[360px] text-sm text-muted-foreground">
            When a creator books one of your studios, the request lands here for you to confirm.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left text-[14.5px]">
              <thead className="border-b border-foreground text-[10.5px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                <tr>
                  <th className="px-[18px] py-4 font-semibold">Creator</th>
                  <th className="px-[18px] py-4 font-semibold">Studio</th>
                  <th className="px-[18px] py-4 font-semibold">When</th>
                  <th className="px-[18px] py-4 font-semibold">Total</th>
                  <th className="px-[18px] py-4 font-semibold">Status</th>
                  <th className="px-[18px] py-4" />
                </tr>
              </thead>
              <tbody>
                {requests.map((booking) => (
                  <tr key={booking._id} className="border-b last:border-b-0 hover:bg-sunken/50">
                    <td className="px-[18px] py-[18px]">
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          user={{ name: booking.userName, email: booking.userEmail, image: booking.userImage }}
                          className="size-9"
                        />
                        <div className="min-w-0">
                          <b className="block font-semibold">{booking.userName}</b>
                          <span className="text-xs text-muted-foreground">
                            {booking.guests} {booking.guests === 1 ? "person" : "people"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-[18px] py-[18px]">{booking.studioTitle}</td>
                    <td className="px-[18px] py-[18px] text-sm whitespace-nowrap tabular-nums">
                      {formatBookingDate(booking.date)}
                      <br />
                      <span className="text-muted-foreground">
                        {booking.startTime}–{booking.endTime} · {booking.hours} hrs
                      </span>
                    </td>
                    <td className="px-[18px] py-[18px] text-sm tabular-nums">{formatMoney(booking.totalPrice)}</td>
                    <td className="px-[18px] py-[18px]">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-[18px] py-[18px]">{actions(booking)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y md:hidden">
            {requests.map((booking) => (
              <div key={booking._id} className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    user={{ name: booking.userName, email: booking.userEmail, image: booking.userImage }}
                    className="size-9"
                  />
                  <div className="min-w-0 flex-1">
                    <b className="block truncate font-semibold">{booking.userName}</b>
                    <span className="block truncate text-xs text-muted-foreground">{booking.studioTitle}</span>
                  </div>
                  <span className="font-serif text-xl tabular-nums">{formatMoney(booking.totalPrice)}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {formatBookingDate(booking.date)} · {booking.startTime}–{booking.endTime} ·{" "}
                  {booking.guests} {booking.guests === 1 ? "person" : "people"}
                </p>
                {booking.note && <p className="mt-2 text-sm italic">“{booking.note}”</p>}
                <div className="mt-4">{actions(booking)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="m-5 flex gap-3 bg-sunken px-[18px] py-4 text-sm leading-[21px] sm:mx-6 sm:mb-6">
        <Info className="mt-px size-[18px] shrink-0 text-terracotta" />
        <span>
          <b className="block font-bold">Confirming locks the hours.</b>
          Studora checks every request against your confirmed bookings, so overlapping hours can
          never be confirmed twice.
        </span>
      </div>

      <AlertDialog open={!!toDecline} onOpenChange={(open) => !open && !busyId && setToDecline(null)}>
        <AlertDialogContent className="gap-0 rounded-[2px] border-border bg-card p-7 sm:max-w-[460px]">
          {toDecline && (
            <>
              <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cancelled uppercase">
                <X className="size-3.5" /> Decline request
              </span>
              <AlertDialogTitle className="mt-3.5 font-serif text-[30px] leading-[1.1] font-normal">
                Decline {toDecline.userName.split(" ")[0]}’s request?
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-3 text-[15px] leading-6">
                {toDecline.studioTitle} · {formatBookingDate(toDecline.date)},{" "}
                {toDecline.startTime}–{toDecline.endTime}. The booking will show as Cancelled for
                the creator.
              </AlertDialogDescription>
              <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                <AlertDialogCancel
                  disabled={!!busyId}
                  className="h-12 rounded-[2px] border-foreground bg-transparent px-6 text-xs font-semibold tracking-[0.14em] uppercase shadow-none dark:bg-transparent"
                >
                  Keep request
                </AlertDialogCancel>
                <button
                  type="button"
                  onClick={() => updateStatus(toDecline, "Cancelled")}
                  disabled={!!busyId}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-cancelled px-6 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60 dark:text-[#171613]"
                >
                  {busyId && <Loader2 className="size-4 animate-spin" />}
                  Decline request
                </button>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
