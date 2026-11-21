import ReadModePage from "@/components/ReadModePage";
import NovelDetailPage from "@/components/NovelDetailPage";
import { getNovelDetails } from "@/data/novelDetails";
import { HomeBookCollection } from "@/components/BookDiscovery";

export default async function ReadPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string | string[]; homeSection?: string | string[]; category?: string | string[]; page?: string | string[] }>;
}) {
  const query = await searchParams;
  const title = Array.isArray(query.title) ? query.title[0] : query.title;
  if (title?.trim())
    return <NovelDetailPage key={title} novel={getNovelDetails(title)} />;
  if (typeof query.homeSection === "string") {
    const page = typeof query.page === "string" && /^[1-9]\d*$/.test(query.page) ? Number(query.page) : 1;
    return <HomeBookCollection section={query.homeSection} page={Number.isSafeInteger(page) ? page : 1} />;
  }
  return <ReadModePage mode="novel" category={typeof query.category === "string" ? query.category : undefined} />;
}
