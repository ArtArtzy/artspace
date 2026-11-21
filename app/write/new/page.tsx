import type { Metadata } from "next";
import WriterNewStory from "@/components/WriterNewStory";
import DesktopOnlyNotice from "@/components/DesktopOnlyNotice";

export const metadata: Metadata = { title: "สร้างนิยายใหม่ | ARN SPACE" };

export default function NewStoryPage() {
  return <><WriterNewStory /><DesktopOnlyNotice /></>;
}
