import Link from "next/link";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";
import { communityRooms, communitySectionHref, type CommunityRoom } from "@/data/communityRooms";
import CreateCommunityThreadForm from "./CreateCommunityThreadForm";

export default async function CommunityCreatePage({ searchParams }: { searchParams: Promise<{ room?: string | string[] }> }) {
  const { room } = await searchParams;
  const initialRoom = typeof room === "string" && Object.hasOwn(communityRooms, room) ? room as CommunityRoom : "general";

  return (
    <main className="ds-page-shell min-h-screen pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      <div className="mx-auto max-w-3xl px-ds-4 py-ds-8">
        <section aria-labelledby="create-community-thread-title" className="ds-card p-ds-5 sm:p-ds-7">
          <Link className="text-ds-body-sm text-arn-muted hover:text-arn-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={communitySectionHref(initialRoom)}>
            <span aria-hidden="true">←</span> กลับไป{communityRooms[initialRoom].label}
          </Link>
          <h1 className="mb-ds-5 mt-ds-4 text-ds-h2" id="create-community-thread-title">ตั้งกระทู้</h1>
          <CreateCommunityThreadForm initialRoom={initialRoom} key={initialRoom} />
        </section>
      </div>
      <Footer responsive />
    </main>
  );
}
