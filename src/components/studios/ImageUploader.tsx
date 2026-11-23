"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/upload";
import { cn } from "@/lib/utils";

type CoverUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  invalid?: boolean;
};

export function CoverUploader({ value, onChange, invalid }: CoverUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Cover photo uploaded.");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
      <figure className="relative aspect-[4/3] overflow-hidden bg-sunken">
        {value ? (
          <Image src={value} alt="Cover photo preview" fill sizes="220px" className="object-cover" />
        ) : (
          <span className="grid size-full place-items-center text-subtle">
            <ImagePlus className="size-8" strokeWidth={1.3} />
          </span>
        )}
      </figure>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        disabled={uploading}
        className={cn(
          "flex flex-col items-center justify-center gap-2.5 border border-dashed bg-background p-7 text-center transition-colors",
          dragging ? "border-terracotta bg-sunken" : invalid ? "border-cancelled" : "border-subtle",
          !uploading && "hover:border-foreground"
        )}
      >
        {uploading ? (
          <Loader2 className="size-7 animate-spin text-terracotta" />
        ) : (
          <Upload className="size-7 text-terracotta" strokeWidth={1.4} />
        )}
        <b className="text-sm font-semibold">
          {uploading ? "Uploading to imgbb…" : value ? "Replace the cover photo" : "Drop a photo or browse"}
        </b>
        <span className="text-xs text-muted-foreground">JPG or PNG, up to 10 MB · uploads to imgbb</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}

type GalleryUploaderProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
};

export function GalleryUploader({ value, onChange, max = 4 }: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const room = max - value.length;
    const picked = Array.from(files).slice(0, room);
    if (files.length > room) toast.info(`Only ${max} extra photos can be added.`);

    setUploading(true);
    const urls: string[] = [];
    for (const file of picked) {
      try {
        urls.push(await uploadImage(file));
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
    setUploading(false);
    if (urls.length) onChange([...value, ...urls]);
  };

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
      {value.map((url) => (
        <figure key={url} className="relative aspect-[4/3] overflow-hidden bg-sunken">
          <Image src={url} alt="" fill sizes="160px" className="object-cover" />
          <button
            type="button"
            onClick={() => onChange(value.filter((item) => item !== url))}
            aria-label="Remove photo"
            className="absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-full bg-[#f5f0e8]/90 text-[#171613]"
          >
            <X className="size-3.5" />
          </button>
        </figure>
      ))}

      {value.length < max && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 border border-dashed border-subtle text-xs font-semibold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          {uploading ? (
            <Loader2 className="size-5 animate-spin text-terracotta" />
          ) : (
            <ImagePlus className="size-5" strokeWidth={1.5} />
          )}
          {uploading ? "Uploading…" : "Add photos"}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
