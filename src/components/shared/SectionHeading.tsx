type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  action?: React.ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mb-9 grid items-end gap-[22px] md:mb-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
      <div className="flex max-w-[820px] flex-col gap-[22px]">
        <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
          {eyebrow}
        </span>
        <h2 className="text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl [&_em]:text-terracotta">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
