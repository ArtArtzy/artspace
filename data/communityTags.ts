import type { CommunityRoom } from "@/data/communityRooms";

export function normalizeCommunityTag(tag: string) {
  return tag.trim().replace(/^#+\s*/, "").replace(/\s+/g, " ").normalize("NFC").slice(0, 32);
}

export function communityTagKey(tag: string) {
  return normalizeCommunityTag(tag).toLowerCase();
}

export function communityRoomHref(room: CommunityRoom, { tag, page }: { tag?: string; page?: number } = {}) {
  const params = new URLSearchParams();
  if (room !== "general") params.set("section", room);
  if (tag) params.set("tag", tag);
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/community${query ? `?${query}` : ""}#community-room-content`;
}

export function rankCommunityTags(posts: readonly { tags: string[] }[]) {
  const ranked = new Map<string, { label: string; count: number }>();
  for (const { tags } of posts) {
    const unique = new Map(tags.map((tag) => [communityTagKey(tag), normalizeCommunityTag(tag)]));
    for (const [key, label] of unique) {
      if (!key) continue;
      const item = ranked.get(key);
      if (item) item.count++;
      else ranked.set(key, { label, count: 1 });
    }
  }
  return [...ranked.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "th"));
}
