import styles from "./DesktopOnlyNotice.module.css";

export default function DesktopOnlyNotice() {
  return <div className={styles.notice} data-desktop-only-notice>Under construction — desktop only</div>;
}
