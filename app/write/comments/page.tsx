import type { Metadata } from "next";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import WriterComments from "@/components/WriterComments";

export const metadata: Metadata = { title: "ความคิดเห็น | Writer Studio | ARN SPACE", description: "พูดคุยกับนักอ่าน ติดตามความคิดเห็น และสร้างชุมชนรอบผลงานของคุณ" };
export default function WriterCommentsPage() {
  return <div className="ds-page-shell min-h-screen"><TopMenu /><WriterComments /><Footer /></div>;
}
