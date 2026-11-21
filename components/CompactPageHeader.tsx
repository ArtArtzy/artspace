import Image from "next/image";
import Link from "next/link";
import { faArrowLeft, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CompactPageHeader.module.css";

type CompactPageHeaderProps = {
  backHref: string;
  backLabel: string;
  context: string;
  title: string;
  brandHref?: string;
};

export default function CompactPageHeader({ backHref, backLabel, context, title, brandHref = backHref }: CompactPageHeaderProps) {
  return (
    <header className={styles.topbar}>
      <Link href={backHref} className={styles.back} aria-label={backLabel}>
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
      </Link>
      <Link href={brandHref} className={styles.brand}>
        <Image src="/images/arnspace-logo.webp" alt="ARN SPACE" width={166} height={56} priority />
      </Link>
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.context}>
        <FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /> {context}
      </span>
      <span className={styles.title}>{title}</span>
    </header>
  );
}
