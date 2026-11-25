"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StudioForm, { type StudioPayload } from "./StudioForm";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/types/studio";

export default function EditStudioForm({ studio }: { studio: Studio }) {
  const router = useRouter();

  const handleUpdate = async (payload: StudioPayload) => {
    try {
      await apiFetch(`/studios/${studio._id}`, { method: "PUT", body: JSON.stringify(payload) });
      toast.success("Changes saved.");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <StudioForm
      studio={studio}
      submitLabel="Save changes"
      cancelHref="/my-listings"
      onSubmit={handleUpdate}
    />
  );
}
