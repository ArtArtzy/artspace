import type { Metadata } from "next";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import WriterProjects from "@/components/WriterProjects";

export const metadata: Metadata = {
  title: "โปรเจกต์ของฉัน | Writer Studio | ARN SPACE",
  description: "จัดการงานเขียน ร่างต้นฉบับ และโปรเจกต์ทั้งหมดของคุณใน Writer Studio",
};

export default function WriterProjectsPage() {
  return <div className="ds-page-shell min-h-screen"><TopMenu /><WriterProjects /><Footer /></div>;
}
