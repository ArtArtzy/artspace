'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faCheck, faCloud, faHeart, faLeaf, faMoon, faPen, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './ProfileCorner.module.css';

const backgrounds = [
  { id: 'garden', name: 'สวนลับ', image: '/images/reader-welcome-bg.webp' },
  { id: 'starlight', name: 'ทะเลสาบในหมอก', image: '/images/community-banner.webp' },
  { id: 'pages', name: 'วันสบายกับหนังสือ', image: '/images/community-events-hero.webp' },
  { id: 'library', name: 'ห้องสมุดอบอุ่น', image: '/images/community-hero.webp' },
  { id: 'moonlight', name: 'คืนใต้แสงจันทร์', image: '/images/writer-studio-hero.webp' },
  { id: 'cafe', name: 'โต๊ะหนังสือ', image: '/images/promo-community.webp' },
] as const;
const icons = [
  { id: 'heart', name: 'หัวใจ', icon: faHeart },
  { id: 'star', name: 'ดาว', icon: faStar },
  { id: 'moon', name: 'พระจันทร์', icon: faMoon },
  { id: 'leaf', name: 'ใบไม้', icon: faLeaf },
  { id: 'book', name: 'หนังสือ', icon: faBookOpen },
  { id: 'cloud', name: 'ก้อนเมฆ', icon: faCloud },
] as const;
type Corner = { main: string; secondary: string; background: typeof backgrounds[number]['id']; icon: typeof icons[number]['id'] };
const initialCorner: Corner = { main: '', secondary: '', background: 'garden', icon: 'heart' };
const storageKey = 'arnspace-profile-corner';

export default function ProfileCorner({ preview }: { preview: boolean }) {
  const [corner, setCorner] = useState<Corner>(initialCorner);
  const [draft, setDraft] = useState<Corner>(initialCorner);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!stored || typeof stored !== 'object') return;
      const value = stored as Partial<Corner>;
      if (typeof value.main !== 'string' || typeof value.secondary !== 'string' || !backgrounds.some(background => background.id === value.background)) return;
      const icon = icons.find(item => item.id === value.icon)?.id || initialCorner.icon;
      setCorner({ main: value.main.slice(0, 150), secondary: value.secondary.slice(0, 120), background: value.background as Corner['background'], icon });
    } catch { /* Keep the empty corner when browser storage is unavailable. */ }
  }, []);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { ...draft, main: draft.main.slice(0, 150).trim(), secondary: draft.secondary.slice(0, 120).trim() };
    setCorner(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Changes remain available for this visit. */ }
    dialog.current?.close();
  }

  function content(value: Corner) {
    const background = backgrounds.find(item => item.id === value.background) || backgrounds[0];
    const selectedIcon = icons.find(item => item.id === value.icon) || icons[0];
    return <div className={styles.canvas}>
      <Image src={background.image} alt="" fill sizes="(max-width: 800px) 100vw, 440px" className={styles.backgroundImage} />
      <FontAwesomeIcon icon={selectedIcon.icon} className={styles.mark} aria-hidden="true" />
      {value.main || value.secondary ? <>
        {value.main && <p className={`text-ds-body font-semibold ${styles.message}`}>{value.main}</p>}
        {value.secondary && <p className={`text-ds-body-sm text-arn-muted ${styles.message}`}>{value.secondary}</p>}
      </> : <><p className="text-ds-body font-semibold">พื้นที่เล็กๆ ที่เป็นตัวคุณ</p><p className="text-ds-body-sm text-arn-muted">ฝากความคิด ความรู้สึก หรือประโยคที่ชอบไว้ตรงนี้</p></>}
    </div>;
  }

  return <>
    <section className={`ds-card ${styles.section}`} aria-labelledby="profile-corner-title">
      <div className={styles.heading}>
        <h2 id="profile-corner-title" className={`text-ds-h3 ${styles.title}`}><FontAwesomeIcon icon={(icons.find(item => item.id === corner.icon) || icons[0]).icon} aria-hidden="true" />มุมเล็กๆ ของฉัน</h2>
        {!preview && <button ref={trigger} type="button" className={`text-ds-body-sm ${styles.edit}`} onClick={() => { setDraft({ ...corner }); dialog.current?.showModal(); }}><FontAwesomeIcon icon={faPen} aria-hidden="true" />แก้ไข</button>}
      </div>
      {content(corner)}
    </section>
    <dialog ref={dialog} className={`ds-card ${styles.dialog}`} aria-labelledby="edit-corner-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <form onSubmit={save} className={styles.form}>
        <div className={styles.dialogHeading}><span className={styles.headingIcon}><FontAwesomeIcon icon={(icons.find(item => item.id === draft.icon) || icons[0]).icon} aria-hidden="true" /></span><div><h2 id="edit-corner-title" className="text-ds-h3">มุมเล็กๆ ของฉัน</h2><p className="mt-1 text-ds-body-sm text-arn-muted">แต่งพื้นที่เล็กๆ ให้เป็นตัวคุณ</p></div><button type="button" className={styles.close} aria-label="ปิดหน้าต่าง" onClick={() => dialog.current?.close()}><FontAwesomeIcon icon={faXmark} aria-hidden="true" /></button></div>
        <div className={styles.dialogBody}>
        <div className={styles.options}>
        <fieldset><legend className="mb-2 text-ds-body-sm">เลือกพื้นหลัง</legend><div className={styles.backgrounds}>{backgrounds.map(background => <label key={background.id} className={styles.choice}>
          <input type="radio" name="corner-background" value={background.id} checked={draft.background === background.id} onChange={() => setDraft(current => ({ ...current, background: background.id }))} />
          <span className={`${styles.swatch} ${styles.backgroundSwatch}`}><Image src={background.image} alt="" fill sizes="(max-width: 480px) 28vw, 150px" className={styles.thumbnail} />{draft.background === background.id && <span className={styles.backgroundCheck}><FontAwesomeIcon icon={faCheck} aria-hidden="true" /></span>}</span><span className="text-ds-meta">{background.name}</span>
        </label>)}</div></fieldset>
        <fieldset><legend className="mb-2 text-ds-body-sm">เลือกไอคอน</legend><div className={styles.icons}>{icons.map(item => <label key={item.id} className={styles.choice}>
          <input type="radio" name="corner-icon" value={item.id} checked={draft.icon === item.id} onChange={() => setDraft(current => ({ ...current, icon: item.id }))} />
          <span className={`${styles.swatch} ${styles.iconSwatch}`}><FontAwesomeIcon icon={item.icon} aria-hidden="true" />{draft.icon === item.id && <FontAwesomeIcon icon={faCheck} className={styles.selectedIcon} aria-hidden="true" />}</span><span className="text-ds-caption">{item.name}</span>
        </label>)}</div></fieldset>
        </div>
        <div className={styles.textFields}>
          <div><h3 className="text-ds-body font-semibold">ถ้อยคำของคุณ</h3><p className="mt-1 text-ds-meta text-arn-subtle">ความรู้สึกวันนี้ หรือประโยคที่อยากแบ่งปัน</p></div>
          <label className="block text-ds-body-sm" htmlFor="corner-main"><span className={styles.fieldLabel}>ข้อความหลัก<span id="corner-main-count" className={styles.count}>{draft.main.length}/150</span></span><textarea autoFocus id="corner-main" className={`ds-input mt-2 w-full p-3 ${styles.input}`} rows={3} maxLength={150} value={draft.main} placeholder="วันนี้คุณอยากบอกอะไรกับโลกใบนี้?" aria-describedby="corner-main-count" onChange={event => setDraft(current => ({ ...current, main: event.target.value }))} /></label>
          <label className="block text-ds-body-sm" htmlFor="corner-secondary"><span className={styles.fieldLabel}>ข้อความรอง<span id="corner-secondary-count" className={styles.count}>{draft.secondary.length}/120</span></span><textarea id="corner-secondary" className={`ds-input mt-2 w-full p-3 ${styles.input}`} rows={2} maxLength={120} value={draft.secondary} placeholder="เติมอีกนิดให้มุมนี้เป็นคุณมากขึ้น" aria-describedby="corner-secondary-count" onChange={event => setDraft(current => ({ ...current, secondary: event.target.value }))} /></label>
        </div>
        </div>
        <div className={styles.actions}><button type="button" className="ds-button-secondary px-4 py-3" onClick={() => dialog.current?.close()}>ยกเลิก</button><button type="submit" className="ds-button-primary px-4 py-3">บันทึก</button></div>
      </form>
    </dialog>
  </>;
}
