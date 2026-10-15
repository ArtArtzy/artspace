'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAward, faBookOpen, faCalendarDays, faCheck, faChevronRight,
  faCompass, faCrown, faFeatherPointed, faFire, faGem, faGlobe, faHeart,
  faLock, faMessage, faMoon, faPen, faStar, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import TopMenu from '@/components/TopMenu';
import Footer from '@/components/Footer';
import styles from './BadgeCollection.module.css';

type Badge = {
  name: string;
  category: 'การอ่าน' | 'การรีวิว' | 'การสะสม' | 'ชุมชน';
  earned: boolean;
  image?: string;
  icon: IconDefinition;
  accent: 'gold' | 'pink' | 'violet' | 'green' | 'blue' | 'muted';
  description: string;
  requirement: string;
  current: number;
  total: number;
  unit: string;
  date?: string;
};

const badges: Badge[] = [
  { name: 'นักวิจารณ์ดาวรุ่ง', category: 'การรีวิว', earned: true, image: '/images/badges/rising-reviewer-cute-v2.webp', icon: faStar, accent: 'gold', description: 'ทุกความคิดเห็นมีคุณค่า รีวิวของคุณอาจเป็นจุดเริ่มต้นให้ใครอีกคนค้นพบเรื่องโปรดเรื่องใหม่', requirement: 'เขียนรีวิวครบ', current: 12, total: 10, unit: 'เรื่อง', date: '12 ต.ค. 2026' },
  { name: 'นักอ่านตัวยง', category: 'การอ่าน', earned: true, image: '/images/badges/avid-reader-cute-v2.webp', icon: faBookOpen, accent: 'pink', description: 'หนึ่งหน้ากระดาษ หนึ่งการเดินทาง คุณอ่านนิยายอย่างต่อเนื่องและเก็บเกี่ยวโลกใหม่ผ่านตัวอักษร', requirement: 'อ่านนิยายครบ', current: 50, total: 50, unit: 'ตอน', date: '3 ต.ค. 2026' },
  { name: 'Y are U so CUTE', category: 'ชุมชน', earned: true, image: '/images/badges/cute-reader-cute-v2.webp', icon: faHeart, accent: 'violet', description: 'ทุกหัวใจที่คุณมอบให้ คือกำลังใจที่ช่วยให้เรื่องราวยังคงเดินหน้าต่อไป', requirement: 'กดหัวใจให้เรื่องที่ชอบครบ', current: 10, total: 10, unit: 'เรื่อง', date: '28 ก.ย. 2026' },
  { name: 'นักสะสมเรื่องโปรด', category: 'การสะสม', earned: false, image: '/images/badges/favorite-collector-cute-v2.webp', icon: faHeart, accent: 'muted', description: 'ชั้นหนังสือของคุณกำลังกลายเป็นบ้านหลังเล็ก ๆ ของตัวละครและเรื่องราวที่คุณรัก', requirement: 'เพิ่มเรื่องลงรายการเรื่องโปรดครบ', current: 12, total: 20, unit: 'เรื่อง' },
  { name: 'นักอ่านทุกแนว', category: 'การอ่าน', earned: false, image: '/images/badges/all-genres-cute-v2.webp', icon: faGlobe, accent: 'muted', description: 'จากดินแดนเวทมนตร์สู่คดีปริศนา คุณพร้อมเปิดประตูสู่เรื่องราวทุกรูปแบบ', requirement: 'อ่านเรื่องจากหมวดหมู่ที่แตกต่างกันครบ', current: 6, total: 10, unit: 'แนว' },
  { name: 'นักวิจารณ์คุณภาพ', category: 'การรีวิว', earned: false, image: '/images/badges/quality-reviewer-cute-v2.webp', icon: faCrown, accent: 'muted', description: 'รีวิวที่ตั้งใจเขียนช่วยให้ผู้อ่านคนอื่นมองเห็นคุณค่าของเรื่องราวในมุมใหม่', requirement: 'มีรีวิวที่ได้รับการกดว่า “มีประโยชน์” ครบ', current: 4, total: 10, unit: 'รีวิว' },
  { name: 'นักรีวิวสม่ำเสมอ', category: 'การรีวิว', earned: true, icon: faPen, accent: 'green', description: 'คุณแบ่งปันความประทับใจให้ชุมชนอย่างต่อเนื่อง', requirement: 'เขียนรีวิวต่อเนื่องครบ', current: 5, total: 5, unit: 'สัปดาห์', date: '20 ก.ย. 2026' },
  { name: 'นักอ่านข้ามคืน', category: 'การอ่าน', earned: true, icon: faMoon, accent: 'blue', description: 'ค่ำคืนแสนสงบกลายเป็นช่วงเวลาโปรดของการอ่าน', requirement: 'อ่านนิยายในช่วงกลางคืนครบ', current: 7, total: 7, unit: 'วัน', date: '18 ก.ย. 2026' },
  { name: 'เพื่อนนักเขียน', category: 'ชุมชน', earned: true, icon: faUsers, accent: 'pink', description: 'การติดตามและพูดคุยของคุณช่วยให้ชุมชนนักอ่านอบอุ่นขึ้น', requirement: 'ติดตามนักเขียนครบ', current: 10, total: 10, unit: 'คน', date: '15 ก.ย. 2026' },
  { name: 'นักวิจารณ์ดาวเด่น', category: 'การรีวิว', earned: false, icon: faStar, accent: 'gold', description: 'ทุกมุมมองช่วยเปิดหน้าต่างบานใหม่ให้ผู้อ่าน', requirement: 'เขียนรีวิวครบ', current: 7, total: 20, unit: 'เรื่อง' },
  { name: 'นักอ่านต่อเนื่อง', category: 'การอ่าน', earned: false, icon: faFire, accent: 'pink', description: 'รักษาจังหวะการอ่านให้เป็นส่วนหนึ่งของทุกวัน', requirement: 'อ่านต่อเนื่องครบ', current: 12, total: 30, unit: 'วัน' },
  { name: 'นักสะสมปกสวย', category: 'การสะสม', earned: false, icon: faGem, accent: 'violet', description: 'เก็บเรื่องราวที่ชอบไว้ในชั้นหนังสือส่วนตัว', requirement: 'บันทึกเรื่องโปรดครบ', current: 8, total: 25, unit: 'เรื่อง' },
  { name: 'นักสำรวจโลกนิยาย', category: 'การอ่าน', earned: false, icon: faCompass, accent: 'blue', description: 'ออกเดินทางไปยังโลกหลากหลายผ่านเรื่องเล่า', requirement: 'อ่านนิยายต่างหมวดครบ', current: 4, total: 12, unit: 'แนว' },
  { name: 'นักส่งต่อเรื่องราว', category: 'ชุมชน', earned: false, icon: faUsers, accent: 'green', description: 'แบ่งปันเรื่องที่ชอบให้เพื่อนนักอ่านได้ค้นพบ', requirement: 'แนะนำเรื่องให้เพื่อนครบ', current: 3, total: 10, unit: 'ครั้ง' },
  { name: 'ผู้พิทักษ์ชั้นหนังสือ', category: 'การสะสม', earned: false, icon: faBookOpen, accent: 'gold', description: 'จัดระเบียบเรื่องโปรดให้ค้นพบได้ง่าย', requirement: 'สร้างชั้นหนังสือครบ', current: 2, total: 6, unit: 'ชั้น' },
  { name: 'นักอ่านเช้าวันใหม่', category: 'การอ่าน', earned: false, icon: faCalendarDays, accent: 'green', description: 'เริ่มต้นวันด้วยเรื่องราวดี ๆ สักตอน', requirement: 'อ่านนิยายยามเช้าครบ', current: 3, total: 10, unit: 'วัน' },
  { name: 'นักเล่าเรื่องยอดนิยม', category: 'การรีวิว', earned: false, icon: faMessage, accent: 'blue', description: 'ข้อความรีวิวของคุณช่วยให้เรื่องโปรดเป็นที่รู้จัก', requirement: 'รีวิวได้รับการตอบกลับครบ', current: 2, total: 15, unit: 'ครั้ง' },
  { name: 'นักอ่านใจดี', category: 'ชุมชน', earned: false, icon: faHeart, accent: 'pink', description: 'ส่งกำลังใจให้ผลงานและนักเขียนในชุมชน', requirement: 'ส่งหัวใจให้ผลงานครบ', current: 6, total: 20, unit: 'เรื่อง' },
  { name: 'ผู้ค้นพบเรื่องใหม่', category: 'การอ่าน', earned: false, icon: faCompass, accent: 'violet', description: 'เปิดโอกาสให้เรื่องราวใหม่ ๆ เข้ามาเป็นเรื่องโปรด', requirement: 'อ่านเรื่องที่เพิ่งเผยแพร่ครบ', current: 4, total: 12, unit: 'เรื่อง' },
  { name: 'นักเขียนในดวงใจ', category: 'ชุมชน', earned: false, icon: faFeatherPointed, accent: 'gold', description: 'ติดตามผลงานของนักเขียนที่คุณชื่นชอบ', requirement: 'ติดตามผลงานครบ', current: 5, total: 15, unit: 'เรื่อง' },
  { name: 'นักรีวิวชวนอ่าน', category: 'การรีวิว', earned: false, icon: faPen, accent: 'green', description: 'บอกเล่าความรู้สึกที่ทำให้คนอื่นอยากเปิดอ่าน', requirement: 'รีวิวมีผู้อ่านครบ', current: 3, total: 10, unit: 'รีวิว' },
  { name: 'นักเก็บช่วงเวลา', category: 'การสะสม', earned: false, icon: faCalendarDays, accent: 'blue', description: 'บันทึกเรื่องราวสำคัญไว้กลับมาอ่านอีกครั้ง', requirement: 'เพิ่มเรื่องลงรายการอ่านภายหลังครบ', current: 5, total: 20, unit: 'เรื่อง' },
  { name: 'นักอ่านโลกกว้าง', category: 'การอ่าน', earned: false, icon: faGlobe, accent: 'violet', description: 'เดินทางไปกับเรื่องเล่าจากหลากหลายโลก', requirement: 'อ่านนิยายต่างประเทศครบ', current: 2, total: 8, unit: 'เรื่อง' },
  { name: 'แรงบันดาลใจของชุมชน', category: 'ชุมชน', earned: false, icon: faAward, accent: 'gold', description: 'เป็นส่วนหนึ่งที่ทำให้ชุมชนนักอ่านมีชีวิตชีวา', requirement: 'ร่วมกิจกรรมชุมชนครบ', current: 1, total: 5, unit: 'กิจกรรม' },
  { name: 'นักสะสมตัวยง', category: 'การสะสม', earned: false, icon: faCrown, accent: 'pink', description: 'ขยายชั้นหนังสือด้วยเรื่องที่อยากเก็บไว้ใกล้ตัว', requirement: 'เก็บเรื่องโปรดครบ', current: 12, total: 30, unit: 'เรื่อง' },
];

export default function BadgeCollection() {
  const [status, setStatus] = useState<'ทั้งหมด' | 'ได้รับแล้ว' | 'ยังไม่ปลดล็อก'>('ทั้งหมด');
  const [selected, setSelected] = useState('นักวิจารณ์ดาวรุ่ง');
  const unlocked = badges.filter((badge) => badge.earned).length;
  const activeBadges = useMemo(() => badges.filter((badge) => {
    return status === 'ทั้งหมด' || (status === 'ได้รับแล้ว' ? badge.earned : !badge.earned);
  }), [status]);
  const selectedBadge = activeBadges.find((badge) => badge.name === selected) ?? activeBadges[0];

  return (
    <div className={`ds-page-shell min-h-screen pt-[82px] ${styles.page}`}>
      <TopMenu fixed />
      <main className={styles.container}>
        <nav aria-label="เส้นทางนำทาง" className={styles.breadcrumb}>
          <Link href="/">หน้าหลัก</Link><FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          <Link href="/profile">โปรไฟล์ของฉัน</Link><FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          <span aria-current="page">Badge ของฉัน</span>
        </nav>

        <section className={`ds-card ${styles.hero}`}>
          <Image src="/images/badges/badge-collection-hero.webp" alt="" fill priority sizes="(max-width: 1400px) 100vw, 1400px" className={styles.heroImage} />
          <div className={styles.heroShade} />
          <div className={styles.heroCopy}>
            <div className={styles.heroHeading}><FontAwesomeIcon icon={faAward} /><div><h1>Badge ของฉัน</h1><p>สะสม Badge จากการอ่าน รีวิว และมีส่วนร่วมในชุมชน ArnSpace<br className="hidden sm:block" /> ทุก Badge คืออีกหนึ่งเรื่องราวของการเดินทางในโลกนิยาย</p></div></div>
            <div className={styles.overallProgress}><span><strong>ปลดล็อกแล้ว {unlocked}</strong> / 24</span><progress value={unlocked} max={24} aria-label={`ปลดล็อกแล้ว ${unlocked} จาก 24 Badge`} /><b>{Math.round(unlocked / 24 * 100)}%</b></div>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><FontAwesomeIcon icon={faCheck} /><strong>{unlocked}</strong><span>ได้รับแล้ว</span></div>
            <div className={styles.heroStat}><FontAwesomeIcon icon={faLock} /><strong>{24 - unlocked}</strong><span>ยังไม่ปลดล็อก</span></div>
          </div>
        </section>

        <div className={styles.collectionLayout}>
          <section className={styles.collection} aria-label="รายการ Badge">
            <div className={styles.filters}>
              <div className={styles.statusFilters} role="group" aria-label="กรองตามสถานะ">
                {(['ทั้งหมด', 'ได้รับแล้ว', 'ยังไม่ปลดล็อก'] as const).map((item) => <button key={item} type="button" aria-pressed={status === item} className={status === item ? styles.filterActive : ''} onClick={() => setStatus(item)}>{item} <span>({item === 'ทั้งหมด' ? 24 : item === 'ได้รับแล้ว' ? unlocked : 24 - unlocked})</span></button>)}
              </div>
            </div>
            <div className={styles.badgeGrid}>
              {activeBadges.map((badge) => <button type="button" key={badge.name} aria-pressed={selectedBadge?.name === badge.name} className={`${styles.badgeCard} ${selectedBadge?.name === badge.name ? styles.badgeSelected : ''}`} onClick={() => setSelected(badge.name)}>
                <span className={`${styles.badgeArt} ${styles[badge.accent]} ${!badge.earned ? styles.badgeLocked : ''}`}>
                  {badge.image ? <Image src={badge.image} alt="" width={112} height={112} sizes="112px" /> : <FontAwesomeIcon icon={badge.icon} />}
                  <span className={styles.miniSeal}><FontAwesomeIcon icon={badge.earned ? faAward : faLock} /></span>
                </span>
                <strong>{badge.name}</strong>
                {badge.earned ? <><span className={styles.earnedTag}><FontAwesomeIcon icon={faCheck} />ได้รับแล้ว</span><time>{badge.date}</time></> : <><progress max={badge.total} value={badge.current} aria-label={`ความคืบหน้า ${badge.name}`} /><span className={styles.badgeProgress}>{badge.current} / {badge.total} {badge.unit}</span></>}
              </button>)}
            </div>
            {!activeBadges.length && <p className={styles.emptyState}>ไม่พบ Badge ในตัวกรองนี้</p>}
          </section>

          <aside className={`ds-card ${styles.detailPanel}`} aria-live="polite">
            {selectedBadge ? <>
              <div className={styles.detailArt}>
                {selectedBadge.image ? <Image src={selectedBadge.image} alt="" width={184} height={184} /> : <FontAwesomeIcon icon={selectedBadge.icon} />}
                <span className={styles.detailSeal}><FontAwesomeIcon icon={selectedBadge.earned ? faAward : faLock} /></span>
              </div>
              <h2>{selectedBadge.name}</h2>
              <span className={`${styles.detailStatus} ${selectedBadge.earned ? styles.detailEarned : ''}`}><FontAwesomeIcon icon={selectedBadge.earned ? faCheck : faLock} />{selectedBadge.earned ? 'ได้รับแล้ว' : 'ยังไม่ปลดล็อก'}</span>
              <div className={styles.detailSection}><h3><FontAwesomeIcon icon={faBookOpen} />เรื่องราวของ Badge</h3><p>{selectedBadge.description}</p></div>
              <div className={styles.detailSection}><h3><FontAwesomeIcon icon={faMessage} />เงื่อนไขการได้รับ</h3><p>{selectedBadge.requirement} {selectedBadge.total} {selectedBadge.unit}</p></div>
              <div className={styles.detailSection}><h3><FontAwesomeIcon icon={selectedBadge.earned ? faCheck : faLock} />สถานะ</h3>{selectedBadge.earned ? <p className={styles.detailDate}><FontAwesomeIcon icon={faCalendarDays} />วันที่ได้รับ: {selectedBadge.date}</p> : <><p>{selectedBadge.current} / {selectedBadge.total} {selectedBadge.unit}</p><progress max={selectedBadge.total} value={selectedBadge.current} /><p>เหลืออีก <strong>{selectedBadge.total - selectedBadge.current} {selectedBadge.unit}</strong> เพื่อปลดล็อก Badge นี้</p></>}</div>
              <Link href="/profile" className={styles.backProfile}>กลับไปหน้าโปรไฟล์<FontAwesomeIcon icon={faChevronRight} /></Link>
            </> : <div className={styles.emptyDetail}><FontAwesomeIcon icon={faAward} /><h2>เลือก Badge เพื่อดูรายละเอียด</h2><p>แตะ Badge ในรายการเพื่อดูเงื่อนไขและความคืบหน้า</p></div>}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
