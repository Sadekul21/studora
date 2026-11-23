export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Upload failed. Please try again.");
  }

  return data.url as string;
}
