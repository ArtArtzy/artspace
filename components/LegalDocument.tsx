import Link from "next/link";
import auth from "@/app/login/Login.module.css";
import styles from "./LegalDocument.module.css";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalDocumentProps = {
  title: string;
  description: string;
  sections: LegalSection[];
  source: "arnspace" | "arnbook";
  home: string;
};

export default function LegalDocument({ title, description, sections, source, home }: LegalDocumentProps) {
  const registerHref = `/register?from=${source}&returnTo=${encodeURIComponent(home)}`;

  return (
    <div className={`legal-page min-h-svh bg-arn-canvas text-arn-text ${styles.page}`}>
      <header className={auth.topbar}>
        <Link href={home} className={auth.wordmark} aria-label="ARN หน้าหลัก">
          ARN<span>บัญชีเดียว ทุกเรื่องราว</span>
        </Link>
        <Link href={registerHref} className={auth.back}>
          <span aria-hidden="true">←</span> กลับไปสมัครสมาชิก
        </Link>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-ds-4 py-ds-8 sm:px-ds-8 sm:py-ds-12 lg:px-ds-12">
        <div className="mb-ds-8 max-w-3xl sm:mb-ds-10">
          <p className="mb-ds-3 text-ds-body-sm font-medium text-arn-accent">ARN Book & ARN Space</p>
          <h1 className="text-ds-h2 leading-normal sm:text-ds-h1 sm:leading-normal">{title}</h1>
          <p className="mt-ds-3 text-ds-body leading-relaxed text-arn-muted">
            {description}
          </p>
          <p className="mt-ds-4 text-ds-meta leading-relaxed text-arn-subtle">ปรับปรุงล่าสุด <time dateTime="2026-11-17">17 พฤศจิกายน 2569</time></p>
        </div>

        <div className="grid items-start gap-ds-6 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-ds-10">
          <aside className="ds-card p-ds-5 lg:sticky lg:top-ds-6">
            <nav aria-label={`สารบัญ${title}`}>
              <h2 className="mb-ds-3 text-ds-body font-semibold">สารบัญ</h2>
              <ol className="grid gap-ds-1 sm:grid-cols-2 lg:grid-cols-1">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <Link href={`#${section.id}`} className="flex min-h-11 items-center gap-ds-3 rounded-ds-sm px-ds-2 py-ds-2 text-ds-body-sm text-arn-muted transition-colors hover:bg-arn-soft hover:text-arn-accent">
                      <span className="shrink-0 text-arn-subtle">{index + 1}.</span>
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="mb-ds-6 rounded-ds-md border border-arn-border bg-arn-raised p-ds-4 text-ds-body-sm leading-relaxed text-arn-muted">
              <p className="mb-ds-1 font-medium text-arn-text">เอกสารตัวอย่างสำหรับเว็บไซต์ต้นแบบ</p>
              <p>เนื้อหาในหน้านี้เป็นข้อมูลสมมุติเพื่อสาธิตการแสดงผลของ ARN</p>
            </div>

            <article aria-label={`รายละเอียด${title}`} className="ds-card divide-y divide-arn-border px-ds-5 sm:px-ds-8">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-ds-6 py-ds-6 sm:py-ds-8">
                  <h2 id={`${section.id}-title`} className="mb-ds-4 text-ds-h3 leading-relaxed">
                    <span className="mr-ds-2 text-arn-accent">{index + 1}.</span>{section.title}
                  </h2>
                  <div className="space-y-ds-3 text-ds-body leading-loose text-arn-muted">
                    {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                    {section.items && (
                      <ul className="list-disc space-y-ds-2 pl-ds-5 marker:text-arn-accent">
                        {section.items.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </article>

            <div className="mt-ds-6 flex flex-col gap-ds-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href={registerHref} className="ds-button-primary inline-flex min-h-12 items-center justify-center px-ds-6 text-ds-body font-medium">กลับไปสมัครสมาชิก</Link>
              <Link href="#top" className="inline-flex min-h-11 items-center justify-center gap-ds-2 text-ds-body-sm text-arn-muted hover:text-arn-accent">กลับขึ้นด้านบน <span aria-hidden="true">↑</span></Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="mx-auto max-w-6xl px-ds-4 pb-ds-8 pt-ds-4 text-center text-ds-meta leading-relaxed text-arn-subtle">ARN · บัญชีเดียว ทุกเรื่องราว</footer>
    </div>
  );
}
