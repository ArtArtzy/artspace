export const writerDraftsKey = "arnspace-writer-drafts";

export type WriterDraft = {
  id: string;
  title: string;
  penName?: string;
  description: string;
  format: "prose" | "chat";
  cover: string;
  category: string;
  tags: string[];
  createdAt: string;
};

export function readWriterDrafts(): WriterDraft[] {
  const saved: unknown = JSON.parse(localStorage.getItem(writerDraftsKey) || "[]");
  if (!Array.isArray(saved)) return [];
  return saved.filter((item): item is WriterDraft => item && typeof item.id === "string" && typeof item.title === "string" && typeof item.description === "string" && typeof item.cover === "string" && typeof item.category === "string" && Array.isArray(item.tags) && item.tags.every((tag: unknown) => typeof tag === "string") && (item.format === "prose" || item.format === "chat") && typeof item.createdAt === "string");
}
