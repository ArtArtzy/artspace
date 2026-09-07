import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopMenu from "@/components/TopMenu";
import { recommendedWriters } from "@/components/writerData";

type WriterProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WriterProfilePage({ params }: WriterProfilePageProps) {
  const { slug } = await params;
  const writer = recommendedWriters.find((item) => item.slug === slug);

  if (!writer) notFound();

  return (
    <main className="min-h-screen bg-[#0D0F0E] text-white">
      <TopMenu />
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-[112px] sm:px-8">
        <Link className="mb-7 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-[#2ee77b]" href="/writers">
          <span aria-hidden="true">←</span> กลับไปหน้านักเขียน
        </Link>
        <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#14251c] to-[#101513]">
          <div className="h-32 bg-[radial-gradient(circle_at_20%_10%,rgba(46,231,123,.22),transparent_40%),linear-gradient(120deg,#173a29,#101513)] sm:h-44" />
          <div className="px-5 pb-8 sm:px-10 sm:pb-10">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-[#101513] bg-[#18211d] shadow-[0_0_0_1px_rgba(46,231,123,.6)] sm:h-32 sm:w-32">
                  <Image alt={`รูปโปรไฟล์ ${writer.name}`} className="object-cover" fill sizes="128px" src={writer.image} />
                </div>
                <div className="pb-1">
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2ee77b]">{writer.type}</p>
                  <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{writer.name}</h1>
                </div>
              </div>
              <Link className="inline-flex h-10 items-center justify-center rounded-full border border-[#18bd55] px-6 text-sm font-medium text-[#2ee77b] transition hover:bg-[#18bd55] hover:text-[#07100b]" href="/login">
                ติดตามนักเขียน
              </Link>
            </div>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/65">{writer.bio}</p>
            <div className="mt-7 flex gap-8 border-t border-white/[0.08] pt-5 text-sm">
              <div><strong className="block text-lg text-white">{writer.followers}</strong><span className="text-white/45">ผู้ติดตาม</span></div>
              <div><strong className="block text-lg text-white">{writer.works}</strong><span className="text-white/45">ผลงาน</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
