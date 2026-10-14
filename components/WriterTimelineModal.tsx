"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faClock, faFileLines, faFolderOpen, faHouse, faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import styles from "./WriterStudio.module.css";

const timelineEvents = [
  {
    image: "/images/writer-character-lalin-red.webp",
    alt: "ลลินเริ่มค้นพบความลับของตระกูล",
    episode: "ตอนที่ 1",
    description: "ลลินพบความลับของตระกูล",
  },
  {
    image: "/images/writer-timeline-loss.webp",
    alt: "ปราสาทท่ามกลางความมืดหลังการสูญเสีย",
    episode: "ตอนที่ 12",
    description: "เผชิญความสูญเสีย",
  },
  {
    image: "/images/writer-timeline-choice.webp",
    alt: "หญิงสาวในผ้าคลุมสีแดงมองไปยังรุ่งอรุณ",
    episode: "ตอนที่ 25",
    description: "ตัดสินใจเปลี่ยนเส้นทางชีวิต",
  },
];

export default function WriterTimelineModal({ onClose }: { onClose: () => void }) {
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
      className={`${styles.characterDialog} ${styles.characterDialogRedesign} ${styles.timelineDialogRedesign}`}
      aria-labelledby="timeline-dialog-title"
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
            <FontAwesomeIcon icon={faClock} aria-hidden="true" className={styles.timelineTitleIcon} />
            <div>
              <h2 id="timeline-dialog-title">Timeline</h2>
              <span>Timeline</span>
            </div>
          </header>
          <p className={`${styles.characterIntro} ${styles.characterRedesignIntro}`}>
            จัดลำดับเหตุการณ์สำคัญของเรื่อง เพื่อให้ช่วงเวลาและความต่อเนื่องชัดเจนตลอดเรื่อง
          </p>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.timelineExampleSection}`} aria-labelledby="timeline-example-title">
            <h3 id="timeline-example-title"><FontAwesomeIcon icon={faFileLines} aria-hidden="true" /> ตัวอย่างการใช้งาน</h3>
            <div className={styles.timelineEpisodes}>
              {timelineEvents.map((event) => (
                <article className={styles.timelineEpisode} key={event.episode}>
                  <Image src={event.image} alt={event.alt} width={136} height={84} sizes="(max-width: 480px) 30vw, 136px" />
                  <h4>{event.episode}</h4>
                  <p>{event.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.characterWhereSection}`} aria-labelledby="timeline-where-title">
            <h3 id="timeline-where-title"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> ใช้งานที่ไหน?</h3>
            <nav className={styles.characterBreadcrumb} aria-label="ตำแหน่งเครื่องมือ Timeline">
              <span><FontAwesomeIcon icon={faHouse} aria-hidden="true" /> เรื่องของฉัน</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" /> นิยายเรื่อง</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faClock} aria-hidden="true" /> เครื่องมือ Timeline</span>
            </nav>
          </section>
        </div>
      </div>
    </dialog>
  );
}
