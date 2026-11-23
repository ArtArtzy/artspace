"use client";

import { useEffect, useState } from "react";
import { isWriterFollowed, setWriterFollowed, subscribeWriterFollows } from "@/data/writer-follows";

export default function useWriterFollow(author: string, enabled = true) {
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const sync = () => setFollowed(isWriterFollowed(author));
    sync();
    return subscribeWriterFollows(sync);
  }, [author, enabled]);

  const toggleFollow = () => {
    setFollowed(!followed);
    setWriterFollowed(author, !followed);
  };

  return { followed, toggleFollow };
}
