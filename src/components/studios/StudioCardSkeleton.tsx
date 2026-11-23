export default function StudioCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col">
      <div className="aspect-[4/3] bg-muted" />
      <div className="flex flex-col gap-3 pt-5">
        <div className="flex justify-between">
          <span className="h-3 w-32 bg-muted" />
          <span className="h-3 w-14 bg-muted" />
        </div>
        <span className="h-7 w-3/4 bg-muted" />
        <span className="h-7 w-1/2 bg-muted" />
        <div className="mt-2 flex justify-between border-t pt-4">
          <span className="h-5 w-20 bg-muted" />
          <span className="h-5 w-24 bg-muted" />
        </div>
      </div>
    </div>
  );
}
