"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faDiagramProject, faFileLines, faFolderOpen, faHouse, faLocationDot, faShareNodes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import styles from "./WriterStudio.module.css";

export default function WriterPlotModal({ onClose }: { onClose: () => void }) {
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
      className={`${styles.characterDialog} ${styles.characterDialogRedesign} ${styles.plotDialogRedesign}`}
      aria-labelledby="plot-dialog-title"
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
            <FontAwesomeIcon icon={faShareNodes} aria-hidden="true" className={styles.plotTitleIcon} />
            <div>
              <h2 id="plot-dialog-title">โครงเรื่อง</h2>
              <span>Plot Outline</span>
            </div>
          </header>
          <p className={`${styles.characterIntro} ${styles.characterRedesignIntro}`}>
            วางโครงสร้างเรื่อง เพื่อให้จุดเริ่มต้น จุดเปลี่ยน และบทสรุปชัดเจนตลอดเรื่อง
          </p>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection}`} aria-labelledby="plot-example-title">
            <h3 id="plot-example-title"><FontAwesomeIcon icon={faFileLines} aria-hidden="true" /> ตัวอย่างการใช้งาน</h3>
            <article className={`${styles.characterExample} ${styles.plotRedesignExample}`}>
              <Image
                src="/images/writer-character-lalin-red.webp"
                alt="ลลิน นางเอกในชุดฮั่นฝูสีแดง"
                width={100}
                height={134}
                sizes="100px"
                className={styles.plotRedesignAvatar}
              />
              <div className={styles.plotRedesignBody}>
                <h4>ลลิน — นางเอกผู้ต้องเลือกระหว่างครอบครัวกับความรัก</h4>
                <div className={styles.plotBeatLine}>
                  <article className={styles.plotBeat}>
                    <span>1</span>
                    <h5>จุดเริ่มต้น</h5>
                    <p>ลลินพบความลับของตระกูล</p>
                  </article>
                  <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.plotBeatArrow} />
                  <article className={styles.plotBeat}>
                    <span>2</span>
                    <h5>จุดเปลี่ยน</h5>
                    <p>คนที่ไว้ใจที่สุดทรยศ</p>
                  </article>
                  <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.plotBeatArrow} />
                  <article className={styles.plotBeat}>
                    <span>3</span>
                    <h5>จุดแตกหัก</h5>
                    <p>ลลินเผชิญหน้ากับความจริง</p>
                  </article>
                  <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.plotBeatArrow} />
                  <article className={styles.plotBeat}>
                    <span>4</span>
                    <h5>บทสรุป</h5>
                    <p>เธอตัดสินใจเลือกเส้นทางของตนเอง</p>
                  </article>
                </div>
              </div>
            </article>
          </section>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.characterWhereSection}`} aria-labelledby="plot-where-title">
            <h3 id="plot-where-title"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> ใช้งานที่ไหน?</h3>
            <nav className={styles.characterBreadcrumb} aria-label="ตำแหน่งเครื่องมือโครงเรื่อง">
              <span><FontAwesomeIcon icon={faHouse} aria-hidden="true" /> เรื่องของฉัน</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" /> นิยายเรื่อง</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faDiagramProject} aria-hidden="true" /> เครื่องมือโครงเรื่อง</span>
            </nav>
          </section>
        </div>
      </div>
    </dialog>
  );
}
