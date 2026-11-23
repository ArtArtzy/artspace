import { notFound } from "next/navigation";
import CommunityPostContent from "@/components/CommunityPostContent";
import LocalCommunityPost from "@/components/LocalCommunityPost";
import { communityThreadPosts, findCommunityThreadRoom } from "@/components/CommunityFeed";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";
import { isLocalCommunityThread } from "@/data/communityRooms";

type CommunityPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return communityThreadPosts.map((post) => ({ slug: post.slug }));
}

export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { slug } = await params;
  const post = communityThreadPosts.find((item) => item.slug === slug);

  if (!post && !isLocalCommunityThread(slug)) notFound();

  return (
    <main className="ds-page-shell min-h-screen pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      {post ? <CommunityPostContent post={post} room={findCommunityThreadRoom(slug)} /> : <LocalCommunityPost slug={slug} />}
      <Footer responsive />
    </main>
  );
}
