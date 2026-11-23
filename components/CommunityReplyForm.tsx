"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import CommentEmojiPicker from "@/components/CommentEmojiPicker";
import CommunityImageAttachment from "@/components/CommunityImageAttachment";
import CommunitySpoilerButton from "@/components/CommunitySpoilerButton";
import useHomeAuth from "@/components/useHomeAuth";

const maxReplyLength = 1000;

type CommunityReplyFormProps = {
  postSlug: string;
  comment?: { id: string; author: string };
};

export default function CommunityReplyForm({ postSlug, comment }: CommunityReplyFormProps) {
  const isLoggedIn = useHomeAuth();
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [confirmation, setConfirmation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const formId = comment ? `community-reply-${comment.id}` : "community-reply";
  const returnTo = `/community/posts/${postSlug}#${formId}`;
  const fieldLabel = comment ? `ตอบกลับ ${comment.author}` : "ข้อความตอบกระทู้";
  const Container = comment ? "div" : "section";
  const showForm = isLoggedIn === true && (!comment || isOpen);
  const canSubmit = Boolean(body.trim() || image);
  const actionLabel = comment ? "ส่งคำตอบกลับ" : "ส่งความเห็น";

  useEffect(() => {
    if (window.location.hash === `#${formId}`) setIsOpen(true);
  }, [formId]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoggedIn || !canSubmit) return;
    setBody("");
    setImage(null);
    setConfirmation(`${actionLabel}${image ? "พร้อมรูปภาพ" : ""}ในโหมดทดลองแล้ว`);
  }

  function updateBody(value: string) {
    setBody(value);
    setConfirmation("");
  }

  return (
    <Container className={comment ? "mt-ds-1 scroll-mt-24" : "scroll-mt-24 border-t border-arn-border pt-ds-4"} id={formId} aria-labelledby={comment ? undefined : "community-reply-title"}>
      {!comment && <h2 className="text-ds-h3" id="community-reply-title">ตอบกระทู้</h2>}
      {comment && isLoggedIn === true && (
        <button
          aria-controls={isOpen ? `${formId}-form` : undefined}
          aria-expanded={isOpen}
          aria-label={isOpen ? `ปิดฟอร์มตอบกลับ ${comment.author}` : fieldLabel}
          className="min-h-9 rounded-ds-sm text-ds-body-sm font-medium text-arn-accent-soft hover:text-arn-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {isOpen ? "ปิดฟอร์มตอบกลับ" : "ตอบกลับ"}
        </button>
      )}
      {showForm && (
        <form aria-label={fieldLabel} className="mt-ds-3 space-y-ds-3" id={`${formId}-form`} onSubmit={submit}>
          <label className="sr-only" htmlFor={`${formId}-body`}>{fieldLabel}</label>
          <textarea
            autoFocus={Boolean(comment)}
            className="ds-input block w-full resize-y px-ds-3 py-ds-2 text-ds-body"
            id={`${formId}-body`}
            maxLength={maxReplyLength}
            onChange={(event) => updateBody(event.target.value)}
            placeholder={comment ? `พิมพ์คำตอบถึง ${comment.author}` : "พิมพ์ความคิดเห็นของคุณ"}
            ref={input}
            rows={3}
            value={body}
          />
          <CommunityImageAttachment
            id={`${formId}-image`}
            image={image}
            onChange={(file) => {
              setImage(file);
              setConfirmation("");
            }}
          >
            <CommunitySpoilerButton field={input} onChange={updateBody} />
            <CommentEmojiPicker inputRef={input} onChange={updateBody} showLabel value={body} />
            <button className="ds-button-primary ml-auto min-h-11 px-ds-4 disabled:cursor-not-allowed disabled:opacity-50" disabled={!canSubmit} type="submit">
              {actionLabel}
            </button>
          </CommunityImageAttachment>
          {confirmation && <p className="text-ds-body-sm text-arn-accent-soft" role="status">{confirmation}</p>}
        </form>
      )}
      {isLoggedIn === false && (
        <Link
          aria-label={comment ? `เข้าสู่ระบบเพื่อตอบกลับ ${comment.author}` : undefined}
          className={comment ? "inline-flex min-h-9 items-center rounded-ds-sm text-ds-body-sm font-medium text-arn-accent-soft hover:text-arn-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" : "ds-button-secondary mt-ds-3 min-h-11 px-ds-4"}
          href={`/login?returnTo=${encodeURIComponent(returnTo)}`}
        >
          {comment ? "ตอบกลับ" : "เข้าสู่ระบบเพื่อตอบกระทู้"}
        </Link>
      )}
    </Container>
  );
}
