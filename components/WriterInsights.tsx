"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faFolderOpen, faChartSimple, faComment, faCalendarDays, faWandMagicSparkles, faEye, faUsers, faBookmark, faArrowUp, faHeart, faArrowRight, faShieldHalved, faMagnifyingGlass, faTags, faBookOpen, faLink, faEllipsis, faChevronDown, faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import UnbuiltPageModal from "./UnbuiltPageModal";
import type { UnbuiltPage } from "@/data/unbuilt-pages";
import { insightProjects, periods, chapterTitles, sources, formatCount, dateLabel, insightDates } from "@/data/writer-insights";
import shell from "./WriterStudioShell.module.css";
import styles from "./WriterInsights.module.css";

const navigation = [["ภาพรวม", faHouse, "home"], ["โปรเจกต์", faFolderOpen, "projects"], ["ข้อมูลเชิงลึก", faChartSimple, "insights"], ["ความคิดเห็น", faComment, "comments"], ["ตารางเผยแพร่", faCalendarDays, "schedule"], ["เครื่องมือ AI", faWandMagicSparkles, "tools"]] as const;
const sourceIcons: Record<string, IconDefinition> = {
  "หน้าแรก": faHouse,
  "ค้นหา": faMagnifyingGlass,
  "แท็ก / หมวดหมู่": faTags,
  "จากชั้นหนังสือ": faBookOpen,
  "ลิงก์แชร์": faLink,
  "อื่น ๆ": faEllipsis,
};
function Icon({ icon }: { icon: IconDefinition }) { return <FontAwesomeIcon icon={icon} aria-hidden="true" className={styles.icon} />; }
function Panel({ title, icon, children, action }: { title: string; icon: IconDefinition; children: ReactNode; action?: ReactNode }) {
  return <section className={"ds-card " + styles.panel}><div className={styles.panelHeading}><Icon icon={icon} /><h2 className="text-ds-h3">{title}</h2>{action}</div>{children}</section>;
}
function Tabs({ items, value, onChange, label }: { items: readonly string[]; value: string; onChange: (value: string) => void; label: string }) {
  return <div className={styles.tabs} role="group" aria-label={label}>{items.map(item => <button type="button" key={item} aria-pressed={value === item} className={value === item ? styles.selected : ""} onClick={() => onChange(item)}>{item}</button>)}</div>;
}
function ChartTooltip({ id, title, value, x, y }: { id: string; title: string; value: string; x: number; y: number }) {
  const below = y < 28;
  return <div id={id} role="tooltip" className={styles.chartTooltip} style={{ left: `clamp(88px, ${x}%, calc(100% - 88px))`, top: `${y}%`, transform: below ? "translate(-50%, 12px)" : "translate(-50%, calc(-100% - 12px))" }}><span>{title}</span><strong>{value}</strong></div>;
}
function RetentionChart({ chapterCount }: { chapterCount: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const stages = [["ตอนแรก", 100], ["ตอน 5", 78], ["ตอน 10", 56], ["ตอน " + Math.min(20, chapterCount - 1), 38], ["ตอนล่าสุด", 28]] as const;
  const points = stages.map(([, value], i) => [64 + i * 107, 188 - value * 1.52]);
  const line = points.map(point => point.join(",")).join(" ");
  return <><div className={styles.retention}>
    <div className={styles.retentionPlot} onMouseLeave={() => setHovered(null)} onKeyDown={event => { if (event.key === "Escape") setHovered(null); }}><svg viewBox="0 0 520 204" className={styles.retentionChart} role="img" aria-label={stages.map(([label, value]) => label + " " + value + "%").join(", ")}>
      <defs><linearGradient id="retention-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--arn-color-accent)" stopOpacity=".4" /><stop offset="100%" stopColor="var(--arn-color-accent)" stopOpacity=".02" /></linearGradient></defs>
      {[0, 20, 40, 60, 80, 100].map(value => { const y = 188 - value * 1.52; return <g key={value}><line x1="56" x2="506" y1={y} y2={y} className={styles.retentionGridLine} /><text x="46" y={y + 4} textAnchor="end">{value}%</text></g>; })}
      <polygon points={"64,188 " + line + " 492,188"} fill="url(#retention-area)" /><polyline points={line} className={styles.retentionLine} />
      {stages.map(([label, value], i) => { const [x, y] = points[i]; return <g key={label}><line x1={x} x2={x} y1={y} y2="188" className={styles.retentionGuide} /><circle cx={x} cy={y} r="4" className={styles.retentionDot} /><text x={x} y={y - 12} textAnchor="middle" className={styles.retentionValue}>{value}%</text></g>; })}
    </svg>{stages.map(([label, value], i) => <button key={label} type="button" className={styles.pointTarget} style={{ left: `${points[i][0] / 520 * 100}%`, top: `${points[i][1] / 204 * 100}%` }} aria-label={`${label}: อ่านต่อ ${value}%`} aria-describedby={hovered === i ? "retention-tooltip" : undefined} onMouseEnter={() => setHovered(i)} onFocus={() => setHovered(i)} onBlur={() => setHovered(null)} />)}{hovered !== null && <ChartTooltip id="retention-tooltip" title={stages[hovered][0]} value={`อ่านต่อ ${stages[hovered][1]}%`} x={points[hovered][0] / 520 * 100} y={points[hovered][1] / 204 * 100} />}</div><div className={styles.retentionLabels}>{stages.map(([label]) => <span key={label}>{label}</span>)}</div>
  </div><p className={styles.retentionSummary}><Icon icon={faUsers} /> จากผู้อ่านตอนแรก 100 คน มีประมาณ 28 คนที่อ่านถึงตอนล่าสุด</p></>;
}

export default function WriterInsights() {
  const [projectId, setProjectId] = useState("moon");
  const [isProjectPickerOpen, setIsProjectPickerOpen] = useState(false);
  const projectDialogRef = useRef<HTMLDialogElement>(null);
  const [days, setDays] = useState(30);
  const [trendMetric, setTrendMetric] = useState("ยอดอ่านทั้งหมด");
  const [chapterMetric, setChapterMetric] = useState("ยอดอ่าน");
  const [demographic, setDemographic] = useState("ความสนใจ");
  const [chapterIndex, setChapterIndex] = useState(7);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [hoveredTrend, setHoveredTrend] = useState<number | null>(null);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [pending, setPending] = useState<UnbuiltPage | null>(null);
  useEffect(() => {
    const dialog = projectDialogRef.current;
    if (!isProjectPickerOpen || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isProjectPickerOpen]);
  useEffect(() => {
    if (!pending) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setPending(null); };
    window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close);
  }, [pending]);
  const openFeature = (name: string, code: string) => setPending({ name, code: "WRITE-" + code.toUpperCase(), url: "/write/" + code, trigger: name, status: "ยังไม่ได้ทำ" });
  const project = insightProjects.find(item => item.id === projectId)!;
  const period = periods.find(item => item.days === days)!;
  const total = Math.round(project.total * period.factor);
  const { start, end } = insightDates(days);
  const metrics = [
    { label: "ยอดอ่านทั้งหมด", value: formatCount(total), growth: 12, icon: faEye },
    { label: "ผู้อ่านใหม่", value: formatCount(Math.round(project.readers * period.factor)), growth: 28, icon: faUsers },
    { label: "ผู้ติดตามเพิ่ม", value: formatCount(Math.round(project.followers * period.factor)), growth: 18, icon: faBookmark },
    { label: "คนชื่นชอบเรื่องนี้", value: formatCount(Math.round(project.likes * period.factor)), growth: 16, icon: faHeart },
    { label: "ความคิดเห็นใหม่", value: formatCount(Math.round(project.comments * period.factor)), growth: 43, icon: faComment },
  ];
  const trendTotal = trendMetric === "ยอดอ่านทั้งหมด" ? total : Math.round(project.readers * period.factor);
  const weights = Array.from({ length: days }, (_, i) => 5 + i / days * 9 + Math.sin(i * .8) * 2 + (i / days > .72 && i / days < .84 ? 6 : 0));
  const weightSum = weights.reduce((sum, value) => sum + value, 0);
  const daily = weights.map(value => Math.round(value / weightSum * trendTotal));
  daily[daily.length - 1] += trendTotal - daily.reduce((sum, value) => sum + value, 0);
  const ceiling = Math.ceil(Math.max(...daily, 1) / 1000) * 1000;
  const trendSlotWidth = 544 / daily.length;
  const trendBarWidth = trendSlotWidth - Math.min(12, trendSlotWidth * .16);
  const points = daily.map((value, i) => [48 + (i + .5) * trendSlotWidth, 176 - value / ceiling * 148]);
  const selectedPoint = activePoint ?? daily.indexOf(Math.max(...daily));
  const pointDate = new Date(start); pointDate.setUTCDate(start.getUTCDate() + selectedPoint);
  const chapters = chapterTitles.map((title, i) => ({ title: project.id === "sky" ? ["จุดเริ่มต้นใหม่", "ท้องฟ้าที่เปลี่ยนไป", "ผู้มาเยือน", "ประตูแห่งวันพรุ่งนี้", "โลกคู่ขนาน", "แสงแห่งความหวัง", "คำตอบจากดวงดาว", "ใต้ฟ้าเดียวกัน"][i] : title, number: project.chapters - 7 + i, views: Math.round(total * [.043, .051, .048, .039, .047, .058, .067, .077][i]), completion: Math.min(96, project.completion + [-5, -3, 1, -2, 3, 4, 8, 14][i]), comments: Math.round(project.comments * period.factor * [.04, .05, .06, .04, .07, .09, .11, .147][i]) }));
  const chapterCeiling = chapterMetric === "ยอดอ่าน" ? Math.ceil(Math.max(...chapters.map(item => item.views), 1) / 10000) * 10000 : chapterMetric === "ความคิดเห็น" ? Math.ceil(Math.max(...chapters.map(item => item.comments), 1) / 10) * 10 : 100;
  const ranked = [...chapters].sort((a, b) => b.views - a.views);
  const currentChapter = chapters[chapterIndex];
  const audiences = demographic === "ความสนใจ" ? [["โรแมนติก", 68], ["แฟนตาซี", 52], ["ดราม่า", 46], ["ย้อนยุค", 38]] as const : demographic === "ช่วงอายุ" ? [["18–24 ปี", 42], ["25–34 ปี", 32], ["35–44 ปี", 16], ["45 ปีขึ้นไป", 10]] as const : [["ไทย", 86], ["ลาว", 6], ["สิงคโปร์", 4], ["ประเทศอื่น ๆ", 4]] as const;
  const comparisons = [
    { label: "ยอดอ่าน", value: formatCount(currentChapter.views), change: chapterIndex > 0 ? Math.round((currentChapter.views / chapters[chapterIndex - 1].views - 1) * 100) : null, unit: "%", icon: faEye },
    { label: "อัตราอ่านจบ", value: currentChapter.completion + "%", change: chapterIndex > 0 ? currentChapter.completion - chapters[chapterIndex - 1].completion : null, unit: " จุด", icon: faShieldHalved },
    { label: "ความคิดเห็น", value: String(currentChapter.comments), change: chapterIndex > 0 ? currentChapter.comments - chapters[chapterIndex - 1].comments : null, unit: "", icon: faComment },
  ];
  return <main className={shell.stage + " " + shell.overviewStage + " " + styles.stage}><div className={shell.layout + " " + styles.layout}>
    <aside className={"ds-card " + shell.navigation + " " + shell.overviewNavigation + " " + styles.navigation}><h2 className="text-ds-h3">Writer Studio</h2><nav aria-label="เมนูนักเขียน">{navigation.map(([label, icon, id]) => ["home", "projects", "insights", "comments", "schedule"].includes(id) ? <Link key={id} href={id === "home" ? "/write" : "/write/" + id} aria-current={id === "insights" ? "page" : undefined} className={shell.navItem + " " + (id === "insights" ? shell.activeNav : "")}><Icon icon={icon} />{label}</Link> : <button key={id} type="button" className={shell.navItem} onClick={() => openFeature(label, id)}><Icon icon={icon} />{label}</button>)}</nav><div className={shell.quote}>ข้อมูลที่ดี<br />ทำให้เรื่องราวของคุณ<br />ไปได้ไกลกว่าเดิม<span>— ARN SPACE —</span></div></aside>
    <div className={styles.center}>
      <header className={styles.heading}><div><h1 className="text-ds-h1"><Icon icon={faChartSimple} /> ข้อมูลเชิงลึก</h1><p className="text-ds-body-sm text-arn-muted">เข้าใจผลงานและผู้อ่านของคุณให้ลึกขึ้น</p><span className={styles.demo}>ข้อมูลตัวอย่าง · ยังไม่เชื่อมต่อสถิติจริง</span></div><div className={styles.periodControl}><Tabs items={periods.map(item => item.label)} value={period.label} label="ช่วงเวลาของข้อมูล" onChange={label => { setDays(periods.find(item => item.label === label)!.days); setActivePoint(null); setHoveredTrend(null); setHoveredChapter(null); }} /><span className={styles.dateRange}><Icon icon={faCalendarDays} /> {dateLabel(start)} – {dateLabel(end)}</span></div></header>
      <section className={"ds-card " + styles.projectPicker} aria-labelledby="project-picker-title">
        <div className={styles.projectPickerHeading}><h2 id="project-picker-title" className="text-ds-body"><Icon icon={faBookOpen} />เลือกเรื่องที่ต้องการดูข้อมูล</h2><span className="text-ds-meta text-arn-subtle">{days === 180 ? "ทุกช่วงเวลา" : days + " วันที่ผ่านมา"}</span></div>
        <div className={styles.projectPickerBody}><Image src={project.cover} alt={"ปก " + project.title} width={56} height={76} sizes="56px" /><div className={styles.projectDetails}><h3 className="text-ds-body">{project.title}</h3><p>นิยาย · {project.chapters} ตอน · {project.total ? "กำลังเขียน" : "ฉบับร่าง"}</p></div><button type="button" className={"ds-button-secondary " + styles.changeProject} aria-haspopup="dialog" aria-expanded={isProjectPickerOpen} aria-controls="insight-project-dialog" onClick={() => setIsProjectPickerOpen(true)}>เปลี่ยนเรื่อง <Icon icon={faChevronDown} /></button></div>
      </section>
      <dialog ref={projectDialogRef} id="insight-project-dialog" className={"ds-card " + styles.projectDialog} aria-labelledby="project-dialog-title" onCancel={() => setIsProjectPickerOpen(false)} onClose={() => setIsProjectPickerOpen(false)} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setIsProjectPickerOpen(false); } }}>
        <div className={styles.projectDialogHeading}><h2 id="project-dialog-title" className="text-ds-h3">เลือกเรื่องที่ต้องการดูสถิติ</h2><button type="button" className={styles.closeProjectDialog} aria-label="ปิดหน้าต่างเลือกเรื่อง" onClick={() => setIsProjectPickerOpen(false)}><Icon icon={faXmark} /></button></div>
        <div className={styles.projectOptions} role="group" aria-label="เรื่องของคุณ">{insightProjects.map(item => <button key={item.id} type="button" className={styles.projectOption + (item.id === projectId ? " " + styles.selectedProject : "")} aria-pressed={item.id === projectId} onClick={() => { setProjectId(item.id); setChapterIndex(7); setActivePoint(null); setHoveredTrend(null); setHoveredChapter(null); setIsProjectPickerOpen(false); }}><Image className={styles.projectOptionCover} src={item.cover} alt="" width={40} height={56} sizes="40px" /><span><strong className="text-ds-body">{item.title}</strong><span className="text-ds-body-sm">นิยาย · {item.chapters} ตอน{item.total ? "" : " · ฉบับร่าง"}</span></span>{item.id === projectId && <Icon icon={faCircleCheck} />}</button>)}</div>
      </dialog>
      {!total ? <section className={"ds-card " + styles.empty} role="status"><Icon icon={faChartSimple} /><h2 className="text-ds-h2">เรื่องราวของคุณกำลังจะเริ่มต้น</h2><p className="text-ds-body text-arn-muted">เมื่อเผยแพร่ตอนแรก ข้อมูลยอดอ่านและผู้อ่านจะปรากฏที่นี่</p><Link className="ds-button-secondary px-ds-4" href="/write/projects">กลับไปจัดการโปรเจกต์</Link></section> : <>
        <div className={styles.metrics} aria-label="สถิติภาพรวม">{metrics.map(metric => <article className={"ds-card " + styles.metric} key={metric.label}><span className={styles.metricIcon}><Icon icon={metric.icon} /></span><div><p className="text-ds-caption text-arn-muted">{metric.label}</p><strong>{metric.value}</strong><span className={styles.growth}><Icon icon={faArrowUp} /> {metric.growth}%</span><p className="text-ds-caption text-arn-subtle">{days === 180 ? "เทียบช่วงก่อนหน้า" : "จาก " + days + " วันที่ผ่านมา"}</p></div></article>)}</div>
        <div className={styles.chartGrid}>
          <Panel title="แนวโน้มยอดอ่าน" icon={faChartSimple} action={<select className="ds-input" aria-label="สถิติในกราฟแนวโน้ม" value={trendMetric} onChange={event => { setTrendMetric(event.target.value); setHoveredTrend(null); }}><option>ยอดอ่านทั้งหมด</option><option>ผู้อ่านใหม่</option></select>}>
            <div className={styles.chartCaption}><span className="text-ds-caption text-arn-muted">{trendMetric} · {period.label}</span><span className={styles.chartReadout} aria-live="polite">{dateLabel(pointDate)} <strong>{formatCount(daily[selectedPoint])}</strong></span></div>
            <div className={styles.trendPlot} onMouseLeave={() => setHoveredTrend(null)} onKeyDown={event => { if (event.key === "Escape") setHoveredTrend(null); }}><svg viewBox="0 0 612 206" className={styles.lineChart} role="img" aria-label={"กราฟแท่ง" + trendMetric + "รายวัน รวม " + formatCount(trendTotal)}>{[0, 1, 2, 3, 4].map(i => <g key={i}><line x1="48" x2="592" y1={176 - i * 37} y2={176 - i * 37} className={styles.gridLine} /><text x="36" y={180 - i * 37} textAnchor="end">{formatCount(ceiling * i / 4)}</text></g>)}{points.map(([x, y], i) => <rect key={i} x={x - trendBarWidth / 2} y={y} width={trendBarWidth} height={176 - y} rx="2" className={styles.trendBar} />)}{[0, Math.floor((days - 1) / 2), days - 1].map(i => { const date = new Date(start); date.setUTCDate(start.getUTCDate() + i); return <text key={i} x={points[i][0]} y="200" textAnchor="middle">{dateLabel(date).replace(/\s\d{4}$/, "")}</text>; })}{points.map(([x], i) => <rect key={i} x={x - trendSlotWidth / 2} y="24" width={trendSlotWidth} height="156" fill="transparent" onMouseEnter={() => { setActivePoint(i); setHoveredTrend(i); }} />)}</svg>{hoveredTrend !== null && <ChartTooltip id="trend-tooltip" title={dateLabel(new Date(start.getTime() + hoveredTrend * 86400000))} value={trendMetric + " " + daily[hoveredTrend].toLocaleString("en")} x={points[hoveredTrend][0] / 612 * 100} y={points[hoveredTrend][1] / 206 * 100} />}</div>
            <input type="range" className={styles.chartSlider} min={0} max={days - 1} value={selectedPoint} onChange={event => { setActivePoint(Number(event.target.value)); setHoveredTrend(Number(event.target.value)); }} onFocus={() => setHoveredTrend(selectedPoint)} onBlur={() => setHoveredTrend(null)} onKeyDown={event => { if (event.key === "Escape") setHoveredTrend(null); }} aria-describedby={hoveredTrend !== null ? "trend-tooltip" : undefined} aria-label="เลือกวันที่เพื่อดูสถิติยอดอ่าน" />
          </Panel>
          <Panel title="ยอดอ่านรายตอน" icon={faChartSimple} action={<Tabs items={["ยอดอ่าน", "อัตราอ่านจบ", "ความคิดเห็น"]} value={chapterMetric} onChange={value => { setChapterMetric(value); setHoveredChapter(null); }} label="สถิติรายตอน" />}><div className={styles.chapterChart} onMouseLeave={() => setHoveredChapter(null)} onKeyDown={event => { if (event.key === "Escape") setHoveredChapter(null); }}><div className={styles.chapterAxis} aria-hidden="true">{[4, 3, 2, 1, 0].map(i => <span key={i}>{chapterMetric === "อัตราอ่านจบ" ? chapterCeiling * i / 4 + "%" : formatCount(chapterCeiling * i / 4)}</span>)}</div><div className={styles.barChart} role="group" aria-label="เลือกตอนเพื่อดูสถิติ">{chapters.map((chapter, i) => { const value = chapterMetric === "ยอดอ่าน" ? chapter.views / chapterCeiling * 100 : chapterMetric === "ความคิดเห็น" ? chapter.comments / chapterCeiling * 100 : chapter.completion; const readout = chapterMetric === "ยอดอ่าน" ? formatCount(chapter.views) : chapterMetric === "ความคิดเห็น" ? String(chapter.comments) : chapter.completion + "%"; return <button key={chapter.number} type="button" aria-pressed={chapterIndex === i} aria-label={"ตอน " + chapter.number + ": " + chapterMetric + " " + readout} className={styles.barColumn + " " + (chapterIndex === i ? styles.activeBar : "")} onClick={() => setChapterIndex(i)} onMouseEnter={() => setHoveredChapter(i)} onFocus={() => setHoveredChapter(i)} onBlur={() => setHoveredChapter(null)} aria-describedby={hoveredChapter === i ? "chapter-tooltip" : undefined}><span className={styles.barTrack}><span className={styles.barValue} style={{ bottom: value + "%" }}>{readout}</span><span className={styles.bar} style={{ height: value + "%" }} /></span><span>ตอน<br />{chapter.number}</span></button>; })}{hoveredChapter !== null && <ChartTooltip id="chapter-tooltip" title={"ตอน " + chapters[hoveredChapter].number} value={chapterMetric + " " + (chapterMetric === "ยอดอ่าน" ? chapters[hoveredChapter].views.toLocaleString("en") : chapterMetric === "ความคิดเห็น" ? chapters[hoveredChapter].comments : chapters[hoveredChapter].completion + "%")} x={(hoveredChapter + .5) / chapters.length * 100} y={35} />}</div></div><p className="text-ds-caption text-arn-muted">{currentChapter.title} · อ่านจบ {currentChapter.completion}%</p></Panel>
        </div>
        <div className={styles.detailGrid}>
          <Panel title="Retention ผู้อ่าน" icon={faShieldHalved}><RetentionChart chapterCount={project.chapters} /></Panel>
          <Panel title="แหล่งที่มาของผู้อ่าน" icon={faUsers}><ul className={styles.sources}>{sources.map(source => <li key={source.label}><span className={styles.sourceIcon}><Icon icon={sourceIcons[source.label] ?? faEllipsis} /></span><span>{source.label}</span><progress value={source.value} max={100} aria-label={source.label + " " + source.value + "%"} /><strong>{source.value}%</strong></li>)}</ul></Panel>
          <Panel title="ข้อมูลผู้อ่าน" icon={faCalendarDays}><Tabs items={["ความสนใจ", "ช่วงอายุ", "ประเทศ"]} value={demographic} onChange={setDemographic} label="ประเภทข้อมูลผู้อ่าน" /><div className={styles.audiences}>{audiences.map(([label, value]) => <div key={label}><span>{label}</span><progress value={value} max={100} aria-label={label + " " + value + "%"} /><strong>{value}%</strong></div>)}</div>{demographic === "ความสนใจ" && <p className="text-ds-caption text-arn-subtle">ผู้อ่านหนึ่งคนอาจสนใจหลายหมวด</p>}</Panel>
          <Panel title="คำค้นที่นำผู้อ่านมาสู่เรื่อง" icon={faMagnifyingGlass}><p className={styles.description}>คำค้นหาที่ทำให้ผู้อ่านเจอและเข้ามาอ่านเรื่องนี้</p><ol className={styles.keywords}>{[project.title, "นิยายย้อนยุค", "วังหลวง", "โรแมนติก", "ดราม่า", "คำสัญญา", "ความลับ", "การเมือง", "แฟนตาซี", "ชะตารัก"].map((word, i) => <li key={word}><span>{i + 1}</span><b>{word}</b><small>{formatCount(Math.round(total * (.029 - i * .002)))}</small></li>)}</ol></Panel>
        </div>
        <div className={styles.bottomGrid}>
          <Panel title="ตอนที่ได้รับความนิยมสูงสุด" icon={faCalendarDays} action={<button type="button" className={styles.textAction} onClick={() => setShowAllChapters(value => !value)}>{showAllChapters ? "แสดง 5 ตอน" : "ดูทั้งหมด"} <Icon icon={faArrowRight} /></button>}><div className={styles.tableScroll}><table><caption className="sr-only">ตอนยอดนิยม เรียงตามยอดอ่าน</caption><thead><tr><th scope="col">#</th><th scope="col">ชื่อตอน</th><th scope="col">ยอดอ่าน</th><th scope="col">อัตราอ่านจบ</th><th scope="col">ความคิดเห็น</th></tr></thead><tbody>{ranked.slice(0, showAllChapters ? ranked.length : 5).map((chapter, i) => <tr key={chapter.number}><td>{i + 1}</td><th scope="row"><button type="button" onClick={() => setChapterIndex(chapters.indexOf(chapter))}>ตอน {chapter.number} — {chapter.title}</button></th><td>{formatCount(chapter.views)}</td><td>{chapter.completion}%</td><td>{chapter.comments}</td></tr>)}</tbody></table></div></Panel>
          <Panel title="เปรียบเทียบตอนล่าสุด" icon={faCalendarDays} action={<select className={"ds-input " + styles.chapterSelect} aria-label="เลือกตอนเพื่อดูรายละเอียด" value={chapterIndex} onChange={event => setChapterIndex(Number(event.target.value))}>{chapters.map((chapter, i) => <option value={i} key={chapter.number}>ตอนที่ {chapter.number}</option>)}</select>}><div className={styles.chapterBook}><Image src={project.cover} alt={"ปก " + project.title} width={52} height={72} sizes="52px" /><div><h3>ตอนที่ {currentChapter.number}</h3><p>{currentChapter.title}</p><span>เทียบกับตอนก่อนหน้า</span></div></div>{comparisons.map(item => <div className={styles.compareRow} key={item.label}><Icon icon={item.icon} /><span>{item.label}</span><strong>{item.value}</strong><span>{item.change === null ? "—" : (item.change >= 0 ? "↑ " : "↓ ") + Math.abs(item.change) + item.unit}</span></div>)}<button type="button" className={"ds-button-secondary " + styles.chapterLink} onClick={() => openFeature("รายละเอียดตอนที่ " + currentChapter.number, "manage/" + project.id)}>ดูรายละเอียดตอน <Icon icon={faArrowRight} /></button></Panel>
        </div>
      </>}
    </div>
  </div>{pending && <UnbuiltPageModal page={pending} href={pending.url} onClose={() => setPending(null)} />}</main>;
}
