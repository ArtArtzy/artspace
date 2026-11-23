import Link from "next/link";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";
import { communityRooms, type CommunityRoom } from "@/data/communityRooms";
import { communityRules } from "@/data/communityRules";
import { communityRoomHref } from "@/data/communityTags";

export const metadata = {
  title: "กติกาชุมชน | ARN SPACE",
};

export default async function CommunityRulesPage({ searchParams }: { searchParams: Promise<{ room?: string | string[] }> }) {
  const { room } = await searchParams;
  const returnRoom = typeof room === "string" && Object.hasOwn(communityRooms, room) ? room as CommunityRoom : "general";

  return (
    <main className="ds-page-shell min-h-screen pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      <article className="mx-auto max-w-3xl px-ds-4 py-ds-8">
        <Link className="text-ds-body-sm text-arn-muted hover:text-arn-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={communityRoomHref(returnRoom)}>
          <span aria-hidden="true">←</span> กลับไป{communityRooms[returnRoom].label}
        </Link>
        <div className="ds-card mt-ds-4 p-ds-5 sm:p-ds-7">
          <h1 className="text-ds-h2">กติกาชุมชน</h1>
          <ol className="mt-ds-5 divide-y divide-arn-border">
            {communityRules.map(({ title, details }, index) => (
              <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-ds-3 py-ds-4 first:pt-0 last:pb-0" key={title}>
                <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-arn-surface-soft text-ds-meta text-arn-accent-soft">{index + 1}</span>
                <div>
                  <h2 className="text-ds-h3">{title}</h2>
                  <p className="mt-ds-1 text-ds-body text-arn-muted">{details}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </article>
      <Footer responsive />
    </main>
  );
}
