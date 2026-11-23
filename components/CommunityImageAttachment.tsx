"use client";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const maxImageBytes = 1024 * 1024;

type CommunityImageAttachmentProps = {
  id: string;
  image: File | null;
  onChange: (image: File | null) => void;
  children?: ReactNode;
};

export default function CommunityImageAttachment({ id, image, onChange, children }: CommunityImageAttachmentProps) {
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!image) {
      if (input.current) input.current.value = "";
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  function pickImage(file?: File) {
    if (!file) return;
    if (!imageTypes.includes(file.type) || file.size > maxImageBytes) {
      if (input.current) input.current.value = "";
      setError("เลือกรูปนามสกุล JPG, PNG, WebP หรือ GIF ขนาดไม่เกิน 1 เมกะไบต์");
      onChange(null);
      return;
    }
    setError("");
    onChange(file);
  }

  return (
    <div>
      <input
        accept={imageTypes.join(",")}
        hidden
        id={id}
        onChange={(event) => pickImage(event.target.files?.[0])}
        ref={input}
        type="file"
      />
      <p className="sr-only" id={`${id}-help`}>เลือกได้ 1 รูป ขนาดไม่เกิน 1 เมกะไบต์</p>
      <div className="relative flex flex-wrap items-center gap-ds-2">
        <button
          aria-describedby={`${id}-help`}
          className="ds-button-secondary min-h-11 gap-ds-2 px-ds-3 sm:min-h-9"
          onClick={() => input.current?.click()}
          ref={trigger}
          type="button"
        >
          <FontAwesomeIcon aria-hidden="true" className="h-4 w-4 text-arn-accent-soft" icon={faImage} />
          {image ? "เปลี่ยนรูป" : "แนบรูป"}
        </button>
        {children}
      </div>
      {image && preview && (
        <div className="mt-ds-2 flex max-w-full flex-wrap items-center gap-ds-2 rounded-ds-md border border-arn-border bg-arn-surface-soft p-ds-2 sm:w-fit">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-ds-sm bg-arn-canvas">
            <Image alt="ตัวอย่างรูปภาพแนบ" className="object-contain" fill sizes="96px" src={preview} unoptimized />
          </div>
          <p className="min-w-0 max-w-56 break-all text-ds-meta text-arn-muted">{image.name}</p>
          <button
            className="min-h-11 shrink-0 rounded-ds-sm px-ds-2 text-ds-meta font-medium text-arn-accent-soft hover:text-arn-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent sm:min-h-9"
            onClick={() => {
              onChange(null);
              trigger.current?.focus();
            }}
            type="button"
          >
            นำรูปออก
          </button>
        </div>
      )}
      {error && <p className="mt-ds-2 text-ds-body-sm text-arn-muted" role="alert">{error}</p>}
    </div>
  );
}
