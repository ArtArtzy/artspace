import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HomeBannerArt from "@/components/HomeBannerArt";
import { homeEvents } from "@/data/homeBanners";
import auth from "@/app/login/Login.module.css";

type EventPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return homeEvents.map(event => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = homeEvents.find(item => item.slug === slug);
  return { title: `${event?.title ?? "กิจกรรม"} | ARN SPACE`, description: event?.description };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = homeEvents.find(item => item.slug === slug);
  if (!event) notFound();

  return (
    <div className="event-detail-page min-h-svh bg-arn-canvas text-arn-text">
      <header className={auth.topbar}>
        <Link href="/" className={auth.wordmark} aria-label="ARN หน้าหลัก">ARN<span>ทุกเรื่องราวเริ่มต้นได้เสมอ</span></Link>
        <Link href="/" className={auth.back}><span aria-hidden="true">←</span> กลับหน้าหลัก</Link>
      </header>
      <main className="mx-auto max-w-5xl px-ds-4 py-ds-6 md:px-ds-8 md:py-ds-10">
        <div className="overflow-hidden rounded-ds-lg">
          <HomeBannerArt id={event.bannerId} alt={`${event.title} — ${event.description}`} eager className="block aspect-[4/5] h-auto w-full object-cover md:aspect-[2/1] xl:aspect-[3/1]" />
        </div>
        <article className="ds-card mt-ds-6 p-ds-5 md:p-ds-8">
          <p className="mb-ds-3 text-ds-body-sm text-arn-accent">กิจกรรมชุมชน ARN SPACE</p>
          <h1 className="text-ds-h2 leading-relaxed md:text-ds-h1 md:leading-relaxed">{event.title}</h1>
          <p className="mt-ds-4 max-w-2xl text-ds-body leading-loose text-arn-muted">{event.description}</p>
          <h2 className="mb-ds-4 mt-ds-8 text-ds-h3">เริ่มต้นได้อย่างไร</h2>
          <ol className="list-decimal space-y-ds-3 pl-ds-5 text-ds-body leading-loose text-arn-muted marker:text-arn-accent">
            {event.steps.map(step => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-ds-6 text-ds-body-sm leading-relaxed text-arn-subtle">กิจกรรมตัวอย่างสำหรับเว็บไซต์ต้นแบบ คุณสามารถลองสำรวจหน้าเขียนเรื่องและพื้นที่ชุมชนได้</p>
          <div className="mt-ds-6 flex flex-col gap-ds-3 sm:flex-row">
            <Link href={event.actionHref} className="ds-button-primary inline-flex min-h-11 items-center justify-center px-ds-5 text-ds-body-sm font-medium">{event.actionLabel}</Link>
            <Link href="/community?section=events" className="ds-button-secondary inline-flex min-h-11 items-center justify-center px-ds-5 text-ds-body-sm">ดูพื้นที่กิจกรรมในชุมชน</Link>
          </div>
        </article>
      </main>
    </div>
  );
}
