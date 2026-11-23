import Link from "next/link";
import type { CommunityRoom } from "@/data/communityRooms";
import { communityRoomHref, normalizeCommunityTag } from "@/data/communityTags";

export default function CommunityTagLinks({ room, tags }: { room: CommunityRoom; tags: readonly string[] }) {
  if (!tags.length) return null;

  return (
    <ul aria-label="แท็กกระทู้" className="flex flex-wrap gap-ds-2">
      {tags.map(normalizeCommunityTag).map((tag) => (
        <li key={tag}>
          <Link className="inline-flex min-h-7 items-center rounded-full border border-arn-border bg-arn-surface-soft px-ds-2 text-ds-meta text-arn-muted transition hover:border-arn-border-strong hover:text-arn-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={communityRoomHref(room, { tag })}>
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
