"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle, ArrowRight, Check, Eye, EyeOff, Link2, X } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GoogleButton from "./GoogleButton";
import { inputStyle, labelStyle } from "./formStyles";
import { cn } from "@/lib/utils";

type Errors = {
  name?: string;
  email?: string;
  photo?: string;
  password?: string;
};

const passwordRules = [
  { label: "One uppercase letter (A–Z)", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One lowercase letter (a–z)", test: (value: string) => /[a-z]/.test(value) },
  { label: "At least 6 characters", test: (value: string) => value.length >= 6 },
];

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: Errors = {};

    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email address.";
    if (!isValidUrl(photo)) next.photo = "Paste a valid image link (https://…).";

    const failedRule = passwordRules.find((rule) => !rule.test(password));
    if (failedRule) {
      if (!/[A-Z]/.test(password)) next.password = "Add at least one uppercase letter.";
      else if (!/[a-z]/.test(password)) next.password = "Add at least one lowercase letter.";
      else next.password = "Password must be at least 6 characters.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      image: photo.trim(),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not create your account.");
      return;
    }

    toast.success("Account created. Please log in to continue.");
    router.push("/login");
  };

  return (
    <>
      <div>
        <span className="inline-flex items-center gap-3.5 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:w-[22px] before:bg-terracotta md:before:w-9">
          Create your account
        </span>
        <h1 className="mt-5 mb-2 text-[38px] leading-[1.02] tracking-[-0.02em] md:text-5xl lg:text-6xl">
          Join <em className="text-terracotta">Studora.</em>
        </h1>
        <p className="text-muted-foreground">
          Free to join. Book your first room in minutes.
        </p>
      </div>

      <GoogleButton label="Sign up with Google" />

      <div className="flex items-center gap-4 text-[10.5px] font-semibold tracking-[0.2em] text-muted-foreground uppercase before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        or with email
      </div>

      <form onSubmit={handleRegister} noValidate className="flex flex-col gap-[22px]">
        <div className="flex flex-col gap-[9px]">
          <Label htmlFor="rg-name" className={labelStyle}>
            Full name
          </Label>
          <Input
            id="rg-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={inputStyle}
          />
          {errors.name && <FieldError message={errors.name} />}
        </div>

        <div className="flex flex-col gap-[9px]">
          <Label htmlFor="rg-email" className={labelStyle}>
            Email
          </Label>
          <Input
            id="rg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={inputStyle}
          />
          {errors.email && <FieldError message={errors.email} />}
        </div>

        <div className="flex flex-col gap-[9px]">
          <Label htmlFor="rg-photo" className={cn(labelStyle, "justify-between")}>
            Photo URL
            <span className="text-[11px] font-medium tracking-normal normal-case">
              Shown on your profile
            </span>
          </Label>
          <div className="flex items-center gap-3">
            <Avatar className="size-[42px] bg-[#25231f] text-[#f5f0e8] dark:bg-[#e6ded2] dark:text-[#171613]">
              {isValidUrl(photo) && <AvatarImage src={photo} alt="" className="object-cover" />}
              <AvatarFallback className="bg-transparent font-serif text-[15px] tracking-[0.04em]">
                {getInitials(name) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="relative flex-1">
              <Link2 className="pointer-events-none absolute top-4 left-4 size-[19px] text-muted-foreground" />
              <Input
                id="rg-photo"
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="https://i.ibb.co/your-photo.jpg"
                aria-invalid={!!errors.photo}
                className={cn(inputStyle, "pl-[46px]")}
              />
            </div>
          </div>
          {errors.photo && <FieldError message={errors.photo} />}
        </div>

        <div className="flex flex-col gap-[9px]">
          <Label htmlFor="rg-pw" className={labelStyle}>
            Password
          </Label>
          <div className="relative">
            <Input
              id="rg-pw"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className={cn(inputStyle, "pr-[46px]")}
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
          {errors.password && <FieldError message={errors.password} />}
          <ul className="grid gap-[7px] text-[13px] leading-[18px]">
            {passwordRules.map((rule) => {
              const passed = rule.test(password);
              return (
                <li
                  key={rule.label}
                  className={cn(
                    "flex items-center gap-[9px]",
                    !password
                      ? "text-muted-foreground"
                      : passed
                        ? "text-confirmed"
                        : "text-cancelled"
                  )}
                >
                  {password && !passed ? (
                    <X className="size-4" strokeWidth={1.6} />
                  ) : (
                    <Check className="size-4" strokeWidth={1.6} />
                  )}
                  {rule.label}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-[2px] bg-primary text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
          {!loading && <ArrowRight className="size-[17px]" />}
        </button>
      </form>

      <p className="text-center text-[13px] leading-5 text-muted-foreground">
        By creating an account you agree to the Terms of service and Privacy policy.
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline decoration-1 underline-offset-[5px]"
        >
          Log in
        </Link>
      </p>
    </>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-[7px] text-[13px] leading-[19px] font-semibold text-cancelled">
      <AlertCircle className="size-4" />
      {message}
    </p>
  );
}
