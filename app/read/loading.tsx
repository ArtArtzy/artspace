import CompactPageHeader from "@/components/CompactPageHeader";
import Footer from "@/components/Footer";

export default function ReadLoading() {
  return (
    <main className="ds-page-shell min-h-screen" data-read-catalog>
      <CompactPageHeader backHref="/" backLabel="กลับหน้าหลัก" context="อ่านเรื่อง" title="กำลังโหลด" />
      <div
        className="mx-auto max-w-[1400px] px-8 py-12"
        role="status"
        aria-live="polite"
      >
        <p className="mb-8 text-ds-body text-arn-muted">
          กำลังเตรียมเรื่องราวให้คุณอ่าน...
        </p>
        <div
          aria-hidden="true"
          className="grid animate-pulse grid-cols-[96px_minmax(0,1fr)] gap-ds-4 motion-reduce:animate-none md:grid-cols-[240px_minmax(0,1fr)] md:gap-ds-8"
        >
          <div className="aspect-[2/3] rounded-ds-lg bg-arn-raised" />
          <div className="space-y-5">
            <div className="h-8 w-3/4 rounded bg-arn-raised" />
            <div className="h-5 w-1/3 rounded bg-arn-raised" />
            <div className="h-32 rounded bg-arn-raised" />
          </div>
        </div>
      </div>
      <Footer responsive />
    </main>
  );
}
