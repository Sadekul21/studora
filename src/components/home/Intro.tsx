const points = [
  {
    title: "Real rooms, real photos",
    text: "Every listing is photographed as it is — gear lists and house rules included.",
  },
  {
    title: "Prices before you book",
    text: "Hourly rate, deposit and fees on screen. No quotes, no surprises at wrap.",
  },
  {
    title: "Hosts who answer",
    text: "Requests are confirmed by real people, most of them within the hour.",
  },
];

export default function Intro() {
  return (
    <section className="pt-[72px] pb-[72px] md:pt-24 md:pb-24 lg:pt-32">
      <div className="container-page grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9 lg:mt-[18px]">
          About Studora
        </span>

        <div>
          <p className="max-w-[24ch] font-serif text-[30px] leading-[1.2] tracking-[-0.015em] md:text-[44px]">
            A curated marketplace for creative space —{" "}
            <em className="text-terracotta">listed by the people who built it,</em>{" "}
            booked by the hour by the people who fill it.
          </p>

          <div className="mt-10 grid gap-[22px] border-t pt-7 md:mt-16 md:grid-cols-3 md:gap-10">
            {points.map((point, index) => (
              <div
                key={point.title}
                className="grid grid-cols-[36px_1fr] content-start gap-x-2.5 gap-y-1.5"
              >
                <span className="pt-[5px] font-serif text-[15px] leading-none text-terracotta italic">
                  ({String(index + 1).padStart(2, "0")})
                </span>
                <h3 className="font-sans text-xs leading-[18px] font-semibold tracking-[0.16em] uppercase">
                  {point.title}
                </h3>
                <p className="col-start-2 text-[15px] leading-6 text-muted-foreground">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
