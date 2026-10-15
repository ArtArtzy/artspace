import type { Metadata } from "next";
import BadgeCollection from "@/components/BadgeCollection";

export const metadata: Metadata = { title: "Badge ของฉัน | ARN SPACE" };

export default function ProfileBadgesPage() {
  return <BadgeCollection />;
}
