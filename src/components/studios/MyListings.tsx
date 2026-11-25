"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, Eye, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import DeleteStudioDialog from "./DeleteStudioDialog";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

const shortLocation = (location: string) => location.split(",").slice(-2).join(",").trim();

export default function MyListings() {
  const [studios, setStudios] = useState<Studio[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [toDelete, setToDelete] = useState<Studio | null>(null);

  useEffect(() => {
    apiFetch<Studio[]>("/my-studios")
      .then(setStudios)
      .catch((err: Error) => setError(err.message));
  }, []);

  const visible = (studios ?? []).filter((studio) =>
    `${studio.title} ${studio.location} ${studio.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
            Host tools
          </span>
          <h1 className="mt-4 text-[44px] leading-[1.02] tracking-[-0.02em] md:text-6xl">
            My studio <em className="text-terracotta">listings.</em>
          </h1>
          <p className="mt-3 text-muted-foreground">
            {studios
              ? `${studios.length} ${studios.length === 1 ? "listing" : "listings"} · live on Explore`
              : "Loading your listings…"}
          </p>
        </div>
        <Link
          href="/add-studio"
          className="inline-flex h-[52px] items-center gap-2.5 rounded-[2px] bg-primary px-6 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" /> Add new studio
        </Link>
      </div>

      {error ? (
        <div className="border bg-card px-8 py-12 text-center">
          <h4 className="mb-3 font-serif text-[28px]">Listings couldn’t load</h4>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : studios === null ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex animate-pulse items-center gap-4 border p-4">
              <div className="h-[60px] w-20 bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 bg-muted" />
                <div className="h-3 w-1/4 bg-muted" />
              </div>
              <div className="h-10 w-48 bg-muted" />
            </div>
          ))}
        </div>
      ) : studios.length === 0 ? (
        <div className="flex flex-col items-center border bg-card px-8 py-14 text-center">
          <span className="grid size-14 place-items-center rounded-full border border-subtle">
            <Building2 className="size-6 text-terracotta" strokeWidth={1.5} />
          </span>
          <h4 className="mt-[22px] mb-3 font-serif text-[30px] leading-[1.1]">No listings yet</h4>
          <p className="mb-[26px] max-w-[380px] text-[15px] leading-6 text-muted-foreground">
            List your first room — it takes about five minutes and it’s free.
          </p>
          <Link
            href="/add-studio"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-[2px] bg-primary px-[26px] text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase"
          >
            <Plus className="size-4" /> Add new studio
          </Link>
        </div>
      ) : (
        <>
          <div className="relative mb-5 max-w-sm">
            <Search className="pointer-events-none absolute top-3 left-3.5 size-[18px] text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your listings"
              aria-label="Search your listings"
              className="h-[42px] w-full rounded-[2px] border border-subtle bg-card pr-3 pl-10 text-sm outline-none focus:border-foreground"
            />
          </div>

          <div className="hidden overflow-x-auto border xl:block">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b bg-sunken text-[10.5px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3.5 font-semibold">Studio</th>
                  <th className="px-4 py-3.5 font-semibold">Rate</th>
                  <th className="px-4 py-3.5 font-semibold">Capacity</th>
                  <th className="px-4 py-3.5 font-semibold">Rating</th>
                  <th className="px-4 py-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((studio) => (
                  <tr key={studio._id} className="border-b last:border-b-0">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative h-[54px] w-[72px] shrink-0 overflow-hidden bg-sunken">
                          <Image src={studio.image} alt="" fill sizes="72px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/studios/${studio._id}`}
                            className="block font-serif text-lg leading-6 hover:underline"
                          >
                            {studio.title}
                          </Link>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {studio.category} · {shortLocation(studio.location)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap tabular-nums">${studio.hourlyRate}/hr</td>
                    <td className="px-4 py-4 tabular-nums">{studio.maxCapacity}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 font-semibold">
                        <Star className="size-[13px] fill-terracotta text-terracotta" />
                        {studio.rating > 0 ? studio.rating.toFixed(2) : "New"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <ListingActions studio={studio} onDelete={() => setToDelete(studio)} compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:hidden">
            {visible.map((studio) => (
              <div key={studio._id} className="border bg-card p-4">
                <div className="flex gap-3.5">
                  <div className="relative h-[72px] w-24 shrink-0 overflow-hidden bg-sunken">
                    <Image src={studio.image} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <Link href={`/studios/${studio._id}`} className="block font-serif text-xl leading-6">
                      {studio.title}
                    </Link>
                    <span className="mt-1.5 block text-xs text-muted-foreground">
                      {shortLocation(studio.location)} · ${studio.hourlyRate}/hr · Up to {studio.maxCapacity}
                    </span>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <ListingActions studio={studio} onDelete={() => setToDelete(studio)} />
                </div>
              </div>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="border-t pt-6 text-muted-foreground">No listings match “{query}”.</p>
          )}
        </>
      )}

      <DeleteStudioDialog
        studio={toDelete}
        onClose={() => setToDelete(null)}
        onDeleted={(id) => setStudios((prev) => prev?.filter((studio) => studio._id !== id) ?? null)}
      />
    </>
  );
}

function ListingActions({
  studio,
  onDelete,
  compact,
}: {
  studio: Studio;
  onDelete: () => void;
  compact?: boolean;
}) {
  const base =
    "inline-flex h-9 items-center gap-1.5 rounded-[2px] border px-3 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors";

  return (
    <div className={cn("flex justify-end gap-2", compact ? "flex-nowrap" : "flex-wrap")}>
      <Link
        href={`/studios/${studio._id}`}
        aria-label={`View ${studio.title}`}
        className={cn(base, "border-subtle hover:border-foreground", compact && "w-9 justify-center px-0")}
      >
        <Eye className="size-3.5" /> {!compact && "View"}
      </Link>
      <Link
        href={`/studios/edit/${studio._id}`}
        className={`${base} border-foreground hover:bg-foreground hover:text-background`}
      >
        <Pencil className="size-3.5" /> Update
      </Link>
      <button
        type="button"
        onClick={onDelete}
        aria-label={`Delete ${studio.title}`}
        className={`${base} border-cancelled text-cancelled hover:bg-cancelled hover:text-white dark:hover:text-[#171613]`}
      >
        <Trash2 className="size-3.5" /> Delete
      </button>
    </div>
  );
}
