export function communityThreadTime(post: { age: string; updatedAt?: number }) {
  if (post.updatedAt === undefined) return post.age;
  const minutes = Math.max(0, Math.floor((Date.now() - post.updatedAt) / 60_000));
  if (minutes < 1) return "เมื่อสักครู่";
  if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
  return `${Math.floor(hours / 24)} วันที่แล้ว`;
}
