import type { Metadata } from "next";
import ReaderProfile from "@/components/ReaderProfile";

export const metadata: Metadata = { title: "โปรไฟล์ของฉัน | ARN SPACE" };

export default function ProfilePage() {
  return <ReaderProfile />;
}
