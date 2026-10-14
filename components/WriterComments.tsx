"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faFolderOpen, faChartSimple, faComment, faCalendarDays, faHeart, faPaperPlane, faChevronLeft, faChevronRight, faArrowUpRightFromSquare, faQuoteLeft, faCircleCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import CommentEmojiPicker from "./CommentEmojiPicker";
import UnbuiltPageModal from "./UnbuiltPageModal";
import type { UnbuiltPage } from "@/data/unbuilt-pages";
import { commentProjects, initialComments, initialHandledThreads, latestReaderMessageId, receiveReaderReply, type ReaderReply, type CommentQuote, type ReaderComment } from "@/data/writer-comments";
import { getNovelDetails } from "@/data/novelDetails";
import shell from "./WriterStudioShell.module.css";
import styles from "./WriterComments.module.css";

const navigation = [["ภาพรวม", faHouse, "home"], ["เรื่องของฉัน", faFolderOpen, "projects"], ["ข้อมูลเชิงลึก", faChartSimple, "insights"], ["ความคิดเห็น", faComment, "comments"], ["ตารางเผยแพร่", faCalendarDays, "schedule"]] as const;
const tabs = [["pending", "รอจัดการ"], ["unread", "ยังไม่อ่าน"], ["all", "ทั้งหมด"]] as const;
type Scope = { project: string; chapter: number | null } | null;
const startingHandled = initialHandledThreads(initialComments);
const startingThread = initialComments.find(item => startingHandled[item.id] !== latestReaderMessageId(item))!;
const timeAgo = (hours: number) => hours === 0 ? "เมื่อสักครู่" : hours < 24 ? `${hours} ชั่วโมงที่แล้ว` : `${Math.floor(hours / 24)} วันที่แล้ว`;
const scopeLabel = (thread: ReaderComment) => thread.chapter === null ? "ความคิดเห็นระดับเรื่อง" : `ตอนที่ ${thread.chapter}`;
const activityAge = (thread: ReaderComment) => thread.replies.at(-1)?.hoursAgo ?? thread.hoursAgo;
function Icon({ icon }: { icon: IconDefinition }) { return <FontAwesomeIcon icon={icon} aria-hidden="true" className={styles.icon} />; }
function QuotedMessage({ quote }: { quote: CommentQuote }) {
  return <blockquote className={styles.quotePreview}><strong>อ้างถึง {quote.author}</strong><p>{quote.text}</p></blockquote>;
}

export default function WriterComments() {
  const [comments, setComments] = useState(initialComments);
  const [selectedId, setSelectedId] = useState(startingThread.id);
  const [tab, setTab] = useState("pending");
  const [projectId, setProjectId] = useState("all");
  const [scope, setScope] = useState<Scope>(null);
  const [sort, setSort] = useState("latest");
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [handledThrough, setHandledThrough] = useState(startingHandled);
  const [readThrough, setReadThrough] = useState<Record<string, string>>({ ...startingHandled, [startingThread.id]: latestReaderMessageId(startingThread) });
  const [liked, setLiked] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [quote, setQuote] = useState<CommentQuote | null>(null);
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState<UnbuiltPage | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const detailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pending) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setPending(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [pending]);
  useEffect(() => {
    // Integration point for incoming reader replies; checkpoints intentionally
    // remain unchanged so a new message becomes unread and pending again.
    const receive = (event: Event) => {
      const detail = (event as CustomEvent<{ threadId: string; reply: ReaderReply }>).detail;
      if (!detail || typeof detail.threadId !== "string" || !detail.reply ||
        typeof detail.reply.id !== "string" || typeof detail.reply.author !== "string" ||
        typeof detail.reply.text !== "string" || !detail.reply.text.trim()) return;
      setComments(values => receiveReaderReply(values, detail.threadId, detail.reply));
    };
    window.addEventListener("arnspace:comment-reply", receive);
    return () => window.removeEventListener("arnspace:comment-reply", receive);
  }, []);

  const openFeature = (name: string, code: string) => setPending({ name, code: `WRITE-${code.toUpperCase()}`, url: `/write/${code}`, trigger: name, status: "ยังไม่ได้ทำ" });
  const isPending = (item: ReaderComment) => handledThrough[item.id] !== latestReaderMessageId(item);
  const isUnread = (item: ReaderComment) => readThrough[item.id] !== latestReaderMessageId(item);
  const scoped = comments.filter(item => (projectId === "all" || item.project === projectId) && (!scope || item.project === scope.project && item.chapter === scope.chapter));
  const counts = { pending: scoped.filter(isPending).length, unread: scoped.filter(isUnread).length, all: scoped.length };
  const filtered = scoped.filter(item => tab === "all" || tab === "pending" && isPending(item) || tab === "unread" && isUnread(item)).sort((a, b) =>
    (sort === "oldest" ? b.hoursAgo - a.hoursAgo : sort === "messages" ? b.replies.length - a.replies.length : activityAge(a) - activityAge(b)) || a.id.localeCompare(b.id));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const selected = comments.find(item => item.id === selectedId)!;
  const project = commentProjects.find(item => item.id === selected.project)!;
  const readableEpisode = selected.chapter !== null && getNovelDetails(project.title).episodes.some(item => item.number === selected.chapter && !item.locked);
  const pageNumbers = [...new Set([1, pages, ...Array.from({ length: 5 }, (_, index) => currentPage + index - 2).filter(value => value >= 1 && value <= pages)])].sort((a, b) => a - b);
  const selectComment = (item: ReaderComment) => {
    setSelectedId(item.id);
    setReadThrough(values => ({ ...values, [item.id]: latestReaderMessageId(item) }));
    setDraft(""); setQuote(null); setNotice("");
    if (window.matchMedia("(max-width: 1100px)").matches) detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const markHandled = () => {
    const checkpoint = latestReaderMessageId(selected);
    setHandledThrough(values => ({ ...values, [selected.id]: checkpoint }));
    setReadThrough(values => ({ ...values, [selected.id]: checkpoint }));
  };
  const toggleLike = (id: string) => setLiked(values => values.includes(id) ? values.filter(value => value !== id) : [...values, id]);
  const replyWithQuote = (messageId: string, author: string, text: string) => { setQuote({ messageId, author, text }); inputRef.current?.focus(); };
  const viewScope = (episode: boolean) => {
    setProjectId(selected.project); setScope(episode ? { project: selected.project, chapter: selected.chapter } : null);
    setTab("all"); setPage(1);
  };

  const messageActions = (id: string, author: string, text: string, likes = 0) => <div className={styles.actions}>
    <button type="button" aria-label={`ถูกใจข้อความของ ${author}`} aria-pressed={liked.includes(id)} onClick={() => toggleLike(id)}><Icon icon={faHeart} />{likes + Number(liked.includes(id))}</button>
    <button type="button" onClick={() => replyWithQuote(id, author, text)}><Icon icon={faQuoteLeft} />ตอบพร้อมอ้างข้อความ</button>
  </div>;

  return <main className={`${shell.stage} ${shell.overviewStage} ${styles.stage}`}><div className={`${shell.layout} ${shell.overviewLayout}`}>
    <aside className={`ds-card ${shell.navigation} ${shell.overviewNavigation}`}><h2 className="text-ds-h3">Writer Studio</h2><nav aria-label="เมนูนักเขียน">{navigation.map(([label, icon, id]) => <Link key={id} href={id === "home" ? "/write" : `/write/${id}`} aria-current={id === "comments" ? "page" : undefined} className={`${shell.navItem} ${id === "comments" ? shell.activeNav : ""}`}><Icon icon={icon} /><span>{label}</span></Link>)}</nav><div className={shell.quote}>“ทุกเรื่องราว<br />เริ่มต้นจากจินตนาการ<br />และเติบโตได้เสมอ<br />ที่นี่... ARN SPACE”<span aria-hidden="true">— ◇ —</span></div></aside>
    <div className={styles.content}>
      <section className={styles.inbox} aria-label="กล่องความคิดเห็น">
        <header className={styles.heading}><Icon icon={faComment} /><div><h1>ความคิดเห็น</h1><p>จัดการความคิดเห็นจากผู้อ่าน และติดตามบทสนทนาในทุกเรื่อง</p></div></header>
        <div className={styles.tabs} role="group" aria-label="กลุ่มความคิดเห็น">{tabs.map(([id, label]) => <button key={id} type="button" aria-pressed={tab === id} className={`${styles.statusCard} ${styles[id]} ${tab === id ? styles.activeTab : ""}`} onClick={() => { setTab(id); setPage(1); }}><Icon icon={faComment} /><span><span>{label}</span><strong>{counts[id]}</strong></span><Icon icon={faChevronRight} /></button>)}</div>
        <div className={styles.filters}><label>เลือกเรื่อง<select className="ds-input" aria-label="เลือกเรื่อง" value={projectId} onChange={event => { setProjectId(event.target.value); setScope(null); setPage(1); }}><option value="all">ทุกเรื่อง</option>{commentProjects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><label>เรียงตาม<select className="ds-input" aria-label="เรียงลำดับความคิดเห็น" value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="latest">ล่าสุด</option><option value="oldest">เก่าสุด</option><option value="messages">ข้อความมากที่สุด</option></select></label><label>แสดง<select className="ds-input" aria-label="จำนวนรายการต่อหน้า" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}>{[30, 50, 100].map(value => <option key={value} value={value}>{value} รายการ</option>)}</select></label></div>
        {scope && <div className={styles.scopeNotice}><span>ความคิดเห็นทั้งหมดของตอนที่ {scope.chapter}</span><button type="button" onClick={() => { setScope(null); setPage(1); }}>ดูทุกกระทู้ของเรื่อง</button></div>}
        <div className={styles.list}>{filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(item => {
          const book = commentProjects.find(value => value.id === item.project)!;
          return <button key={item.id} type="button" className={`${styles.listItem} ${item.id === selectedId ? styles.selected : ""}`} aria-pressed={item.id === selectedId} onClick={() => selectComment(item)}>
            <Image src={book.cover} alt="" width={72} height={88} sizes="72px" /><span className={styles.preview}><span className={styles.previewTitle}><strong>{book.title}</strong><span className={styles.chapterChip}>{item.chapter === null ? "ระดับเรื่อง" : scopeLabel(item)}</span></span><span className={styles.metadata}><Image src={item.avatar} alt="" width={20} height={20} sizes="20px" />{item.author} · {timeAgo(activityAge(item))}</span><span className={styles.excerpt}>{item.text}</span></span>
            <span className={styles.listStatus}><span className={`${styles.statusBadge} ${isUnread(item) ? styles.unread : isPending(item) ? styles.waiting : styles.done}`}>{isUnread(item) ? "ยังไม่อ่าน" : isPending(item) ? "รอจัดการ" : "จัดการแล้ว"}</span><span><Icon icon={faComment} />{item.replies.length + 1} ข้อความ</span></span>
          </button>;
        })}{filtered.length === 0 && <div className={styles.empty}><Icon icon={faComment} /><h2>{tab === "pending" ? "ไม่มีกระทู้รอจัดการ" : "ไม่พบกระทู้ในกลุ่มนี้"}</h2><p>เลือกกลุ่ม “ทั้งหมด” เพื่อดูประวัติความคิดเห็น</p></div>}</div>
        <div className={styles.listFooter}><span>แสดง {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)} จาก {filtered.length} กระทู้</span></div>
        <nav className={styles.pagination} aria-label="หน้ารายการความคิดเห็น"><button type="button" aria-label="หน้าก่อนหน้า" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><Icon icon={faChevronLeft} /></button>{pageNumbers.map((value, index) => <span key={value}>{index > 0 && value - pageNumbers[index - 1] > 1 && <span aria-hidden="true">…</span>}<button type="button" aria-current={currentPage === value ? "page" : undefined} onClick={() => setPage(value)}>{value}</button></span>)}<button type="button" aria-label="หน้าถัดไป" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}><Icon icon={faChevronRight} /></button></nav>
      </section>
      <section ref={detailRef} className={styles.conversation} aria-label={`บทสนทนาของ ${selected.author}`}>
        <header className={styles.storyHeader}><Image src={project.cover} alt={`ปก ${project.title}`} width={64} height={84} sizes="64px" /><div><div className={styles.detailTitle}><h2>{project.title}{selected.chapter !== null && ` · ตอนที่ ${selected.chapter}`}</h2><span className={`${styles.statusBadge} ${isUnread(selected) ? styles.unread : isPending(selected) ? styles.waiting : styles.done}`}>{isUnread(selected) ? "ยังไม่อ่าน" : isPending(selected) ? "รอจัดการ" : "จัดการแล้ว"}</span></div><p>{selected.chapter === null ? "ความคิดเห็นระดับเรื่อง · " : ""}กระทู้โดย {selected.author} · {selected.replies.length + 1} ข้อความ</p></div></header>
        <div className={styles.threadNavigation}>{selected.chapter !== null && <>
          {readableEpisode ? <Link className="ds-button-secondary" href={`/read/episode?title=${encodeURIComponent(project.title)}&episode=${selected.chapter}`}><Icon icon={faArrowUpRightFromSquare} />เปิดตอนที่ {selected.chapter}</Link> : <button type="button" className="ds-button-secondary" onClick={() => openFeature(`เปิดตอนที่ ${selected.chapter}`, `reader/${selected.project}/${selected.chapter}`)}><Icon icon={faArrowUpRightFromSquare} />เปิดตอนที่ {selected.chapter}</button>}
          <button type="button" className="ds-button-secondary" onClick={() => openFeature("ดูความคิดเห็นทั้งหมดของตอน", `reader/${selected.project}/${selected.chapter}/comments`)}><Icon icon={faComment} />ดูความคิดเห็นทั้งหมดของตอน</button>
        </>}{selected.chapter === null && <button type="button" className="ds-button-secondary" onClick={() => viewScope(false)}><Icon icon={faComment} />ดูทุกกระทู้ของเรื่อง</button>}</div>
        <div className={styles.discussion}><article className={styles.message}><Image className={styles.avatar} src={selected.avatar} alt="" width={48} height={48} sizes="48px" /><div className={styles.messageBody}><div className={styles.messageMeta}><strong>{selected.author}</strong><span>{timeAgo(selected.hoursAgo)}</span><span>ผู้เริ่มกระทู้</span></div><p>{selected.text}</p>{messageActions(selected.id, selected.author, selected.text, selected.likes)}</div></article>
        <div className={styles.replyTimeline}>{selected.replies.map(reply => <article key={reply.id} className={`${styles.message} ${reply.writer ? styles.writerReply : ""}`}><Image className={styles.avatar} src={reply.writer ? "/images/writers/akistudio.webp" : selected.avatar} alt="" width={48} height={48} sizes="48px" /><div className={styles.messageBody}><div className={styles.messageMeta}><strong>{reply.author}</strong>{reply.writer && <span className={styles.writerBadge}>นักเขียน</span>}{reply.hoursAgo !== undefined && <span>{timeAgo(reply.hoursAgo)}</span>}{!reply.writer && isUnread(selected) && latestReaderMessageId(selected) === reply.id && <span className={styles.unreadLabel}>ยังไม่อ่าน</span>}</div>{reply.quote && <QuotedMessage quote={reply.quote} />}<p>{reply.text}</p>{messageActions(reply.id, reply.author, reply.text)}</div></article>)}</div>
        </div><form className={styles.composer} onSubmit={event => {
          event.preventDefault(); const text = draft.trim(); if (!text) return;
          const reply: ReaderReply = { id: `local-${crypto.randomUUID()}`, author: "HanYue", writer: true, text, quote: quote ?? undefined, hoursAgo: 0 };
          setComments(values => values.map(item => item.id === selectedId ? { ...item, replies: [...item.replies, reply] } : item));
          markHandled(); setDraft(""); setQuote(null); setNotice("ส่งคำตอบแล้ว กระทู้นี้อยู่ในประวัติความคิดเห็นทั้งหมด");
        }}>
          <div className={styles.composerBody}><div className={styles.composerModes}><button type="button" aria-pressed={!quote} onClick={() => { setQuote(null); inputRef.current?.focus(); }}>ตอบกลับ</button><button type="button" aria-pressed={Boolean(quote)} onClick={() => replyWithQuote(selected.id, selected.author, selected.text)}><Icon icon={faQuoteLeft} />ตอบพร้อมอ้างข้อความ</button></div><label className={styles.visuallyHidden} htmlFor="comment-reply">ข้อความตอบกลับ</label>{quote && <div><QuotedMessage quote={quote} /><button className={styles.cancelQuote} type="button" onClick={() => setQuote(null)}>ยกเลิกอ้างข้อความ</button></div>}<div className={styles.editor}><textarea id="comment-reply" ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} placeholder="เขียนคำตอบถึงผู้อ่าน..." maxLength={1000} rows={4} /><div className={styles.editorTools}><button type="button" aria-label="ใส่รูปภาพ" title="ใส่รูปภาพ" onClick={() => openFeature("ใส่รูปภาพในคำตอบ", "comment-image")}><Icon icon={faImage} /></button><CommentEmojiPicker key={selected.id} value={draft} onChange={setDraft} inputRef={inputRef} /><span>{draft.length}/1,000</span></div></div><div className={styles.composerActions}><button type="button" className="ds-button-secondary" onClick={() => { markHandled(); setNotice("อ่านแล้ว ไม่ต้องตอบ · เก็บกระทู้ไว้ในความคิดเห็นทั้งหมด"); }}><Icon icon={faCircleCheck} />อ่านแล้ว ไม่ต้องตอบ</button><button type="submit" className="ds-button-primary" disabled={!draft.trim()}><Icon icon={faPaperPlane} />ส่งคำตอบ</button></div><p className={styles.notice} role="status">{notice}</p></div>
        </form>
      </section>
    </div>
  </div>{pending && <UnbuiltPageModal page={pending} href={pending.url} onClose={() => setPending(null)} />}</main>;
}
