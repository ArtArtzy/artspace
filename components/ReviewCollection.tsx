'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faCommentDots, faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import TopMenu from '@/components/TopMenu';
import Footer from '@/components/Footer';
import { collectionReviews as reviews, profileReviewTotal } from '@/data/profile-reviews';
import styles from './ReviewCollection.module.css';

const categories = ['ทั้งหมด', 'นิยาย', 'แฟนฟิค', 'การ์ตูน'] as const;
const pageSize = 10;

export default function ReviewCollection() {
  const [category, setCategory] = useState<string>('ทั้งหมด');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string[]>([]);
  const listHeading = useRef<HTMLParagraphElement>(null);
  const visible = reviews.filter(review => category === 'ทั้งหมด' || review.category === category).sort((a, b) => {
    if (sort === 'helpful') return b.helpful - a.helpful;
    if (sort === 'rating') return b.rating - a.rating || b.isoDate.localeCompare(a.isoDate);
    return sort === 'oldest' ? a.isoDate.localeCompare(b.isoDate) : b.isoDate.localeCompare(a.isoDate);
  });
  const pageCount = Math.ceil(visible.length / pageSize);
  const pageReviews = visible.slice((page - 1) * pageSize, page * pageSize);
  function changePage(next: number) {
    setPage(next);
    listHeading.current?.focus({ preventScroll: true });
    listHeading.current?.scrollIntoView({ block: 'center' });
  }

  return (
    <div className="ds-page-shell min-h-screen pt-[82px]">
      <TopMenu fixed />
      <main className={styles.container}>
        <nav aria-label="เส้นทางนำทาง" className={styles.breadcrumb}>
          <Link href="/">หน้าหลัก</Link><FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          <Link href="/profile">โปรไฟล์ของฉัน</Link><FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          <span aria-current="page">รีวิวของฉัน</span>
        </nav>
        <section className={`ds-card ${styles.hero}`}>
          <div className={styles.heading}>
            <span className={styles.heroIcon}><FontAwesomeIcon icon={faCommentDots} aria-hidden="true" /></span>
            <div><h1 className="text-ds-h2 sm:text-ds-h1">รีวิวของฉัน</h1><p className="mt-ds-2 text-ds-body text-arn-muted">รวมความคิดเห็นและความประทับใจจากเรื่องที่คุณอ่าน</p></div>
          </div>
          <div className={styles.total}><strong>{profileReviewTotal}</strong><span>รีวิวทั้งหมด</span></div>
        </section>
        <section className={styles.collection} aria-label="รายการรีวิวของฉัน">
          <div className={styles.toolbar}>
            <div className={styles.filters} role="group" aria-label="กรองประเภทเรื่อง">
              {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setPage(1); }} className={`ds-chip px-ds-4 py-ds-2 ${category === item ? styles.active : ''}`}>{item}</button>)}
            </div>
            <label className={styles.sort}>เรียงตาม<select className="ds-input" value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="latest">ล่าสุด</option><option value="oldest">เก่าสุด</option><option value="helpful">มีประโยชน์มากที่สุด</option><option value="rating">คะแนนสูงสุด</option></select></label>
          </div>
          <p ref={listHeading} tabIndex={-1} className="text-ds-body-sm text-arn-subtle" aria-live="polite">แสดง {visible.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, visible.length)} จาก {visible.length} รีวิว · ข้อมูลตัวอย่าง</p>
          <div className={styles.list}>
            {pageReviews.map(review => <article className={`ds-card ${styles.review}`} key={review.id}>
              <Image src={review.image} alt={`ปก ${review.title}`} width={104} height={150} sizes="(max-width: 600px) 72px, 104px" className={styles.cover} />
              <div className={styles.content}>
                <h2 className="text-ds-h3">{review.title}</h2>
                <div className={styles.meta}>
                  <span className={styles.stars} role="img" aria-label={`${review.rating} จาก 5 ดาว`}>{Array.from({ length: 5 }, (_, index) => <FontAwesomeIcon key={index} icon={faStar} aria-hidden="true" className={index >= review.rating ? styles.emptyStar : undefined} />)}</span>
                  <time dateTime={review.isoDate}>{review.date}</time>
                  <span className="ds-chip px-ds-2 py-ds-1">{review.category}</span>
                </div>
                <p className="text-ds-body text-arn-muted">{review.body}</p>
                <div className={styles.engagement}><span><FontAwesomeIcon icon={faThumbsUp} aria-hidden="true" />{review.helpful} มีประโยชน์</span><button type="button" aria-expanded={expanded.includes(review.id)} aria-controls={`${review.id}-comments`} aria-label={`${expanded.includes(review.id) ? 'ซ่อน' : 'ดู'} ${review.comments.length} ความคิดเห็นของ ${review.title}`} onClick={() => setExpanded(current => current.includes(review.id) ? current.filter(id => id !== review.id) : [...current, review.id])}><FontAwesomeIcon icon={faCommentDots} aria-hidden="true" />{review.comments.length} ความคิดเห็น · {expanded.includes(review.id) ? 'ซ่อน' : 'ดูความคิดเห็น'}</button></div>
                <section id={`${review.id}-comments`} hidden={!expanded.includes(review.id)} className={styles.comments} aria-label={`ความคิดเห็นต่อรีวิว ${review.title}`}>
                  <h3 className="text-ds-body-sm font-semibold">ความคิดเห็น ({review.comments.length})</h3>
                  <ul>{review.comments.map((comment, index) => <li key={`${review.id}-${index}`} className={styles.comment}><Image src={comment.avatar} alt={`รูปโปรไฟล์ ${comment.author}`} width={32} height={32} sizes="32px" className={styles.avatar} /><div><p className="text-ds-body-sm font-medium">{comment.author}</p><p className="text-ds-body-sm text-arn-muted">{comment.body}</p></div></li>)}</ul>
                </section>
              </div>
            </article>)}
          </div>
          {pageCount > 1 && <nav className={styles.pagination} aria-label="เลือกหน้ารีวิว"><button type="button" className="ds-button-secondary px-ds-4 py-ds-2" disabled={page === 1} onClick={() => changePage(page - 1)}>ก่อนหน้า</button>{Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} className={`${page === index + 1 ? 'ds-button-primary' : 'ds-button-secondary'} px-ds-4 py-ds-2`} aria-label={`หน้า ${index + 1}`} aria-current={page === index + 1 ? 'page' : undefined} onClick={() => changePage(index + 1)}>{index + 1}</button>)}<button type="button" className="ds-button-secondary px-ds-4 py-ds-2" disabled={page === pageCount} onClick={() => changePage(page + 1)}>ถัดไป</button></nav>}
          {!visible.length && <div className={`ds-card ${styles.empty}`}><FontAwesomeIcon icon={faCommentDots} aria-hidden="true" /><h2 className="text-ds-h3">ยังไม่มีรีวิวในหมวดนี้</h2><p>เมื่อคุณเขียนรีวิว เรื่องราวเหล่านั้นจะปรากฏที่นี่</p><button type="button" className="ds-button-secondary px-ds-4 py-ds-2" onClick={() => setCategory('ทั้งหมด')}>ดูรีวิวทุกประเภท</button></div>}
        </section>
        <Link href="/profile" className={styles.back}><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />กลับไปหน้าโปรไฟล์</Link>
      </main>
      <Footer />
    </div>
  );
}
