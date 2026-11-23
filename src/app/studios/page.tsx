import type { Metadata } from "next";
import ExploreView from "@/components/studios/ExploreView";
import type { Filters } from "@/components/studios/FilterPanel";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/types/studio";

export const metadata: Metadata = {
  title: "Explore studios — Studora",
};

const filterKeys: (keyof Filters)[] = [
  "search",
  "category",
  "location",
  "minPrice",
  "maxPrice",
  "capacity",
  "sort",
];

async function getStudios(query: string) {
  try {
    return await apiFetch<Studio[]>(`/studios?${query}`, { cache: "no-store" });
  } catch {
    return null;
  }
}

export default async function StudiosPage({ searchParams }: PageProps<"/studios">) {
  const params = await searchParams;

  const filters = {} as Filters;
  const query = new URLSearchParams();
  filterKeys.forEach((key) => {
    const value = params[key];
    filters[key] = typeof value === "string" ? value : "";
    if (filters[key]) query.set(key, filters[key]);
  });

  const studios = await getStudios(query.toString());

  return <ExploreView key={query.toString()} studios={studios} filters={filters} />;
}
