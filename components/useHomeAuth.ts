"use client";

import { useEffect, useState } from "react";
import { authStateChangedEvent } from "@/components/TopMenu";

export default function useHomeAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const syncAuthState = () => {
      try {
        setIsLoggedIn(window.localStorage.getItem("arnspace-authenticated") === "true");
      } catch {
        setIsLoggedIn(false);
      }
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener(authStateChangedEvent, syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener(authStateChangedEvent, syncAuthState);
    };
  }, []);

  return isLoggedIn;
}
