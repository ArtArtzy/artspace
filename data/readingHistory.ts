import type { ReadModeId } from "@/components/ReadSubMenu";
import { getCatalogBookMode } from "@/data/novelDetails";

type OpenedStory = { title: string; openedTitle: string; mode: ReadModeId; episode?: number };

export const readingHistoryKey = "arnspace-reading-history";
export const readingHistoryChangedEvent = "arnspace-reading-history-change";
const historyLimit = 30;

export const sampleReadingHistory = [
  "แสงระหว่างบรรทัด",
  "Not Just Friends (BTS)",
  "การ์ตูนแฟนตาซี: ผู้พิทักษ์แห่งสวนเมฆ",
  "จดหมายจากห้องปิดตาย",
  "Love in Parallel (Harry Potter)",
  "การ์ตูนยูริ: เรือนกระจกของวันพรุ่งนี้",
  "ภาพถ่ายในสายฝน",
  "การ์ตูนไซไฟ: สถานีปลายทางดาวเคราะห์",
  "พันธนาการทิวลิป",
  "Our Classroom (SEVENTEEN)",
  "บ้านเงียบหลังเที่ยงคืน",
  "การ์ตูนวาย: จังหวะหัวใจใต้แสงดาว",
  "ตลาดฝนฮอโลแกรม",
  "Kissed by the Stars (TWICE)",
  "กุหลาบในเงาไฟ",
].map(title => ({ title, openedTitle: title, mode: getCatalogBookMode({ title }) }));

function storyKey({ title, mode }: OpenedStory) {
  return `${mode}:${title}`;
}

function isOpenedStory(value: unknown): value is OpenedStory {
  if (!value || typeof value !== "object") return false;
  const { title, openedTitle, mode } = value as Partial<OpenedStory>;
  return typeof title === "string" && title.length <= 160 && title.trim().length > 0
    && typeof openedTitle === "string" && openedTitle.length <= 160 && openedTitle.trim().length > 0
    && (mode === "novel" || mode === "fanfic" || mode === "cartoon");
}

function readStoredHistory(): OpenedStory[] {
  try {
    const entries: unknown = JSON.parse(window.localStorage.getItem(readingHistoryKey) ?? "[]");
    if (!Array.isArray(entries)) return [];
    const seen = new Set<string>();
    const stories: OpenedStory[] = [];
    for (const entry of entries) {
      if (!isOpenedStory(entry)) continue;
      const key = storyKey(entry);
      if (seen.has(key)) continue;
      seen.add(key);
      const episode = entry.episode;
      stories.push({
        title: entry.title,
        openedTitle: entry.openedTitle,
        mode: entry.mode,
        episode: typeof episode === "number" && Number.isSafeInteger(episode) && episode > 0 ? episode : undefined,
      });
      if (stories.length === historyLimit) break;
    }
    return stories;
  } catch {
    return [];
  }
}

export function readReadingHistory(): OpenedStory[] {
  const history = readStoredHistory();
  const opened = new Set(history.map(storyKey));
  const samples = sampleReadingHistory.filter(story => !opened.has(storyKey(story)));
  return [...history, ...samples].slice(0, historyLimit);
}

export function recordStoryOpen(story: OpenedStory) {
  const { title } = story;
  const entry = { ...story, openedTitle: story.openedTitle.length <= 160 ? story.openedTitle : title };
  if (!isOpenedStory(entry)) return;
  try {
    const history = readStoredHistory();
    const previous = history.find((opened) => storyKey(opened) === storyKey(entry));
    const next = [
      { ...entry, episode: entry.episode ?? previous?.episode },
      ...history.filter((opened) => storyKey(opened) !== storyKey(entry)),
    ].slice(0, historyLimit);
    window.localStorage.setItem(readingHistoryKey, JSON.stringify(next));
    window.dispatchEvent(new Event(readingHistoryChangedEvent));
  } catch {
    // The story remains readable when browser storage is unavailable.
  }
}
