const followKeyPrefix = "arnspace-follow-writer:";
const followChangedEvent = "arnspace-writer-follow-change";
const sampleFollowedWriters = new Set(["purplemoon", "Moonlit"]);

export function isWriterFollowed(author: string) {
  try {
    const value = window.localStorage.getItem(followKeyPrefix + author);
    if (value !== null) return value === "true";
  } catch {
    return sampleFollowedWriters.has(author);
  }
  return sampleFollowedWriters.has(author);
}

export function setWriterFollowed(author: string, followed: boolean) {
  try {
    window.localStorage.setItem(followKeyPrefix + author, String(followed));
    window.dispatchEvent(new Event(followChangedEvent));
  } catch {
    // Browsing remains available if storage is unavailable.
  }
}

export function subscribeWriterFollows(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key.startsWith(followKeyPrefix)) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(followChangedEvent, onChange);
  window.addEventListener("pageshow", onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(followChangedEvent, onChange);
    window.removeEventListener("pageshow", onChange);
  };
}
