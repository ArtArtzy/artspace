import type { Metadata } from "next";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import WriterProjects from "@/components/WriterProjects";

export const metadata: Metadata = {
  title: "เรื่องของฉัน | Writer Studio | ARN SPACE",
  description: "จัดการงานเขียน ร่างต้นฉบับ และเรื่องทั้งหมดของคุณใน Writer Studio",
};

export default function WriterProjectsPage() {
  return <div className="ds-page-shell min-h-screen"><TopMenu /><WriterProjects /><Footer /></div>;
}
