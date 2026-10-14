"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faFileLines, faFolderOpen, faHouse, faLocationDot, faPuzzlePiece, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import styles from "./WriterStudio.module.css";

const threadBeats = [
  { number: "1", title: "วางปม", body: <>ตอนที่ 3:<br />ลลินได้รับจดหมาย<br />ไม่มีชื่อผู้ส่ง</> },
  { number: "2", title: "เบาะแส", body: <>ตอนที่ 12:<br />พบลายมือคล้าย<br />ของพ่อ</> },
  { number: "3", title: "เฉลย", body: <>ตอนที่ 25:<br />ผู้ส่งคือคนใกล้ตัว<br />ในวัง</> },
];

export default function WriterPlotThreadsModal({ onClose }: { onClose: () => void }) {
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
      className={`${styles.characterDialog} ${styles.characterDialogRedesign} ${styles.plotThreadsDialogRedesign}`}
      aria-labelledby="plot-threads-dialog-title"
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
            <FontAwesomeIcon icon={faPuzzlePiece} aria-hidden="true" className={styles.plotThreadsTitleIcon} />
            <div>
              <h2 id="plot-threads-dialog-title">ปมและการเฉลย</h2>
              <span>Plot Threads</span>
            </div>
          </header>
          <p className={`${styles.characterIntro} ${styles.characterRedesignIntro}`}>
            ติดตามปม เบาะแส และการเฉลย เพื่อให้เรื่องราวชวนติดตามและเป็นระบบ
          </p>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.plotThreadsExampleSection}`} aria-labelledby="plot-threads-example-title">
            <h3 id="plot-threads-example-title"><FontAwesomeIcon icon={faFileLines} aria-hidden="true" /> ตัวอย่างการใช้งาน</h3>
            <article className={styles.plotThreadsExample}>
              <Image
                src="/images/writer-plot-thread-letter.webp"
                alt="จดหมายปริศนาที่ปิดผนึกด้วยครั่งสีแดง วางข้างแสงเทียน"
                width={132}
                height={140}
                sizes="(max-width: 480px) 110px, 132px"
                className={styles.plotThreadsArtwork}
              />
              <div className={styles.plotThreadsExampleBody}>
                <h4>จดหมายปริศนา</h4>
                <div className={styles.plotThreadsBeats}>
                  {threadBeats.map((beat) => (
                    <article className={styles.plotThreadsBeat} key={beat.number}>
                      <h5><span>{beat.number}</span>{beat.title}</h5>
                      <p>{beat.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.characterWhereSection}`} aria-labelledby="plot-threads-where-title">
            <h3 id="plot-threads-where-title"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> ใช้งานที่ไหน?</h3>
            <nav className={styles.characterBreadcrumb} aria-label="ตำแหน่งเครื่องมือปมและการเฉลย">
              <span><FontAwesomeIcon icon={faHouse} aria-hidden="true" /> เรื่องของฉัน</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" /> นิยายเรื่อง</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faPuzzlePiece} aria-hidden="true" /> เครื่องมือปมและการเฉลย</span>
            </nav>
          </section>
        </div>
      </div>
    </dialog>
  );
}
