import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommunitySidebar from "@/components/CommunitySidebar";
import { feedPosts } from "@/components/CommunityFeed";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";

type CommunityPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return feedPosts.map((post) => ({ slug: post.slug }));
}

export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { slug } = await params;
  const post = feedPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#080d0b] pt-[82px] text-white">
      <TopMenu fixed />
      <section className="mx-auto grid max-w-[1400px] gap-5 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-8">
        <article className="min-w-0 rounded-xl border border-[#1c332a] bg-[linear-gradient(140deg,#101e18_0%,#0b1512_100%)] p-5 sm:p-7">
          <Link className="inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-[#2ee77b]" href="/community">
            <span aria-hidden="true">←</span> กลับไปหน้าชุมชน
          </Link>

          <header className="mt-6 flex items-center gap-3">
            <Image alt={`รูปโปรไฟล์ ${post.user}`} className="h-10 w-10 rounded-full border border-white/20 object-cover" height={40} src={post.avatar} width={40} />
            <div>
              <p className="text-sm font-medium text-white">{post.user}</p>
              <p className="mt-0.5 text-[11px] text-white/45">{post.age}</p>
            </div>
            <span className={`ml-1 rounded-md px-2.5 py-1 text-[10px] font-semibold ${post.badgeClass}`}>{post.badge}</span>
          </header>

          <h1 className="mt-5 text-2xl font-semibold leading-tight text-white sm:text-3xl">{post.title}</h1>
          <p className="mt-4 text-sm leading-7 text-white/70">{post.body}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/65">{tag}</span>)}
          </div>

          {post.image && (
            <div className="relative mt-6 aspect-[4/5] max-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-[#14221c] sm:w-[320px]">
              <Image alt={post.imageAlt ?? "ภาพประกอบโพสต์"} className="object-cover" fill sizes="(max-width: 640px) 100vw, 320px" src={post.image} />
            </div>
          )}

          {post.gallery && (
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {post.gallery.map((item, index) => (
                <div className="min-w-0" key={item.image}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-[#14221c]">
                    <Image alt={`${post.galleryAlt ?? "ภาพปกนิยาย"} ${index + 1}`} className="object-cover" fill sizes="(max-width: 640px) 45vw, 260px" src={item.image} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-center text-xs leading-4 text-white/75">{item.title}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-6 border-t border-white/[0.08] pt-4 text-xs text-white/55">
            <span>♡ {post.stats[0]}</span>
            <span>◯ {post.stats[1]}</span>
            <span>▢ {post.stats[2]}</span>
          </div>
        </article>

        <CommunitySidebar />
      </section>
      <Footer />
    </main>
  );
}
