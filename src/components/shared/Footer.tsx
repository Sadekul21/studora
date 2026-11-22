import Link from "next/link";
import Logo from "./Logo";
import Newsletter from "./Newsletter";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore studios", href: "/studios" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About us", href: "/about" },
];

const categories = [
  { label: "Photo Studios", value: "Photo studio" },
  { label: "Film & Sound Stages", value: "Film stage" },
  { label: "Podcast Rooms", value: "Podcast room" },
  { label: "Music Suites", value: "Music suite" },
  { label: "Art Workshops", value: "Art workshop" },
];

const hostLinks = [
  { label: "Host your space", href: "/add-studio" },
  { label: "Host guarantee", href: "/how-it-works" },
  { label: "Host dashboard", href: "/dashboard" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-[18px]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.850-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
];

const linkStyle =
  "text-[15px] text-on-night/85 transition-colors hover:text-night-accent";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="mb-[22px] text-[11px] font-semibold tracking-[0.2em] text-sand uppercase">
      {children}
    </h5>
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-night pt-[72px] text-on-night lg:pt-28">
      <div className="container-page">
        <div className="grid grid-cols-1 items-end gap-11 border-b border-night-line pb-[72px] lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <p className="font-serif text-[40px] leading-[1.04] tracking-[-0.02em] md:text-[64px]">
            Rooms for the work
            <br />
            you <em className="text-night-accent">make.</em>
          </p>
          <Newsletter />
        </div>

        <div className="grid grid-cols-2 gap-9 border-b border-night-line py-16 md:grid-cols-3 md:gap-x-14 md:gap-y-11 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo className="text-on-night" />
            <p className="mt-6 max-w-[36ch] text-[15px] leading-[25px] text-on-night-muted">
              Studora connects the people who build creative rooms with the
              people who fill them — photo cycs, stages, podcast lounges, music
              suites and workshops, booked by the hour.
            </p>
            <div className="mt-[30px] flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Studora on ${social.label}`}
                  className="grid size-[42px] place-items-center rounded-full border border-night-line transition-colors hover:border-night-accent hover:text-night-accent"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <ColumnTitle>Quick links</ColumnTitle>
            <div className="flex flex-col gap-[13px]">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkStyle}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <ColumnTitle>Popular categories</ColumnTitle>
            <div className="flex flex-col gap-[13px]">
              {categories.map((category) => (
                <Link
                  key={category.value}
                  href={`/studios?category=${encodeURIComponent(category.value)}`}
                  className={linkStyle}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <ColumnTitle>For hosts</ColumnTitle>
            <div className="flex flex-col gap-[13px]">
              {hostLinks.map((link) => (
                <Link key={link.label} href={link.href} className={linkStyle}>
                  {link.label}
                </Link>
              ))}
              <a href="mailto:support@studora.com" className={linkStyle}>
                support@studora.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-14 mb-[-2px] text-center font-serif text-[clamp(64px,17vw,260px)] leading-[0.8] tracking-[0.04em] whitespace-nowrap text-[#2c2924] select-none"
      >
        STUDORA
      </div>

      <div className="container-page">
        <div className="flex flex-col justify-between gap-3 border-t border-night-line pt-[26px] pb-[30px] text-[13px] text-on-night-muted md:flex-row md:gap-6">
          <span>© {new Date().getFullYear()} Studora Inc. All rights reserved.</span>
          <nav className="flex flex-wrap gap-4 md:gap-7">
            <Link href="/about" className="hover:text-on-night">Terms of service</Link>
            <Link href="/about" className="hover:text-on-night">Privacy policy</Link>
            <Link href="/about" className="hover:text-on-night">Cookie settings</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
