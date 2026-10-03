import ReadModePage from "@/components/ReadModePage";
import NovelDetailPage from "@/components/NovelDetailPage";
import { getNovelDetails } from "@/data/novelDetails";

export default async function CartoonPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string | string[] }>;
}) {
  const query = await searchParams;
  const title = Array.isArray(query.title) ? query.title[0] : query.title;
  if (title?.trim())
    return (
      <NovelDetailPage key={title} novel={getNovelDetails(title, "cartoon")} />
    );
  return <ReadModePage mode="cartoon" />;
}
