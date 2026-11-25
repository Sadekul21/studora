import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/booking";

const styles: Record<BookingStatus, string> = {
  Pending: "bg-pending-bg text-pending",
  Confirmed: "bg-confirmed-bg text-confirmed",
  Completed: "bg-completed-bg text-completed",
  Cancelled: "bg-cancelled-bg text-cancelled",
};

export default function StatusBadge({
  status,
  className,
}: {
  status: BookingStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[26px] items-center gap-[7px] px-2.5 text-[10.5px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase",
        styles[status],
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
