"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
      <nav className="container-page flex h-20 items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:text-foreground",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-terracotta" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="ghost"
            className="h-11 rounded-sm px-5 text-xs font-semibold uppercase tracking-[0.16em]"
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            asChild
            className="h-11 rounded-sm px-6 text-xs font-semibold uppercase tracking-[0.16em]"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-sm lg:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 sm:max-w-sm">
            <SheetHeader className="border-b px-6 py-5">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo />
            </SheetHeader>

            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b last:border-b-0">
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between py-4 font-serif text-2xl",
                        isActive(link.href)
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="size-2 rounded-full bg-terracotta" />
                      )}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 border-t px-6 py-6">
              <SheetClose asChild>
                <Button
                  asChild
                  className="h-12 rounded-sm text-xs font-semibold uppercase tracking-[0.16em]"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-sm text-xs font-semibold uppercase tracking-[0.16em]"
                >
                  <Link href="/login">Log in</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
