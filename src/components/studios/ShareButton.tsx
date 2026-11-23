"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Couldn’t copy the link.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-[2px] border border-foreground px-4 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background"
    >
      <Share2 className="size-4" /> Share
    </button>
  );
}
