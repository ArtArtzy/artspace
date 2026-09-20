import TopMenu from "@/components/TopMenu";

export default function WritePage() {
  return (
    <main className="ds-page-shell min-h-screen">
      <TopMenu />
      <section className="mx-auto flex min-h-[calc(100vh-82px)] max-w-[1400px] items-center justify-center bg-arn-canvas px-8 py-20">
        <div className="text-center">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.35em] text-arn-accent-strong">ARN SPACE</p>
          <h1 className="text-ds-h1 tracking-tight text-arn-text">เขียน</h1>
          <p className="mt-4 text-ds-body text-arn-muted">พื้นที่สำหรับเริ่มต้นเรื่องราวของคุณ</p>
        </div>
      </section>
    </main>
  );
}
