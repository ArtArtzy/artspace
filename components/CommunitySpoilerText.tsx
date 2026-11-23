"use client";

import { useState } from "react";
import { communitySpoilerPattern } from "@/data/communitySpoilers";

function Spoiler({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="rounded-ds-sm bg-arn-surface-soft px-1">
      <button
        aria-expanded={isOpen}
        className="rounded-ds-sm px-1 font-medium text-arn-accent-soft hover:text-arn-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? "ซ่อนสปอยล์" : "เปิดดูสปอยล์"}
      </button>
      {isOpen && <span className="ml-1 text-arn-text">{text}</span>}
    </span>
  );
}

export default function CommunitySpoilerText({ text }: { text: string }) {
  return text.split(communitySpoilerPattern).map((part, index) => (
    index % 2 && part.trim() ? <Spoiler key={index} text={part} /> : part
  ));
}
