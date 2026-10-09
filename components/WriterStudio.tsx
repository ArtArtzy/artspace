"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faFolderOpen, faChartSimple, faComment, faCalendarDays, faWandMagicSparkles, faPen, faBookOpen, faUsers, faDiagramProject, faFileLines, faChevronRight, faEye, faHeart, faArrowUp, faPlus, faClock, faEllipsisVertical, faPalette, faGlobe, faArrowRight, faBookmark, faComments, faPenToSquare, faTrashCan, faCircleInfo, faShareNodes, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import UnbuiltPageModal from "@/components/UnbuiltPageModal";
import type { UnbuiltPage } from "@/data/unbuilt-pages";
import { initialPublications, scheduleProjects, parseDay, type Publication } from "@/data/writer-schedule";
import { ScheduleEditor } from "./WriterSchedule";
import shell from "./WriterStudioShell.module.css";
import styles from "./WriterStudio.module.css";

const projects = [
  { id: "moon", title: "จันทร์เหนือวังหลวง", cover: "/images/category-books/china-01.webp", kind: "novel", statusLabel: "กำลังเขียน", tags: ["ย้อนยุค", "ดราม่า", "Coming of Age"], chapters: 32, target: 50, percent: 64, updated: "2 ชั่วโมงที่แล้ว", views: "421K", likes: "17.9K", comments: 326 },
  { id: "sky", title: "Sky of Tomorrow", cover: "/images/book-sky-tomorrow.webp", kind: "fanfic", statusLabel: "กำหนดเผยแพร่", tags: ["แฟนตาซี", "โรแมนติก", "ผจญภัย"], chapters: 18, target: 30, percent: 60, updated: "1 วันที่แล้ว", views: "128K", likes: "6.4K", comments: 142 },
  { id: "fog", title: "เสียงในม่านหมอก", cover: "/images/book-between-lines.webp", kind: "novel", statusLabel: "จบแล้ว", tags: ["ลึกลับ", "เหนือธรรมชาติ"], chapters: 24, target: 24, percent: 38, updated: "3 วันที่แล้ว", views: "24K", likes: "12K", comments: 45 },
] as const;

const navigation = [
  ["ภาพรวม", faHouse, "home"], ["โปรเจกต์", faFolderOpen, "projects"], ["ข้อมูลเชิงลึก", faChartSimple, "insights"], ["ความคิดเห็น", faComment, "comments"], ["ตารางเผยแพร่", faCalendarDays, "schedule"], ["เครื่องมือ AI", faWandMagicSparkles, "tools"],
] as const;
const tools = [
  { title: "ตัวละคร", icon: faUsers, tone: "green" },
  { title: "Timeline", icon: faDiagramProject, tone: "green" },
  { title: "Story World", icon: faGlobe, tone: "violet" },
  { title: "ปมเรื่อง", icon: faDiagramProject, tone: "pink" },
  { title: "แผนผังความสัมพันธ์", icon: faShareNodes, tone: "green" },
  { title: "ปมปูทางและเฉลย", icon: faPuzzlePiece, tone: "gold" },
];
const upcomingPublications = ["moon", "sky", "fog"].map((projectId) => initialPublications.find((publication) => publication.project === projectId && ["scheduled", "draft"].includes(publication.status))!);

function Icon({ icon, className = "" }: { icon: IconDefinition; className?: string }) {
  return <FontAwesomeIcon icon={icon} aria-hidden="true" className={`${styles.icon} ${className}`} />;
}

export default function WriterStudio() {
  const [publications, setPublications] = useState<Publication[]>(upcomingPublications);
  const [scheduleMenu, setScheduleMenu] = useState<string | null>(null);
  const [scheduleEditor, setScheduleEditor] = useState<{ item?: Publication; date: string; repeat: "once" } | null>(null);
  const [scheduleNotice, setScheduleNotice] = useState("");
  const scheduleTrigger = useRef<HTMLElement | null>(null);
  const visiblePublications = publications.filter((item) => item.status === "scheduled" || item.status === "draft").sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)).slice(0, 3);
  const openScheduleEditor = (item?: Publication) => {
    scheduleTrigger.current = (item ? document.getElementById(`schedule-trigger-${item.id}`) : document.activeElement) as HTMLElement;
    setScheduleMenu(null);
    setScheduleEditor({ item, date: item?.date ?? "2026-10-09", repeat: "once" });
  };
  const closeScheduleEditor = () => { setScheduleEditor(null); if (scheduleTrigger.current?.isConnected) scheduleTrigger.current.focus(); else document.getElementById("schedule-preview-title")?.focus(); };
  useEffect(() => {
    if (!scheduleMenu) return;
    const dismiss = (event: PointerEvent) => { if (!(event.target as Element).closest("[data-schedule-menu]")) setScheduleMenu(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setScheduleMenu(null); document.getElementById(`schedule-trigger-${scheduleMenu}`)?.focus(); } };
    document.getElementById(`schedule-menu-${scheduleMenu}`)?.querySelector<HTMLButtonElement>("button")?.focus();
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [scheduleMenu]);
  const [pending, setPending] = useState<UnbuiltPage | null>(null);
  const openFeature = (name: string, code: string) => setPending({ name, code: `WRITE-${code.toUpperCase()}`, url: `/write/${code}`, trigger: name, status: "ยังไม่ได้ทำ" });
  useEffect(() => {
    if (!pending) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setPending(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [pending]);
  const navigate = (id: string, label: string) => {
    if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (["projects", "draft", "tools", "insights"].includes(id)) {
      document.getElementById(id === "draft" ? "projects" : id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    openFeature(label, id);
  };

  return (
    <main className={`${shell.stage} ${styles.stage}`}>
      <div className={`${shell.layout} ${styles.layout}`}>
        <aside className={`ds-card ${shell.navigation} ${styles.navigation}`}>
          <h2 className="text-ds-h3">Writer Studio</h2>
          <nav aria-label="เมนูนักเขียน">
            {navigation.map(([label, icon, id]) => id === "projects" || id === "insights" || id === "comments" || id === "schedule" ? <Link key={id} href={`/write/${id}`} className={shell.navItem}><Icon icon={icon} /><span>{label}</span></Link> : <button key={id} type="button" className={`${shell.navItem} ${id === "home" ? shell.activeNav : ""}`} onClick={() => navigate(id, label)}><Icon icon={icon} /><span>{label}</span></button>)}
          </nav>
          <div className={shell.quote}><p>“ทุกเรื่องราว<br />เริ่มต้นจากจินตนาการ<br />และเติบโตได้เสมอ<br />ที่นี่... ARN SPACE”</p><span aria-hidden="true">— ◇ —</span></div>
        </aside>

        <div className={styles.center}>
          <header className={styles.heading}>
            <Image src="/images/writer-studio-hero.webp" alt="" fill sizes="(max-width: 760px) 100vw, 900px" className={styles.heroArt} preload />
            <div><h1 className="text-ds-h1"><Icon icon={faWandMagicSparkles} /> Writer Studio</h1><p className="text-ds-body">พื้นที่สำหรับนักเขียน สร้างสรรค์เรื่องราวของคุณให้เป็นจริง</p><span className={styles.heroTagline}>◇ &nbsp; Story comes alive.</span></div>
          </header>

          <div className={styles.primaryGrid}>
            <section className={`ds-card ${styles.continue}`} aria-labelledby="continue-title">
              <div className={styles.sectionHeading}><Icon icon={faPen} /><h2 id="continue-title">เขียนต่อ</h2></div>
              <div className={styles.continueBody}>
                <Image src={projects[0].cover} alt="ปกจันทร์เหนือวังหลวง" width={160} height={224} sizes="(max-width: 480px) 104px, 144px" className={styles.featureCover} />
                <div className={styles.continueText}>
                  <div className={styles.titleRow}><h3>จันทร์เหนือวังหลวง</h3><span className={styles.badge}>กำลังเขียน</span></div>
                  <h4>ตอนที่ 32 — เมื่อดอกเหมยผลิบาน</h4>
                  <p>ลมหิมะพัดผ่านตำหนักตะวันออก กลิ่นดอกเหมยลอยมาพร้อมกับข่าวลือ ที่อาจเปลี่ยนชะตาของทุกคนในวัง...</p>
                  <div className={styles.featureMeta}><span><Icon icon={faFileLines} /> 1,842 คำ</span><span><Icon icon={faClock} /> แก้ไขล่าสุด 2 ชั่วโมงที่แล้ว</span><span><Icon icon={faPenToSquare} /> ฉบับร่าง</span></div>
                  <div className={styles.continueBottom}><button className="ds-button-primary" type="button" onClick={() => openFeature("เขียนตอนที่ 32", "editor/moon")}><Icon icon={faPen} />เขียนต่อ<Icon icon={faArrowRight} /></button></div>
                </div>
              </div>
            </section>
            <section className={`ds-card ${styles.newStory}`} aria-labelledby="new-story-title">
              <div className={styles.sectionHeading}><Icon icon={faPlus} className={styles.createIcon} /><h2 id="new-story-title">สร้างเรื่องใหม่</h2></div>
              <div className={styles.storyActions}>{[{ title: "นิยาย", description: "สร้างโลกและตัวละครในจินตนาการ", icon: faBookOpen, tone: "novelTone", code: "novel" }, { title: "แฟนฟิค", description: "ต่อยอดเรื่องราวที่คุณชื่นชอบ", icon: faPen, tone: "fanficTone", code: "fanfic" }, { title: "การ์ตูน", description: "เล่าเรื่องผ่านภาพและบท", icon: faPalette, tone: "cartoonTone", code: "cartoon" }].map((category) => <button key={category.code} className={`ds-button-secondary ${styles.categoryButton} ${styles[category.tone]}`} type="button" onClick={() => openFeature(`สร้าง${category.title}ใหม่`, `new/${category.code}`)}><Icon icon={category.icon} /><span><strong>{category.title}</strong><small>{category.description}</small></span><Icon icon={faChevronRight} /></button>)}</div>
            </section>
          </div>
          <div className={styles.secondaryGrid}>
            <section className={`ds-card ${styles.schedulePreview}`} aria-labelledby="schedule-preview-title">
              <div className={styles.sectionHeading}><Icon icon={faCalendarDays} /><h2 id="schedule-preview-title" tabIndex={-1}>ตารางเผยแพร่</h2><div className={styles.scheduleHeadingActions}><button type="button" className="ds-button-secondary" onClick={() => openScheduleEditor()}><Icon icon={faPlus} />ตั้งเวลา</button><Link className={styles.textAction} href="/write/schedule">ดูทั้งหมด<Icon icon={faChevronRight} /></Link></div></div>
              <div className={styles.scheduleList}>{visiblePublications.map((publication) => {
                const project = scheduleProjects.find((item) => item.id === publication.project)!;
                const date = parseDay(publication.date);
                const datePart = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("th-TH-u-ca-gregory", { ...options, timeZone: "UTC" }).format(date);
                return <article key={publication.id} className={styles.scheduleRow}>
                  <time className={styles.publicationDay} dateTime={publication.date}><span>{datePart({ weekday: "short" })}</span><strong>{datePart({ day: "numeric" })}</strong><span>{datePart({ month: "short" })}</span><span>{datePart({ year: "numeric" })}</span></time>
                  <Image src={project.cover} alt={`ปก ${project.title}`} width={56} height={80} sizes="(max-width: 480px) 40px, 56px" />
                  <div className={styles.scheduleBook}><h3>{project.title}</h3><p>ตอนที่ {publication.chapter} — {publication.title}</p><span className={styles.publicationTime}><Icon icon={faClock} /><time dateTime={`${publication.date}T${publication.time}:00+07:00`}>{publication.time} น.</time></span></div>
                  <span className={`${styles.scheduleStatus} ${publication.status === "draft" ? styles.awaitingStatus : ""}`}><Icon icon={faClock} />{publication.status === "draft" ? "รอเผยแพร่" : "ตั้งเวลาแล้ว"}</span>
                  <div className={styles.scheduleMenuWrapper} data-schedule-menu>
                    <button id={`schedule-trigger-${publication.id}`} className={styles.scheduleOptions} aria-label={`ตัวเลือกเผยแพร่ ${project.title}`} aria-haspopup="menu" aria-expanded={scheduleMenu === publication.id} aria-controls={scheduleMenu === publication.id ? `schedule-menu-${publication.id}` : undefined} type="button" onClick={() => setScheduleMenu((current) => current === publication.id ? null : publication.id)}><Icon icon={faEllipsisVertical} /></button>
                    {scheduleMenu === publication.id && <div id={`schedule-menu-${publication.id}`} className={styles.scheduleDropdown} role="menu" aria-label={`ตัวเลือกเผยแพร่ ${project.title}`} onKeyDown={(event) => {
                      const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
                      const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
                      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length; buttons[next]?.focus(); }
                      if (event.key === "Tab") setScheduleMenu(null);
                    }}>
                      <button type="button" role="menuitem" onClick={() => { setScheduleMenu(null); openFeature(`เปิดตอนที่ ${publication.chapter} — ${project.title}`, `editor/${publication.project}`); }}><Icon icon={faEye} />เปิดตอน</button>
                      <button type="button" role="menuitem" onClick={() => openScheduleEditor(publication)}><Icon icon={faPen} />แก้ไขเวลาเผยแพร่</button>
                      <button type="button" role="menuitem" className={styles.cancelSchedule} onClick={() => { setPublications((items) => items.map((item) => item.id === publication.id ? { ...item, status: "cancelled" } : item)); setScheduleMenu(null); setScheduleNotice(`ยกเลิกการตั้งเวลา ${project.title} ตอนที่ ${publication.chapter} แล้ว`); document.getElementById("schedule-preview-title")?.focus(); }}><Icon icon={faTrashCan} />ยกเลิกการตั้งเวลา</button>
                    </div>}
                  </div>
                </article>;
              })}{!visiblePublications.length && <p className={styles.scheduleEmpty}>ยังไม่มีตอนที่ตั้งเวลาเผยแพร่ไว้ กด “ตั้งเวลา” เพื่อเพิ่มกำหนดการ</p>}</div>
              {scheduleNotice && <p role="status" className={styles.scheduleNotice}>{scheduleNotice}</p>}
            </section>
            <section id="tools" className={`ds-card ${styles.toolsSection}`} aria-labelledby="tools-title">
              <div className={styles.sectionHeading}><Icon icon={faWandMagicSparkles} /><h2 id="tools-title">เครื่องมือสร้างสรรค์</h2><button className={styles.textAction} onClick={() => openFeature("เครื่องมือทั้งหมด", "tools")} type="button">ดูทั้งหมด<Icon icon={faChevronRight} /></button></div>
              <div className={styles.tools}>{tools.map((tool, index) => <button type="button" key={tool.title} className={`ds-card ${styles.tool} ${styles[tool.tone]}`} onClick={() => openFeature(tool.title, `tool/${index + 1}`)}><Icon icon={tool.icon} /><span><strong>{tool.title}</strong></span><Icon icon={faChevronRight} /></button>)}</div>
            </section>
          </div>

          <section id="projects" aria-labelledby="projects-title">
            <div className={styles.sectionHeading}><Icon icon={faFolderOpen} className={styles.gold} /><h2 id="projects-title" className="text-ds-h2">โปรเจกต์ล่าสุด</h2><Link className={styles.textAction} href="/write/projects">ดูโปรเจกต์ทั้งหมด<Icon icon={faChevronRight} /></Link></div>
            <div className={styles.projects}>
              {projects.map((project) => (
                <article key={project.id} className={`ds-card ${styles.project}`}>
                  <button type="button" className={styles.projectButton} aria-label={`เปิดโปรเจกต์ ${project.title}`} onClick={() => openFeature(`รายละเอียด ${project.title}`, `manage/${project.id}`)}>
                    <Image src={project.cover} alt={`ปก ${project.title}`} width={68} height={84} sizes="68px" className={styles.projectCover} />
                    <span className={styles.projectText}>
                      <span className={`text-ds-body-sm ${styles.projectTitle}`}>{project.title}</span>
                      <span className={`text-ds-meta text-arn-muted ${styles.projectMeta}`}>{project.kind === "fanfic" ? "แฟนฟิค" : "นิยาย"} · {project.chapters} ตอน</span>
                      <span className={`text-ds-meta text-arn-subtle ${styles.projectMeta}`}>แก้ไข {project.updated}</span>
                    </span>
                    <Icon icon={faChevronRight} className={styles.projectChevron} />
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.rightRail} aria-label="ข้อมูลและกิจกรรมจากผู้อ่าน">
          <section id="insights" className={`ds-card ${styles.readerOverview}`} aria-labelledby="reader-overview-title">
            <div className={styles.readerHeading}><Icon icon={faChartSimple} /><h2 id="reader-overview-title" className="sidebar-title">ภาพรวมผู้อ่าน</h2><Link href="/write/insights" className="sidebar-link">ดูทั้งหมด<Icon icon={faChevronRight} /></Link></div>
            <div className={styles.readerMetrics}>{[{ label: "ยอดอ่านทั้งหมด", value: "421K", growth: "12%", icon: faEye }, { label: "ผู้ติดตาม", value: "1.2K", growth: "28%", icon: faUsers }, { label: "คนชอบเรื่องนี้", value: "17.9K", growth: "16%", icon: faHeart }, { label: "ความคิดเห็น", value: "326", growth: "43%", icon: faComments }].map((metric) => <div className={styles.readerMetric} key={metric.label}><Icon icon={metric.icon} className={metric.icon === faHeart ? styles.readerHeart : ""} /><div><strong>{metric.value}</strong><p className="sidebar-meta">{metric.label}</p><span className={styles.readerGrowth}><Icon icon={faArrowUp} />{metric.growth}<span className="sr-only">เพิ่มขึ้นจากช่วงก่อนหน้า</span></span></div></div>)}</div>
          </section>
          <section className={`ds-card ${styles.readerActivity}`} aria-labelledby="reader-activity-title">
            <div className={styles.readerHeading}><Icon icon={faFileLines} /><h2 id="reader-activity-title" className="sidebar-title">กิจกรรมจากผู้อ่าน</h2><button type="button" className="sidebar-link" onClick={() => openFeature("กิจกรรมจากผู้อ่านทั้งหมด", "activity")}>ดูทั้งหมด<Icon icon={faChevronRight} /></button></div>
            <ul className={styles.activityList}>{[
              { title: "ความคิดเห็นใหม่", detail: "“รอตอนต่อไปเลยค่ะ สนุกมาก!”", meta: "จันทร์เหนือวังหลวง · ตอนที่ 31", time: "2 ชม.", icon: faComments, heart: false },
              { title: "มีคนกดถูกใจตอนล่าสุด", detail: "Sky of Tomorrow · ตอนที่ 18", meta: "", time: "5 ชม.", icon: faHeart, heart: true },
              { title: "ผู้อ่านเพิ่มเรื่องลงชั้นหนังสือ", detail: "จันทร์เหนือวังหลวง", meta: "", time: "1 วัน", icon: faBookmark, heart: false },
              { title: "เริ่มติดตามคุณ", detail: "มีผู้ติดตามใหม่ 3 คน", meta: "", time: "2 วัน", icon: faUsers, heart: false },
            ].map((activity) => <li key={activity.title} className={styles.activityRow}><span className={styles.activityIcon}><Icon icon={activity.icon} className={activity.heart ? styles.readerHeart : ""} /></span><div className={styles.activityText}><h3 className="sidebar-item-title">{activity.title}</h3><p className="sidebar-body">{activity.detail}</p>{activity.meta && <p className="sidebar-caption">{activity.meta}</p>}</div><span className={`sidebar-meta ${styles.activityTime}`}>{activity.time}</span></li>)}</ul>
          </section>
        </aside>
      </div>
      {scheduleEditor && <ScheduleEditor initial={scheduleEditor} onClose={closeScheduleEditor} onSave={(newItems) => {
        const collision = newItems.some((item) => publications.some((existing) => existing.id !== item.id && existing.status !== "cancelled" && existing.project === item.project && (existing.chapter === item.chapter || existing.date === item.date && existing.time === item.time)));
        if (collision) return "เรื่องนี้มีเลขตอนหรือวันและเวลาซ้ำกับกำหนดการเดิม";
        setPublications((items) => [...items.filter((item) => !newItems.some((next) => next.id === item.id)), ...newItems]);
        setScheduleNotice("บันทึกกำหนดการทดลองแล้ว"); closeScheduleEditor(); return undefined;
      }} />}
      {pending && <UnbuiltPageModal page={pending} href={pending.url} onClose={() => setPending(null)} />}
    </main>
  );
}
