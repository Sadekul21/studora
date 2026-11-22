"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, LogOut, Menu } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserMenu, { UserAvatar, useLogout, userLinks } from "./UserMenu";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore studios", href: "/studios" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const logout = useLogout();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overHero = pathname === "/" && !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 border-b transition-colors duration-300 lg:h-20",
        overHero
          ? "border-[#f5f0e8]/20 bg-transparent text-[#f5f0e8]"
          : "bg-background/90 backdrop-blur-md",
      )}
    >
      <nav className="container-page flex h-full items-center gap-9 xl:gap-14">
        <Logo className={cn(overHero && "text-[#f5f0e8]")} />

        <ul className="hidden h-full items-center gap-6 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <li key={link.href} className="h-full">
              <Link
                href={link.href}
                className={cn(
                  "relative flex h-full items-center text-[11.5px] font-semibold tracking-[0.17em] uppercase transition-colors",
                  overHero
                    ? isActive(link.href)
                      ? "text-[#f5f0e8]"
                      : "text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
                    : isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className={cn(
                      "absolute bottom-[22px] left-1/2 size-[5px] -translate-x-1/2 rounded-full",
                      overHero ? "bg-[#d08a5f]" : "bg-terracotta",
                    )}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:gap-3.5">
          <ThemeToggle
            className={cn(
              overHero &&
                "border-[#f5f0e8]/45 text-[#f5f0e8] hover:bg-[#f5f0e8]/10",
            )}
          />
          {isPending ? (
            <span className="hidden h-10 w-[150px] lg:block" />
          ) : user ? (
            <div className="hidden lg:block">
              <UserMenu user={user} overHero={overHero} />
            </div>
          ) : (
            <div className="hidden items-center gap-[22px] lg:flex">
              <Link
                href="/login"
                className="border-b border-current pb-1 text-[11px] font-semibold tracking-[0.16em] uppercase"
              >
                Log in
              </Link>
              <Button
                asChild
                className="h-10 rounded-[2px] px-4 text-[11px] font-semibold tracking-[0.16em] uppercase"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "size-[42px] rounded-full border-subtle bg-transparent lg:hidden dark:bg-transparent",
                  overHero &&
                    "border-[#f5f0e8]/45 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 hover:text-[#f5f0e8]",
                )}
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
             className="top-16 max-h-[calc(100dvh-4rem)] gap-0 overflow-y-auto overscroll-contain px-5 pt-2 pb-7 shadow-xl"
            >
              <SheetTitle className="border-b py-4 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Menu
              </SheetTitle>

              {navLinks.map((link) => (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between border-b py-[18px] font-serif text-[30px] leading-[1.1]",
                      isActive(link.href) && "text-primary italic",
                    )}
                  >
                    {link.label}
                    <ArrowRight className="size-5 text-muted-foreground" />
                  </Link>
                </SheetClose>
              ))}

              {user ? (
                <div className="mt-6">
                  <div className="flex items-center gap-3 pb-4">
                    <UserAvatar user={user} className="size-11" />
                    <span className="min-w-0">
                      <b className="block truncate font-serif text-xl leading-6 font-normal">
                        {user.name}
                      </b>
                      <span className="block truncate text-[13px] text-muted-foreground">
                        {user.email}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {userLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-2.5 rounded-[2px] border px-3 py-3 text-[13px] font-semibold",
                            isActive(link.href) && "border-foreground",
                          )}
                        >
                          <link.icon
                            className="size-4 shrink-0 text-terracotta"
                            strokeWidth={1.6}
                          />
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <SheetClose asChild>
                    <button
                      type="button"
                      onClick={logout}
                      className="mt-3 flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[2px] border border-foreground text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-foreground hover:text-background"
                    >
                      <LogOut className="size-4" /> Logout
                    </button>
                  </SheetClose>
                </div>
              ) : (
                <div className="mt-6 flex gap-3">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="outline"
                      className="h-[52px] flex-1 rounded-[2px] border-foreground bg-transparent text-xs font-semibold tracking-[0.16em] uppercase hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground"
                    >
                      <Link href="/login">Log in</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="h-[52px] flex-1 rounded-[2px] text-xs font-semibold tracking-[0.16em] uppercase"
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </SheetClose>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
