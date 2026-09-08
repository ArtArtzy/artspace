export type StoryStatus = "completed" | "ongoing";

type StoryStatusSource = {
  title: string;
  episodes: string;
  status?: StoryStatus;
};

export function resolveStoryStatus(book: StoryStatusSource): StoryStatus {
  if (book.status) return book.status;

  const titleScore = Array.from(book.title).reduce(
    (score, character, index) => score + character.charCodeAt(0) * (index + 1),
    0,
  );
  const episodeCount = Number.parseInt(book.episodes, 10) || 0;

  return (titleScore + episodeCount) % 2 === 0 ? "completed" : "ongoing";
}
