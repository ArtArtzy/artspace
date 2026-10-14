"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faBookOpen, faChevronDown, faCommentDots, faImage, faXmark, faPen, faPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { readWriterDrafts, writerDraftsKey, type WriterDraft } from "@/data/writer-drafts";
import styles from "./WriterNewStory.module.css";

const formats = [
  { id: "prose", title: "นิยายทั่วไป", description: "เล่าเรื่องด้วยข้อความบรรยายและบทสนทนาแบบนิยายปกติ", icon: faBookOpen },
  { id: "chat", title: "นิยายแชท", description: "เล่าเรื่องผ่านข้อความสนทนา คล้ายแชทในแอปมือถือ", icon: faCommentDots },
] as const;
const categories = ["โรแมนติก", "แฟนตาซี", "ผจญภัย", "ดราม่า", "ลึกลับ / สืบสวน", "สยองขวัญ", "ย้อนยุค / พีเรียด", "ไซไฟ", "ชีวิตประจำวัน", "อื่น ๆ"];
const penNamesKey = "arnspace-writer-pen-names";

export default function WriterNewStory() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);
  const [format, setFormat] = useState<WriterDraft["format"]>("prose");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [coverName, setCoverName] = useState("");
  const [coverLoading, setCoverLoading] = useState(false);
  const [coverError, setCoverError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [penNames, setPenNames] = useState<string[]>([]);
  const [penName, setPenName] = useState("");
  const [addingPenName, setAddingPenName] = useState(false);
  const [newPenName, setNewPenName] = useState("");
  const [penNameError, setPenNameError] = useState("");
  const penNameSelect = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(penNamesKey) || "[]");
      const names = Array.isArray(saved) ? saved.filter((name): name is string => typeof name === "string" && Boolean(name.trim())) : [];
      const draftNames = readWriterDrafts().flatMap((draft) => typeof draft.penName === "string" && draft.penName.trim() ? [draft.penName] : []);
      const available = [...new Set([...names, ...draftNames])];
      setPenNames(available);
      setPenName(available[0] || "");
    } catch { /* The user can still enter a pen name when storage is unavailable. */ }
  }, []);

  function addPenName() {
    const name = newPenName.trim();
    if (!name) { setPenNameError("กรุณากรอกนามปากกา"); return; }
    const next = [...new Set([...penNames, name])];
    try {
      localStorage.setItem(penNamesKey, JSON.stringify(next));
      setPenNames(next);
      setPenName(name);
      setNewPenName("");
      setPenNameError("");
      setAddingPenName(false);
      penNameSelect.current?.focus();
    } catch {
      setPenNameError("บันทึกนามปากกาไม่สำเร็จ กรุณาลองอีกครั้ง");
    }
  }

  function addTags(value: string) {
    const next = value.split(",").map((tag) => tag.trim().replace(/^#/, "").slice(0, 40)).filter(Boolean);
    setTags((current) => [...new Set([...current, ...next])].slice(0, 10));
    setTagInput("");
  }

  function tagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if ((event.key === "Enter" || event.key === ",") && !event.nativeEvent.isComposing) {
      event.preventDefault();
      addTags(tagInput);
    }
  }

  function uploadCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    setCoverError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setCoverError("กรุณาเลือกไฟล์ JPG, PNG หรือ WebP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCoverError("กรุณาเลือกภาพขนาดไม่เกิน 5 MB");
      return;
    }
    setCoverLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const source = String(reader.result);
      const image = new window.Image();
      image.onload = () => {
        // Keep local draft covers small enough for browser storage.
        const ratio = Math.min(1, 800 / image.width, 1200 / image.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);
        const context = canvas.getContext("2d");
        if (!context) { setCoverError("ไม่สามารถอ่านภาพได้ กรุณาลองใหม่"); setCoverLoading(false); return; }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        setCover(canvas.toDataURL("image/webp", 0.82));
        setCoverName(file.name);
        setCoverLoading(false);
      };
      image.onerror = () => { setCoverError("ไม่สามารถอ่านภาพได้ กรุณาเลือกไฟล์อื่น"); setCoverLoading(false); };
      image.src = source;
    };
    reader.onerror = () => { setCoverError("ไม่สามารถอ่านไฟล์ได้ กรุณาลองใหม่"); setCoverLoading(false); };
    reader.readAsDataURL(file);
  }

  function createStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!penName) { setError("กรุณาเลือกหรือสร้างนามปากกาก่อน"); penNameSelect.current?.focus(); return; }
    if (!title.trim()) { setError("กรุณากรอกชื่อเรื่อง"); titleInput.current?.focus(); return; }
    setSaving(true);
    setError("");
    try {
      const pendingTags = tagInput.split(",").map((tag) => tag.trim().replace(/^#/, "").slice(0, 40)).filter(Boolean);
      const draft: WriterDraft = { id: crypto.randomUUID(), title: title.trim(), penName, description: description.trim(), format, category, cover, tags: [...new Set([...tags, ...pendingTags])].slice(0, 10), createdAt: new Date().toISOString() };
      localStorage.setItem(writerDraftsKey, JSON.stringify([draft, ...readWriterDrafts()]));
      router.push("/write/projects");
    } catch {
      setError("บันทึกเรื่องไม่สำเร็จ พื้นที่เก็บข้อมูลอาจเต็ม ลองใช้ภาพปกที่เล็กลงแล้วสร้างอีกครั้ง");
      setSaving(false);
    }
  }

  return <div className={styles.page}>
    <header className={styles.topbar}>
      <Link href="/write" className={styles.back} aria-label="กลับ Writer Studio"><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /></Link>
      <Link href="/write" className={styles.brand}><Image src="/images/arnspace-logo.webp" alt="ARN SPACE" width={166} height={56} priority /></Link>
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.workspace}><FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /> Writer Studio</span>
      <span className={styles.topbarTitle}>สร้างนิยายใหม่</span>
    </header>

    <main className={styles.main}>
      <nav className={styles.breadcrumb} aria-label="เส้นทางหน้า"><Link href="/write">Writer Studio</Link><span aria-hidden="true">/</span><span aria-current="page">สร้างนิยายใหม่</span></nav>
      <header className={styles.heading}><FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /><div><h1 className="text-ds-h2">สร้างนิยายใหม่</h1><p className="text-ds-body-sm">เริ่มต้นเรื่องใหม่ของคุณ ข้อมูลเหล่านี้สามารถแก้ไขได้ในภายหลัง</p></div></header>

      <form onSubmit={createStory} className={styles.form}>
        <fieldset className={styles.formatField}><legend>เลือกรูปแบบนิยาย <span className={styles.required}>*</span></legend><div className={styles.formats}>{formats.map((item) => <label key={item.id} className={styles.format}>
          <input type="radio" name="format" value={item.id} checked={format === item.id} onChange={() => setFormat(item.id)} />
          <FontAwesomeIcon icon={item.icon} aria-hidden="true" className={styles.formatIcon} />
          <span className={styles.formatCopy}><strong>{item.title}</strong><small>{item.description}</small></span>
          <span className={`${styles.formatPreview} ${item.id === "chat" ? styles.chatPreview : ""}`} aria-hidden="true"><i /><i /><i /></span>
        </label>)}</div></fieldset>

        <div className={styles.field}>
          <label htmlFor="story-pen-name">นามปากกา <span className={styles.required}>*</span></label>
          <div>
            <div className={styles.penNameRow}>
              <div className={`${styles.select} ${styles.penNameSelect}`}>
                <FontAwesomeIcon icon={faPen} aria-hidden="true" className={styles.penIcon} />
                <select ref={penNameSelect} id="story-pen-name" className={`ds-input ${styles.input}`} required value={penName} onChange={(event) => setPenName(event.target.value)}><option value="">เลือกนามปากกา</option>{penNames.map((name) => <option key={name} value={name}>{name}</option>)}</select>
                <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" />
              </div>
              <button type="button" className={styles.addPenName} onClick={() => { setAddingPenName(true); setPenNameError(""); }} aria-expanded={addingPenName} aria-controls="new-pen-name-panel"><FontAwesomeIcon icon={faPlus} aria-hidden="true" /> สร้างนามปากกาใหม่</button>
            </div>
            {addingPenName && <div id="new-pen-name-panel" className={styles.newPenNamePanel}>
              <label htmlFor="new-pen-name">นามปากกาใหม่</label>
              <div className={styles.newPenNameRow}>
                <input id="new-pen-name" className={`ds-input ${styles.input}`} autoFocus placeholder="กรอกนามปากกาที่ต้องการใช้" maxLength={60} value={newPenName} onChange={(event) => setNewPenName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing) { event.preventDefault(); addPenName(); } }} />
                <button type="button" className={`ds-button-primary ${styles.penNameSave}`} onClick={addPenName}>เพิ่ม</button>
                <button type="button" className={styles.penNameClose} aria-label="ยกเลิกการเพิ่มนามปากกา" onClick={() => { setAddingPenName(false); setPenNameError(""); penNameSelect.current?.focus(); }}><FontAwesomeIcon icon={faXmark} aria-hidden="true" /></button>
              </div>
              {penNameError && <p className={styles.error} role="alert">{penNameError}</p>}
            </div>}
          </div>
        </div>
        <div className={styles.field}><label htmlFor="story-title">ชื่อเรื่อง <span className={styles.required}>*</span></label><input ref={titleInput} id="story-title" className={`ds-input ${styles.input}`} placeholder="ตั้งชื่อเรื่องของคุณ..." value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={150} /></div>
        <div className={styles.field}><label htmlFor="story-description">คำโปรย</label><div className={styles.description}><textarea id="story-description" className={`ds-input ${styles.input}`} placeholder="แนะนำเรื่องราวของคุณสั้น ๆ เพื่อดึงดูดผู้อ่าน..." value={description} onChange={(event) => setDescription(event.target.value)} maxLength={500} rows={4} aria-describedby="description-count" /><span id="description-count" className={styles.counter}>{description.length}/500</span></div></div>
        <div className={styles.field}><span id="cover-label" className={styles.label}>ภาพปก</span><div><div className={styles.coverRow}>
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className={styles.fileInput} onChange={uploadCover} aria-labelledby="cover-label" tabIndex={-1} />
          <button type="button" className={styles.upload} onClick={() => fileInput.current?.click()} disabled={coverLoading} aria-label={cover ? "เปลี่ยนภาพปก" : "อัปโหลดภาพปก"}>{cover ? <Image src={cover} alt="ตัวอย่างภาพปก" width={100} height={150} unoptimized /> : <><FontAwesomeIcon icon={faImage} aria-hidden="true" /><span>{coverLoading ? "กำลังอ่านภาพ..." : "อัปโหลดภาพปก"}</span></>}</button>
          <div className={styles.coverHelp}><p>แนะนำขนาด 800 × 1200 px</p><p>รองรับไฟล์ JPG, PNG หรือ WebP · ไม่เกิน 5 MB</p><p>ยังไม่มีปก? สามารถเพิ่มหรือเปลี่ยนได้ภายหลัง</p>{cover && <><p className={styles.fileName}>{coverName}</p><button type="button" className={styles.removeCover} onClick={() => { setCover(""); setCoverName(""); }}><FontAwesomeIcon icon={faXmark} aria-hidden="true" /> นำภาพปกออก</button></>}</div>
        </div>{coverError && <p role="alert" className={styles.error}>{coverError}</p>}</div></div>
        <div className={styles.field}><label htmlFor="story-category">หมวดหมู่</label><div className={styles.select}><select id="story-category" className={`ds-input ${styles.input}`} value={category} onChange={(event) => setCategory(event.target.value)}><option value="">เลือกหมวดหมู่</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><FontAwesomeIcon icon={faChevronDown} aria-hidden="true" /></div></div>
        <div className={styles.field}><label htmlFor="story-tags">แท็ก <span className={styles.optional}>(ไม่บังคับ)</span></label><div><div className={`ds-input ${styles.tags}`}>{tags.map((tag) => <span className={styles.tag} key={tag}>{tag}<button type="button" aria-label={`ลบแท็ก ${tag}`} onClick={() => setTags((current) => current.filter((item) => item !== tag))}><FontAwesomeIcon icon={faXmark} aria-hidden="true" /></button></span>)}<input id="story-tags" placeholder={tags.length ? "เพิ่มแท็ก..." : "พิมพ์แล้วกด Enter เพื่อเพิ่มแท็ก เช่น แฟนตาซี โรแมนติก ดราม่า"} value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={tagKeyDown} onBlur={() => addTags(tagInput)} maxLength={100} disabled={tags.length >= 10} aria-describedby="tag-help" /></div><p id="tag-help" className={styles.tagHelp}>เพิ่มได้สูงสุด 10 แท็ก</p></div></div>
        <footer className={styles.actions}>
          <p className={styles.editNote}><FontAwesomeIcon icon={faCircleInfo} aria-hidden="true" /> คุณสามารถแก้ไขข้อมูลทั้งหมดนี้ได้ในภายหลัง</p>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <Link href="/write" className={`ds-button-secondary ${styles.cancel}`}>ยกเลิก</Link>
          <button className={`ds-button-primary ${styles.submit}`} type="submit" disabled={saving || coverLoading || addingPenName}>{saving ? "กำลังสร้างเรื่อง..." : "สร้างเรื่อง"}<FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></button>
        </footer>
      </form>
    </main>
  </div>;
}
