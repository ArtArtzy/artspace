"use client";

import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { RefObject } from "react";

type CommunitySpoilerButtonProps = {
  field: RefObject<HTMLTextAreaElement | null>;
  onChange?: (body: string) => void;
};

export default function CommunitySpoilerButton({ field, onChange }: CommunitySpoilerButtonProps) {
  function markSpoiler() {
    const editor = field.current;
    if (!editor) return;
    const { value, selectionStart: start, selectionEnd: end, maxLength } = editor;
    const selection = value.slice(start, end);
    const text = selection.trim() ? selection : "ข้อความสปอยล์";
    if ((value.slice(0, start).match(/\|\|/g)?.length ?? 0) % 2 || selection.includes("||")) return;
    if (maxLength >= 0 && value.length - selection.length + text.length + 4 > maxLength) return;

    editor.setRangeText(`||${text}||`, start, end);
    onChange?.(editor.value);
    editor.focus();
    editor.setSelectionRange(start + 2, start + 2 + text.length);
  }

  return (
    <button
      className="ds-button-secondary min-h-11 gap-ds-2 px-ds-3 sm:min-h-9"
      onClick={markSpoiler}
      title="เลือกข้อความที่ต้องการซ่อน แล้วกดปุ่มนี้"
      type="button"
    >
      <FontAwesomeIcon aria-hidden="true" className="h-4 w-4 text-arn-accent-soft" icon={faEyeSlash} />
      ซ่อนสปอยล์
    </button>
  );
}
