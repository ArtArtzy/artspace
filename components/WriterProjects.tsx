"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faFolderOpen, faChartSimple, faComment, faCalendarDays, faPen, faBookOpen, faFileLines, faPlus, faMagnifyingGlass, faCircleCheck, faPause, faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import UnbuiltPageModal from "@/components/UnbuiltPageModal";
import type { UnbuiltPage } from "@/data/unbuilt-pages";
import { readWriterDrafts } from "@/data/writer-drafts";
import shell from "./WriterStudioShell.module.css";
import styles from "./WriterProjects.module.css";

type Status = "draft" | "writing" | "published" | "finished" | "paused";
type Project = { id: string; title: string; cover: string; status: Status; tags: string[]; description: string; chapters: number; published: number; schedule?: { chapter: number; date: string; time: string; queued: number } };
// Design preview data. The first six stories follow the reference composition.
const projects: Project[] = [
  { id: "moon", title: "จันทร์เหนือวังหลวง", cover: "/images/category-books/china-01.webp", status: "writing", tags: ["นิยาย", "ดราม่า", "พีเรียด"], description: "ลมหายใจแห่งมหากวีซ่อนในเงาข้ามเวลา กลับมาพร้อมพรหมลิขิต...", chapters: 32, published: 17, schedule: { chapter: 18, date: "20 ต.ค. 2026", time: "19:00", queued: 2 } },
  { id: "sky", title: "Sky of Tomorrow", cover: "/images/book-sky-tomorrow.webp", status: "draft", tags: ["แฟนฟิค", "โรแมนติก", "แฟนตาซี"], description: "เมื่อสองดวงดาวจากคนละโลกได้พบกัน...", chapters: 0, published: 0 },
  { id: "stars", title: "ความลับของดวงดาว", cover: "/images/book-parallel-world.webp", status: "paused", tags: ["แฟนฟิค"], description: "เรื่องราวที่รอการเริ่มต้น เมื่ออีกท้องฟ้ายังคงเก็บความลับไว้...", chapters: 24, published: 21 },
  { id: "summer", title: "ฤดูที่เราเคยพบกัน", cover: "/images/book-summer-lessons.webp", status: "writing", tags: ["นิยาย", "วัยรุ่น", "ชีวิตประจำวัน"], description: "เรื่องราวของพวกเราที่เกิดขึ้นในฤดูร้อนปีนั้น...", chapters: 16, published: 12, schedule: { chapter: 13, date: "25 ต.ค. 2026", time: "20:00", queued: 1 } },
  { id: "city", title: "รัตติกาลในเมืองหลวง", cover: "/images/book-city-echoes.webp", status: "finished", tags: ["นิยาย", "แอ็กชัน", "ไซไฟ"], description: "เมื่อค่ำคืนไม่เคยหลับใหล และความลับที่ซ่อนอยู่...", chapters: 36, published: 36 },
  { id: "sakura", title: "กลับจากฤดูในสายลม", cover: "/images/category-books/china-03.webp", status: "finished", tags: ["นิยาย", "โรแมนติก", "พีเรียด"], description: "การรอคอยที่ยาวนานในทุกฤดูกาล...", chapters: 12, published: 8, schedule: { chapter: 9, date: "22 ต.ค. 2026", time: "20:00", queued: 2 } },
  { id: "rain", title: "ภาพถ่ายในสายฝน", cover: "/images/book-photographs-rain.webp", status: "writing", tags: ["นิยาย", "โรแมนติก"], description: "ความทรงจำที่ซ่อนอยู่ในภาพถ่ายใบเก่า", chapters: 9, published: 6 },
  { id: "lemon", title: "วันสีเลมอน", cover: "/images/book-lemon-days.webp", status: "writing", tags: ["นิยาย", "วัยรุ่น"], description: "เรื่องราวเล็ก ๆ ของวันธรรมดาที่แสนพิเศษ", chapters: 6, published: 4 },
];
const statuses: { id: "all" | Status; label: string; icon: IconDefinition }[] = [
  { id: "all", label: "ทั้งหมด", icon: faBookOpen }, { id: "draft", label: "ยังไม่มีตอน", icon: faFileLines }, { id: "writing", label: "กำลังเขียน", icon: faPen }, { id: "published", label: "กำลังเผยแพร่", icon: faChartSimple }, { id: "finished", label: "เขียนจบแล้ว", icon: faCircleCheck }, { id: "paused", label: "พักเขียน", icon: faPause },
];
const navigation = [["ภาพรวม", faHouse, "home"], ["เรื่องของฉัน", faFolderOpen, "projects"], ["ข้อมูลเชิงลึก", faChartSimple, "insights"], ["ความคิดเห็น", faComment, "comments"], ["ตารางเผยแพร่", faCalendarDays, "schedule"]] as const;
const currentDrafts: Record<string, { chapter: number; updated: string }> = {
  moon: { chapter: 20, updated: "2 ชั่วโมงที่แล้ว" }, summer: { chapter: 14, updated: "3 วันที่แล้ว" },
  rain: { chapter: 7, updated: "1 วันที่แล้ว" }, lemon: { chapter: 5, updated: "1 สัปดาห์ที่แล้ว" },
};
function Icon({ icon }: { icon: IconDefinition }) { return <FontAwesomeIcon icon={icon} aria-hidden="true" className={styles.icon} />; }
const editorLabel = "เขียนต่อ";

export default function WriterProjects() {
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  useEffect(() => {
    try {
      setLocalProjects(readWriterDrafts().map((draft) => ({ id: draft.id, title: draft.title, description: draft.description, cover: draft.cover || "/images/writer-studio-new-story.webp", status: "draft", tags: [draft.format === "chat" ? "นิยายแชท" : "นิยาย", ...(draft.category ? [draft.category] : []), ...draft.tags], chapters: 0, published: 0 })));
    } catch { /* Existing preview stories remain available if storage is unavailable. */ }
  }, []);
  const allProjects = [...localProjects, ...projects];
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("updated");
  const [pending, setPending] = useState<UnbuiltPage | null>(null);
  const openFeature = (name: string, code: string) => setPending({ name, code: `WRITE-${code.toUpperCase()}`, url: `/write/${code}`, trigger: name, status: "ยังไม่ได้ทำ" });
  useEffect(() => { if (!pending) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") setPending(null); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [pending]);
  const selectFilter = (value: string) => { setFilter(value); };
  const count = (value: string) => allProjects.filter(p => value === "all" || p.status === value).length;
  const filtered = allProjects.filter(p => (filter === "all" || p.status === filter) && `${p.title} ${p.tags.join(" ")}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title, "th") : sort === "chapters" ? b.chapters - a.chapters : allProjects.indexOf(a) - allProjects.indexOf(b));
  return <main className={`${shell.stage} ${shell.overviewStage} ${styles.stage}`}><div className={`${shell.layout} ${shell.overviewLayout}`}>
    <aside className={`ds-card ${shell.navigation} ${shell.overviewNavigation}`}><h2 className="text-ds-h3">Writer Studio</h2><nav aria-label="เมนูนักเขียน">{navigation.map(([label, icon, id]) => <Link key={id} href={id === "home" ? "/write" : `/write/${id}`} aria-current={id === "projects" ? "page" : undefined} className={`${shell.navItem} ${id === "projects" ? shell.activeNav : ""}`}><Icon icon={icon} /><span>{label}</span></Link>)}</nav><div className={shell.quote}>“ทุกเรื่องราว<br />เริ่มต้นจากจินตนาการ<br />และเติบโตได้เสมอ<br />ที่นี่... ARN SPACE”<span aria-hidden="true">— ◇ —</span></div></aside>
    <div className={styles.center}>
      <header className={styles.heading}><Icon icon={faFolderOpen} /><div><h1 className="text-ds-h1">เรื่องของฉัน</h1><p className="text-ds-body-sm">พื้นที่สำหรับจัดการผลงานและติดตามความคืบหน้าของเรื่องที่คุณสร้างขึ้น</p></div><Link href="/write/new" className="ds-button-primary"><Icon icon={faPlus} />สร้างเรื่องใหม่</Link></header>
      <section aria-label="รายการเรื่อง"><div className={styles.controls}>
        <div className={styles.filters}>{statuses.filter(s => s.id !== "published").sort((a,b) => ["all","writing","draft","paused","finished"].indexOf(a.id) - ["all","writing","draft","paused","finished"].indexOf(b.id)).map(({ id, label }) => <button type="button" key={id} aria-pressed={filter === id} className={filter === id ? styles.selected : ""} onClick={() => selectFilter(id)}>{label}<span>{count(id)}</span></button>)}</div>
        <div className={styles.toolbar}><label className={`ds-input ${styles.search}`}><Icon icon={faMagnifyingGlass} /><input aria-label="ค้นหาเรื่อง" placeholder="ค้นหาเรื่อง..." value={query} onChange={e => setQuery(e.target.value)} /></label><select aria-label="เรียงลำดับเรื่อง" className={`ds-input ${styles.sort}`} value={sort} onChange={e => setSort(e.target.value)}><option value="updated">เรียงตาม: ล่าสุด</option><option value="title">เรียงตาม: ชื่อเรื่อง</option><option value="chapters">เรียงตาม: จำนวนตอน</option></select></div>
      </div><div className={styles.projects}>
        {filtered.map(p => { const status = statuses.find(s => s.id === p.status)!; return <article className={`ds-card ${styles.project} ${styles[p.status]}`} key={p.id}>
          <div className={styles.projectBody}><Image className={styles.cover} src={p.cover} alt={`ปก ${p.title}`} width={100} height={140} sizes="100px" /><div className={styles.projectText}><span className={styles.badge}>{p.status === "finished" ? "เขียนจบแล้ว" : status.label}</span><h2 className="text-ds-h3">{p.title}</h2><div className={styles.tags}>{p.tags.map(tag => <span className="ds-chip" key={tag}>{tag}</span>)}</div><p className={styles.chapterCount}><Icon icon={faBookOpen} /> {p.chapters} ตอน{p.chapters > 0 && ` · ${p.published >= p.chapters ? "เผยแพร่ครบแล้ว" : `เผยแพร่แล้ว ${p.published} ตอน`}`}</p></div></div>
          <div className={styles.stateStack}>
            {p.status === "finished" ? <>
              <div className={styles.statePanel}><span className={styles.stateIcon}><Icon icon={faCircleCheck} /></span><div><strong>{p.published >= p.chapters ? "เผยแพร่ครบแล้ว" : "เขียนจบแล้ว"}</strong>{p.published >= p.chapters && <p>เผยแพร่ครบทั้ง {p.chapters} ตอน เมื่อ 10 ม.ค. 2026</p>}</div></div>
              {p.published < p.chapters && <div className={styles.publicationRow}><span className={styles.stateIcon}><Icon icon={faCalendarDays} /></span>{p.schedule ? <Link href="/write/schedule">เผยแพร่ถัดไป {p.schedule.date} · {p.schedule.time} น.</Link> : <span>เผยแพร่ถัดไป: ยังไม่ได้กำหนด</span>}</div>}
            </> : currentDrafts[p.id] ? <>
              <div className={styles.writingRow}><span className={styles.stateIcon}><Icon icon={faPen} /></span><strong>กำลังเขียนตอนที่ {currentDrafts[p.id].chapter}</strong><span className={styles.updated}>{currentDrafts[p.id].updated.replace("ชั่วโมง", "ชม.")}</span></div>
              <div className={styles.publicationRow}><span className={styles.stateIcon}><Icon icon={faCalendarDays} /></span>{p.schedule ? <Link href="/write/schedule">เผยแพร่ถัดไป {p.schedule.date} · {p.schedule.time} น.</Link> : <span>เผยแพร่ถัดไป: ยังไม่ได้กำหนด</span>}</div>
            </> : <div className={styles.statePanel}>
              <span className={styles.stateIcon}><Icon icon={p.status === "draft" ? faPlus : status.icon} /></span>
              <div>{p.status === "draft" ? <><strong>ยังไม่มีตอน</strong><p>เริ่มเขียนตอนแรกเพื่อเริ่มเรื่องราว</p></> : p.status === "paused" ? <><strong>พักเขียนตั้งแต่ 12 ก.ย. 2026</strong><p>คุณสามารถกลับมาเขียนต่อได้ทุกเมื่อ</p></> : <><strong>เผยแพร่ครบแล้ว</strong><p>เผยแพร่ครบทั้ง {p.chapters} ตอน เมื่อ 10 ม.ค. 2026</p></>}</div>
            </div>}
          </div>
          <div className={styles.projectActions}><button type="button" className={styles.primaryAction} onClick={() => openFeature(`เปิด ${p.title}`, `${p.status === "finished" ? "manage" : "editor"}/${p.id}`)}>{p.status === "draft" ? <>เพิ่มตอนแรก <Icon icon={faArrowRight} /></> : p.status === "finished" ? <>ดูเรื่อง <Icon icon={faArrowRight} /></> : p.status === "paused" ? <>กลับมาเขียนต่อ <Icon icon={faArrowRight} /></> : <>{editorLabel} <Icon icon={faArrowRight} /></>}</button><button type="button" className={styles.manageAction} onClick={() => openFeature(`จัดการ ${p.title}`, `manage/${p.id}`)}>จัดการเรื่อง <Icon icon={faChevronRight} /></button></div>
        </article>; })}
      </div>{filtered.length === 0 && <div className={`ds-card ${styles.empty}`} role="status"><Icon icon={faFolderOpen} /><h2 className="text-ds-h3">ไม่พบเรื่อง</h2><p>ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p><button type="button" className="ds-button-secondary" onClick={() => { setQuery(""); selectFilter("all"); }}>แสดงเรื่องทั้งหมด</button></div>}</section>
    </div>
  </div>{pending && <UnbuiltPageModal page={pending} href={pending.url} onClose={() => setPending(null)} />}</main>;
}
