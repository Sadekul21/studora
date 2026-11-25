"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiFetch } from "@/lib/api";
import { formatBookingDate, formatMoney, shortLocation } from "@/lib/booking-format";
import type { Booking } from "@/types/booking";

type CancelBookingDialogProps = {
  booking: Booking | null;
  onClose: () => void;
  onCancelled: (id: string) => void;
};

export default function CancelBookingDialog({ booking, onClose, onCancelled }: CancelBookingDialogProps) {
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    try {
      await apiFetch(`/bookings/${booking._id}/cancel`, { method: "PATCH" });
      toast.success("Booking cancelled. Nothing was charged.");
      onCancelled(booking._id);
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <AlertDialog open={!!booking} onOpenChange={(open) => !open && !cancelling && onClose()}>
      <AlertDialogContent className="gap-0 rounded-[2px] border-border bg-card p-7 sm:max-w-[480px]">
        {booking && (
          <>
            <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cancelled uppercase">
              <X className="size-3.5" /> Cancel booking
            </span>
            <AlertDialogTitle className="mt-3.5 font-serif text-[30px] leading-[1.1] font-normal">
              Cancel your {booking.studioTitle} booking?
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-3 text-[15px] leading-6">
              {formatBookingDate(booking.date)}, {booking.startTime}–{booking.endTime}. It’s still
              Pending, so nothing has been charged and {booking.hostName.split(" ")[0]} won’t hold
              these hours for you anymore.
            </AlertDialogDescription>

            <div className="mt-5 flex items-center gap-3.5 border bg-background p-3">
              <div className="relative h-[51px] w-[68px] shrink-0 overflow-hidden bg-sunken">
                <Image src={booking.studioImage} alt="" fill sizes="68px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <b className="block truncate text-sm font-semibold">{booking.studioTitle}</b>
                <span className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {shortLocation(booking.studioLocation)} · {booking.hours} {booking.hours === 1 ? "hr" : "hrs"} ·{" "}
                  {formatMoney(booking.totalPrice)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <AlertDialogCancel
                disabled={cancelling}
                className="h-12 rounded-[2px] border-foreground bg-transparent px-6 text-xs font-semibold tracking-[0.14em] uppercase shadow-none dark:bg-transparent"
              >
                Keep booking
              </AlertDialogCancel>
              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-cancelled px-6 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60 dark:text-[#171613]"
              >
                {cancelling && <Loader2 className="size-4 animate-spin" />}
                {cancelling ? "Cancelling…" : "Cancel booking"}
              </button>
            </div>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
