"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "./AuthShell";
import { MailIcon, LockIcon, EyeIcon, ArrowIcon, GoogleIcon, LineIcon, FacebookIcon, AppleIcon } from "./AuthIcons";
import styles from "./Login.module.css";

export default function AuthScreen({ forgot = false, source, home, registered = false }: { forgot?: boolean; source: "arnspace" | "arnbook"; home: string; registered?: boolean }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const brand = source === "arnbook" ? "ARN Book" : "ARN Space";
  const context = `from=${source}&returnTo=${encodeURIComponent(home)}`;
  const loginHref = `/login?${context}`;
  const mockLogin = () => {
    window.localStorage.setItem("arnspace-authenticated", "true");
    router.push(home);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (forgot) setSent(true); else mockLogin();
  };
  return <AuthShell source={source} home={home}>
          {source === "arnbook" && <p className={styles.destination}><span aria-hidden="true" /> เพื่อเข้าใช้งาน {brand}</p>}
          {registered && !forgot && <p role="status" className={styles.notice}>สมัครสมาชิกสำเร็จ พร้อมเริ่มเรื่องราวของคุณแล้ว</p>}
          <div className={styles.heading}>
            <p className={styles.eyebrow}>YOUR ARN ACCOUNT</p>
            <h1 id="auth-title">{forgot ? (sent ? "เช็กอีเมลของคุณได้เลย" : "ลืมรหัสผ่านใช่ไหม?") : "ยินดีต้อนรับกลับ"}</h1>
            <p>{forgot ? (sent ? "อีกนิดเดียว ก็กลับสู่เรื่องราวที่คุณรัก" : "ไม่เป็นไร เราช่วยให้คุณกลับมาได้") : "เข้าสู่ระบบ ARN แล้วไปต่อกับเรื่องราวที่คุณรัก"}</p>
          </div>
          {forgot && sent ? <div className={styles.sent} role="status">
            <div className={styles.mailBadge}><MailIcon /></div>
            <h2>คำขอรีเซ็ตรหัสผ่านพร้อมแล้ว</h2>
            <p>หากมีบัญชีที่ใช้อีเมล <strong>{email}</strong> เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ให้คุณ</p>
            <p className={styles.mockNote}>นี่คือหน้าจอจำลอง ยังไม่มีการส่งอีเมลจริง</p>
            <button className={`ds-button-secondary ${styles.submit}`} onClick={() => setSent(false)} type="button">ลองใช้อีเมลอื่น</button>
          </div> : <form onSubmit={submit} className={styles.form}>
            {forgot && <p className={styles.help}>กรอกอีเมลที่ใช้สมัครบัญชี ARN เพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่</p>}
            <label className={styles.field} htmlFor="identity">{forgot ? "อีเมล" : "ชื่อผู้ใช้หรืออีเมล"}</label>
            <div className={`ds-input ${styles.input}`}><MailIcon /><input id="identity" name="identity" autoComplete={forgot ? "email" : "username"} placeholder={forgot ? "you@example.com" : "กรอกชื่อผู้ใช้หรืออีเมล"} required type={forgot ? "email" : "text"} value={email} onChange={e => setEmail(e.target.value)} /></div>
            {!forgot && <><label className={styles.field} htmlFor="password">รหัสผ่าน</label><div className={`ds-input ${styles.input}`}><LockIcon /><input id="password" name="password" autoComplete="current-password" placeholder="กรอกรหัสผ่านของคุณ" required type={showPassword ? "text" : "password"} /><button className={styles.eye} aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} type="button"><EyeIcon visible={showPassword} /></button></div><div className={styles.forgot}><Link href={`/login/forgot-password?${context}`}>ลืมรหัสผ่าน?</Link></div></>}
            <button className={`ds-button-primary ${styles.submit}`} type="submit">{forgot ? "ส่งลิงก์ตั้งรหัสผ่านใหม่" : "เข้าสู่ระบบ"}<ArrowIcon /></button>
            {!forgot && <><div className={styles.divider}><span />หรือเข้าสู่ระบบด้วย<span /></div><div className={styles.socialGrid}>{[["Google", GoogleIcon], ["LINE", LineIcon], ["Facebook", FacebookIcon], ["Apple", AppleIcon]].map(([name, Icon]) => { const ProviderIcon = Icon as typeof GoogleIcon; return <button className={`ds-button-secondary ${styles.social}`} key={name as string} onClick={mockLogin} type="button"><ProviderIcon />{name as string}</button>; })}</div><p className={styles.register}>เพิ่งรู้จัก ARN? <Link href={`/register?${context}`}>สร้างบัญชีของคุณ</Link></p></>}
          </form>}
          {forgot ? <><Link className={styles.returnLogin} href={loginHref}>← กลับไปเข้าสู่ระบบ</Link><p className={styles.support}>ยังเข้าใช้งานไม่ได้? <Link href="/contact">ติดต่อเรา</Link></p></> : <p className={styles.accountNote}>บัญชีเดียว ใช้ได้ทั้ง ARN Book และ ARN Space</p>}
  </AuthShell>;
}
