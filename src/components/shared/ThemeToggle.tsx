"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch light or dark theme"
      className="grid size-[42px] shrink-0 place-items-center rounded-full border border-subtle text-foreground transition-colors hover:bg-accent"
    >
      <Moon className="size-[18px] dark:hidden" strokeWidth={1.5} />
      <Sun className="hidden size-[18px] dark:block" strokeWidth={1.5} />
    </button>
  );
}
