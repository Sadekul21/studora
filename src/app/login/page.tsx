import { Suspense } from "react";
import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in — Studora",
};

export default function LoginPage() {
  return (
    <AuthShell
      image="/images/host-cyc-studio.jpg"
      alt="A daylight cyc studio with floor-to-ceiling windows"
      position="40% 50%"
      headline={
        <>
          Good light is <em>waiting.</em>
        </>
      }
      caption="Glasshouse Studios · Miami, FL"
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
