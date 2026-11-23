"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { UserAvatar, userLinks } from "@/components/shared/UserMenu";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const isActive = (href: string) =>
    href === "/my-listings"
      ? pathname.startsWith("/my-listings") || pathname.startsWith("/studios/edit")
      : pathname.startsWith(href);

  return (
    <aside className="flex min-w-0 flex-col gap-7 lg:sticky lg:top-[110px] lg:self-start">
      <div className="hidden items-center gap-3.5 border-b pb-6 lg:flex">
        {user ? (
          <>
            <UserAvatar user={user} className="size-12 text-base" />
            <div className="min-w-0">
              <b className="block truncate font-serif text-xl leading-6 font-normal">
                {user.name}
              </b>
              <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
          </>
        ) : (
          <div className="h-12 w-full animate-pulse bg-muted" />
        )}
      </div>

      <nav className="flex gap-[22px] overflow-x-auto border-b [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0">
        {userLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex h-12 shrink-0 items-center gap-3.5 text-[11.5px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-all lg:h-[50px] lg:border-b lg:px-1 lg:hover:pl-2.5",
                active
                  ? "text-foreground shadow-[inset_0_-1px_0_var(--terracotta)] lg:pl-2.5 lg:shadow-none"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <link.icon
                className={cn("size-[18px]", active && "text-terracotta")}
                strokeWidth={1.6}
              />
              {link.label}
              {active && (
                <span className="ml-auto hidden size-1.5 rounded-full bg-terracotta lg:block" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="hidden flex-col gap-2.5 bg-night p-[22px] text-on-night lg:flex">
        <b className="font-serif text-xl font-normal">Need a hand?</b>
        <p className="text-[13px] leading-5 text-on-night-muted">
          Host and creator support is online around the clock.
        </p>
        <a
          href="mailto:support@studora.com"
          className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-night-accent uppercase"
        >
          Contact support <ArrowRight className="size-3.5" />
        </a>
      </div>
    </aside>
  );
}
