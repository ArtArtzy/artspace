import Image from "next/image";
import Link from "next/link";
import CommunityReplyForm from "@/components/CommunityReplyForm";
import CommunitySidebar from "@/components/CommunitySidebar";
import CommunitySpoilerText from "@/components/CommunitySpoilerText";
import CommunityTagLinks from "@/components/CommunityTagLinks";
import { formatThreadViews, type FeedPost } from "@/components/CommunityFeed";
import { getCommunityReplies, getCommunityReplyCount } from "@/data/communityReplies";
import { communityRooms, communitySectionHref, type CommunityRoom } from "@/data/communityRooms";
import { communityThreadTime } from "@/data/communityThreadTime";

function CommentContent({ id, author, body, postSlug }: { id: string; author: string; body: string; postSlug: string }) {
  return (
    <div className="flex gap-ds-3">
      <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-arn-border bg-arn-surface-soft text-ds-body-sm font-medium text-arn-accent-soft">
        {author[0]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-ds-body-sm font-medium text-arn-text">{author}</p>
        <p className="mt-ds-1 whitespace-pre-wrap break-words text-ds-body text-arn-muted"><CommunitySpoilerText text={body} /></p>
        <CommunityReplyForm comment={{ id, author }} postSlug={postSlug} />
      </div>
    </div>
  );
}

export default function CommunityPostContent({ post, room }: { post: FeedPost; room?: CommunityRoom }) {
  const { slug } = post;
  const replies = getCommunityReplies(slug);
  const replyCount = getCommunityReplyCount(slug);
  const localAttachment = post.image?.startsWith("data:") ?? false;

  return (
    <section className="mx-auto grid max-w-[1400px] gap-5 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-8">
      <article className="ds-card min-w-0 p-5 sm:p-7">
        <Link className="inline-flex items-center gap-2 text-ds-meta text-arn-muted transition hover:text-arn-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={communitySectionHref(room ?? "general")}>
          <span aria-hidden="true">←</span> กลับไป{room ? communityRooms[room].label : "หน้าชุมชน"}
        </Link>

        <header className="mt-6 flex items-center gap-3">
          <Image alt={`รูปโปรไฟล์ ${post.user}`} className="h-10 w-10 rounded-full border border-white/20 object-cover" height={40} src={post.avatar} width={40} />
          <div>
            <p className="text-sm font-medium text-white">{post.user}</p>
            <p className="mt-0.5 text-ds-meta text-arn-muted">{room ? "อัปเดตล่าสุด " : ""}{communityThreadTime(post)}</p>
          </div>
          <span className={`ml-1 rounded-md px-2.5 py-1 text-[10px] font-semibold ${post.badgeClass}`}>{post.badge}</span>
        </header>

        <h1 className="mt-5 text-2xl font-semibold leading-tight text-white sm:text-3xl">{post.title}</h1>
        <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-white/70"><CommunitySpoilerText text={post.body} /></p>

        <div className="mt-5">
          {room ? <CommunityTagLinks room={room} tags={post.tags} /> : (
            <div className="flex flex-wrap gap-ds-2">
              {post.tags.map((tag) => <span key={tag} className="rounded-full border border-arn-border px-ds-3 py-ds-1 text-ds-meta text-arn-muted">#{tag.replace(/^#/, "")}</span>)}
            </div>
          )}
        </div>

        {post.image && (
          <div className={`relative mt-ds-6 max-h-[520px] overflow-hidden rounded-ds-md border border-arn-border bg-arn-surface-soft ${localAttachment ? "aspect-video w-full" : "aspect-[4/5] sm:w-[320px]"}`}>
            <Image alt={post.imageAlt ?? "ภาพประกอบโพสต์"} className={localAttachment ? "object-contain" : "object-cover"} fill sizes={localAttachment ? "(max-width: 1024px) 100vw, 960px" : "(max-width: 640px) 100vw, 320px"} src={post.image} unoptimized={localAttachment} />
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

        <div className="mt-ds-6 flex flex-wrap items-center gap-ds-4 border-t border-arn-border pt-ds-4 text-ds-meta text-arn-muted">
          <span><span aria-hidden="true">♡</span> {post.likes} ถูกใจ</span>
          <a className="hover:text-arn-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href="#community-replies">
            {replyCount} ความคิดเห็น
          </a>
          <span>เข้าชม {formatThreadViews(post.views)} ครั้ง</span>
        </div>

        <section className="mt-ds-6 scroll-mt-24" id="community-replies" aria-labelledby="community-replies-title">
          <h2 className="text-ds-h3" id="community-replies-title">ความคิดเห็น ({replyCount})</h2>
          {replies.length > 0 ? (
            <ul className="mt-ds-3 divide-y divide-arn-border">
              {replies.map(({ id, author, body, reply }) => (
                <li className="py-ds-3" key={id}>
                  <CommentContent author={author} body={body} id={id} postSlug={slug} />
                  {reply && (
                    <ul aria-label={`คำตอบถึง ${author}`} className="ml-ds-3 mt-ds-2 border-l-2 border-arn-border pl-ds-3 sm:ml-ds-6">
                      <li><CommentContent {...reply} postSlug={slug} /></li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-ds-3 text-ds-body-sm text-arn-muted">ยังไม่มีความคิดเห็น</p>
          )}
        </section>

        <div className="mt-ds-4"><CommunityReplyForm postSlug={slug} /></div>
      </article>

      <div className="hidden lg:block"><CommunitySidebar room={room} /></div>
    </section>
  );
}
