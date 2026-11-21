import type { ReactNode } from "react";
import DesktopOnlyNotice from "@/components/DesktopOnlyNotice";

export default function SocialRegisterLayout({ children }: { children: ReactNode }) {
  return <>{children}<DesktopOnlyNotice /></>;
}
