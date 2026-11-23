import type { Metadata } from "next";
import AddStudioForm from "@/components/studios/AddStudioForm";

export const metadata: Metadata = {
  title: "Add a new studio — Studora",
};

export default function AddStudioPage() {
  return (
    <>
      <div className="mb-11">
        <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
          New listing
        </span>
        <h1 className="mt-4 text-[44px] leading-[1.02] tracking-[-0.02em] md:text-6xl">
          Add a new <em className="text-terracotta">studio.</em>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Six short sections. Your listing goes live on Explore as soon as you publish.
        </p>
      </div>
      <AddStudioForm />
    </>
  );
}
