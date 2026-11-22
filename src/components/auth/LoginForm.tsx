"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleButton from "./GoogleButton";
import { inputStyle, labelStyle } from "./formStyles";
import { cn } from "@/lib/utils";

const googleErrors: Record<string, string> = {
  account_not_linked:
    "This email is already registered with a password. Log in with your password instead.",
};

const getSafeRedirect = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const errorCode = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!errorCode) return;
    toast.error(googleErrors[errorCode] || "Google sign in failed. Please try again.", {
      id: "login-error",
    });
  }, [errorCode]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({
      email: email.trim(),
      password,
      rememberMe: remember,
    });

    if (error) {
      setLoading(false);
      toast.error(error.message || "Invalid email or password.");
      return;
    }

    toast.success("Welcome back!");
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <>
      <div>
        <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
          Welcome back
        </span>
        <h1 className="mt-5 mb-2 text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
          Log in to <em className="text-terracotta">Studora.</em>
        </h1>
        <p className="text-muted-foreground">
          Pick up where you left off — your bookings and listings are waiting.
        </p>
      </div>

      <GoogleButton label="Continue with Google" callbackURL={redirectTo} />

      <div className="flex items-center gap-4 text-[10.5px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        or with email
      </div>

      <form onSubmit={handleLogin} noValidate className="flex flex-col gap-[22px]">
        <div className="flex flex-col gap-[9px]">
          <Label htmlFor="li-email" className={labelStyle}>
            Email
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-4 left-4 size-[19px] text-muted-foreground" />
            <Input
              id="li-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              autoComplete="email"
              className={cn(inputStyle, "pl-[46px]")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[9px]">
          <div className="flex items-center justify-between">
            <Label htmlFor="li-pw" className={labelStyle}>
              Password
            </Label>
            <button
              type="button"
              onClick={() => toast.info("Password reset is not available yet.")}
              className="text-[13px] font-semibold text-primary underline decoration-1 underline-offset-[5px]"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-4 left-4 size-[19px] text-muted-foreground" />
            <Input
              id="li-pw"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              className={cn(inputStyle, "px-[46px]")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-[19px]" /> : <Eye className="size-[19px]" />}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-[18px] accent-primary"
          />
          Keep me signed in on this device
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-[2px] bg-primary text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log in"}
          {!loading && <ArrowRight className="size-[17px]" />}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New to Studora?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary underline decoration-1 underline-offset-[5px]"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
