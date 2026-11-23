"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function JwtSync() {
  const { data: session } = useSession();
  const sessionId = session?.session.id;

  useEffect(() => {
    if (!sessionId) return;
    apiFetch("/jwt", { method: "POST" }).catch(() => {});
  }, [sessionId]);

  return null;
}
