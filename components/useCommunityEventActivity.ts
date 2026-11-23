"use client";

import { useSyncExternalStore } from "react";
import { communityEvents } from "@/data/communityEvents";

type EventActivity = Record<string, { progress: number }>;

const storageKey = "arnspace-community-event-activity";
const changedEvent = "arnspace-community-event-activity-change";
const sampleActivity: EventActivity = Object.fromEntries(
  communityEvents.flatMap(event => event.goal ? [[event.slug, { progress: event.goal.sampleProgress }]] : [])
);

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) onChange();
  };
  window.addEventListener(changedEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changedEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function readStorage() {
  try {
    return window.localStorage.getItem(storageKey) ?? "";
  } catch {
    return "";
  }
}

function parseActivity(raw: string): EventActivity {
  try {
    return { ...sampleActivity, ...(raw ? JSON.parse(raw) : {}) };
  } catch {
    return sampleActivity;
  }
}

export function updateCommunityEventProgress(slug: string, progress: number) {
  try {
    const activity = parseActivity(readStorage());
    window.localStorage.setItem(storageKey, JSON.stringify({ ...activity, [slug]: { progress } }));
    window.dispatchEvent(new Event(changedEvent));
    return true;
  } catch {
    return false;
  }
}

export default function useCommunityEventActivity() {
  return parseActivity(useSyncExternalStore(subscribe, readStorage, () => ""));
}
