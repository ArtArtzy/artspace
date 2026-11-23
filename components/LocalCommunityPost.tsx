"use client";

import Link from "next/link";
import CommunityPostContent from "@/components/CommunityPostContent";
import { useLocalCommunityThreads } from "@/data/localCommunityThreads";

export default function LocalCommunityPost({ slug }: { slug: string }) {
  const posts = useLocalCommunityThreads();
  const post = posts?.find((item) => item.slug === slug);

  if (post) return <CommunityPostContent post={post} room={post.room} />;

  return (
    <section aria-busy={posts === null} className="mx-auto max-w-3xl px-ds-4 py-ds-8">
      {posts === null ? (
        <p className="text-ds-body text-arn-muted" role="status">กำลังโหลดกระทู้…</p>
      ) : (
        <div className="ds-card space-y-ds-4 p-ds-5">
          <h1 className="text-ds-h2">ไม่พบกระทู้ในเบราว์เซอร์นี้</h1>
          <Link className="ds-button-secondary min-h-11 px-ds-4" href="/community">กลับหน้าชุมชน</Link>
        </div>
      )}
    </section>
  );
}
