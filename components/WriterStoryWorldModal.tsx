"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faFileLines, faFolderOpen, faGlobe, faHouse, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import styles from "./WriterStudio.module.css";

export default function WriterStoryWorldModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const requestedCloseRef = useRef(false);

  const closeDialog = () => {
    requestedCloseRef.current = true;
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.characterDialog} ${styles.characterDialogRedesign} ${styles.storyWorldDialogRedesign}`}
      aria-labelledby="story-world-dialog-title"
      onClose={() => {
        if (!requestedCloseRef.current) return;
        requestedCloseRef.current = false;
        onClose();
      }}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <div className={styles.characterDialogLayout}>
        <div className={`${styles.characterDetails} ${styles.characterRedesignDetails}`}>
          <button className={styles.characterClose} type="button" aria-label="ปิดหน้าต่าง" onClick={closeDialog}>
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>

          <header className={styles.characterHeader}>
            <FontAwesomeIcon icon={faGlobe} aria-hidden="true" className={styles.storyWorldTitleIcon} />
            <div>
              <h2 id="story-world-dialog-title">Story World</h2>
              <span>World Building</span>
            </div>
          </header>
          <p className={`${styles.characterIntro} ${styles.characterRedesignIntro}`}>
            สร้างรายละเอียดของโลกในเรื่อง เช่น สถานที่ วัฒนธรรม และกฎสำคัญ เพื่อให้เรื่องมีมิติและน่าเชื่อถือ
          </p>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.storyWorldExampleSection}`} aria-labelledby="story-world-example-title">
            <h3 id="story-world-example-title"><FontAwesomeIcon icon={faFileLines} aria-hidden="true" /> ตัวอย่างการใช้งาน</h3>
            <article className={`${styles.characterExample} ${styles.characterRedesignExample} ${styles.storyWorldRedesignExample}`}>
              <Image
                src="/images/writer-story-world.webp"
                alt="เมืองอรุณวดี เมืองหลวงริมสายน้ำในโลกแฟนตาซี"
                width={172}
                height={146}
                sizes="(max-width: 480px) 112px, 172px"
                className={styles.storyWorldRedesignAvatar}
              />
              <div className={`${styles.characterExampleBody} ${styles.storyWorldExampleBody}`}>
                <h4>เมืองอรุณวดี</h4>
                <dl>
                  <div><dt>ประเภท:</dt><dd>เมืองหลวง</dd></div>
                  <div><dt>จุดเด่น:</dt><dd>เมืองริมสายธาร</dd></div>
                  <div><dt>วัฒนธรรม:</dt><dd>ยึดถือเกียรติและสายเลือด</dd></div>
                  <div><dt>สถานที่สำคัญ:</dt><dd>พระราชวังกลางน้ำ</dd></div>
                </dl>
              </div>
            </article>
          </section>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.characterWhereSection}`} aria-labelledby="story-world-where-title">
            <h3 id="story-world-where-title"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> ใช้งานที่ไหน?</h3>
            <nav className={styles.characterBreadcrumb} aria-label="ตำแหน่งเครื่องมือ Story World">
              <span><FontAwesomeIcon icon={faHouse} aria-hidden="true" /> เรื่องของฉัน</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" /> นิยายเรื่อง</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faGlobe} aria-hidden="true" /> เครื่องมือ Story World</span>
            </nav>
          </section>
        </div>
      </div>
    </dialog>
  );
}
