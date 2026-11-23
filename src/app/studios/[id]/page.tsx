import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  DollarSign,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import StudioGallery from "@/components/studios/StudioGallery";
import BookingCard from "@/components/studios/BookingCard";
import ShareButton from "@/components/studios/ShareButton";
import StudioCard from "@/components/studios/StudioCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { UserAvatar } from "@/components/shared/UserMenu";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

async function getStudio(id: string) {
  try {
    return await apiFetch<Studio>(`/studios/${id}`, { cache: "no-store" });
  } catch {
    return null;
  }
}

async function getSimilar(studio: Studio) {
  try {
    const studios = await apiFetch<Studio[]>(
      `/studios?category=${encodeURIComponent(studio.category)}`,
      { cache: "no-store" }
    );
    return studios.filter((item) => item._id !== studio._id).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/studios/[id]">): Promise<Metadata> {
  const { id } = await params;
  const studio = await getStudio(id);
  return { title: studio ? `${studio.title} — Studora` : "Studio not found — Studora" };
}

const sectionTitle = "mb-7 text-[34px] leading-[1.05] tracking-[-0.02em] md:text-[40px]";

export default async function StudioDetailsPage({ params }: PageProps<"/studios/[id]">) {
  const { id } = await params;
  const studio = await getStudio(id);
  if (!studio) notFound();

  const similar = await getSimilar(studio);
  const images = studio.gallery?.length ? studio.gallery : [studio.image];
  const listedOn = new Date(studio.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const specs = [
    { label: "Category", value: studio.category },
    { label: "Hourly rate", value: `$${studio.hourlyRate} / hr` },
    { label: "Security deposit", value: `$${studio.securityDeposit}, refundable` },
    { label: "Max capacity", value: `${studio.maxCapacity} people` },
    { label: "Location", value: studio.location },
    { label: "Listed", value: listedOn },
  ];

  return (
    <main className="container-page">
      <div className="flex flex-col justify-between gap-6 pt-8 pb-8 md:flex-row md:items-end md:pt-10 md:pb-9">
        <div className="min-w-0">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
          >
            <Link href="/studios" className="hover:text-foreground">
              Explore studios
            </Link>
            <ChevronRight className="size-3.5" />
            <Link
              href={`/studios?category=${encodeURIComponent(studio.category)}`}
              className="hover:text-foreground"
            >
              {studio.category}
            </Link>
            <ChevronRight className="size-3.5" />
            <b className="font-semibold text-foreground">{studio.title}</b>
          </nav>

          <h1 className="mt-5 mb-[18px] text-[44px] leading-[0.98] tracking-[-0.025em] md:text-6xl lg:text-[72px]">
            {studio.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14.5px] text-muted-foreground">
            <span className="inline-flex h-[26px] items-center border border-subtle px-2.5 text-[10.5px] font-semibold tracking-[0.16em] text-foreground uppercase">
              {studio.category}
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
              <Star className="size-[13px] fill-terracotta text-terracotta" />
              {studio.rating > 0 ? studio.rating.toFixed(2) : "New"}
              {studio.reviewCount > 0 && (
                <span className="font-normal text-muted-foreground">
                  · {studio.reviewCount} reviews
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" /> {studio.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4" /> Up to {studio.maxCapacity}
            </span>
          </div>
        </div>
        <ShareButton />
      </div>

      <StudioGallery images={images} title={studio.title} category={studio.category} />

      <div className="mt-9 grid grid-cols-2 border-y md:grid-cols-4">
        {[
          { icon: DollarSign, value: `$${studio.hourlyRate} / hr`, label: "Hourly rate" },
          { icon: Wallet, value: `$${studio.securityDeposit}`, label: "Security deposit" },
          { icon: Users, value: `${studio.maxCapacity} people`, label: "Max capacity" },
          { icon: MapPin, value: studio.location.split(",").slice(-2).join(",").trim(), label: "Location" },
        ].map((item, index) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-3.5 py-5 md:px-6",
              index % 2 === 1 && "border-l pl-4",
              index > 1 && "border-t md:border-t-0",
              index === 2 && "md:border-l",
              index === 0 && "md:pl-0"
            )}
          >
            <item.icon className="size-6 shrink-0 text-terracotta" strokeWidth={1.5} />
            <span className="min-w-0">
              <b className="block truncate font-serif text-[20px] leading-[1.1] font-normal md:text-[22px]">
                {item.value}
              </b>
              <span className="block text-xs tracking-[0.04em] text-muted-foreground">
                {item.label}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-12 pt-12 pb-[72px] lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20 lg:pt-[72px] lg:pb-28 xl:gap-24">
        <div className="min-w-0">
          <div className="flex items-center gap-[18px] border-b pb-10">
            <UserAvatar
              user={{ name: studio.ownerName, email: studio.ownerEmail, image: studio.ownerImage }}
              className="size-14 text-lg"
            />
            <div className="min-w-0">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Your host
              </span>
              <h2 className="my-1 text-[28px] leading-[1.1]">{studio.ownerName}</h2>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <ShieldCheck className="size-4" /> Verified host · {studio.ownerEmail}
              </span>
            </div>
          </div>

          <section className="border-b py-12">
            <h2 className={sectionTitle}>
              About this <em className="text-terracotta">space</em>
            </h2>
            <p className="max-w-[62ch] text-[17px] leading-[29px] whitespace-pre-line text-muted-foreground">
              {studio.overview}
            </p>
          </section>

          <section className="border-b py-12">
            <h2 className={sectionTitle}>Specifications</h2>
            <div className="grid md:grid-cols-2 md:gap-x-14">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b py-[13px] text-[15px] leading-[22px]"
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <b className="text-right font-semibold">{spec.value}</b>
                </div>
              ))}
            </div>
          </section>

          <section className="border-b py-12">
            <h2 className={sectionTitle}>What’s included</h2>
            {studio.amenities.length > 0 ? (
              <ul className="grid gap-x-12 gap-y-[18px] sm:grid-cols-2">
                {studio.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3.5 text-[15.5px]">
                    <Check className="size-5 shrink-0 text-terracotta" strokeWidth={1.6} />
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">The host hasn’t listed amenities yet.</p>
            )}
          </section>

          <section className="py-12">
            <h2 className={sectionTitle}>Reviews</h2>
            <div className="flex flex-wrap items-end gap-6">
              <div>
                <div className="font-serif text-[64px] leading-none">
                  {studio.rating > 0 ? studio.rating.toFixed(2) : "—"}
                </div>
                <span className="mt-2 block text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  {studio.reviewCount > 0 ? `${studio.reviewCount} reviews` : "No reviews yet"}
                </span>
              </div>
              <p className="max-w-[44ch] pb-1 text-[15px] leading-6 text-muted-foreground">
                Reviews are written by creators after a completed booking, so
                every rating comes from a real session in this room.
              </p>
            </div>
          </section>
        </div>

        <BookingCard studio={studio} />
      </div>

      {similar.length > 0 && (
        <section className="border-t pt-[72px] pb-[72px] lg:pb-28">
          <SectionHeading
            eyebrow="More like this"
            title={
              <>
                Similar <em>studios.</em>
              </>
            }
            action={
              <Link
                href={`/studios?category=${encodeURIComponent(studio.category)}`}
                className="inline-flex w-fit items-center gap-2 border-b border-current pb-[5px] text-[11.5px] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition-all hover:gap-3 hover:text-primary"
              >
                Explore all <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="grid gap-x-7 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <StudioCard key={item._id} studio={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
