"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-0">
      <label
        htmlFor="news-email"
        className="mb-3.5 block text-[11px] font-semibold tracking-[0.2em] text-on-night-muted uppercase"
      >
        The Call Sheet — new studios every Friday
      </label>
      <div className="flex border-b border-on-night/40">
        <input
          id="news-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent py-3.5 text-lg text-on-night outline-none placeholder:text-subtle"
        />
        <button
          type="submit"
          className="flex items-center gap-3 pl-5 text-xs font-semibold tracking-[0.16em] text-on-night uppercase transition-colors hover:text-night-accent"
        >
          Subscribe <ArrowRight className="size-[17px]" />
        </button>
      </div>
      <p className="mt-3.5 text-[13px] text-on-night-muted">
        {joined
          ? "You're on the list. See you on Friday."
          : "One email a week. Unsubscribe in a click."}
      </p>
    </form>
  );
}
