"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type Filters = {
  search: string;
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  capacity: string;
  sort: string;
};

const capacityOptions = [
  { label: "Any", value: "" },
  { label: "5+", value: "5" },
  { label: "10+", value: "10" },
  { label: "20+", value: "20" },
  { label: "30+", value: "30" },
];

const groupTitle =
  "text-[11px] font-semibold tracking-[0.18em] uppercase";
const fieldStyle =
  "h-[42px] w-full rounded-[2px] border border-subtle bg-card text-sm font-medium outline-none placeholder:font-normal placeholder:text-subtle focus:border-foreground";

type FilterPanelProps = {
  filters: Filters;
  onApply: (changes: Partial<Filters>) => void;
  onClear: () => void;
};

export default function FilterPanel({ filters, onApply, onClear }: FilterPanelProps) {
  const [location, setLocation] = useState(filters.location);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onApply({ location: location.trim(), minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between border-b border-foreground pb-[18px]">
        <span className={cn(groupTitle, "flex items-center gap-2")}>
          <SlidersHorizontal className="size-4" /> Filters
        </span>
        <button
          type="button"
          onClick={onClear}
          className="text-[13px] font-semibold text-primary underline underline-offset-4"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-3.5 border-b py-6">
        <h4 className={groupTitle}>Price per hour</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute top-[11px] left-3 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              aria-label="Minimum price"
              className={cn(fieldStyle, "pl-7 tabular-nums")}
            />
          </div>
          <div className="relative">
            <span className="absolute top-[11px] left-3 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              aria-label="Maximum price"
              className={cn(fieldStyle, "pl-7 tabular-nums")}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 border-b py-6">
        <h4 className={groupTitle}>Capacity</h4>
        <div className="flex flex-wrap gap-2">
          {capacityOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => onApply({ capacity: option.value })}
              className={cn(
                "h-[34px] rounded-full border px-[13px] text-[13px] font-medium transition-colors",
                filters.capacity === option.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground"
              )}
            >
              {option.label === "Any" ? "Any size" : `${option.label} people`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3.5 py-6">
        <h4 className={groupTitle}>Location</h4>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or neighborhood"
          aria-label="Location"
          className={cn(fieldStyle, "px-3")}
        />
      </div>

      <button
        type="submit"
        className="h-[52px] w-full rounded-[2px] bg-primary text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
      >
        Apply filters
      </button>
    </form>
  );
}
