import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ChevronRight, Eye, Lock } from "lucide-react";
import EditStudioForm from "@/components/studios/EditStudioForm";
import { auth, connectDB } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/types/studio";

export const metadata: Metadata = {
  title: "Update listing — Studora",
};

async function getStudio(id: string) {
  try {
    return await apiFetch<Studio>(`/studios/${id}`, { cache: "no-store" });
  } catch {
    return null;
  }
}

export default async function EditStudioPage({ params }: PageProps<"/studios/edit/[id]">) {
  const { id } = await params;
   await connectDB();
  const [studio, session] = await Promise.all([
    getStudio(id),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!studio) notFound();

  if (studio.ownerEmail !== session?.user.email) {
    return (
      <div className="flex flex-col items-center border bg-card px-8 py-14 text-center">
        <span className="grid size-14 place-items-center rounded-full border border-subtle">
          <Lock className="size-6 text-terracotta" strokeWidth={1.5} />
        </span>
        <h1 className="mt-[22px] mb-3 font-serif text-[30px] leading-[1.1]">
          This isn’t your listing
        </h1>
        <p className="mb-[26px] max-w-[380px] text-[15px] leading-6 text-muted-foreground">
          Only the host who listed “{studio.title}” can update it.
        </p>
        <Link
          href="/my-listings"
          className="inline-flex h-[52px] items-center rounded-[2px] border border-foreground px-[26px] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-foreground hover:text-background"
        >
          Back to my listings
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            <Link href="/my-listings" className="hover:text-foreground">
              My studio listings
            </Link>
            <ChevronRight className="size-3.5" />
            <b className="font-semibold text-foreground">Update</b>
          </nav>
          <h1 className="mt-4 text-[44px] leading-[1.02] tracking-[-0.02em] md:text-6xl">
            Update <em className="text-terracotta">{studio.title.split(" ")[0]}.</em>
          </h1>
          <p className="mt-3 text-muted-foreground">Changes go live on Explore as soon as you save.</p>
        </div>
        <Link
          href={`/studios/${studio._id}`}
          className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-foreground px-5 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-foreground hover:text-background"
        >
          <Eye className="size-4" /> View listing
        </Link>
      </div>
      <EditStudioForm studio={studio} />
    </>
  );
}
