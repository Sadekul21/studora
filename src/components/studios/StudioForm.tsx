"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Check, ChevronDown, Info, Lock, MapPin, Plus, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CoverUploader, GalleryUploader } from "./ImageUploader";
import StudioCard from "./StudioCard";
import { inputStyle, labelStyle } from "@/components/auth/formStyles";
import { useSession } from "@/lib/auth-client";
import { categories } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { Studio } from "@/types/studio";

export type StudioPayload = {
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  gallery: string[];
  amenities: string[];
  overview: string;
};

type FormValues = {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  image: string;
  extraPhotos: string[];
  amenities: string[];
  overview: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const presetAmenities = [
  "Natural light",
  "Hard cyc",
  "Wi-Fi",
  "Parking",
  "Green room",
  "Makeup station",
  "Grip & lighting kit",
  "Changing room",
  "Kitchenette",
  "Air conditioning",
  "Step-free access",
  "Sound treatment",
];

const toValues = (studio?: Studio): FormValues => ({
  title: studio?.title ?? "",
  category: studio?.category ?? "",
  hourlyRate: studio ? String(studio.hourlyRate) : "",
  securityDeposit: studio ? String(studio.securityDeposit) : "",
  maxCapacity: studio ? String(studio.maxCapacity) : "",
  location: studio?.location ?? "",
  image: studio?.image ?? "",
  extraPhotos: studio?.gallery?.filter((url) => url !== studio.image) ?? [],
  amenities: studio?.amenities ?? [],
  overview: studio?.overview ?? "",
});

const validate = (values: FormValues) => {
  const errors: Errors = {};
  if (values.title.trim().length < 3) errors.title = "Give the studio a title (at least 3 characters).";
  if (!values.category) errors.category = "Pick a category.";
  if (!(Number(values.hourlyRate) > 0)) errors.hourlyRate = "Enter an hourly rate above $0.";
  if (values.securityDeposit === "" || Number(values.securityDeposit) < 0) {
    errors.securityDeposit = "Enter a deposit ($0 is fine).";
  }
  const capacity = Number(values.maxCapacity);
  if (!Number.isInteger(capacity) || capacity < 1) errors.maxCapacity = "At least 1 person.";
  if (!values.location.trim()) errors.location = "Add the city or address.";
  if (!values.image) errors.image = "Upload a cover photo.";
  if (values.overview.trim().length < 20) errors.overview = "Describe the space in at least 20 characters.";
  return errors;
};

type StudioFormProps = {
  studio?: Studio;
  submitLabel: string;
  cancelHref: string;
  onSubmit: (payload: StudioPayload) => Promise<void>;
};

export default function StudioForm({ studio, submitLabel, cancelHref, onSubmit }: StudioFormProps) {
  const { data: session } = useSession();
  const [values, setValues] = useState<FormValues>(() => toValues(studio));
  const [errors, setErrors] = useState<Errors>({});
  const [customAmenity, setCustomAmenity] = useState("");
  const [saving, setSaving] = useState(false);

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleAmenity = (amenity: string) => {
    setField(
      "amenities",
      values.amenities.includes(amenity)
        ? values.amenities.filter((item) => item !== amenity)
        : [...values.amenities, amenity]
    );
  };

  const addCustomAmenity = () => {
    const amenity = customAmenity.trim();
    if (amenity && !values.amenities.includes(amenity)) {
      setField("amenities", [...values.amenities, amenity]);
    }
    setCustomAmenity("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        category: values.category,
        hourlyRate: Number(values.hourlyRate),
        securityDeposit: Number(values.securityDeposit),
        maxCapacity: Number(values.maxCapacity),
        location: values.location.trim(),
        image: values.image,
        gallery: [values.image, ...values.extraPhotos],
        amenities: values.amenities,
        overview: values.overview.trim(),
      });
    } finally {
      setSaving(false);
    }
  };

  const allAmenities = [
    ...presetAmenities,
    ...values.amenities.filter((item) => !presetAmenities.includes(item)),
  ];

  const preview: Studio = {
    _id: studio?._id ?? "preview",
    title: values.title || "Your studio title",
    category: values.category || "Category",
    hourlyRate: Number(values.hourlyRate) || 0,
    securityDeposit: Number(values.securityDeposit) || 0,
    maxCapacity: Number(values.maxCapacity) || 0,
    location: values.location || "City, State",
    image: values.image,
    gallery: [],
    amenities: values.amenities,
    overview: values.overview,
    ownerName: session?.user.name ?? "",
    ownerEmail: session?.user.email ?? "",
    rating: studio?.rating ?? 0,
    reviewCount: studio?.reviewCount ?? 0,
    createdAt: studio?.createdAt ?? new Date().toISOString(),
  };

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-16">
      <form onSubmit={handleSubmit} noValidate className="min-w-0">
        <FormSection number="01" title="Basics" text="What creators see first on cards and search results." first>
          <Field id="f-title" label="Studio title" error={errors.title}>
            <Input
              id="f-title"
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Northlight Daylight Studio"
              aria-invalid={!!errors.title}
              className={inputStyle}
            />
          </Field>
          <Field id="f-category" label="Category" error={errors.category}>
            <div className="relative">
              <select
                id="f-category"
                value={values.category}
                onChange={(e) => setField("category", e.target.value)}
                aria-invalid={!!errors.category}
                className={cn(inputStyle, "w-full cursor-pointer appearance-none border pr-10 aria-invalid:border-destructive")}
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-[17px] right-4 size-[18px] text-muted-foreground" />
            </div>
          </Field>
          <Field
            id="f-overview"
            label="Detailed overview"
            hint={`${values.overview.length} / 1,200`}
            error={errors.overview}
          >
            <textarea
              id="f-overview"
              value={values.overview}
              maxLength={1200}
              onChange={(e) => setField("overview", e.target.value)}
              placeholder="Describe the room, the light, the gear and what it’s best for."
              aria-invalid={!!errors.overview}
              className={cn(inputStyle, "min-h-[150px] w-full resize-y border py-3.5 leading-[26px] aria-invalid:border-destructive")}
            />
          </Field>
        </FormSection>

        <FormSection number="02" title="Pricing & capacity" text="Shown as an hourly rate. The deposit is held and refunded after wrap.">
          <div className="grid gap-5 md:grid-cols-3">
            <Field id="f-hourlyRate" label="Hourly rate" error={errors.hourlyRate}>
              <Affix prefix="$" suffix="/ hr">
                <Input
                  id="f-hourlyRate"
                  type="number"
                  min={1}
                  value={values.hourlyRate}
                  onChange={(e) => setField("hourlyRate", e.target.value)}
                  aria-invalid={!!errors.hourlyRate}
                  className={cn(inputStyle, "pr-14 pl-8 tabular-nums")}
                />
              </Affix>
            </Field>
            <Field id="f-securityDeposit" label="Security deposit" error={errors.securityDeposit}>
              <Affix prefix="$">
                <Input
                  id="f-securityDeposit"
                  type="number"
                  min={0}
                  value={values.securityDeposit}
                  onChange={(e) => setField("securityDeposit", e.target.value)}
                  aria-invalid={!!errors.securityDeposit}
                  className={cn(inputStyle, "pl-8 tabular-nums")}
                />
              </Affix>
            </Field>
            <Field id="f-maxCapacity" label="Max capacity" error={errors.maxCapacity}>
              <Affix suffix="people">
                <Input
                  id="f-maxCapacity"
                  type="number"
                  min={1}
                  value={values.maxCapacity}
                  onChange={(e) => setField("maxCapacity", e.target.value)}
                  aria-invalid={!!errors.maxCapacity}
                  className={cn(inputStyle, "pr-[76px] tabular-nums")}
                />
              </Affix>
            </Field>
          </div>
        </FormSection>

        <FormSection number="03" title="Location" text="Neighborhood, city and state — creators search by these.">
          <Field id="f-location" label="Location / address" error={errors.location}>
            <div className="relative">
              <MapPin className="pointer-events-none absolute top-4 left-4 size-[19px] text-muted-foreground" />
              <Input
                id="f-location"
                value={values.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="e.g. Gowanus, Brooklyn, NY"
                aria-invalid={!!errors.location}
                className={cn(inputStyle, "pl-[46px]")}
              />
            </div>
          </Field>
        </FormSection>

        <FormSection number="04" title="Photos" text="A landscape cover photo, plus up to four more for the gallery.">
          <Field id="f-image" label="Cover photo" error={errors.image}>
            <div id="f-image" tabIndex={-1}>
              <CoverUploader
                value={values.image}
                onChange={(url) => setField("image", url)}
                invalid={!!errors.image}
              />
            </div>
          </Field>
          <Field id="f-extra" label="More photos" hint="Optional">
            <GalleryUploader
              value={values.extraPhotos}
              onChange={(urls) => setField("extraPhotos", urls)}
            />
          </Field>
        </FormSection>

        <FormSection number="05" title="Amenities" text="Pick everything that’s included in the hourly rate.">
          <div className="flex flex-wrap gap-2">
            {allAmenities.map((amenity) => {
              const on = values.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full border px-[15px] text-sm font-medium transition-colors",
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-subtle hover:border-foreground"
                  )}
                >
                  {on ? <Check className="size-[15px]" /> : <Plus className="size-[15px]" />}
                  {amenity}
                </button>
              );
            })}
          </div>
          <div className="flex max-w-md gap-2">
            <Input
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomAmenity();
                }
              }}
              placeholder="Add your own, e.g. Rooftop access"
              aria-label="Add a custom amenity"
              className={cn(inputStyle, "h-11")}
            />
            <button
              type="button"
              onClick={addCustomAmenity}
              className="h-11 shrink-0 rounded-[2px] border border-foreground px-4 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-foreground hover:text-background"
            >
              Add
            </button>
          </div>
        </FormSection>

        <FormSection number="06" title="Host" text="Taken from your account and shown on the listing.">
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="f-host-name" label="Host name" locked>
              <Input
                id="f-host-name"
                value={session?.user.name ?? ""}
                readOnly
                className={cn(inputStyle, "border-dashed bg-sunken text-muted-foreground dark:bg-sunken")}
              />
            </Field>
            <Field id="f-host-email" label="Host email" locked>
              <Input
                id="f-host-email"
                value={session?.user.email ?? ""}
                readOnly
                className={cn(inputStyle, "border-dashed bg-sunken text-muted-foreground dark:bg-sunken")}
              />
            </Field>
          </div>
        </FormSection>

        <div className="mt-2 flex flex-col-reverse justify-between gap-3 border-t border-foreground pt-7 sm:flex-row sm:items-center">
          <Link
            href={cancelHref}
            className="inline-flex h-[52px] items-center justify-center rounded-[2px] border border-foreground px-[26px] text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[2px] bg-primary px-[30px] text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : submitLabel}
            {!saving && <ArrowRight className="size-[17px]" />}
          </button>
        </div>
      </form>

      <aside className="flex flex-col gap-5 xl:sticky xl:top-[110px] xl:self-start">
        <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Live preview · how creators see it
        </span>
        {values.image ? (
          <div className="pointer-events-none">
            <StudioCard studio={preview} />
          </div>
        ) : (
          <div className="grid aspect-[4/3] place-items-center border border-dashed border-subtle px-6 text-center text-sm text-muted-foreground">
            Upload a cover photo to see your card.
          </div>
        )}
        <div className="flex flex-col gap-3 border bg-card p-5">
          <p className="flex gap-3 text-sm leading-[22px] text-muted-foreground">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-terracotta" />
            <span>
              Listings with a landscape cover and 6+ amenities get{" "}
              <b className="font-semibold text-foreground">more booking requests</b>.
            </span>
          </p>
          <p className="flex gap-3 text-sm leading-[22px] text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-terracotta" />
            <span>
              New bookings arrive as <b className="font-semibold text-foreground">Pending</b> — you
              confirm them from your dashboard.
            </span>
          </p>
        </div>
      </aside>
    </div>
  );
}

function FormSection({
  number,
  title,
  text,
  first,
  children,
}: {
  number: string;
  title: string;
  text: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("grid gap-[22px] border-b py-10", first && "pt-3")}>
      <div className="grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-x-2">
        <span className="row-span-2 font-serif text-[22px] leading-none text-terracotta italic">
          {number}
        </span>
        <h3 className="mb-1.5 text-[30px] leading-[1.15]">{title}</h3>
        <p className="text-[14.5px] leading-[23px] text-muted-foreground">{text}</p>
      </div>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  locked,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-[9px]">
      <Label htmlFor={id} className={cn(labelStyle, "justify-between")}>
        <span className="flex items-center gap-1.5">
          {label}
          {locked && <Lock className="size-3.5" />}
        </span>
        {hint && <span className="text-[11px] font-medium tracking-normal normal-case">{hint}</span>}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-[7px] text-[13px] leading-[19px] font-semibold text-cancelled">
          <AlertCircle className="size-4" />
          {error}
        </p>
      )}
    </div>
  );
}

function Affix({
  prefix,
  suffix,
  children,
}: {
  prefix?: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="pointer-events-none absolute top-[15px] left-4 text-[15.5px] text-muted-foreground">
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span className="pointer-events-none absolute top-[16px] right-4 text-[13px] text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  );
}
