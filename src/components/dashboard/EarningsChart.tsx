import { formatMoney } from "@/lib/booking-format";
import type { Booking } from "@/types/booking";

const shortMoney = (amount: number) =>
  amount >= 1000 ? `$${(amount / 1000).toFixed(1)}k` : `$${Math.round(amount)}`;

export const earningsByMonth = (bookings: Booking[], count = 6) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const month = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
    const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
    const total = bookings
      .filter((b) => (b.status === "Confirmed" || b.status === "Completed") && b.date.startsWith(key))
      .reduce((sum, b) => sum + b.totalPrice, 0);
    return { key, label: month.toLocaleDateString("en-US", { month: "short" }), total };
  });
};

export default function EarningsChart({ bookings }: { bookings: Booking[] }) {
  const months = earningsByMonth(bookings);
  const highest = Math.max(...months.map((m) => m.total));
  const sixMonthTotal = months.reduce((sum, m) => sum + m.total, 0);

  return (
    <section className="border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-[22px] sm:px-[26px]">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Earnings
          </span>
          <h2 className="mt-1 font-serif text-2xl leading-[1.15]">Last six months</h2>
        </div>
        <span className="font-serif text-2xl tabular-nums">{formatMoney(sixMonthTotal)}</span>
      </div>

      <div className="px-5 pt-5 pb-[26px] sm:px-[26px]">
        <div className="grid h-[240px] grid-cols-6 items-end gap-3 border-b border-foreground bg-[repeating-linear-gradient(180deg,transparent_0_59px,var(--border)_59px_60px)] pt-8 sm:gap-[22px] md:h-[280px]">
          {months.map((month, index) => {
            const current = index === months.length - 1;
            const height = highest ? Math.max((month.total / highest) * 100, month.total ? 4 : 0) : 0;
            return (
              <div
                key={month.key}
                className={current ? "relative bg-terracotta" : "relative bg-sand dark:bg-sand/35"}
                style={{ height: `${height}%` }}
              >
                <span
                  className={`absolute -top-[26px] left-1/2 -translate-x-1/2 text-[11.5px] font-semibold whitespace-nowrap ${current ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {shortMoney(month.total)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-6 gap-3 text-center sm:gap-[22px]">
          {months.map((month) => (
            <span
              key={month.key}
              className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase"
            >
              {month.label}
            </span>
          ))}
        </div>
        {!highest && (
          <p className="mt-4 text-sm text-muted-foreground">
            Earnings show up here once you confirm your first booking.
          </p>
        )}
      </div>
    </section>
  );
}
