"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarCheck,
  ChevronDown,
  LayoutDashboard,
  ListChecks,
  LogOut,
  PlusSquare,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const userLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/add-studio", icon: PlusSquare },
  { label: "My Studio Listings", href: "/my-listings", icon: ListChecks },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarCheck },
];

type SessionUser = {
  name: string;
  email: string;
  image?: string | null;
};

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export function UserAvatar({ user, className }: { user: SessionUser; className?: string }) {
  return (
    <Avatar className={cn("size-9 bg-[#25231f] text-[#f5f0e8]", className)}>
      {user.image && <AvatarImage src={user.image} alt={user.name} className="object-cover" />}
      <AvatarFallback className="bg-transparent font-serif text-[13px] tracking-[0.04em]">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}

export function useLogout() {
  const router = useRouter();

  return async () => {
    await signOut();
    toast.success("You've been logged out.");
    router.push("/");
    router.refresh();
  };
}

export default function UserMenu({
  user,
  overHero,
}: {
  user: SessionUser;
  overHero?: boolean;
}) {
  const logout = useLogout();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-subtle py-[3px] pr-3 pl-[3px] outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40",
          overHero && "border-[#f5f0e8]/45"
        )}
      >
        <UserAvatar user={user} />
        <ChevronDown className="size-[15px]" />
        <span className="sr-only">Open account menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-[2px] border-border bg-card p-0 shadow-[0_18px_40px_-18px_rgba(23,22,19,.35)]"
      >
        <DropdownMenuLabel className="flex items-center gap-3 border-b px-4 py-3.5">
          <UserAvatar user={user} className="size-10" />
          <span className="min-w-0">
            <b className="block truncate font-serif text-lg leading-6 font-normal">
              {user.name}
            </b>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </span>
        </DropdownMenuLabel>

        <div className="p-1.5">
          {userLinks.map((link) => (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="cursor-pointer gap-3 rounded-[2px] px-3 py-2.5 text-sm font-medium"
            >
              <Link href={link.href}>
                <link.icon className="size-[17px]" strokeWidth={1.6} />
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="mx-0 my-0" />

        <div className="p-1.5">
          <DropdownMenuItem
            onSelect={logout}
            variant="destructive"
            className="cursor-pointer gap-3 rounded-[2px] px-3 py-2.5 text-sm font-medium"
          >
            <LogOut className="size-[17px]" strokeWidth={1.6} />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
