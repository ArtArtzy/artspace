"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faFolderOpen, faChartSimple, faComment, faCalendarDays, faChevronLeft, faChevronRight, faClock, faCalendarCheck, faXmark, faCircleInfo, faBookOpen, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { initialSchedulePublications, scheduleWorkspaceToday, scheduleProjects, scheduleStatuses, scheduleToday, parseDay, dayKey, addDays, type Publication, type ScheduleStatus } from "@/data/writer-schedule";
import UnbuiltPageModal from "./UnbuiltPageModal";
import type { UnbuiltPage } from "@/data/unbuilt-pages";
import shell from "./WriterStudioShell.module.css";
import styles from "./WriterSchedule.module.css";

const navigation = [["ภาพรวม", faHouse, "home"], ["เรื่องของฉัน", faFolderOpen, "projects"], ["ข้อมูลเชิงลึก", faChartSimple, "insights"], ["ความคิดเห็น", faComment, "comments"], ["ตารางเผยแพร่", faCalendarDays, "schedule"]] as const;
function Icon({ icon }: { icon: IconDefinition }) { return <FontAwesomeIcon icon={icon} aria-hidden="true" className={styles.icon} />; }
type EditorState = { item?: Publication; date: string; repeat: "once" | "daily" | "weekly" };

export function ScheduleEditor({ initial, onClose, onSave }: { initial: EditorState; onClose: () => void; onSave: (items: Publication[]) => string | undefined }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [project, setProject] = useState(initial.item?.project ?? "moon");
  const [chapter, setChapter] = useState(initial.item?.chapter ?? 36);
  const [title, setTitle] = useState(initial.item?.title ?? "");
  const [date, setDate] = useState(initial.item?.date ?? initial.date);
  const [time, setTime] = useState(initial.item?.time ?? "20:00");
  const [status, setStatus] = useState<ScheduleStatus>(initial.item?.status ?? "scheduled");
  const [access, setAccess] = useState<Publication["access"]>(initial.item?.access ?? "public");
  const [repeat, setRepeat] = useState(initial.repeat);
  const [count, setCount] = useState(initial.repeat === "once" ? 1 : 4);
  const [error, setError] = useState("");
  const readOnly = initial.item?.status === "published";
  useEffect(() => { const element = dialog.current!; element.showModal(); return () => element.close(); }, []);
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="schedule-dialog-title" onCancel={onClose} onClick={event => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }}><form onSubmit={event => {
    event.preventDefault(); if (readOnly) return;
    if (!title.trim()) { setError("กรุณาระบุชื่อตอน"); return; }
    if (status !== "cancelled" && date < scheduleToday) { setError("กรุณาเลือกวันที่ตั้งแต่วันนี้เป็นต้นไป"); return; }
    const items = Array.from({ length: initial.item || repeat === "once" ? 1 : count }, (_, i): Publication => ({ id: initial.item?.id ?? `local-${Date.now()}-${i}`, project, chapter: chapter + i, title: title.trim() + (i ? ` (${i + 1})` : ""), date: addDays(date, i * (repeat === "weekly" ? 7 : 1)), time, status, access, views: initial.item?.views ?? 0, comments: initial.item?.comments ?? 0 }));
    const message = onSave(items); if (message) setError(message);
  }}><div className={styles.dialogHeading}><h2 id="schedule-dialog-title" className="text-ds-h2">{readOnly ? "รายละเอียดการเผยแพร่" : initial.item ? "แก้ไขกำหนดการ" : "สร้างกำหนดการใหม่"}</h2><button type="button" aria-label="ปิดหน้าต่างกำหนดการ" onClick={onClose}><Icon icon={faXmark} /></button></div><p className="text-ds-body-sm text-arn-muted">ข้อมูลทดลองในหน้านี้ · เวลาไทย (UTC+7)</p><fieldset disabled={readOnly} className={styles.formGrid}><label className={styles.fullWidth}>ผลงาน<select className="ds-input" value={project} onChange={event => setProject(event.target.value)}>{scheduleProjects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><label>ตอนที่<input className="ds-input" type="number" min={1} max={9999} required value={chapter} onInput={event => setChapter(Number(event.currentTarget.value))} /></label><label>การเข้าถึง<select className="ds-input" value={access} onChange={event => setAccess(event.target.value as Publication["access"])}><option value="public">สาธารณะ</option><option value="members">เฉพาะสมาชิก</option></select></label><label className={styles.fullWidth}>ชื่อตอน<input className="ds-input" maxLength={100} required value={title} onChange={event => setTitle(event.target.value)} placeholder="ระบุชื่อตอนที่ต้องการเผยแพร่" /></label><label>วันที่<input className="ds-input" type="date" required min={readOnly || status === "cancelled" ? undefined : scheduleToday} value={date} onInput={event => setDate(event.currentTarget.value)} /></label><label>เวลา<input className="ds-input" type="time" required value={time} onInput={event => setTime(event.currentTarget.value)} /></label><label>สถานะ<select className="ds-input" value={status} onChange={event => setStatus(event.target.value as ScheduleStatus)}>{readOnly ? <option value="published">เผยแพร่แล้ว</option> : <><option value="scheduled">กำหนดเผยแพร่</option><option value="draft">ร่างอยู่</option>{initial.item && <option value="cancelled">ยกเลิก</option>}</>}</select></label>{!initial.item && <label>ความถี่<select className="ds-input" value={repeat} onChange={event => setRepeat(event.target.value as EditorState["repeat"])}><option value="once">ครั้งเดียว</option><option value="daily">ทุกวัน</option><option value="weekly">ทุกสัปดาห์</option></select></label>}{!initial.item && repeat !== "once" && <><label>จำนวนตอน<input className="ds-input" type="number" min={2} max={12} required value={count} onInput={event => setCount(Number(event.currentTarget.value))} /></label><p className="text-ds-caption text-arn-subtle">สร้างตอนต่อเนื่อง โดยเพิ่มเลขตอนครั้งละ 1</p></>}</fieldset>{error && <p role="alert" className={styles.error}>{error}</p>}<div className={styles.dialogActions}><button type="button" className="ds-button-secondary px-ds-4" onClick={onClose}>{readOnly ? "ปิด" : "ยกเลิก"}</button>{!readOnly && <button type="submit" className="ds-button-primary px-ds-4">บันทึกกำหนดการทดลอง</button>}</div></form></dialog>;
}

const publishingTabs = [["ready", "รอตั้งเวลา", faCalendarDays], ["scheduled", "ตั้งเวลาแล้ว", faClock], ["published", "เผยแพร่แล้ว", faCalendarCheck]] as const;
const buddhistDate = (value: string, monthOnly = false) => new Intl.DateTimeFormat("th-TH", { ...(monthOnly ? {} : { day: "numeric" as const }), month: monthOnly ? "long" : "short", year: "numeric", timeZone: "UTC" }).format(parseDay(value));

export default function WriterSchedule() {
  const [items, setItems] = useState(initialSchedulePublications);
  const [tab, setTab] = useState("ready");
  const [projectId, setProjectId] = useState("all");
  const [sort, setSort] = useState("updated");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [date, setDate] = useState("2026-10-20");
  const [time, setTime] = useState("20:00");
  const [month, setMonth] = useState("2026-10-01");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState<UnbuiltPage | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const selected = items.find(item => item.id === selectedId);
  const selectedProject = scheduleProjects.find(project => project.id === selected?.project);
  const readOnly = selected?.status === "published";
  const closePanel = () => { setSelectedId(null); setError(""); triggerRef.current?.focus(); };
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (pending) setPending(null);
      else { setSelectedId(null); triggerRef.current?.focus(); }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [pending]);
  const scoped = items.filter(item => projectId === "all" || item.project === projectId);
  const counts = { ready: scoped.filter(item => item.status === "ready").length, scheduled: scoped.filter(item => item.status === "scheduled").length, published: scoped.filter(item => item.status === "published").length };
  const rows = scoped.filter(item => item.status === tab).sort((a, b) =>
    sort === "title" ? scheduleProjects.find(project => project.id === a.project)!.title.localeCompare(scheduleProjects.find(project => project.id === b.project)!.title, "th") || a.chapter - b.chapter :
    sort === "date" ? (a.date || "9999").localeCompare(b.date || "9999") || a.time.localeCompare(b.time) :
    (b.updatedAt ?? b.date).localeCompare(a.updatedAt ?? a.date));
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pages);
  const monthDate = parseDay(month);
  const firstWeekday = monthDate.getUTCDay();
  const daysInMonth = new Date(Date.UTC(monthDate.getUTCFullYear(), monthDate.getUTCMonth() + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((firstWeekday + daysInMonth) / 7) * 7 }, (_, index) => addDays(month, index - firstWeekday));
  const shiftMonth = (direction: number) => setMonth(dayKey(new Date(Date.UTC(monthDate.getUTCFullYear(), monthDate.getUTCMonth() + direction, 1, 12))));
  const openPanel = (item: Publication, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    const nextDate = item.status === "ready" ? "2026-10-20" : item.date;
    setSelectedId(item.id); setDate(nextDate); setTime(item.time || "20:00"); setMonth(nextDate.slice(0, 7) + "-01"); setError(""); setNotice("");
    if (window.matchMedia("(max-width: 1100px)").matches) requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const save = () => {
    if (!selected || readOnly) return;
    if (date < scheduleWorkspaceToday || !/^\d{2}:\d{2}$/.test(time)) { setError("กรุณาเลือกวันที่ตั้งแต่วันนี้ และระบุเวลาเผยแพร่"); return; }
    if (items.some(item => item.id !== selected.id && item.status === "scheduled" && item.project === selected.project && item.date === date && item.time === time)) { setError("เรื่องนี้มีตอนอื่นตั้งเวลาเดียวกันแล้ว กรุณาเลือกเวลาใหม่"); return; }
    setItems(values => values.map(item => item.id === selected.id ? { ...item, date, time, status: "scheduled" } : item));
    setNotice(`ตั้งเวลาเผยแพร่ตอนที่ ${selected.chapter} วันที่ ${buddhistDate(date)} เวลา ${time} น. แล้ว`);
    closePanel();
  };
  const timeOptions = [...new Set([...Array.from({ length: 96 }, (_, index) => `${String(Math.floor(index / 4)).padStart(2, "0")}:${String(index % 4 * 15).padStart(2, "0")}`), time])].sort();

  return <main className={`${shell.stage} ${shell.overviewStage} ${styles.stage}`}><div className={`${shell.layout} ${shell.overviewLayout}`}>
    <aside className={`ds-card ${shell.navigation} ${shell.overviewNavigation}`}><h2 className="text-ds-h3">Writer Studio</h2><nav aria-label="เมนูนักเขียน">{navigation.map(([label, icon, id]) => <Link key={id} href={id === "home" ? "/write" : `/write/${id}`} aria-current={id === "schedule" ? "page" : undefined} className={`${shell.navItem} ${id === "schedule" ? shell.activeNav : ""}`}><Icon icon={icon} /><span>{label}</span></Link>)}</nav><div className={shell.quote}>“ทุกเรื่องราว<br />เริ่มต้นจากจินตนาการ<br />และเติบโตได้เสมอ<br />ที่นี่... ARN SPACE”<span aria-hidden="true">— ◇ —</span></div></aside>
    <div className={styles.center}>
      <header className={styles.heading}><Icon icon={faCalendarDays} /><div><h1>ตารางเผยแพร่</h1><p>จัดการวันเวลาเผยแพร่ตอนที่เขียนเสร็จแล้วได้อย่างง่ายดาย</p></div></header>
      <div className={`${styles.workspace} ${!selected ? styles.withoutPanel : ""}`}>
        <section className={styles.mainColumn} aria-label="รายการตอนสำหรับเผยแพร่">
          <div className={styles.statusTabs} role="group" aria-label="สถานะการเผยแพร่">{publishingTabs.map(([id, label]) => <button key={id} type="button" aria-pressed={tab === id} className={tab === id ? styles.activeTab : ""} onClick={() => { setTab(id); if (id === "published") { setSelectedId(null); setError(""); } setSort(id === "ready" ? "updated" : "date"); setPage(1); }}>{label}<span>{counts[id]}</span></button>)}</div>
          <p className={styles.helper}><Icon icon={faCircleInfo} />{tab === "ready" ? "แสดงเฉพาะตอนที่เขียนเสร็จแล้ว แต่ยังไม่ได้กำหนดวันเวลาเผยแพร่" : tab === "scheduled" ? "ตอนที่กำหนดวันเวลาเผยแพร่แล้ว สามารถปรับกำหนดการได้" : tab === "published" ? "ประวัติตอนที่เผยแพร่แล้ว" : "ตอนที่เขียนเสร็จแล้วและประวัติการเผยแพร่ทั้งหมด"}</p>
          <section className={styles.tablePanel}>
            <div className={styles.filters}><label><Icon icon={faBookOpen} /><select className="ds-input" aria-label="เลือกเรื่อง" value={projectId} onChange={event => { setProjectId(event.target.value); setPage(1); }}><option value="all">เรื่องทั้งหมด</option>{scheduleProjects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}</select></label><label><Icon icon={faArrowDownWideShort} /><select className="ds-input" aria-label="เรียงลำดับตอน" value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}>{tab === "ready" ? <option value="updated">เรียงตาม: วันที่เขียนเสร็จ</option> : <option value="date">เรียงตาม: วันที่เผยแพร่</option>}<option value="title">เรียงตาม: ชื่อเรื่อง</option></select></label></div>
            <div className={styles.tableScroll}><table><thead><tr><th scope="col">เรื่อง / ตอน</th><th scope="col">{tab === "scheduled" || tab === "published" ? "วันเผยแพร่" : "วันที่เขียนเสร็จ"}</th><th scope="col">การดำเนินการ</th></tr></thead><tbody>{rows.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(item => {
              const project = scheduleProjects.find(project => project.id === item.project)!;
              const displayDay = tab === "scheduled" || tab === "published" ? item.date : (item.updatedAt ?? item.date).slice(0, 10);
              const displayTime = tab === "scheduled" || tab === "published" ? item.time : item.updatedAt?.slice(11, 16) ?? item.time;
              return <tr key={item.id} className={selectedId === item.id ? styles.selectedRow : ""}><th scope="row"><div className={styles.tableBook}><Image src={project.cover} alt="" width={60} height={64} sizes="60px" /><div><strong>{project.title}</strong><p>ตอนที่ {item.chapter} · {item.title}</p>{tab === "all" && <span className={styles.rowStatus}>{scheduleStatuses[item.status]}</span>}</div></div></th><td><span>{buddhistDate(displayDay)}</span><span>{displayTime} น.</span></td><td><button type="button" className="ds-button-secondary" aria-label={`${item.status === "ready" ? "ตั้งเวลา" : item.status === "scheduled" ? "แก้ไขเวลา" : "ดูตอน"} ${project.title} ตอนที่ ${item.chapter}`} onClick={event => { if (item.status === "published") setPending({ name: `ดูตอนที่ ${item.chapter} · ${project.title}`, code: "WRITE-READ-EPISODE", url: `/read/episode?title=${encodeURIComponent(project.title)}&episode=${item.chapter}`, trigger: "ดูตอน", status: "ยังไม่ได้ทำ" }); else openPanel(item, event.currentTarget); }}><Icon icon={item.status === "published" ? faBookOpen : faCalendarDays} />{item.status === "ready" ? "ตั้งเวลา" : item.status === "scheduled" ? "แก้ไขเวลา" : "ดูตอน"}</button></td></tr>;
            })}</tbody></table>{!rows.length && <div className={styles.empty}><Icon icon={faCalendarDays} /><h2>ไม่มีตอนในกลุ่มนี้</h2><p>ลองเลือกเรื่องหรือสถานะอื่น</p></div>}</div>
            <div className={styles.pagination}><label>แสดง<select className="ds-input" aria-label="จำนวนรายการต่อหน้า" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}>{[10, 30, 50].map(value => <option key={value} value={value}>{value}</option>)}</select>รายการต่อหน้า</label><span>{rows.length ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, rows.length)} จาก {rows.length} รายการ</span><button type="button" aria-label="หน้าก่อนหน้า" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><Icon icon={faChevronLeft} /></button><strong>{currentPage}</strong><button type="button" aria-label="หน้าถัดไป" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}><Icon icon={faChevronRight} /></button></div>
          </section><p className={styles.notice} role="status">{notice}</p>
        </section>
        {selected && selectedProject && <aside ref={panelRef} className={styles.publishPanel} aria-labelledby="publish-panel-title">
          <div className={styles.panelHeading}><h2 id="publish-panel-title"><Icon icon={faCalendarDays} />{readOnly ? "รายละเอียดการเผยแพร่" : selected.status === "scheduled" ? "ปรับเวลาเผยแพร่" : "ตั้งเวลาเผยแพร่"}</h2><button type="button" aria-label="ปิดแผงตั้งเวลาเผยแพร่" onClick={closePanel}><Icon icon={faXmark} /></button></div>
          <div className={styles.selectedBook}><Image src={selectedProject.cover} alt={`ปก ${selectedProject.title}`} width={60} height={72} sizes="60px" /><div><strong>{selectedProject.title}</strong><p>ตอนที่ {selected.chapter} · {selected.title}</p></div></div>
          <label className={styles.fieldLabel}>วันที่เผยแพร่</label>
          <div className={styles.datePicker}><div className={styles.monthHeading}><button type="button" aria-label="เดือนก่อนหน้า" onClick={() => shiftMonth(-1)}><Icon icon={faChevronLeft} /></button><strong>{buddhistDate(month, true)}</strong><button type="button" aria-label="เดือนถัดไป" onClick={() => shiftMonth(1)}><Icon icon={faChevronRight} /></button></div><div className={styles.dateGrid}>{["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map(day => <span className={styles.weekday} key={day}>{day}</span>)}{cells.map(day => <button key={day} type="button" disabled={readOnly || day < scheduleWorkspaceToday} aria-label={`เลือกวันที่ ${buddhistDate(day)}`} aria-pressed={date === day} className={`${day.slice(0, 7) !== month.slice(0, 7) ? styles.outsideMonth : ""} ${date === day ? styles.selectedDay : ""}`} onClick={() => { setDate(day); setMonth(day.slice(0, 7) + "-01"); setError(""); }}>{parseDay(day).getUTCDate()}</button>)}</div></div>
          <label className={styles.fieldLabel} htmlFor="publication-time">เวลาเผยแพร่</label><div className={styles.timePicker}><Icon icon={faClock} /><select id="publication-time" className="ds-input" disabled={readOnly} value={time} onChange={event => { setTime(event.target.value); setError(""); }}>{timeOptions.map(value => <option key={value} value={value}>{value} น.</option>)}</select></div>
          <p className={styles.timezone}><Icon icon={faCircleInfo} />เวลาในเขตประเทศไทย (UTC+7)</p>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.panelActions}><button type="button" className="ds-button-secondary" onClick={closePanel}>{readOnly ? "ปิด" : "ยกเลิก"}</button>{!readOnly && <button type="button" className="ds-button-primary" onClick={save}><Icon icon={faCalendarCheck} />ยืนยันกำหนดเวลา</button>}</div>
        </aside>}
      </div>
    </div>
  </div>{pending && <UnbuiltPageModal page={pending} href={pending.url} onClose={() => setPending(null)} />}</main>;
}
