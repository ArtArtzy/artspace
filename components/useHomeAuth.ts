"use client";

import { useSyncExternalStore } from "react";

const authStorageKey = "arnspace-authenticated";
const authStateChangedEvent = "arnspace-auth-change";

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === authStorageKey || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(authStateChangedEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(authStateChangedEvent, onChange);
  };
}

export function getStoredAuthState() {
  try {
    const stored = window.localStorage.getItem(authStorageKey);
    return stored === null ? undefined : stored === "true";
  } catch {
    return undefined;
  }
}

function getServerSnapshot() {
  return null;
}

export function useStoredAuthState() {
  return useSyncExternalStore(subscribe, getStoredAuthState, getServerSnapshot);
}

export function setStoredAuthState(isLoggedIn: boolean) {
  window.localStorage.setItem(authStorageKey, String(isLoggedIn));
  window.dispatchEvent(new Event(authStateChangedEvent));
}

export function rememberGuestAuthState() {
  try {
    if (window.localStorage.getItem(authStorageKey) === null) setStoredAuthState(false);
  } catch {
    // The header can still render its guest layout if storage is unavailable.
  }
}

export default function useHomeAuth() {
  const storedAuth = useStoredAuthState();
  return storedAuth === undefined ? false : storedAuth;
}
