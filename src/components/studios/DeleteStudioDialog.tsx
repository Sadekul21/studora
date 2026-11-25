"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/types/studio";

type DeleteStudioDialogProps = {
  studio: Studio | null;
  onClose: () => void;
  onDeleted: (id: string) => void;
};

export default function DeleteStudioDialog({ studio, onClose, onDeleted }: DeleteStudioDialogProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!studio) return;
    setDeleting(true);
    try {
      await apiFetch(`/studios/${studio._id}`, { method: "DELETE" });
      toast.success(`“${studio.title}” was deleted.`);
      onDeleted(studio._id);
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={!!studio} onOpenChange={(open) => !open && !deleting && onClose()}>
      <AlertDialogContent className="gap-0 rounded-[2px] border-border bg-card p-7 sm:max-w-[460px]">
        {studio && (
          <>
            <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-cancelled uppercase">
              <Trash2 className="size-3.5" /> Delete listing
            </span>
            <AlertDialogTitle className="mt-3.5 font-serif text-[30px] leading-[1.1] font-normal">
              Delete “{studio.title}”?
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-3 text-[15px] leading-6">
              This removes the listing from Explore for good. Creators won’t be able to
              find or book it anymore.
            </AlertDialogDescription>

            <div className="mt-5 flex items-center gap-3.5 border bg-background p-3">
              <div className="relative h-12 w-16 shrink-0 overflow-hidden">
                <Image src={studio.image} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <b className="block truncate text-sm font-semibold">{studio.title}</b>
                <span className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {studio.location.split(",").slice(-2).join(",").trim()} · ${studio.hourlyRate}/hr
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <AlertDialogCancel
                disabled={deleting}
                className="h-12 rounded-[2px] border-foreground bg-transparent px-6 text-xs font-semibold tracking-[0.14em] uppercase shadow-none dark:bg-transparent"
              >
                Keep listing
              </AlertDialogCancel>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-cancelled px-6 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60 dark:text-[#171613]"
              >
                {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                {deleting ? "Deleting…" : "Delete listing"}
              </button>
            </div>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
