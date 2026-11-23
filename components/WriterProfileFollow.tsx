"use client";

import Link from "next/link";
import useHomeAuth from "@/components/useHomeAuth";
import useWriterFollow from "@/components/useWriterFollow";

export default function WriterProfileFollow({ author, path }: { author: string; path: string }) {
  const isLoggedIn = useHomeAuth() === true;
  const { followed, toggleFollow } = useWriterFollow(author, isLoggedIn);
  const className = "ds-button-secondary inline-flex min-h-11 items-center justify-center px-ds-6 text-ds-body-sm text-arn-accent";

  return isLoggedIn ? (
    <button aria-pressed={followed} className={className} onClick={toggleFollow} type="button">
      {followed ? "กำลังติดตาม" : "ติดตามนักเขียน"}
    </button>
  ) : (
    <Link className={className} href={`/login?returnTo=${encodeURIComponent(path)}`}>ติดตามนักเขียน</Link>
  );
}
