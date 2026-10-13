"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./WriterComments.module.css";

const groups = [
  { name: "ใบหน้า", emojis: "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥳 🤩 🥹 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🫣 🤭 🤫 🤥 😶 😐 😑 🙄 😬 😮 😯 😲 🥱 😴 🤤 😪 😵 🤐 🤢 🤮 🤧 😷 🤒 🤕" },
  { name: "หัวใจและมือ", emojis: "❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 🩷 🩵 🩶 💔 ❤️‍🔥 ❤️‍🩹 💕 💞 💓 💗 💖 💘 💝 💟 ❣️ 💯 💢 💥 💫 💦 💬 🫶 🙌 👏 👍 👎 👊 ✊ 🤛 🤜 🤝 🙏 👋 🤚 🖐️ ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ 💪 ✍️" },
  { name: "สัตว์และธรรมชาติ", emojis: "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐔 🐧 🐦 🐤 🦆 🦉 🦄 🐝 🦋 🐌 🐞 🐢 🐙 🐬 🐳 🐟 🦀 🐾 🌸 🌺 🌷 🌹 🌻 🌼 💐 🌿 🍀 🍁 🍂 🌱 🌲 🌳 🌵 🌈 ☀️ 🌤️ ☁️ 🌧️ ⛈️ ❄️ 🌊 🌙 ⭐ 🌟 ✨ 🔥" },
  { name: "อาหารและเครื่องดื่ม", emojis: "🍎 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍒 🍑 🥭 🍍 🥝 🥑 🍅 🥕 🌽 🥐 🍞 🧀 🍳 🥞 🧇 🥓 🍔 🍟 🍕 🌭 🥪 🌮 🍜 🍝 🍣 🍙 🍚 🍛 🍤 🥟 🍡 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🍫 🍬 🍭 🍮 🍯 ☕ 🍵 🧋 🥤 🧃 🥛 🍺 🍻 🥂 🍷" },
  { name: "กิจกรรมและสิ่งของ", emojis: "🎉 🎊 🎈 🎁 🎀 🎂 🏆 🥇 🥈 🥉 🎯 🎮 🎲 🧩 🎨 🎬 🎤 🎧 🎼 🎵 🎶 🎹 🎸 ⚽ 🏀 🏐 🎾 🏸 🚀 ✈️ 🚗 🚲 🏡 🏰 📚 📖 📕 📗 📘 📙 📓 📝 ✏️ 🖊️ 🖋️ 🖌️ 💡 🔍 📷 💻 📱 ⌨️ 💌 📩 📬 🔔 ⏰ ⏳ 🔑 💎 👑 ✅ ☑️ ❌ ❓ ❗ 💲 🔖" },
];

export default function CommentEmojiPicker({ value, onChange, inputRef }: { value: string; onChange: (value: string) => void; inputRef: RefObject<HTMLTextAreaElement | null> }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selection = useRef({ start: 0, end: 0 });
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!containerRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);
  const insert = (emoji: string) => {
    const start = inputRef.current?.selectionStart ?? selection.current.start;
    const end = inputRef.current?.selectionEnd ?? selection.current.end;
    const next = value.slice(0, start) + emoji + value.slice(end);
    if (next.length > 1000) return;
    onChange(next);
    const cursor = start + emoji.length;
    selection.current = { start: cursor, end: cursor };
    requestAnimationFrame(() => { inputRef.current?.focus(); inputRef.current?.setSelectionRange(cursor, cursor); });
  };
  return <div className={styles.emojiControl} ref={containerRef}>
    <button ref={triggerRef} type="button" aria-label="เลือกอีโมจิ" aria-expanded={open} aria-controls="comment-emoji-picker" onClick={() => {
      if (!open) selection.current = { start: inputRef.current?.selectionStart ?? value.length, end: inputRef.current?.selectionEnd ?? value.length };
      setOpen(current => !current);
    }}><FontAwesomeIcon icon={faFaceSmile} aria-hidden="true" /></button>
    {open && <div id="comment-emoji-picker" className={styles.emojiPicker} role="region" aria-label="เลือกอีโมจิ">
      <div className={styles.emojiHeading}><strong>เลือกอีโมจิ</strong><button type="button" aria-label="ปิดชุดอีโมจิ" onClick={() => { setOpen(false); triggerRef.current?.focus(); }}><FontAwesomeIcon icon={faXmark} aria-hidden="true" /></button></div>
      <div className={styles.emojiCategories} role="group" aria-label="หมวดอีโมจิ">{groups.map((group, index) => <button key={group.name} type="button" aria-pressed={category === index} onClick={() => setCategory(index)}>{group.name}</button>)}</div>
      <div className={styles.emojiGrid}>{groups[category].emojis.split(" ").map(emoji => <button key={emoji} type="button" aria-label={`แทรก ${emoji}`} onClick={() => insert(emoji)}>{emoji}</button>)}</div>
    </div>}
  </div>;
}
