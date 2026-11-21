import type { ReadModeId } from "@/components/ReadSubMenu";
import StoryMetadata from "@/components/StoryMetadata";
import type { CategoryBook } from "@/data/categoryBooks";
import { resolveStoryStatus } from "@/data/storyStatus";

type BookCardInfoProps = {
  title: string;
  author?: string;
  mode?: ReadModeId;
  format?: CategoryBook["format"];
  stats?: Pick<CategoryBook, "episodes" | "views" | "likes">;
  compact?: boolean;
};

export default function BookCardInfo({ title, author, mode, format, stats, compact = false }: BookCardInfoProps) {
  const isCartoon = mode === "cartoon";
  return (
    <div data-book-info className={compact ? "min-w-0" : "mt-ds-2 min-w-0"}>
      <h3 data-book-title className={`line-clamp-2 break-words text-ds-body font-medium text-white ${compact ? "" : "min-h-[3.2em]"}`} title={title}>
        {(isCartoon || mode === "fanfic") && (
          <svg aria-hidden="true" data-book-mode={mode} className={`mr-ds-1 inline-block h-4 w-4 align-middle ${isCartoon ? "text-section-cartoon" : "text-section-fanfic"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d={isCartoon ? "M15 8.7a4.4 4.4 0 1 0 0 6.6" : "M15 7.8h-5.5v8.4m0-4.2H14"} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {format === "chat" && (
          <svg aria-hidden="true" data-book-format="chat" className="mr-ds-1 inline-block h-4 w-4 align-middle text-arn-accent-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
            <path d="M11 18.5h2" strokeLinecap="round" />
          </svg>
        )}
        {title}
      </h3>
      {author && <p data-book-author className="truncate text-ds-body text-arn-muted" title={author}>{author}</p>}
      {stats && <StoryMetadata episodes={stats.episodes} views={stats.views} likes={stats.likes} />}
    </div>
  );
}

export function BookCompletedBadge({ book, position = "right-ds-2 top-ds-2" }: {
  book: Pick<CategoryBook, "title" | "episodes" | "status">;
  position?: string;
}) {
  if (resolveStoryStatus(book) !== "completed") return null;
  return <span className={`absolute z-30 rounded-ds-sm bg-arn-accent px-ds-2 py-ds-1 text-ds-meta font-medium text-arn-accent-ink ${position}`}>จบ</span>;
}
