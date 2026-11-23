"use client";

import Link from "next/link";
import { useState } from "react";
import useCommunityEventActivity, { updateCommunityEventProgress } from "@/components/useCommunityEventActivity";
import useHomeAuth from "@/components/useHomeAuth";
import { communityEventHref } from "@/data/communityEvents";

export default function CommunityEventJoinAction({ slug }: { slug: string }) {
  const isLoggedIn = useHomeAuth();
  const activity = useCommunityEventActivity();
  const [error, setError] = useState(false);

  if (!isLoggedIn) return (
    <Link href={`/login?returnTo=${encodeURIComponent(communityEventHref(slug))}`} className="ds-button-primary inline-flex min-h-11 items-center px-ds-5 text-sm">
      เข้าสู่ระบบเพื่อเข้าร่วม
    </Link>
  );

  if (activity[slug]) return <p role="status" className="rounded-ds-md border border-arn-border bg-arn-raised px-ds-4 py-ds-3 text-sm font-medium text-arn-accent">คุณเข้าร่วมกิจกรรมนี้แล้ว</p>;

  return (
    <div>
      <button type="button" onClick={() => setError(!updateCommunityEventProgress(slug, 0))} className="ds-button-primary min-h-11 px-ds-5 text-sm">เข้าร่วมกิจกรรม</button>
      {error && <p role="alert" className="mt-ds-2 text-sm text-[var(--arn-status-danger)]">บันทึกไม่สำเร็จ ลองอีกครั้ง</p>}
    </div>
  );
}
