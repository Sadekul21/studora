import Image from "next/image";

type AuthShellProps = {
  image: string;
  alt: string;
  position?: string;
  headline: React.ReactNode;
  caption: string;
  children: React.ReactNode;
};

export default function AuthShell({
  image,
  alt,
  position = "50% 50%",
  headline,
  caption,
  children,
}: AuthShellProps) {
  return (
    <main className="grid gap-0 p-3 md:p-4 lg:min-h-[920px] lg:grid-cols-2 lg:gap-6 lg:p-6">
      <div className="relative h-[260px] overflow-hidden bg-muted after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(23,22,19,0)_50%,rgba(23,22,19,.7)_100%)] md:h-[360px] lg:order-2 lg:h-auto">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-x-9 bottom-8 z-10 hidden items-end justify-between gap-6 md:flex">
          <h2 className="max-w-[14ch] text-[40px] leading-[1.02] tracking-[-0.02em] text-[#f5f0e8] [&_em]:text-[#e2a27a]">
            {headline}
          </h2>
          <span className="max-w-[200px] text-right text-[11px] font-semibold tracking-[0.18em] text-[#f5f0e8]/85 uppercase">
            {caption}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center px-2 pt-9 pb-14 md:px-6 md:pt-12 md:pb-16 lg:order-1 lg:px-12 lg:py-[72px]">
        <div className="flex w-full max-w-[440px] flex-col gap-[22px]">
          {children}
        </div>
      </div>
    </main>
  );
}
