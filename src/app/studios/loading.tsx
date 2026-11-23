import StudioCardSkeleton from "@/components/studios/StudioCardSkeleton";

export default function Loading() {
  return (
    <main className="container-page pt-12 pb-[72px] md:pt-24">
      <div className="h-4 w-48 animate-pulse bg-muted" />
      <div className="mt-7 h-16 w-full max-w-xl animate-pulse bg-muted md:h-20" />
      <div className="mt-14 grid gap-x-7 gap-y-11 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <StudioCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
