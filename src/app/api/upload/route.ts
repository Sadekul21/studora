import { headers } from "next/headers";
import { auth, connectDB } from "@/lib/auth";

const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  await connectDB();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ message: "Please log in to upload photos." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return Response.json({ message: "No image was sent." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ message: "Only image files can be uploaded." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return Response.json({ message: "Images must be 10 MB or smaller." }, { status: 400 });
  }

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`, {
    method: "POST",
    body,
  });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    return Response.json(
      { message: data?.error?.message || "The image host didn’t accept this photo." },
      { status: 502 }
    );
  }

  return Response.json({ url: data.data.url });
}
