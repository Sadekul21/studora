import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account — Studora",
};

export default function RegisterPage() {
  return (
    <AuthShell
      image="/images/fashion-studio.jpg"
      alt="A fashion studio with a ring light, rails and a white backdrop"
      headline={
        <>
          Book rooms. Host rooms. <em>Make things.</em>
        </>
      }
      caption="Ringlight Fashion Studio · New York"
    >
      <RegisterForm />
    </AuthShell>
  );
}
