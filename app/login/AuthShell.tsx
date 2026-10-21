"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import styles from "./Login.module.css";

export default function AuthShell({ source, home, children, contentClassName = "" }: { source: "arnspace" | "arnbook"; home: string; children: ReactNode; contentClassName?: string }) {
  const brand = source === "arnbook" ? "ARN Book" : "ARN Space";
  return <UnbuiltPageGuard><div className={`login-page ${styles.page}`}>
    <header className={styles.topbar}>
      <Link href={home} className={styles.wordmark} aria-label="ARN หน้าหลัก">ARN<span>บัญชีเดียว ทุกเรื่องราว</span></Link>
      <Link href={home} className={styles.back}><span aria-hidden="true">←</span> กลับไป {brand}</Link>
    </header>
    <main className={styles.main}>
      <section className={styles.art} aria-label="โลกแห่งเรื่องราวของ ARN">
        <Image src="/images/arn-auth-story-world.webp" alt="โลกเล็ก ๆ บนหนังสือที่เปิดอยู่ เชื่อมห้องสมุด ธรรมชาติ และผู้คนเข้าด้วยกัน" fill preload sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, 50vw" />
        <div className={styles.artShade} />
        <div className={styles.artCopy}><p className={styles.eyebrow}>READ. CONNECT. BELONG.</p><h2>ทุกเรื่องราว<br />เริ่มต้นที่การเชื่อมต่อ</h2><p>ค้นพบหนังสือที่ใช่ พบผู้คนที่ชอบ<br />และแบ่งปันเรื่องราวในแบบของคุณ</p><div className={styles.brands}>ARN Book <span aria-hidden="true">＋</span> ARN Space</div></div>
      </section>
      <section className={styles.formSide} aria-labelledby="auth-title">
        <div className={`${styles.formWrap} ${contentClassName}`}>
          {children}
        </div>
      </section>
    </main>
  </div></UnbuiltPageGuard>;
}
