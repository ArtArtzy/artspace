import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import WriterStudio from "@/components/WriterStudio";

export default function WritePage() {
  return (
    <div className="ds-page-shell min-h-screen">
      <TopMenu sticky />
      <WriterStudio />
      <Footer />
    </div>
  );
}
