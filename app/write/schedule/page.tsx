import type { Metadata } from "next";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import WriterSchedule from "@/components/WriterSchedule";

export const metadata: Metadata = { title: "ตารางเผยแพร่ | Writer Studio | ARN SPACE", description: "วางแผน จัดการ และติดตามการเผยแพร่ผลงานใน Writer Studio" };
export default function WriterSchedulePage() { return <div className="ds-page-shell min-h-screen"><TopMenu /><WriterSchedule /><Footer /></div>; }
