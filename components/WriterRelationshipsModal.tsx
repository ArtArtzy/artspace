"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faFileLines, faFolderOpen, faHandshake, faHeart, faHouse, faLocationDot, faShareNodes, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import styles from "./WriterStudio.module.css";

const relationshipNodes = [
  { name: "ศิริน", image: "/images/writer-relationship-krisan.webp", className: "relationshipNodeTopLeft", badgeClassName: "relationshipBadgeLove", relation: "คนรัก", icon: faHeart },
  { name: "อาสิริน", image: "/images/writer-relationship-arisorn.webp", className: "relationshipNodeTopRight", badgeClassName: "relationshipBadgeRival", relation: "ศัตรู", icon: null },
  { name: "แม่ริน", image: "/images/writer-relationship-maerin.webp", className: "relationshipNodeBottomLeft", badgeClassName: "relationshipBadgeFamily", relation: "ครอบครัว", icon: faUsers },
  { name: "ทีม", image: "/images/writer-relationship-team.webp", className: "relationshipNodeBottomRight", badgeClassName: "relationshipBadgeFriend", relation: "เพื่อน", icon: faHandshake },
];

export default function WriterRelationshipsModal({ onClose }: { onClose: () => void }) {
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
      className={`${styles.characterDialog} ${styles.characterDialogRedesign} ${styles.relationshipDialogRedesign}`}
      aria-labelledby="relationships-dialog-title"
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
            <FontAwesomeIcon icon={faShareNodes} aria-hidden="true" className={styles.characterTitleIcon} />
            <div>
              <h2 id="relationships-dialog-title">แผนผังความสัมพันธ์</h2>
              <span>Relationships</span>
            </div>
          </header>
          <p className={`${styles.characterIntro} ${styles.characterRedesignIntro}`}>
            เชื่อมโยงความสัมพันธ์ของตัวละคร เพื่อให้เห็นภาพรวมของเรื่องได้ชัดเจนขึ้น
          </p>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.relationshipExampleSection}`} aria-labelledby="relationships-example-title">
            <h3 id="relationships-example-title"><FontAwesomeIcon icon={faFileLines} aria-hidden="true" /> ตัวอย่างการใช้งาน</h3>
            <div className={styles.relationshipMapDiagram} aria-label="แผนผังแสดงความสัมพันธ์ของลลินกับคนรัก ศัตรู ครอบครัว และเพื่อน">
              <span className={`${styles.relationshipMapEdge} ${styles.relationshipEdgeTopLeft}`} aria-hidden="true" />
              <span className={`${styles.relationshipMapEdge} ${styles.relationshipEdgeTopRight}`} aria-hidden="true" />
              <span className={`${styles.relationshipMapEdge} ${styles.relationshipEdgeBottomLeft}`} aria-hidden="true" />
              <span className={`${styles.relationshipMapEdge} ${styles.relationshipEdgeBottomRight}`} aria-hidden="true" />
              {relationshipNodes.map((node) => (
                <article className={`${styles.relationshipMapNode} ${styles[node.className]}`} key={node.name}>
                  <Image src={node.image} alt="" width={68} height={68} sizes="68px" />
                  <span className={styles.relationshipMapName}>{node.name}</span>
                  <span className={`${styles.relationshipMapBadge} ${styles[node.badgeClassName]}`}>
                    {node.icon ? <FontAwesomeIcon icon={node.icon} aria-hidden="true" /> : <span aria-hidden="true">×</span>}
                    {node.relation}
                  </span>
                </article>
              ))}
              <article className={`${styles.relationshipMapNode} ${styles.relationshipNodeCenter}`}>
                <Image src="/images/writer-character-lalin-red.webp" alt="" width={82} height={82} sizes="82px" />
                <span className={styles.relationshipMapName}>ลลิน</span>
              </article>
            </div>
          </section>

          <section className={`${styles.characterInfoCard} ${styles.characterRedesignSection} ${styles.characterWhereSection}`} aria-labelledby="relationships-where-title">
            <h3 id="relationships-where-title"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" /> ใช้งานที่ไหน?</h3>
            <nav className={styles.characterBreadcrumb} aria-label="ตำแหน่งเครื่องมือแผนผังความสัมพันธ์">
              <span><FontAwesomeIcon icon={faHouse} aria-hidden="true" /> เรื่องของฉัน</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faFolderOpen} aria-hidden="true" /> นิยายเรื่อง</span>
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" className={styles.characterBreadcrumbDivider} />
              <span><FontAwesomeIcon icon={faShareNodes} aria-hidden="true" /> เครื่องมือแผนผังความสัมพันธ์</span>
            </nav>
          </section>
        </div>
      </div>
    </dialog>
  );
}
