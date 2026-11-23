"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Camera,
  ChevronDown,
  Clapperboard,
  Layers,
  LayoutGrid,
  Mic,
  Music,
  Palette,
  Search,
  SearchX,
  Shirt,
  SlidersHorizontal,
  Sofa,
  X,
} from "lucide-react";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import FilterPanel, { type Filters } from "./FilterPanel";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

const categoryTabs = [
  { label: "All studios", value: "", icon: LayoutGrid },
  { label: "Photo", value: "Photo studio", icon: Camera },
  { label: "Film stages", value: "Film stage", icon: Clapperboard },
  { label: "Podcast", value: "Podcast room", icon: Mic },
  { label: "Music", value: "Music suite", icon: Music },
  { label: "Art", value: "Art workshop", icon: Palette },
  { label: "Lofts", value: "Creative loft", icon: Sofa },
  { label: "Green screen", value: "Green screen", icon: Layers },
  { label: "Fashion", value: "Fashion studio", icon: Shirt },
];

const sortOptions = [
  { label: "Newest", value: "" },
  { label: "Top rated", value: "rating" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
];

type ExploreViewProps = {
  studios: Studio[] | null;
  filters: Filters;
};

export default function ExploreView({ studios, filters }: ExploreViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(filters.search);
  const [sheetOpen, setSheetOpen] = useState(false);

  const updateFilters = (changes: Partial<Filters>) => {
    const next = { ...filters, ...changes };
    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSheetOpen(false);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const clearFilters = () => {
    setSheetOpen(false);
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const activeChips = [
    filters.search && { label: `“${filters.search}”`, clear: { search: "" } },
    filters.category && { label: filters.category, clear: { category: "" } },
    filters.location && { label: filters.location, clear: { location: "" } },
    (filters.minPrice || filters.maxPrice) && {
      label: `$${filters.minPrice || 0} – ${filters.maxPrice ? `$${filters.maxPrice}` : "any"}`,
      clear: { minPrice: "", maxPrice: "" },
    },
    filters.capacity && { label: `${filters.capacity}+ people`, clear: { capacity: "" } },
  ].filter(Boolean) as { label: string; clear: Partial<Filters> }[];

  const filterPanel = (
    <FilterPanel filters={filters} onApply={updateFilters} onClear={clearFilters} />
  );

  return (
    <main>
      <section className="pt-12 pb-8 md:pt-24 md:pb-14">
        <div className="container-page grid items-end gap-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[72px]">
          <div>
            <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
              Explore studios
              {studios && ` · ${studios.length} ${studios.length === 1 ? "space" : "spaces"}`}
            </span>
            <h1 className="mt-[26px] max-w-[15ch] text-5xl leading-[0.98] tracking-[-0.025em] md:text-7xl xl:text-[84px]">
              Every room, one <em className="text-terracotta">search.</em>
            </h1>
          </div>

          <div>
            <p className="max-w-[56ch] text-lg leading-[30px] text-muted-foreground">
              Browse photo cycs, stages, podcast lounges, music suites and
              workshops. Filter by price, capacity and city — every price is per
              hour.
            </p>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                updateFilters({ search: search.trim() });
              }}
              className="mt-[30px] flex max-w-[760px] border-b border-foreground"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-[21px] left-0 size-[19px] text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by studio name, city or category"
                  aria-label="Search studios"
                  className="h-[60px] w-full bg-transparent pl-[34px] text-lg outline-none placeholder:text-subtle"
                />
              </div>
              <button
                type="submit"
                className="flex h-[60px] items-center gap-2.5 pl-5 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:text-primary"
              >
                <Search className="size-[17px]" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="container-page">
        <nav
          aria-label="Categories"
          className="flex gap-[26px] overflow-x-auto border-y [scrollbar-width:none] md:gap-10"
        >
          {categoryTabs.map((tab) => {
            const active = filters.category === tab.value;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => updateFilters({ category: tab.value })}
                className={cn(
                  "-mb-px flex shrink-0 items-center gap-2.5 border-b px-0.5 pt-5 pb-[18px] text-[11.5px] font-semibold tracking-[0.15em] whitespace-nowrap uppercase transition-colors",
                  active
                    ? "border-terracotta text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon
                  className={cn("size-[19px]", active && "text-terracotta")}
                  strokeWidth={1.5}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="container-page grid grid-cols-1 gap-7 pt-12 pb-[72px] lg:grid-cols-[264px_minmax(0,1fr)] lg:gap-16 lg:pb-32">
        <aside aria-label="Filters" className="hidden self-start lg:sticky lg:top-[110px] lg:block">
          {filterPanel}
        </aside>

        <div className="min-w-0">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5 md:flex-1">
              <b className="mr-2 font-serif text-[26px] font-normal">
                {studios ? `${studios.length} ${studios.length === 1 ? "studio" : "studios"}` : "Studios"}
              </b>
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => updateFilters(chip.clear)}
                  className="inline-flex h-[34px] items-center gap-2 rounded-full border px-[13px] text-[13px] font-medium hover:border-foreground"
                >
                  {chip.label} <X className="size-3.5" />
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
            </div>

            <div className="flex w-full shrink-0 items-center gap-2.5 md:w-auto">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-[2px] border border-foreground px-4 text-[11px] font-semibold tracking-[0.14em] uppercase lg:hidden"
                  >
                    <SlidersHorizontal className="size-4" />
                    Filters{activeChips.length > 0 && ` · ${activeChips.length}`}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full overflow-y-auto p-6 pt-14 sm:max-w-sm">
                  <SheetTitle className="sr-only">Filters</SheetTitle>
                  {filterPanel}
                </SheetContent>
              </Sheet>

              <div className="relative min-w-0 flex-1 md:flex-none">
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  aria-label="Sort studios"
                  className="h-[42px] w-full cursor-pointer appearance-none truncate rounded-[2px] border border-subtle bg-transparent pr-10 pl-3.5 text-[13.5px] outline-none focus:border-foreground"
                >
                  {sortOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      Sort: {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-3 right-3 size-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {isPending ? (
            <div className="grid gap-x-7 gap-y-11 md:grid-cols-2 md:gap-y-14 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <StudioCardSkeleton key={index} />
              ))}
            </div>
          ) : studios === null ? (
            <div className="flex flex-col items-center border bg-card px-8 py-14 text-center">
              <h4 className="mb-3 font-serif text-[30px] leading-[1.1]">Studios couldn’t load</h4>
              <p className="max-w-[380px] text-[15px] leading-6 text-muted-foreground">
                The studio list isn’t reachable right now. Please refresh the page in a moment.
              </p>
            </div>
          ) : studios.length === 0 ? (
            <div className="flex flex-col items-center border bg-card px-8 py-14 text-center">
              <span className="grid size-14 place-items-center rounded-full border border-subtle">
                <SearchX className="size-6 text-terracotta" strokeWidth={1.5} />
              </span>
              <h4 className="mt-[22px] mb-3 font-serif text-[30px] leading-[1.1]">No studios match</h4>
              <p className="mb-[26px] max-w-[380px] text-[15px] leading-6 text-muted-foreground">
                Try another city, a wider price range or a different category.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="h-[52px] rounded-[2px] border border-foreground px-[26px] text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-foreground hover:text-background"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-x-7 gap-y-11 md:grid-cols-2 md:gap-y-14 xl:grid-cols-3">
              {studios.map((studio) => (
                <StudioCard key={studio._id} studio={studio} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
