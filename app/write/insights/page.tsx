import type { Metadata } from "next";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import WriterInsights from "@/components/WriterInsights";

export const metadata: Metadata = { title: "ข้อมูลเชิงลึก | Writer Studio | ARN SPACE", description: "เข้าใจผลงานและผู้อ่านของคุณ ผ่านยอดอ่าน การอ่านจบ และความคิดเห็นใน Writer Studio" };
export default function WriterInsightsPage() {
  return <div className="ds-page-shell min-h-screen"><TopMenu /><WriterInsights /><Footer /></div>;
}
