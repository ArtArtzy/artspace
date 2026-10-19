"use client";

import { useEffect, useState } from "react";
import Registration, { registrationProviders, type RegistrationProvider } from "@/components/Registration";

export default function SocialRegisterPage() {
  const [provider, setProvider] = useState<RegistrationProvider | null>(null);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("provider");
    const match = registrationProviders.find((provider) => provider === selected);
    setProvider(match ?? "Google");
  }, []);

  return provider ? <Registration initialMethod={provider} key={provider} /> : null;
}
