"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StudioForm, { type StudioPayload } from "./StudioForm";
import { ApiError, apiFetch } from "@/lib/api";

export default function AddStudioForm() {
  const router = useRouter();

  const handleCreate = async (payload: StudioPayload) => {
    try {
      await apiFetch("/studios", { method: "POST", body: JSON.stringify(payload) });
      toast.success("Your studio is live on Explore.");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        toast.error("Your session expired. Please log in again.");
        router.push("/login?redirect=/add-studio");
        return;
      }
      toast.error((error as Error).message);
    }
  };

  return <StudioForm submitLabel="Publish listing" cancelHref="/dashboard" onSubmit={handleCreate} />;
}
