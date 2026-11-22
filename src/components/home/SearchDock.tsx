"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";

const fieldStyle =
  "relative flex min-w-0 flex-col gap-1.5 border-b px-7 py-[26px] lg:border-r lg:border-b-0";
const labelStyle =
  "text-[10.5px] font-semibold tracking-[0.2em] text-muted-foreground uppercase";
const inputStyle =
  "w-full appearance-none bg-transparent text-base font-medium outline-none placeholder:text-subtle";

export default function SearchDock() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("4");
  const [dateFocused, setDateFocused] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location.trim()) params.set("location", location.trim());
    if (date) params.set("date", date);
    if (hours) params.set("hours", hours);
    router.push(`/studios?${params.toString()}`);
  };

  return (
    <div className="relative z-10 bg-background pt-5 md:border-b md:pt-0">
      <div className="container-page">
        <form
          role="search"
          onSubmit={handleSearch}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_1fr_.8fr_auto] xl:grid-cols-[auto_1.1fr_1.2fr_1fr_.8fr_auto]"
        >
          <div className="hidden flex-col justify-center border-r pr-10 xl:flex">
            <b className="font-serif text-[26px] leading-[1.1] font-normal">
              Find a studio
            </b>
            <span className="text-[13px] text-muted-foreground">
              Book any room by the hour
            </span>
          </div>

          <div className={cn(fieldStyle, "border-r")}>
            <label htmlFor="q-cat" className={labelStyle}>
              Studio type
            </label>
            <select
              id="q-cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={cn(inputStyle, "cursor-pointer pr-6")}
            >
              <option value="">Any category</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-[22px] bottom-[30px] size-4 text-muted-foreground" />
          </div>

          <div className={fieldStyle}>
            <label htmlFor="q-where" className={labelStyle}>
              Where
            </label>
            <input
              id="q-where"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or neighborhood"
              className={inputStyle}
            />
          </div>

          <div className={cn(fieldStyle, "border-r")}>
            <label htmlFor="q-when" className={labelStyle}>
              When
            </label>
            <input
              id="q-when"
              type={dateFocused || date ? "date" : "text"}
              value={date}
              onFocus={() => setDateFocused(true)}
              onBlur={() => setDateFocused(false)}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Add a date"
              className={inputStyle}
            />
          </div>

          <div className={cn(fieldStyle, "lg:border-r-0")}>
            <label htmlFor="q-hrs" className={labelStyle}>
              Hours
            </label>
            <select
              id="q-hrs"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className={cn(inputStyle, "cursor-pointer pr-6")}
            >
              <option value="2">2 hours</option>
              <option value="4">4 hours</option>
              <option value="8">Full day</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-[22px] bottom-[30px] size-4 text-muted-foreground" />
          </div>

          <button
            type="submit"
            className="col-span-2 my-4 inline-flex h-[54px] items-center justify-center gap-3 rounded-[2px] bg-primary px-[34px] text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 lg:col-span-1 lg:ml-7 lg:h-auto"
          >
            <Search className="size-[17px]" />
            Search
          </button>
        </form>

        <Link
          href="/studios"
          className="flex items-center gap-3.5 border border-subtle bg-card py-3 pr-3 pl-4 md:hidden"
        >
          <Search className="size-[18px] text-terracotta" />
          <span className="flex min-w-0 flex-1 flex-col">
            <b className="font-serif text-xl leading-6 font-normal">
              Find a studio
            </b>
            <span className="text-[12.5px] leading-[18px] text-muted-foreground">
              Any category · Anywhere · Any date
            </span>
          </span>
          <span className="grid size-10 place-items-center rounded-[2px] border border-subtle">
            <SlidersHorizontal className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
