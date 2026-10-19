'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart, faMagnifyingGlass, faPen } from '@fortawesome/free-solid-svg-icons';
import { profileReviews } from '@/data/profile-reviews';
import styles from './ProfileRecommendations.module.css';

const books = profileReviews.map(book => ({ id: book.image, title: book.title, image: book.image }));
type Recommendation = { bookId: string; comment: string };
const defaults: Recommendation[] = books.slice(0, 3).map((book, index) => ({ bookId: book.id, comment: [
  'โลกแฟนตาซีที่อ่านแล้วหลุดเข้าไปได้เลย ใครชอบปริศนาและการผจญภัย อยากให้ลองเรื่องนี้',
  'ชอบบรรยากาศและการค่อยๆ คลี่คลายปม เป็นเรื่องที่อ่านแล้ววางไม่ลงจริงๆ',
  'เก็บไว้เป็นเรื่องโปรดสำหรับวันที่อยากเติมรอยยิ้ม อ่านแล้วอบอุ่นหัวใจมาก',
][index] }));
const storageKey = 'arnspace-profile-recommendations';

export default function ProfileRecommendations({ preview }: { preview: boolean }) {
  const [recommendations, setRecommendations] = useState(defaults);
  const [draft, setDraft] = useState<Recommendation>(defaults[0]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!Array.isArray(value) || value.length !== 3) return;
      const valid = value.every((item: unknown) => {
        if (!item || typeof item !== 'object') return false;
        const entry = item as Partial<Recommendation>;
        return books.some(book => book.id === entry.bookId) && typeof entry.comment === 'string';
      });
      if (!valid || new Set(value.map(item => item.bookId)).size !== 3) return;
      setRecommendations(value.map(item => ({ bookId: item.bookId, comment: item.comment.slice(0, 300) })));
    } catch { /* Use the initial recommendations if browser storage is unavailable. */ }
  }, []);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingIndex === null || recommendations.some((item, index) => index !== editingIndex && item.bookId === draft.bookId)) return;
    const next = recommendations.map((item, index) => index === editingIndex ? { ...draft, comment: draft.comment.slice(0, 300).trim() } : item);
    setRecommendations(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Keep changes for this visit. */ }
    dialog.current?.close();
  }

  const normalizedQuery = query.trim().normalize('NFC').toLocaleLowerCase('th');
  const results = normalizedQuery ? books.filter(book => book.title.normalize('NFC').toLocaleLowerCase('th').includes(normalizedQuery)) : [];
  const pageSize = 6;
  const pageCount = Math.ceil(results.length / pageSize);
  const selectedBook = books.find(book => book.id === draft.bookId)!;

  return <>
    <section className={`ds-card ${styles.section}`} aria-labelledby="recommendations-title">
      <div className={styles.heading}><h2 id="recommendations-title" className="text-ds-h3"><FontAwesomeIcon icon={faHeart} aria-hidden="true" />เรื่องโปรดที่อยากแนะนำ</h2>
      </div>
      <div className={styles.grid}>{recommendations.map((item, index) => {
        const book = books.find(book => book.id === item.bookId)!;
        return <article key={index} className={styles.card}>
          <div className={styles.cover}><Image src={book.image} alt={`ปก ${book.title}`} width={160} height={232} sizes="(max-width: 600px) 80px, 120px" /></div>
          <div className={styles.details}><h3 className="text-ds-body font-semibold">{book.title}</h3>{item.comment && <p className={`text-ds-body-sm text-arn-muted ${styles.comment}`}>{item.comment}</p>}
            {!preview && <button type="button" className={styles.edit} aria-label={`แก้ไขเรื่องที่ ${index + 1}: ${book.title}`} onClick={event => { trigger.current = event.currentTarget; setEditingIndex(index); setDraft({ ...item }); setQuery(''); setPage(0); dialog.current?.showModal(); }}><FontAwesomeIcon icon={faPen} aria-hidden="true" />แก้ไขเรื่องนี้</button>}
          </div>
        </article>;
      })}</div>
    </section>
    <dialog ref={dialog} className={`ds-card ${styles.dialog}`} aria-labelledby="edit-recommendations-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <form onSubmit={save} className="space-y-5">
        <div><h2 id="edit-recommendations-title" className="text-ds-h2">แก้ไขเรื่องแนะนำ{editingIndex === null ? '' : ` · เรื่องที่ ${editingIndex + 1}`}</h2><p className="mt-2 text-ds-body-sm text-arn-muted">เขียนความเห็น หรือค้นหาเพื่อเปลี่ยนเรื่องที่อยากแนะนำ</p></div>
        <div className={styles.selection}><Image src={selectedBook.image} alt={`ปก ${selectedBook.title}`} width={48} height={70} /><div><p className="text-ds-meta text-arn-subtle">เรื่องที่เลือก</p><h3 className="mt-1 text-ds-body font-semibold">{selectedBook.title}</h3></div></div>
        <div>
          <label htmlFor="recommended-search" className="text-ds-body-sm">ค้นหาชื่อเรื่อง</label>
          <div className={styles.search}><FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" /><input autoFocus id="recommended-search" type="search" className="ds-input w-full py-3 pl-10 pr-3" placeholder="พิมพ์ชื่อเรื่องที่อยากแนะนำ…" value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} aria-describedby="recommended-search-summary" /></div>
          <p id="recommended-search-summary" className="mt-2 text-ds-meta text-arn-subtle">{!normalizedQuery ? 'พิมพ์ชื่อเรื่องเพื่อค้นหาและเลือกจากผลลัพธ์' : results.length ? `พบ ${results.length} เรื่อง` : 'ไม่พบเรื่องที่ค้นหา ลองใช้คำค้นอื่น'}</p>
          {normalizedQuery && results.length > 0 && <ul className={styles.results}>{results.slice(page * pageSize, (page + 1) * pageSize).map(book => {
            const alreadyUsed = recommendations.some((item, index) => index !== editingIndex && item.bookId === book.id);
            const selected = draft.bookId === book.id;
            return <li key={book.id}><button type="button" className={styles.result} disabled={alreadyUsed} aria-pressed={selected} onClick={() => setDraft(current => current.bookId === book.id ? current : { bookId: book.id, comment: '' })}>
              <Image src={book.image} alt="" width={40} height={58} /><span className={styles.resultTitle}>{book.title}{alreadyUsed && <span className="block text-ds-meta text-arn-subtle">แนะนำอยู่ในช่องอื่นแล้ว</span>}</span>{selected && <FontAwesomeIcon icon={faCheck} aria-label="เลือกแล้ว" />}
            </button></li>;
          })}</ul>}
          {pageCount > 1 && <div className={styles.pagination}><button type="button" className="ds-button-secondary px-3 py-2" disabled={page === 0} onClick={() => setPage(current => current - 1)}>ก่อนหน้า</button><span className="text-ds-meta text-arn-muted">หน้า {page + 1}/{pageCount}</span><button type="button" className="ds-button-secondary px-3 py-2" disabled={page + 1 >= pageCount} onClick={() => setPage(current => current + 1)}>ถัดไป</button></div>}
        </div>
        <label className="block text-ds-body-sm" htmlFor="recommended-comment">ความเห็นของฉัน<textarea id="recommended-comment" className={`ds-input mt-2 w-full p-3 ${styles.input}`} rows={3} maxLength={300} value={draft.comment} aria-describedby="recommended-count" placeholder="ชอบอะไรในเรื่องนี้ อยากแนะนำให้ใครอ่าน?" onChange={event => setDraft(current => ({ ...current, comment: event.target.value }))} /><span id="recommended-count" className={styles.count}>{draft.comment.length}/300 ตัวอักษร</span></label>
        <div className={styles.actions}><button type="button" className="ds-button-secondary px-4 py-3" onClick={() => dialog.current?.close()}>ยกเลิก</button><button type="submit" className="ds-button-primary px-4 py-3">บันทึก</button></div>
      </form>
    </dialog>
  </>;
}
