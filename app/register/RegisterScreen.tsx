"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "../login/AuthShell";
import { MailIcon, LockIcon, EyeIcon, ArrowIcon } from "../login/AuthIcons";
import auth from "../login/Login.module.css";
import styles from "./Register.module.css";

function UserIcon() {
  return <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

export default function RegisterScreen({ source, home }: { source: "arnspace" | "arnbook"; home: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const context = `from=${source}&returnTo=${encodeURIComponent(home)}`;
  const loginHref = `/login?${context}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // Mock registration: do not persist passwords or claim to create a real account.
    router.push(`${loginHref}&registered=success`);
  }

  return <AuthShell source={source} home={home} contentClassName={styles.content}>
    <div className={auth.heading}>
      <p className={auth.eyebrow}>YOUR ARN ACCOUNT</p>
      <h1 id="auth-title">เริ่มเรื่องราวของคุณกับ ARN</h1>
      <p>สร้างบัญชีเดียว เพื่ออ่าน ค้นพบ และแบ่งปัน<br />ได้ทั้ง ARN Book และ ARN Space</p>
    </div>

    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={auth.field} htmlFor="register-username">ชื่อผู้ใช้งาน</label>
        <div className={`ds-input ${auth.input}`}>
          <UserIcon />
          <input id="register-username" name="username" type="text" autoComplete="username" placeholder="เลือกชื่อผู้ใช้งานของคุณ" minLength={3} maxLength={40} pattern=".*\S.*" required aria-describedby="username-hint" />
        </div>
        <p className={styles.hint} id="username-hint">ใช้ชื่ออย่างน้อย 3 ตัวอักษร สำหรับเข้าสู่ระบบ ARN</p>
      </div>

      <div>
        <label className={auth.field} htmlFor="register-email">อีเมล</label>
        <div className={`ds-input ${auth.input}`}>
          <MailIcon />
          <input id="register-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div>
        <label className={auth.field} htmlFor="register-gender">เพศ</label>
        <select className={`ds-input ${styles.select}`} id="register-gender" name="gender" defaultValue="unspecified">
          <option value="unspecified">ไม่ระบุ</option>
          <option value="female">หญิง</option>
          <option value="male">ชาย</option>
          <option value="other">อื่น ๆ</option>
        </select>
      </div>

      <div>
        <label className={auth.field} htmlFor="register-password">รหัสผ่าน</label>
        <div className={`ds-input ${auth.input}`}>
          <LockIcon />
          <input id="register-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="สร้างรหัสผ่านของคุณ" minLength={6} required aria-describedby="password-hint" />
          <button className={auth.eye} type="button" aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"} aria-pressed={showPassword} onClick={() => setShowPassword(visible => !visible)}><EyeIcon visible={showPassword} /></button>
        </div>
        <p className={styles.hint} id="password-hint">ใช้รหัสผ่านอย่างน้อย 6 ตัวอักษร</p>
      </div>

      <div className={styles.terms}>
        <input id="register-accept" name="acceptedTerms" type="checkbox" required />
        <div>
          <label htmlFor="register-accept">ฉันยอมรับ</label>{" "}
          <Link href="/terms">ข้อกำหนดการใช้งาน</Link>{" "}และ{" "}
          <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link>
        </div>
      </div>

      <button className={`ds-button-primary ${auth.submit} ${styles.submit}`} type="submit" disabled={submitting}>{submitting ? "กำลังสมัครสมาชิก…" : "สมัครสมาชิก"}<ArrowIcon /></button>
    </form>

    <p className={auth.register}>มีบัญชี ARN อยู่แล้ว? <Link href={loginHref}>เข้าสู่ระบบ</Link></p>
    <p className={auth.accountNote}>บัญชีเดียว ใช้ได้ทั้ง ARN Book และ ARN Space</p>
  </AuthShell>;
}
