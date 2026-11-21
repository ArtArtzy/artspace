import type { ReactNode } from "react";
import DesktopOnlyNotice from "@/components/DesktopOnlyNotice";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}<DesktopOnlyNotice /></>;
}
