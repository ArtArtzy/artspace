"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faFolderOpen, faFilePen, faChartSimple, faComment, faCalendarDays, faWandMagicSparkles, faLightbulb, faGear, faPen, faBookOpen, faUsers, faDiagramProject, faFileLines, faChevronRight, faEllipsis, faEye, faHeart, faClipboardCheck, faArrowUp, faTableCellsLarge, faList, faPlus, faStar, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import UnbuiltPageModal from "@/components/UnbuiltPageModal";
import type { UnbuiltPage } from "@/data/unbuilt-pages";
import shell from "./WriterStudioShell.module.css";
import styles from "./WriterStudio.module.css";

const projects = [
  { id: "moon", title: "จันทร์เหนือวังหลวง", cover: "/images/category-books/china-01.webp", status: "writing", tags: ["ย้อนยุค", "ดราม่า", "Coming of Age"], chapters: 32, updated: "2 ชั่วโมงที่แล้ว", views: "421K", likes: "17.9K", comments: 326 },
  { id: "sky", title: "Sky of Tomorrow", cover: "/images/book-sky-tomorrow.webp", status: "writing", tags: ["แฟนตาซี", "โรแมนติก", "ผจญภัย"], chapters: 18, updated: "1 วันที่แล้ว", views: "128K", likes: "6.4K", comments: 142 },
  { id: "fog", title: "เสียงในม่านหมอก", cover: "/images/book-between-lines.webp", status: "draft", tags: ["ลึกลับ", "เหนือธรรมชาติ"], chapters: 0, updated: "3 วันที่แล้ว", views: "0", likes: "0", comments: 0 },
] as const;

const navigation = [
  ["หน้าหลัก", faHouse, "home"], ["โปรเจกต์ของฉัน", faFolderOpen, "projects"], ["ข้อมูลเชิงลึก", faChartSimple, "insights"], ["ความคิดเห็น", faComment, "comments"], ["ตารางเผยแพร่", faCalendarDays, "schedule"], ["เครื่องมือ AI", faWandMagicSparkles, "tools"],
] as const;
const tools = [
  { title: "AI Writing Assistant", description: "ช่วยคิด พัฒนา แก้ไข และต่อยอดเนื้อหา", icon: faWandMagicSparkles, image: "/images/book-sky-tomorrow.webp", tone: "blue" },
  { title: "Story Bible", description: "จัดระบบโลกของเรื่อง เนื้อหา และกฎต่าง ๆ", icon: faBookOpen, image: "/images/book-between-lines.webp", tone: "gold" },
  { title: "ตัวละคร", description: "สร้างและจัดการ ตัวละครของคุณ", icon: faUsers, image: "/images/book-villains-side.webp", tone: "gold" },
  { title: "Timeline", description: "จัดลำดับเหตุการณ์ และความต่อเนื่อง", icon: faDiagramProject, image: "/images/book-parallel-world.webp", tone: "green" },
  { title: "สรุปตอนก่อนหน้า", description: "สรุปเนื้อหาตอนก่อน ด้วย AI อย่างรวดเร็ว", icon: faFileLines, image: "/images/book-blood-moon.webp", tone: "violet" },
  { title: "ไอเดีย & ฉาก", description: "ค้นหาไอเดียใหม่ ๆ สำหรับตอนต่อไป", icon: faLightbulb, image: "/images/book-between-lines.webp", tone: "gold" },
];
const taskLabels = ["เขียนตอนที่ 32 — เมื่อดอกเหมยผลิบาน", "ตรวจคำผิดก่อนเผยแพร่", "ตอบความคิดเห็นจากผู้อ่าน", "วางแผนเนื้อหาตอนถัดไป"];

function Icon({ icon, className = "" }: { icon: IconDefinition; className?: string }) {
  return <FontAwesomeIcon icon={icon} aria-hidden="true" className={`${styles.icon} ${className}`} />;
}

export default function WriterStudio() {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("updated");
  const [period, setPeriod] = useState("30");
  const [checked, setChecked] = useState([true, false, false, false]);
  const [pending, setPending] = useState<UnbuiltPage | null>(null);
  const openFeature = (name: string, code: string) => setPending({ name, code: `WRITE-${code.toUpperCase()}`, url: `/write/${code}`, trigger: name, status: "ยังไม่ได้ทำ" });
  useEffect(() => {
    if (!pending) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setPending(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [pending]);
  const visibleProjects = projects.filter((project) => filter === "all" || project.status === filter).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title, "th") : sort === "views" ? parseFloat(b.views) - parseFloat(a.views) : projects.indexOf(a) - projects.indexOf(b));
  const navigate = (id: string, label: string) => {
    if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (["projects", "draft", "tools", "insights"].includes(id)) {
      if (id === "draft" || id === "projects") setFilter(id === "draft" ? "draft" : "all");
      document.getElementById(id === "draft" ? "projects" : id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    openFeature(label, id);
  };

  return (
    <main className={`${shell.stage} ${styles.stage}`}>
      <div className={shell.layout}>
        <aside className={`ds-card ${shell.navigation}`}>
          <h2 className="text-ds-h3">Writer Studio</h2>
          <nav aria-label="เมนูนักเขียน">
            {navigation.map(([label, icon, id]) => id === "projects" || id === "insights" || id === "comments" || id === "schedule" ? <Link key={id} href={`/write/${id}`} className={shell.navItem}><Icon icon={icon} /><span>{label}</span></Link> : <button key={id} type="button" className={`${shell.navItem} ${id === "home" ? shell.activeNav : ""}`} onClick={() => navigate(id, label)}><Icon icon={icon} /><span>{label}</span></button>)}
          </nav>
          <div className={shell.quote}><p>“ทุกเรื่องราว<br />เริ่มต้นจากจินตนาการ<br />และเติบโตได้เสมอ<br />ที่นี่... ARN SPACE”</p><span aria-hidden="true">— ◇ —</span></div>
        </aside>

        <div className={styles.center}>
          <header className={styles.heading}>
            <div><h1 className="text-ds-h1"><Icon icon={faWandMagicSparkles} /> Writer Studio</h1><p className="text-ds-body">เครื่องมือและพื้นที่ทำงานสำหรับสร้างสรรค์เรื่องราวของคุณ</p></div>
            <blockquote>“เรื่องราวที่ดี ไม่ได้เกิดขึ้นแค่ในจินตนาการ<br />แต่เริ่มต้นจากการลงมือเขียน”</blockquote>
          </header>

          <section className={`ds-card ${styles.continue}`} aria-labelledby="continue-title">
            <div className={styles.sectionHeading}><Icon icon={faPen} /><h2 id="continue-title" className="text-ds-h3">เขียนต่อ</h2><span className="text-ds-body-sm text-arn-muted">กลับเข้าสู่เรื่องราวของคุณ</span></div>
            <div className={styles.continueBody}>
              <Image src={projects[0].cover} alt="ปกจันทร์เหนือวังหลวง หญิงสาวในชุดจีนสีแดง" width={160} height={240} sizes="160px" className={styles.featureCover} />
              <div className={styles.continueText}>
                <div className={styles.titleRow}><h3 className="text-ds-h2">จันทร์เหนือวังหลวง</h3><span className={styles.badge}>กำลังเขียน</span></div>
                <h4 className="text-ds-h3">ตอนที่ 32 — เมื่อดอกเหมยผลิบาน</h4>
                <p className="text-ds-body-sm text-arn-muted">ลมหิมะพัดผ่านตำหนักตะวันออก กลิ่นดอกเหมยลอยมาพร้อมกับข่าวลือ<br />ที่อาจเปลี่ยนชะตาของทุกคนในวัง...</p>
                <div className={styles.featureMeta}><span><Icon icon={faFilePen} /> แก้ไขล่าสุด 2 ชั่วโมงที่แล้ว</span><span><Icon icon={faFileLines} /> คำทั้งหมด 42,560 คำ</span></div>
              </div>
              <div className={styles.continueActions}><button className="ds-button-primary" type="button" onClick={() => openFeature("เขียนตอนที่ 32", "editor/moon")}><Icon icon={faPen} />เขียนต่อ</button><div><button className="ds-button-secondary" type="button" onClick={() => openFeature("จัดการเรื่อง จันทร์เหนือวังหลวง", "manage/moon")}><Icon icon={faGear} />จัดการเรื่อง</button><button aria-label="ตัวเลือกจันทร์เหนือวังหลวง" className="ds-button-secondary" type="button" onClick={() => openFeature("ตัวเลือกผลงาน", "options/moon")}><Icon icon={faEllipsis} /></button></div></div>
            </div>
          </section>

          <section id="tools" className={styles.toolsSection} aria-labelledby="tools-title">
            <div className={styles.sectionHeading}><Icon icon={faStar} className={styles.gold} /><h2 id="tools-title" className="text-ds-h3">เครื่องมือสร้างสรรค์</h2><span className="text-ds-meta text-arn-muted">ตัวช่วยที่จะทำให้การเขียนของคุณง่ายและสนุกยิ่งขึ้น</span><button className={styles.textAction} onClick={() => openFeature("เครื่องมือทั้งหมด", "tools")} type="button">ดูเครื่องมือทั้งหมด <Icon icon={faChevronRight} /></button></div>
            <div className={styles.tools}>{tools.map((tool, index) => <button type="button" key={tool.title} className={`ds-card ${styles.tool} ${styles[tool.tone]}`} onClick={() => openFeature(tool.title, `tool/${index + 1}`)}><Image src={tool.image} alt="" fill sizes="140px" /><span className={styles.toolContent}><Icon icon={tool.icon} /><strong>{tool.title}</strong><span>{tool.description}</span></span><span className={styles.roundArrow}><Icon icon={faChevronRight} /></span></button>)}</div>
          </section>

          <section id="projects" className={styles.projectsSection} aria-labelledby="projects-title">
            <div className={styles.sectionHeading}><Icon icon={faBookOpen} /><h2 id="projects-title" className="text-ds-h3">ผลงานของฉัน</h2><span className="text-ds-meta text-arn-muted">จัดการนิยายและโปรเจกต์ทั้งหมดของคุณ</span><div className={styles.viewControls}><label className="text-ds-meta" htmlFor="project-sort">เรียงตาม</label><select id="project-sort" className="ds-input" value={sort} onChange={(event) => setSort(event.target.value)}><option value="updated">อัปเดตล่าสุด</option><option value="title">ชื่อผลงาน</option><option value="views">ยอดอ่าน</option></select><div className={styles.viewToggle}>{[["grid", faTableCellsLarge, "มุมมองตาราง"], ["list", faList, "มุมมองรายการ"]].map(([id, icon, label]) => <button key={id as string} type="button" aria-label={label as string} aria-pressed={view === id} className={view === id ? styles.selected : ""} onClick={() => setView(id as string)}><Icon icon={icon as IconDefinition} /></button>)}</div></div></div>
            <div className={styles.filters}>{[["all", "ทั้งหมด (3)"], ["writing", "กำลังเขียน (2)"], ["draft", "ร่างต้นฉบับ (1)"], ["finished", "จบแล้ว (0)"]].map(([id, label]) => <button key={id} className={filter === id ? styles.selected : ""} aria-pressed={filter === id} type="button" onClick={() => setFilter(id)}>{label}</button>)}</div>
            <div className={`${styles.projects} ${view === "list" ? styles.listView : ""}`}>
              {visibleProjects.map((project) => <article key={project.id} className={`ds-card ${styles.project}`}><div className={styles.projectBody}><Image src={project.cover} alt={`ปก ${project.title}`} width={88} height={132} sizes="88px" className={styles.projectCover} /><div className={styles.projectText}><div className={styles.projectTop}><span className={`${styles.badge} ${project.status === "draft" ? styles.draft : ""}`}>{project.status === "draft" ? "ร่างต้นฉบับ" : "กำลังเขียน"}</span><button aria-label={`ตัวเลือก ${project.title}`} type="button" onClick={() => openFeature(`ตัวเลือก ${project.title}`, `options/${project.id}`)}><Icon icon={faEllipsis} /></button></div><h3 className="text-ds-body-sm font-semibold">{project.title}</h3><div className={styles.tags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="text-ds-caption text-arn-muted">{project.chapters} ตอน · อัปเดตล่าสุด {project.updated}</p><div className={styles.stats}><span><Icon icon={faEye} />{project.views}</span><span><Icon icon={faHeart} className={styles.pink} />{project.likes}</span><span><Icon icon={faComment} />{project.comments}</span></div></div></div><div className={styles.projectActions}><button className={project.status === "draft" ? "ds-button-secondary" : "ds-button-primary"} type="button" onClick={() => openFeature(`เขียน ${project.title}`, `editor/${project.id}`)}><Icon icon={faPen} />เขียนต่อ</button><button className="ds-button-secondary" type="button" onClick={() => openFeature(`รายละเอียด ${project.title}`, `manage/${project.id}`)}>ดูรายละเอียด</button></div></article>)}
              {visibleProjects.length === 0 && <div className={`ds-card ${styles.empty}`}><Icon icon={faBookOpen} /><h3 className="text-ds-h3">ยังไม่มีผลงานที่จบแล้ว</h3><p className="text-ds-body-sm text-arn-muted">เรื่องราวของคุณกำลังเติบโต เขียนต่ออีกนิดนะ</p></div>}
            </div>
            <button className={`ds-button-secondary ${styles.newProject}`} type="button" onClick={() => openFeature("สร้างผลงานใหม่", "new")}><Icon icon={faPlus} />สร้างผลงานใหม่</button>
          </section>
        </div>

        <aside className={styles.rightRail} aria-label="ภาพรวมการเขียน">
          <section id="insights" className={`ds-card ${styles.insights}`}>
            <div className={styles.railHeading}><Icon icon={faChartSimple} /><div><h2 className="sidebar-title">Writer Intelligence <Icon icon={faCircleQuestion} /></h2><p className="sidebar-meta text-arn-muted">ข้อมูลเชิงลึกจากผลงานของคุณ</p></div><Link aria-label="ดูข้อมูลเชิงลึก" href="/write/insights"><Icon icon={faChevronRight} /></Link></div>
            <select aria-label="ช่วงเวลาของข้อมูลเชิงลึก" className={`ds-input ${styles.period}`} value={period} onChange={(event) => setPeriod(event.target.value)}><option value="30">รอบ 30 วันที่ผ่านมา</option><option value="7">รอบ 7 วันที่ผ่านมา</option></select>
            <div className={styles.metricGrid}>{[{ label: "ยอดอ่านทั้งหมด", value: period === "30" ? "421K" : "98.2K", growth: "12%", icon: faEye }, { label: "ผู้ติดตามใหม่", value: period === "30" ? "1.2K" : "286", growth: "28%", icon: faUsers }, { label: "คนที่ชอบเรื่องนี้", value: period === "30" ? "17.9K" : "4.1K", growth: "16%", icon: faHeart }, { label: "ความคิดเห็น", value: period === "30" ? "326" : "84", growth: "43%", icon: faComment }].map((metric) => <div className={styles.metric} key={metric.label}><Icon icon={metric.icon} className={metric.icon === faHeart ? styles.pink : ""} /><div><p className="sidebar-meta text-arn-muted">{metric.label}</p><strong className="text-ds-h3">{metric.value}</strong><span><Icon icon={faArrowUp} /> {metric.growth}</span></div></div>)}</div>
            <div className={styles.aiInsight}><h3 className="text-ds-body-sm font-semibold">AI Insight <Icon icon={faStar} className={styles.gold} /><span className="sidebar-meta text-arn-muted">จากความคิดเห็นของผู้อ่าน</span></h3><p className="sidebar-body text-arn-muted">ผู้อ่านกำลังพูดถึง “เสวี่ยหลิน” และ “องค์รัชทายาท” มากขึ้นในตอนล่าสุด โดยเฉพาะความสัมพันธ์ที่เริ่มชัดเจนขึ้นของทั้งสองตัวละคร คุณอาจพิจารณาขยายฉากความสัมพันธ์นี้ในตอนถัดไป</p><Link className="ds-button-secondary" href="/write/insights">ดูรายละเอียดเพิ่มเติม <Icon icon={faChevronRight} /></Link></div>
          </section>
          <section className={`ds-card ${styles.tasks}`}><div className={styles.railHeading}><Icon icon={faClipboardCheck} /><h2 className="sidebar-title">งานที่ควรทำ</h2><span className="sidebar-meta text-arn-muted">{checked.filter((value) => !value).length} รายการ</span></div><div className={styles.taskList}>{taskLabels.map((label, index) => <label key={label}><input type="checkbox" checked={checked[index]} onChange={() => setChecked((items) => items.map((value, position) => position === index ? !value : value))} /><span>{label}</span>{index === 2 && <span className={styles.counter}>12</span>}</label>)}</div><button type="button" className={styles.textAction} onClick={() => openFeature("งานทั้งหมด", "tasks")}>ดูทั้งหมด <Icon icon={faChevronRight} /></button></section>
          <section className={`ds-card ${styles.draftProgress}`}><div className={styles.railHeading}><Icon icon={faClipboardCheck} className={styles.gold} /><h2 className="sidebar-title">ความคืบหน้าร่างต้นฉบับ</h2></div><div className={styles.progressLabel}><span>1 จาก 5 ขั้นตอน</span><strong>20%</strong></div><progress aria-label="ความคืบหน้าร่างต้นฉบับ" value={20} max={100}>20%</progress><div className={styles.draftBook}><Image src={projects[2].cover} alt="ปกเสียงในม่านหมอก" width={36} height={52} sizes="36px" /><span className="sidebar-item-title">เสียงในม่านหมอก</span><button type="button" className="ds-button-secondary" onClick={() => openFeature("เขียนเสียงในม่านหมอก", "editor/fog")}>ทำต่อ <Icon icon={faChevronRight} /></button></div></section>
        </aside>
      </div>
      {pending && <UnbuiltPageModal page={pending} href={pending.url} onClose={() => setPending(null)} />}
    </main>
  );
}
