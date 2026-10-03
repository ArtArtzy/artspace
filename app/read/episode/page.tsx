import { notFound } from "next/navigation";
import StoryReaderPage from "@/components/StoryReaderPage";
import { getNovelDetails } from "@/data/novelDetails";
import type { ReadModeId } from "@/components/ReadSubMenu";

const modes: ReadModeId[] = ["novel", "fanfic", "cartoon"];

export default async function EpisodePage({
  searchParams,
}: {
  searchParams: Promise<{
    title?: string | string[];
    episode?: string | string[];
    mode?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const title = Array.isArray(query.title) ? query.title[0] : query.title;
  const rawEpisode = Array.isArray(query.episode)
    ? query.episode[0]
    : query.episode;
  const rawMode = Array.isArray(query.mode) ? query.mode[0] : query.mode;
  const episodeNumber = Number.parseInt(rawEpisode ?? "", 10);
  if (!title?.trim() || !Number.isFinite(episodeNumber)) notFound();

  const mode = modes.includes(rawMode as ReadModeId)
    ? (rawMode as ReadModeId)
    : undefined;
  const novel = getNovelDetails(title, mode);
  const episode = novel.episodes.find((item) => item.number === episodeNumber);
  if (!episode || episode.locked) notFound();

  return <StoryReaderPage novel={novel} episode={episode} />;
}
