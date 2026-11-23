"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { communityThreadsByRoom } from "@/components/CommunityFeed";
import CommunityImageAttachment from "@/components/CommunityImageAttachment";
import CommunitySpoilerButton from "@/components/CommunitySpoilerButton";
import useHomeAuth, { getStoredAuthState } from "@/components/useHomeAuth";
import { communityCreateHref, communityRooms, type CommunityRoom } from "@/data/communityRooms";
import { communityTagKey, normalizeCommunityTag, rankCommunityTags } from "@/data/communityTags";
import { saveLocalCommunityThread, useLocalCommunityThreads } from "@/data/localCommunityThreads";

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(reader.error);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function CreateCommunityThreadForm({ initialRoom }: { initialRoom: CommunityRoom }) {
  const isLoggedIn = useHomeAuth();
  const router = useRouter();
  const localPosts = useLocalCommunityThreads();
  const [room, setRoom] = useState(initialRoom);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const bodyInput = useRef<HTMLTextAreaElement>(null);
  const suggestions = rankCommunityTags([...communityThreadsByRoom[room], ...(localPosts ?? []).filter((post) => room === post.room)])
    .filter(({ label }) => communityTagKey(label).includes(communityTagKey(tagInput)))
    .slice(0, 8);

  function toggleTag(label: string) {
    const key = communityTagKey(label);
    setTags((current) => current.some((tag) => communityTagKey(tag) === key)
      ? current.filter((tag) => communityTagKey(tag) !== key)
      : [...current, label]);
    setError("");
  }

  function addTag() {
    const label = normalizeCommunityTag(tagInput);
    if (!label) return;
    if (!tags.some((tag) => communityTagKey(tag) === communityTagKey(label))) toggleTag(label);
    setTagInput("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLoggedIn || saving) return;
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    const pendingTag = normalizeCommunityTag(tagInput);
    const postTags = pendingTag && !tags.some((tag) => communityTagKey(tag) === communityTagKey(pendingTag))
      ? [...tags, pendingTag]
      : tags;
    if (!title || !body || !postTags.length) {
      setError("กรอกหัวข้อ เนื้อหา และเลือกหรือเพิ่มแท็กอย่างน้อย 1 แท็ก");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const attachment = image ? await readImage(image) : undefined;
      if (getStoredAuthState() !== true) return;
      const id = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("");
      const slug = `local-${id}`;
      saveLocalCommunityThread({
        slug,
        room,
        title,
        body,
        tags: postTags,
        updatedAt: Date.now(),
        age: "เมื่อสักครู่",
        user: "คุณ",
        avatar: "/images/profile-arn.webp",
        badge: communityRooms[room].label,
        badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
        likes: "0",
        views: 0,
        image: attachment,
        imageAlt: attachment ? "ภาพแนบในกระทู้" : undefined,
      });
      router.push(`/community/posts/${slug}`);
    } catch {
      setError("บันทึกกระทู้ในเบราว์เซอร์ไม่สำเร็จ ลองลดขนาดรูปภาพแล้วบันทึกอีกครั้ง");
    } finally {
      setSaving(false);
    }
  }

  if (isLoggedIn === null) return null;

  if (!isLoggedIn) {
    return (
      <Link className="ds-button-primary min-h-11 px-ds-4" href={`/login?returnTo=${encodeURIComponent(communityCreateHref(initialRoom))}`}>
        เข้าสู่ระบบเพื่อตั้งกระทู้
      </Link>
    );
  }

  return (
    <form className="space-y-ds-4" onSubmit={submit}>
      <div className="space-y-ds-2">
        <label className="block text-ds-body-sm font-medium" htmlFor="community-thread-room">ห้อง</label>
        <select className="ds-input block w-full px-ds-3 py-ds-2 text-ds-body" value={room} onChange={(event) => setRoom(event.target.value as CommunityRoom)} id="community-thread-room" name="room">
          {Object.entries(communityRooms).map(([id, { label }]) => <option key={id} value={id}>{label}</option>)}
        </select>
      </div>
      <div className="space-y-ds-2">
        <label className="block text-ds-body-sm font-medium" htmlFor="community-thread-title">หัวข้อกระทู้</label>
        <input className="ds-input block w-full px-ds-3 py-ds-2 text-ds-body" id="community-thread-title" maxLength={120} name="title" required />
      </div>
      <div className="space-y-ds-2">
        <label className="block text-ds-body-sm font-medium" htmlFor="community-thread-body">เนื้อหากระทู้</label>
        <textarea className="ds-input block w-full resize-y px-ds-3 py-ds-2 text-ds-body" id="community-thread-body" maxLength={4000} name="body" ref={bodyInput} required rows={6} />
        <CommunitySpoilerButton field={bodyInput} />
      </div>
      <fieldset className="space-y-ds-2">
        <legend className="text-ds-body-sm font-medium">แท็ก</legend>
        {tags.length > 0 && (
          <div aria-label="แท็กที่เลือก" className="flex flex-wrap gap-ds-2" role="group">
            {tags.map((tag) => (
              <button aria-label={`นำแท็ก ${tag} ออก`} className="ds-button-secondary min-h-9 px-ds-2 text-arn-accent-soft" key={tag} onClick={() => toggleTag(tag)} type="button">
                #{tag} <span aria-hidden="true" className="ml-ds-1">×</span>
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-ds-2">
          <input
            aria-label="ค้นหาหรือเพิ่มแท็ก"
            className="ds-input min-h-11 min-w-0 flex-1 px-ds-3 text-ds-body"
            maxLength={33}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                event.preventDefault();
                addTag();
              }
            }}
            placeholder="ค้นหาหรือเพิ่มแท็กใหม่"
            value={tagInput}
          />
          <button className="ds-button-secondary min-h-11 shrink-0 px-ds-3 disabled:opacity-50" disabled={!normalizeCommunityTag(tagInput)} onClick={addTag} type="button">เพิ่มแท็ก</button>
        </div>
        {suggestions.length > 0 && (
          <div aria-label="แท็กในระบบ" className="flex flex-wrap gap-ds-2" role="group">
            {suggestions.map(({ label }) => {
              const active = tags.some((tag) => communityTagKey(tag) === communityTagKey(label));
              return (
                <button
                  aria-pressed={active}
                  className={`min-h-9 px-ds-2 ${active ? "ds-button-primary" : "ds-button-secondary"}`}
                  key={label}
                  onClick={() => { toggleTag(label); setTagInput(""); }}
                  type="button"
                >
                  #{label}
                </button>
              );
            })}
          </div>
        )}
      </fieldset>
      <CommunityImageAttachment id="community-thread-image" image={image} onChange={(file) => { setImage(file); setError(""); }} />
      {error && <p className="text-ds-body-sm text-arn-muted" role="alert">{error}</p>}
      <div className="flex flex-wrap items-center gap-ds-3">
        <button className="ds-button-primary min-h-11 px-ds-5 disabled:opacity-50" disabled={saving} type="submit">{saving ? "กำลังบันทึก…" : "ตั้งกระทู้"}</button>
        <p className="text-ds-meta text-arn-muted">กระทู้และรูปจะบันทึกในเบราว์เซอร์นี้</p>
      </div>
    </form>
  );
}
