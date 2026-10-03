import ReadModePage from "@/components/ReadModePage";
import NovelDetailPage from "@/components/NovelDetailPage";
import { getNovelDetails } from "@/data/novelDetails";

export default async function FanficPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string | string[] }>;
}) {
  const query = await searchParams;
  const title = Array.isArray(query.title) ? query.title[0] : query.title;
  if (title?.trim())
    return (
      <NovelDetailPage key={title} novel={getNovelDetails(title, "fanfic")} />
    );
  return <ReadModePage mode="fanfic" />;
}
