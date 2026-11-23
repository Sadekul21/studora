export default function Loading() {
  return (
    <main className="container-page animate-pulse pt-10 pb-24">
      <div className="h-3 w-64 bg-muted" />
      <div className="mt-6 h-14 w-full max-w-2xl bg-muted md:h-20" />
      <div className="mt-5 h-4 w-80 max-w-full bg-muted" />
      <div className="mt-9 aspect-[4/3] bg-muted md:aspect-[16/8]" />
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-4">
          <div className="h-8 w-56 bg-muted" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-5/6 bg-muted" />
          <div className="h-4 w-2/3 bg-muted" />
        </div>
        <div className="h-80 bg-muted" />
      </div>
    </main>
  );
}
