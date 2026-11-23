"use client";

import { useEffect, useState } from "react";
import type { FeedPost } from "@/components/CommunityFeed";
import type { CommunityRoom } from "@/data/communityRooms";

const storagePrefix = "arnspace-community-thread:";
const changeEvent = "arnspace-community-threads-change";

export type LocalCommunityThread = FeedPost & { room: CommunityRoom; updatedAt: number };

export function saveLocalCommunityThread(post: LocalCommunityThread) {
  window.localStorage.setItem(storagePrefix + post.slug, JSON.stringify(post));
  window.dispatchEvent(new Event(changeEvent));
}

export function useLocalCommunityThreads() {
  const [posts, setPosts] = useState<LocalCommunityThread[] | null>(null);

  useEffect(() => {
    function readPosts() {
      const results: LocalCommunityThread[] = [];
      try {
        for (let index = 0; index < window.localStorage.length; index++) {
          const key = window.localStorage.key(index);
          if (!key?.startsWith(storagePrefix)) continue;
          try {
            const post: LocalCommunityThread = JSON.parse(window.localStorage.getItem(key) ?? "null");
            if (post?.slug === key.slice(storagePrefix.length) && Array.isArray(post.tags)) results.push(post);
          } catch {
            // A damaged entry can be skipped without hiding the other threads.
          }
        }
      } catch {
        // Local storage can be unavailable in restricted browser contexts.
      }
      setPosts(results.sort((a, b) => b.updatedAt - a.updatedAt));
    }

    function onStorage(event: StorageEvent) {
      if (event.key === null || event.key.startsWith(storagePrefix)) readPosts();
    }

    readPosts();
    window.addEventListener("storage", onStorage);
    window.addEventListener(changeEvent, readPosts);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(changeEvent, readPosts);
    };
  }, []);

  return posts;
}
