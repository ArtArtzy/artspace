'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCommentDots, faUsers, faStar, faPen, faEye, faChevronRight, faFeatherPointed, faHouse, faCheck, faChevronDown, faShareNodes, faAward, faEnvelope, faLock, faCrown, faHeart, faRainbow, faEllipsisVertical, faPlus, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import TopMenu from '@/components/TopMenu';
import Footer from '@/components/Footer';
import CategoryFilter, { GenreIcon } from '@/components/CategoryFilter';
import UnbuiltPageGuard from '@/components/UnbuiltPageGuard';
import UnbuiltPageModal from '@/components/UnbuiltPageModal';
import { unbuiltPages, type UnbuiltPage } from '@/data/unbuilt-pages';
import styles from './ReaderProfile.module.css';
import ProfileCorner from './ProfileCorner';
import ProfileRecommendations from './ProfileRecommendations';
import { profileReviews as reviews } from '@/data/profile-reviews';

const badges = [
  { name: 'นักวิจารณ์ดาวรุ่ง', image: '/images/badges/rising-reviewer-cute-v2.webp', icon: faStar, tone: 'gold', earned: true, detail: 'ได้รับแล้ว · 12 ต.ค. 2026', progress: 100 },
  { name: 'นักอ่านตัวยง', image: '/images/badges/avid-reader-cute-v2.webp', icon: faBookOpen, tone: 'pink', earned: true, detail: 'ได้รับแล้ว · 3 ต.ค. 2026', progress: 100 },
  { name: 'Y are U so CUTE', image: '/images/badges/cute-reader-cute-v2.webp', icon: faRainbow, tone: 'violet', earned: true, detail: 'ได้รับแล้ว · 28 ก.ย. 2026', progress: 100 },
  { name: 'นักสะสมเรื่องโปรด', image: '/images/badges/favorite-collector-cute-v2.webp', icon: faHeart, tone: 'locked', earned: false, detail: '12 / 20 เรื่อง', progress: 60 },
  { name: 'นักอ่านทุกแนว', image: '/images/badges/all-genres-cute-v2.webp', icon: faUsers, tone: 'locked', earned: false, detail: '6 / 10 แนว', progress: 60 },
  { name: 'นักวิจารณ์คุณภาพ', image: '/images/badges/quality-reviewer-cute-v2.webp', icon: faCrown, tone: 'locked', earned: false, detail: '4 / 10 รีวิว', progress: 40 },
];
const messages = [
  { name: 'เมฆาในสายฝน', image: '/images/writers/kuroi.webp', time: '2 นาทีที่แล้ว', body: 'ขอบคุณสำหรับรีวิวนะคะ ดีใจมากเลยค่ะ! 💚', unread: true },
  { name: 'รัตติกาลสีขาว', image: '/images/writers/moonlit.webp', time: '1 ชั่วโมงที่แล้ว', body: 'เห็นด้วยมากครับ เรื่องนี้สนุกจริง ๆ', unread: true },
  { name: 'Nalin', image: '', time: '3 ชั่วโมงที่แล้ว', body: 'มีเรื่องแนะนำที่คล้ายแนวนี้ไหมครับ?', unread: false },
  { name: 'ปลายหมึก', image: '/images/writers/felixs.webp', time: '1 วันที่แล้ว', body: 'ขอบคุณที่ติดตามผลงานนะครับ', unread: false },
];
const shelves = [
  { title: 'แฟนตาซีโลกกว้าง', count: 12, images: ['/images/category-books/fantasy-01.webp', '/images/book-parallel-world.webp', '/images/book-villains-side.webp'] },
  { title: 'สืบสวน ลึกลับ', count: 8, images: ['/images/book-last-house.webp', '/images/book-city-echoes.webp', '/images/book-blood-moon.webp'] },
  { title: 'เรื่องอบอุ่นหัวใจ', count: 6, images: ['/images/book-lemon-days.webp', '/images/book-between-lines.webp', '/images/book-summer-lessons.webp'] },
  { title: 'ผจญภัยออกเดินทาง', count: 9, images: ['/images/book-sky-tomorrow.webp', '/images/book-rewrite-end.webp', '/images/book-kissed-stars.webp'] },
];
const writers = [ { name: 'เมฆาในสายฝน', handle: 'mekhainrain', image: '/images/writers/kuroi.webp' }, { name: 'รัตติกาลสีขาว', handle: 'white_rattikan', image: '/images/writers/moonlit.webp' }, { name: 'ปลายหมึก', handle: 'plaimeuk', image: '/images/writers/felixs.webp' }, { name: 'LunarBlack', handle: 'lunarblack', image: '/images/writers/lunarblack.webp' }, { name: 'AkiStudio', handle: 'akistudio', image: '/images/writers/akistudio.webp' } ];
const defaultProfile = { name: 'Art Artzy', username: 'artartzy', avatar: '/images/profile-arn.webp', banner: '/images/reader-welcome-bg.webp', bio: 'หลงรักโลกในหนังสือ และเรื่องราวที่ทำให้ลืมเวลา', genres: ['โรแมนติก', 'วาย', 'ยูริ', 'แฟนตาซี', 'จีนโบราณ', 'เกิดใหม่', 'ลึกลับ'] };

const achievementDetails: Record<string, { image: string; heading: string; paragraphs: string[]; requirement: string; target: string; date?: string; progress?: { current: number; total: number; unit: string } }> = {
  'นักวิจารณ์ดาวรุ่ง': {
    image: '/images/badges/rising-reviewer-cute-v2.webp',
    heading: 'ทุกความคิดเห็นมีคุณค่า',
    paragraphs: [
      'เรื่องราวดี ๆ ไม่ควรจบลงแค่หน้าสุดท้าย เพราะทุกรีวิวของคุณอาจเป็นจุดเริ่มต้นที่ทำให้ใครอีกคนได้ค้นพบเรื่องโปรดเรื่องใหม่',
      'คุณกำลังเติบโตเป็นนักวิจารณ์ที่ช่วยให้เรื่องราวดี ๆ ถูกค้นพบมากขึ้น',
    ],
    requirement: 'เขียนรีวิวครบ', target: '10 เรื่อง', date: '12 ต.ค. 2026',
  },
  'นักอ่านตัวยง': {
    image: '/images/badges/avid-reader-cute-v2.webp',
    heading: 'หนึ่งหน้ากระดาษ หนึ่งการเดินทาง',
    paragraphs: [
      'บางคนออกเดินทางเพื่อค้นพบโลกกว้าง แต่คุณเลือกเดินทางผ่านตัวอักษร ทุกตอนที่อ่านคืออีกหนึ่งประสบการณ์ อีกหนึ่งความรู้สึก และอีกหนึ่งโลกที่คุณได้สัมผัส',
      'เพราะสำหรับคุณ คำว่า “อีกตอนเดียว” ไม่เคยมีอยู่จริง!',
    ],
    requirement: 'อ่านนิยายครบ', target: '50 ตอน', date: '3 ต.ค. 2026',
  },
  'Y are U so CUTE': {
    image: '/images/badges/cute-reader-cute-v2.webp',
    heading: 'ความน่ารักส่งต่อกันได้!',
    paragraphs: [
      'รอยยิ้มเล็ก ๆ ระหว่างอ่าน หัวใจที่เต้นแรงไปกับตัวละคร และความสุขที่อยากส่งต่อให้คนเขียน',
      'คุณคือหนึ่งในนักอ่านที่เติมความสดใสให้ ArnSpace เพราะทุกหัวใจที่คุณมอบให้ คือกำลังใจที่ทำให้เรื่องราวยังคงเดินหน้าต่อไป',
    ],
    requirement: 'กดหัวใจให้เรื่องที่ชอบครบ', target: '10 เรื่อง', date: '28 ก.ย. 2026',
  },
  'นักสะสมเรื่องโปรด': {
    image: '/images/badges/favorite-collector-cute-v2.webp',
    heading: 'บางเรื่องอ่านจบ แต่ไม่เคยจางหาย',
    paragraphs: [
      'มีเรื่องราวมากมายที่ผ่านเข้ามาในชีวิต แต่จะมีสักกี่เรื่องที่เราอยากเก็บเอาไว้ใกล้ตัวเสมอ?',
      'ชั้นหนังสือของคุณกำลังกลายเป็นบ้านหลังเล็ก ๆ ของตัวละครและเรื่องราวที่คุณรัก อีกเพียงไม่กี่เรื่อง คอลเลกชันนี้ก็จะสมบูรณ์ขึ้นอีกขั้น',
    ],
    requirement: 'เพิ่มเรื่องลงรายการเรื่องโปรดครบ', target: '20 เรื่อง',
    progress: { current: 12, total: 20, unit: 'เรื่อง' },
  },
  'นักอ่านทุกแนว': {
    image: '/images/badges/all-genres-cute-v2.webp',
    heading: 'โลกของเรื่องเล่าไม่มีขอบเขต',
    paragraphs: [
      'จากดินแดนเวทมนตร์สู่คดีปริศนา จากความรักแสนหวานสู่การผจญภัยที่คาดไม่ถึง',
      'คุณพร้อมเปิดประตูสู่เรื่องราวทุกรูปแบบ เพราะบางครั้งเรื่องที่เราไม่เคยคิดจะอ่าน อาจกลายเป็นเรื่องที่เรารักที่สุดก็ได้',
    ],
    requirement: 'อ่านเรื่องจากหมวดหมู่ที่แตกต่างกันครบ', target: '10 แนว',
    progress: { current: 6, total: 10, unit: 'แนว' },
  },
  'นักวิจารณ์คุณภาพ': {
    image: '/images/badges/quality-reviewer-cute-v2.webp',
    heading: 'รีวิวที่ดี อาจเปลี่ยนมุมมองของใครบางคน',
    paragraphs: [
      'การรีวิวไม่ใช่เพียงการบอกว่าชอบหรือไม่ชอบ แต่คือการถ่ายทอดความรู้สึก ความประทับใจ และมุมมองที่แตกต่างออกไป',
      'ความคิดเห็นที่ตั้งใจเขียนของคุณกำลังช่วยให้ผู้อ่านคนอื่นมองเห็นคุณค่าของเรื่องราวในมุมใหม่',
    ],
    requirement: 'มีรีวิวที่ได้รับการกดว่า “มีประโยชน์” ครบ', target: '10 รีวิว',
    progress: { current: 4, total: 10, unit: 'รีวิว' },
  },
};

export default function ReaderProfile() {
  const router = useRouter();
  const [detail, setDetail] = useState({ title: '', body: '' });
  const achievement = achievementDetails[detail.title];
  const [readMessages, setReadMessages] = useState<string[]>([]);
  const detailDialog = useRef<HTMLDialogElement>(null);
  const detailTrigger = useRef<HTMLElement | null>(null);
  function openDetail(trigger: HTMLElement, title: string, body: string) { detailTrigger.current = trigger; setDetail({ title, body }); detailDialog.current?.showModal(); }
  const [tab, setTab] = useState('ภาพรวม');
  const [profile, setProfile] = useState(defaultProfile);
  const [draft, setDraft] = useState(defaultProfile);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState('reader');
  const [publicFollowing, setPublicFollowing] = useState(false);
  const [preview, setPreview] = useState(false);
  const [pendingUnbuiltPage, setPendingUnbuiltPage] = useState<{ page: UnbuiltPage; href: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const editTrigger = useRef<HTMLElement | null>(null);
  const switcher = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!switcherOpen) return;
    function closeOutside(event: MouseEvent) { if (!switcher.current?.contains(event.target as Node)) setSwitcherOpen(false); }
    function closeEscape(event: KeyboardEvent) { if (event.key === 'Escape') setSwitcherOpen(false); }
    document.addEventListener('mousedown', closeOutside);
    document.addEventListener('keydown', closeEscape);
    return () => { document.removeEventListener('mousedown', closeOutside); document.removeEventListener('keydown', closeEscape); };
  }, [switcherOpen]);
  const identities = [
    { id: 'reader', role: 'ผู้อ่าน', name: profile.name, avatar: profile.avatar },
    { id: 'rain', role: 'ผู้เขียน', name: 'เมฆาในสายฝน', avatar: '/images/writers/kuroi.webp' },
    { id: 'ink', role: 'ผู้เขียน', name: 'ปลายหมึก', avatar: '/images/writers/felixs.webp' },
  ];
  const activeIdentity = identities.find(item => item.id === selectedIdentity) || identities[0];
  function openEdit(trigger: HTMLElement) { editTrigger.current = trigger; setDraft({ ...profile, genres: [...profile.genres] }); dialog.current?.showModal(); }
  function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    const next = { ...draft, name: draft.name.trim() };
    if (!next.name) return;
    setProfile(next);
    dialog.current?.close();
  }
  return (
    <div className={`ds-page-shell min-h-screen pt-[82px] ${styles.page}`}>
      <TopMenu fixed />
      <UnbuiltPageGuard>
        <main className={styles.container}>
          <div className={styles.toolbar}>
            <h1 className="text-ds-h3"><FontAwesomeIcon icon={faUsers} className="mr-3 text-arn-accent" />{preview ? 'โปรไฟล์ผู้อ่าน' : 'โปรไฟล์ของฉัน'}</h1>
            {!preview && <div ref={switcher} className={styles.identity}>
              <button type="button" className={styles.identityTrigger} aria-expanded={switcherOpen} aria-controls="profile-identities" onClick={() => setSwitcherOpen(open => !open)}><Image src={activeIdentity.avatar} alt="" width={28} height={28} className="rounded-full" /><span>{activeIdentity.role} — {activeIdentity.name}</span><FontAwesomeIcon icon={faChevronDown} /></button>
              {switcherOpen && <div id="profile-identities" className={'ds-card ' + styles.identityMenu}>
                {identities.map(identity => <button type="button" key={identity.id} aria-pressed={selectedIdentity === identity.id} className={styles.identityOption} onClick={() => { setSelectedIdentity(identity.id); setSwitcherOpen(false); }}><Image src={identity.avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" /><span><span className="block text-ds-body-sm">{identity.role}</span><span className="text-ds-meta text-arn-muted">{identity.name}</span></span>{selectedIdentity === identity.id && <FontAwesomeIcon className="ml-auto" icon={faCheck} />}</button>)}
                <button type="button" className={styles.identityOption} onClick={() => setSwitcherOpen(false)}>+ เพิ่มนามปากกา</button>
              </div>}
            </div>}
          </div>
          {preview && <div className={styles.previewBar}>กำลังดูตัวอย่างโปรไฟล์สาธารณะ<button onClick={() => setPreview(false)} className="ds-button-secondary px-4 py-2">กลับไปจัดการโปรไฟล์</button></div>}
          <section className={`ds-card ${styles.hero}`} aria-label="ข้อมูลผู้อ่าน">
            <div className={styles.cover}><Image src={profile.banner} alt="" fill sizes="(max-width: 1400px) 100vw, 1400px" priority className="object-cover" /><div className={styles.coverShade} /></div>
            <div className={styles.profileInfo}>
              <Image src={profile.avatar} alt={`รูปโปรไฟล์ ${profile.name}`} width={132} height={132} className={styles.avatar} />
              <div className={styles.bio}><h2 className="mt-3 text-ds-h2">{profile.name}</h2><p className="mt-1 text-ds-body-sm text-arn-subtle">@{profile.username}</p><p className="mt-2 text-ds-body text-arn-muted">{profile.bio}</p><p className="mt-2 text-ds-meta text-arn-subtle"><FontAwesomeIcon icon={faCalendarDays} className="mr-2" />เข้าร่วม ArnSpace ตุลาคม 2026</p></div>
              {!preview && <div className={styles.actions}><button onClick={event => openEdit(event.currentTarget)} className="ds-button-secondary px-4 py-3"><FontAwesomeIcon icon={faPen} />แก้ไขโปรไฟล์</button><button className="ds-button-secondary px-4 py-3" onClick={() => setPreview(true)}><FontAwesomeIcon icon={faEye} />ดูตัวอย่างหน้าสาธารณะ</button></div>}
              {preview && <div className={styles.actions}><button className="ds-button-primary px-4 py-2" aria-pressed={publicFollowing} onClick={() => setPublicFollowing(value => !value)}><FontAwesomeIcon icon={publicFollowing ? faCheck : faUsers} />{publicFollowing ? 'กำลังติดตาม' : 'ติดตาม'}</button><button className="ds-button-secondary px-4 py-2"><FontAwesomeIcon icon={faShareNodes} />แชร์โปรไฟล์</button></div>}
            </div>
          </section>
          <div className={styles.stats}>{[{ label: 'รีวิว', value: '12', icon: faCommentDots }, { label: 'เรื่องในชั้นหนังสือ', value: '18', icon: faBookOpen }, { label: 'Badge', value: '6/24', icon: faAward }].map((stat, index) => <button type="button" className={'ds-card ' + styles.stat} key={stat.label} onClick={() => { if (index === 0) router.push('/profile/reviews'); else if (index === 1) { const page = unbuiltPages.find(item => item.code === 'READ-BOOKSHELF-001'); if (page) setPendingUnbuiltPage({ page, href: page.url }); } else router.push('/profile/badges'); }}><span className={styles.statIcon}><FontAwesomeIcon icon={stat.icon} /></span><div><p className="text-ds-body-sm text-arn-muted">{stat.label}</p><p className="text-ds-h2">{stat.value}</p></div></button>)}</div>
          <div className={styles.columns}>
            <div className="min-w-0">
              {tab !== 'ภาพรวม' && <div className={styles.viewHeading}><button className={styles.textLink} onClick={() => setTab('ภาพรวม')}>← กลับไปภาพรวม</button><span className="text-ds-meta text-arn-subtle">{tab === 'รีวิว' ? 'รีวิวทั้งหมด · ตัวอย่าง 4 จาก 12 รีวิว' : 'เรื่องในชั้นหนังสือ · ข้อมูลตัวอย่าง'}</span></div>}
              {tab !== 'ชั้นหนังสือ' && <section className={`ds-card ${styles.section}`}><div className={styles.sectionTitle}><h2 className="text-ds-h3"><FontAwesomeIcon icon={faCommentDots} />{preview ? 'รีวิวล่าสุด' : 'รีวิวล่าสุดของฉัน'}</h2>{tab === 'ภาพรวม' && <Link href="/profile/reviews" className={styles.textLink}>ดูรีวิวทั้งหมด<FontAwesomeIcon icon={faChevronRight} /></Link>}</div><div className={styles.reviewGrid}>{reviews.slice(0, 4).map((review, reviewIndex) => <article key={review.title} className={styles.review}><Image src={review.image} alt={`ปก ${review.title}`} width={104} height={150} className={styles.bookCover} /><div className={styles.reviewContent}><div className={styles.reviewHeading}><h3 className="text-ds-body font-semibold">{review.title}</h3><button aria-label={'ดูรายละเอียดรีวิว ' + review.title} className={styles.reviewMenu} onClick={event => openDetail(event.currentTarget, review.title, review.body)}><FontAwesomeIcon icon={faEllipsisVertical} /></button></div><div className="my-2 flex flex-wrap items-center gap-3"><span aria-label={`${reviewIndex % 2 === 0 ? 5 : 4} จาก 5 ดาว`} className={styles.stars}>{Array.from({ length: 5 }, (_, i) => <FontAwesomeIcon key={i} icon={faStar} className={i === 4 && reviewIndex % 2 === 1 ? styles.emptyStar : undefined} />)}</span><span className="text-ds-meta text-arn-subtle">{review.date}</span></div><p className={styles.reviewPreview}>{review.body}</p></div></article>)}</div>{tab === 'รีวิว' && <p className="mt-4 text-ds-meta text-arn-subtle">แสดง 4 รีวิวตัวอย่างจากทั้งหมด 12 รีวิว</p>}</section>}
              {tab === 'ชั้นหนังสือ' && <section className={`ds-card ${styles.section}`}><div className={styles.sectionTitle}><h2 className="text-ds-h3"><FontAwesomeIcon icon={faBookOpen} />ชั้นหนังสือที่แบ่งปัน</h2></div><div className={styles.shelves}>{shelves.map(shelf => <Link href="/read?bookshelf=all" key={shelf.title} className={`ds-card ${styles.shelf}`}><div className={styles.shelfImages}>{shelf.images.map(src => <Image src={src} alt="" key={src} width={80} height={100} />)}</div><div className="p-3"><h3 className="text-ds-body-sm font-medium">{shelf.title}</h3><p className="mt-2 flex items-center justify-between text-ds-meta text-arn-subtle"><span><FontAwesomeIcon icon={faBookOpen} /> {shelf.count} เรื่อง</span><FontAwesomeIcon icon={faChevronRight} /></p></div></Link>)}</div></section>}
              <ProfileRecommendations preview={preview} />
              {tab !== 'ชั้นหนังสือ' && <section id="profile-badges" className={'ds-card ' + styles.section}>
                <div className={styles.sectionTitle}><h2 className="text-ds-h3"><FontAwesomeIcon icon={faAward} />Badge ของฉัน</h2><Link href="/profile/badges" className={styles.textLink}>ดูทั้งหมด<FontAwesomeIcon icon={faChevronRight} /></Link></div>
                <div className={styles.badgeGrid}>{badges.map(badge => <button type="button" key={badge.name} className={styles.badgeCard} onClick={event => openDetail(event.currentTarget, badge.name, badge.earned ? badge.detail : 'สะสมความคืบหน้าเพื่อปลดล็อก Badge นี้ · ' + badge.detail)}><span className={styles.badgeArt + ' ' + styles[badge.tone]}><Image src={badge.image} alt={badge.name} width={240} height={240} sizes="(max-width: 1150px) 100px, 120px" className={styles.badgeImage} /><span className={styles.badgeSeal}><FontAwesomeIcon icon={badge.earned ? faAward : faLock} /></span></span><h3>{badge.name}</h3><p className={styles.badgeDetails}>{badge.earned ? <><span>ได้รับแล้ว</span><span>{badge.detail.split(" · ")[1]}</span></> : badge.detail}</p>{!badge.earned && <progress max={100} value={badge.progress} aria-label={'ความคืบหน้า ' + badge.name} />}</button>)}</div>
              </section>}
              {!preview && <section className={'ds-card ' + styles.section}><div className={styles.sectionTitle}><h2 className="text-ds-h3"><FontAwesomeIcon icon={faUsers} />นักเขียนที่ติดตาม</h2><Link href="/following" className={styles.textLink}>ดูทั้งหมด<FontAwesomeIcon icon={faChevronRight} /></Link></div><div className={styles.followingGrid}>{writers.map(writer => <Link href={'/writers/' + writer.handle} key={writer.handle} className={styles.followingWriter}><Image src={writer.image} alt="" width={56} height={56} /><strong>{writer.name}</strong></Link>)}<Link href="/writers" className={styles.followingWriter}><span className={styles.addWriter}><FontAwesomeIcon icon={faPlus} /></span><strong>ค้นหานักเขียน</strong><span>เพิ่มเติม</span></Link></div></section>}
            </div>
            <aside className="space-y-4">
              <ProfileCorner preview={preview} />
              {!preview && <section className={'ds-card ' + styles.section}><div className={styles.sectionTitle}><h2 className="text-ds-h3"><FontAwesomeIcon icon={faEnvelope} />กล่องข้อความส่วนตัว</h2><button className={styles.textLink} onClick={event => openDetail(event.currentTarget, 'กล่องข้อความ', 'กล่องข้อความตัวอย่าง · เลือกข้อความในรายการเพื่อเปิดอ่าน ยังไม่มีการส่งข้อความจริง')}>ไปยังกล่องข้อความ<FontAwesomeIcon icon={faChevronRight} /></button></div><div>{messages.map(message => <button type="button" key={message.name} className={styles.messageRow} onClick={event => { setReadMessages(current => [...current, message.name]); openDetail(event.currentTarget, message.name, message.body); }}>{message.image ? <Image src={message.image} alt="" width={44} height={44} className={styles.messageAvatar} /> : <span className={styles.initialAvatar}>N</span>}<span className={styles.messageContent}><span className={styles.messageMeta}><strong>{message.name}</strong><time>{message.time}</time></span><span className={styles.messagePreview}>{message.body}</span></span>{message.unread && !readMessages.includes(message.name) && <span aria-label="ยังไม่ได้อ่าน" className={styles.unreadDot} />}</button>)}</div></section>}
              <section className={`ds-card ${styles.section}`}><div className={styles.sectionTitle}><h2 className="text-ds-h3"><FontAwesomeIcon icon={faStar} />แนวที่ชอบ</h2>{!preview && <CategoryFilter variant="profile" selected="" onSelect={() => {}} selectedGenres={profile.genres} onSelectGenres={genres => setProfile(current => ({ ...current, genres }))} />}</div><div className="flex flex-wrap gap-2">{profile.genres.map(genre => <span className={`ds-chip px-3 py-2 text-ds-body-sm ${styles.genreChip}`} key={genre}><GenreIcon label={genre} />{genre}</span>)}{profile.genres.length === 0 && <p className="text-ds-body-sm text-arn-subtle">ยังไม่ได้เลือกแนวที่ชอบ</p>}</div></section>
              {identities.length === 1 && !preview && <section className={`ds-card ${styles.promo}`}><Image src="/images/hero-writing.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 440px" className="object-cover" /><div className={styles.promoContent}><FontAwesomeIcon icon={faFeatherPointed} className="mb-3 text-arn-accent" /><h2 className="text-ds-h3">อยากเริ่มเขียนเรื่องของตัวเองไหม?</h2><p className="my-3 text-ds-body-sm text-arn-muted">เปลี่ยนจินตนาการของคุณให้กลายเป็นเรื่องราว แบ่งปันผลงานกับนักอ่านมากมายบน ArnSpace</p><Link href="/write" className="ds-button-primary inline-flex gap-3 px-4 py-3">เริ่มต้นเป็นผู้เขียน<FontAwesomeIcon icon={faChevronRight} /></Link></div></section>}
            </aside>
          </div>
        </main>
        <Footer />
      </UnbuiltPageGuard>
      {pendingUnbuiltPage && <UnbuiltPageModal page={pendingUnbuiltPage.page} href={pendingUnbuiltPage.href} onClose={() => setPendingUnbuiltPage(null)} />}
      <dialog
        ref={detailDialog}
        aria-labelledby="profile-detail-title"
        className={'ds-card ' + styles.dialog + (achievement ? ' ' + styles.achievementDialog : '')}
        onClose={() => detailTrigger.current?.focus()}
        onClick={event => { if (event.target === event.currentTarget) detailDialog.current?.close(); }}
      >
        {achievement ? <>
          <div className={styles.achievementHero}>
            <button type="button" autoFocus aria-label="ปิดรายละเอียด Badge" className={styles.achievementClose} onClick={() => detailDialog.current?.close()}>×</button>
            <span className={styles.achievementEyebrow}><FontAwesomeIcon icon={faAward} />Badge ของคุณ</span>
            <div className={styles.achievementArtwork + (achievement.progress ? " " + styles.achievementLocked : "")}>
              <Image src={achievement.image} alt={detail.title} width={176} height={176} sizes="176px" />
              <span className={styles.achievementCheck} aria-hidden="true"><FontAwesomeIcon icon={achievement.progress ? faLock : faCheck} /></span>
            </div>
            <h2 id="profile-detail-title" className="text-ds-h2">{detail.title}</h2>
            <span className={styles.achievementStatus}><FontAwesomeIcon icon={achievement.progress ? faLock : faCheck} />{achievement.progress ? "ยังไม่ปลดล็อก" : "ปลดล็อกแล้ว"}</span>
          </div>
          <div className={styles.achievementBody}>
            <div className={styles.achievementStory}>
              <h3 className="text-ds-h3">{achievement.heading}</h3>
              {achievement.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <dl className={styles.achievementFacts}>
              <div><span className={styles.achievementFactIcon} aria-hidden="true"><FontAwesomeIcon icon={(detail.title === "Y are U so CUTE" || detail.title === "นักสะสมเรื่องโปรด") ? faHeart : (detail.title === "นักอ่านตัวยง" || detail.title === "นักอ่านทุกแนว") ? faBookOpen : faPen} /></span><div><dt>เงื่อนไขการปลดล็อก</dt><dd>{achievement.requirement} <strong>{achievement.target}</strong></dd></div>{!achievement.progress && <FontAwesomeIcon icon={faCheck} className="ml-auto text-arn-accent" aria-label="สำเร็จแล้ว" />}</div>
              {achievement.progress ? <div className={styles.achievementProgress}>
                <div className={styles.achievementProgressLabel}><dt>ความคืบหน้า</dt><dd>{achievement.progress.current} / {achievement.progress.total} {achievement.progress.unit}</dd></div>
                <progress value={achievement.progress.current} max={achievement.progress.total} aria-label="ความคืบหน้าการปลดล็อก Badge" />
                <p>เหลืออีก <strong>{achievement.progress.total - achievement.progress.current} {achievement.progress.unit}</strong> เพื่อปลดล็อก Badge นี้</p>
              </div> : <div><span className={styles.achievementFactIcon} aria-hidden="true"><FontAwesomeIcon icon={faCalendarDays} /></span><div><dt>วันที่ปลดล็อก</dt><dd>{achievement.date}</dd></div></div>}
            </dl>
            <button type="button" className={'ds-button-primary ' + styles.achievementDone} onClick={() => detailDialog.current?.close()}>รับทราบ</button>
          </div>
        </> : <>
          <h2 id="profile-detail-title" className="text-ds-h3">{detail.title}</h2>
          <p className="my-5 text-ds-body leading-7 text-arn-muted">{detail.body}</p>
          <div className="flex justify-end"><button className="ds-button-secondary px-4 py-2" onClick={() => detailDialog.current?.close()}>ปิด</button></div>
        </>}
      </dialog>
      <dialog aria-labelledby="edit-reader-profile-title" ref={dialog} className={`ds-card ${styles.dialog}`} onClose={() => editTrigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <form onSubmit={saveProfile} className="space-y-5"><h2 id="edit-reader-profile-title" className="text-ds-h2">แก้ไขโปรไฟล์ผู้อ่าน</h2>
          <p className="text-ds-body-sm text-arn-subtle">ทดลองปรับข้อมูลและเลือกภาพที่มีในตัวอย่าง</p>
          <fieldset><legend className="mb-3 text-ds-body-sm">รูปโปรไฟล์</legend><div className="flex gap-3">{['/images/profile-arn.webp', '/images/writers/kuroi.webp', '/images/writers/felixs.webp'].map((src, i) => <button type="button" key={src} aria-label={'เลือกรูปโปรไฟล์ ' + (i + 1)} aria-pressed={draft.avatar === src} className={styles.imageChoice} onClick={() => setDraft({ ...draft, avatar: src })}><Image src={src} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" /></button>)}</div></fieldset>
          <fieldset><legend className="mb-3 text-ds-body-sm">ภาพแบนเนอร์</legend><div className="flex gap-3">{['/images/reader-welcome-bg.webp', '/images/hero-reading.webp'].map((src, i) => <button type="button" key={src} aria-label={'เลือกแบนเนอร์ ' + (i + 1)} aria-pressed={draft.banner === src} className={styles.imageChoice} onClick={() => setDraft({ ...draft, banner: src })}><Image src={src} alt="" width={152} height={64} className="h-16 w-full rounded-ds-sm object-cover" /></button>)}</div></fieldset><label className="block text-ds-body-sm">ชื่อที่แสดง<input required maxLength={60} className="ds-input mt-2 w-full p-3" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></label><label className="block text-ds-body-sm">ชื่อผู้ใช้<input required maxLength={40} className="ds-input mt-2 w-full p-3" value={draft.username} onChange={e => setDraft({ ...draft, username: e.target.value })} /></label><label className="block text-ds-body-sm">แนะนำตัว<textarea maxLength={200} rows={3} className="ds-input mt-2 w-full resize-y p-3" value={draft.bio} onChange={e => setDraft({ ...draft, bio: e.target.value })} /></label><div className="flex justify-end gap-3"><button type="button" className="ds-button-secondary px-4 py-3" onClick={() => dialog.current?.close()}>ยกเลิก</button><button type="submit" className="ds-button-primary px-4 py-3">บันทึกการเปลี่ยนแปลง</button></div></form>
      </dialog>
    </div>
  );
}
