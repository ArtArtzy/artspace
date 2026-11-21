import Link from "next/link";
import Footer from "@/components/Footer";
import { WriterGrid } from "@/components/CommunitySection";
import TopMenu from "@/components/TopMenu";
import styles from "@/app/GuestHome.module.css";

export default function WritersPage() {
  return (
    <main data-home-page className={`ds-page-shell min-h-screen pt-[82px] ${styles.memberPage}`}>
      <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      <section className="mx-auto max-w-[1400px] px-ds-4 py-ds-8 md:px-ds-6" aria-labelledby="writers-title">
        <Link className="ds-button-secondary inline-flex min-h-11 items-center px-ds-4 text-ds-body-sm" href="/#writers">
          <span aria-hidden="true">←</span> กลับหน้าหลัก
        </Link>
        <h1 className="mb-ds-6 mt-ds-4 text-ds-h2 md:text-ds-h1" id="writers-title">นักเขียนแนะนำ</h1>
        <WriterGrid showAll />
      </section>
      <Footer responsive />
    </main>
  );
}
