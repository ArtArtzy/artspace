"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faChevronRight, faFileLines, faFolderOpen, faHouse, faLocationDot, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import styles from "./WriterStudio.module.css";

const characterImage = "/images/writer-character-lalin-red.webp";

export default function WriterCharacterModal({ onClose }: { onClose: () => void }) {
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
      className={`${styles.characterDialog} ${styles.characterDialogRedesign}`}
      aria-labelledby="character-dialog-title"
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
            <FontAwesomeIcon icon={faUsers} aria-hidden="true" className={styles.characterTitleIcon} />
            <div>
              <h2 id="character-dialog-title">ตัวละคร</h2>
              <span>Characters</span>
            </div>
          </header>
          <p className={`${styles.characterIntro} ${styles.characterRedesignIntro}`}>
            สร้างและจัดการข้อมูลตัวละคร เพื่อให้บุคลิก เป้าหมาย และพัฒนาการสอดคล้องกันตลอดเรื่อง
          </p>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection}`} aria-labelledby="character-example-title">
            <h3 id="character-example-title"><FontAwesomeIcon icon={faFileLines} aria-hidden="true" /> ตัวอย่างการใช้งาน</h3>
            <article className={`${styles.characterExample} ${styles.characterRedesignExample}`}>
              <Image
                src={characterImage}
                alt="ลลิน นางเอกในชุดฮั่นฝูสีแดง"
                width={120}
                height={120}
                sizes="120px"
                className={styles.characterRedesignAvatar}
              />
              <div className={styles.characterExampleBody}>
                <h4>ลลิน — นางเอก</h4>
                <dl>
                  <div><dt>บุคลิก:</dt><dd>อ่อนไหวแต่เด็ดเดี่ยว</dd></div>
                  <div><dt>เป้าหมาย:</dt><dd>ปกป้องครอบครัว</dd></div>
                  <div><dt>จุดอ่อน:</dt><dd>ไม่กล้าตัดสินใจ</dd></div>
                </dl>
              </div>
            </article>
          </section>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection}`} aria-labelledby="character-arc-title">
            <h3 id="character-arc-title"><FontAwesomeIcon icon={faChartSimple} aria-hidden="true" /> พัฒนาการของลลิน</h3>
            <div className={styles.characterArc}>
              <article className={styles.characterArcStep}>
                <span>ตอนที่ 1</span>
                <p>ไม่กล้าตัดสินใจ</p>
              </article>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterArcArrow} />
              <article className={styles.characterArcStep}>
                <span>ตอนที่ 12</span>
                <p>เผชิญความสูญเสีย</p>
              </article>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterArcArrow} />
              <article className={styles.characterArcStep}>
                <span>ตอนที่ 25</span>
                <p>กล้าขึ้นเพื่อตัดสินใจ</p>
              </article>
            </div>
          </section>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.characterWhereSection}`} aria-labelledby="character-where-title">
            <h3 id="character-where-title"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> ใช้งานที่ไหน?</h3>
            <nav className={styles.characterBreadcrumb} aria-label="ตำแหน่งเครื่องมือตัวละคร">
              <span><FontAwesomeIcon icon={faHouse} aria-hidden="true" /> เรื่องของฉัน</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" /> นิยายเรื่อง</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faUsers} aria-hidden="true" /> เครื่องมือ ตัวละคร</span>
            </nav>
          </section>
        </div>
      </div>
    </dialog>
  );
}
