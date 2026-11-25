import { toNextJsHandler } from "better-auth/next-js";
import { auth, connectDB } from "@/lib/auth";

const handler = toNextJsHandler(auth);

export async function GET(request: Request) {
  await connectDB();
  return handler.GET(request);
}

export async function POST(request: Request) {
  await connectDB();
  return handler.POST(request);
}
