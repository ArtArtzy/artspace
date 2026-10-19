"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import styles from "./Registration.module.css";

function UserIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><rect height="14" rx="2" stroke="currentColor" strokeWidth="1.6" width="18" x="3" y="5" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function LockIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><rect height="10" rx="2" stroke="currentColor" strokeWidth="1.6" width="15" x="4.5" y="10" /><path d="M8 10V7.8a4 4 0 0 1 8 0V10M12 14v2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M2.8 12s3.25-5.2 9.2-5.2 9.2 5.2 9.2 5.2-3.25 5.2-9.2 5.2S2.8 12 2.8 12Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" /></svg> : <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="m3.5 3.5 17 17M9.8 6.9A9.8 9.8 0 0 1 12 6.7c5.95 0 9.2 5.3 9.2 5.3a17 17 0 0 1-3.05 3.45M6.2 8.55C3.95 10.05 2.8 12 2.8 12S6.05 17.3 12 17.3c.9 0 1.73-.13 2.5-.35" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function BookIcon() {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24"><path d="M4 5.5h5.2A2.8 2.8 0 0 1 12 8.3v11.2a2.8 2.8 0 0 0-2.8-2.8H4v-11ZM20 5.5h-5.2A2.8 2.8 0 0 0 12 8.3v11.2a2.8 2.8 0 0 1 2.8-2.8H20v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path d="M21.35 12.27c0-.77-.07-1.51-.22-2.22H12v4.2h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.37Z" fill="#4285F4" />
      <path d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.7Z" fill="#34A853" />
      <path d="M6.53 13.78A5.85 5.85 0 0 1 6.22 12c0-.62.11-1.22.31-1.78V7.69H3.29A9.74 9.74 0 0 0 2.25 12c0 1.56.37 3.04 1.04 4.31l3.24-2.53Z" fill="#FBBC05" />
      <path d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.28 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.71 5.39l3.24 2.53C7.3 7.91 9.46 6.19 12 6.19Z" fill="#EA4335" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" fill="#1877F2" r="10" />
      <path d="M13.5 20v-6.2h2.1l.4-2.4h-2.5V9.8c0-.7.34-1.2 1.25-1.2h1.35V6.45c-.24-.03-1.06-.1-2.02-.1-2 0-3.37 1.22-3.37 3.47v1.58H8.45v2.4h2.26V20h2.79Z" fill="white" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.7.8-3.5 2-1.5 2.5-.4 6.1 1.1 8.1.7 1 1.6 2.1 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 2-.9 2.7-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.2-2.8Z" />
      <path d="M15 6.6c.6-.8 1-1.9.9-2.9-.9 0-2 .6-2.7 1.3-.6.7-1.1 1.7-.9 2.7 1 0 2-.5 2.7-1.1Z" />
    </svg>
  );
}

function LineIcon() {
  return <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-bold tracking-[-.1em] text-[#08ae36]">LINE</span>;
}



export const registrationProviders = ["LINE", "Google", "Facebook", "Apple"] as const;
export type RegistrationProvider = typeof registrationProviders[number];
type RegistrationMethod = "choose" | "email" | RegistrationProvider;

function ProviderIcon({ provider }: { provider: RegistrationProvider }) {
  switch (provider) {
    case "LINE": return <LineIcon />;
    case "Google": return <GoogleIcon />;
    case "Facebook": return <FacebookIcon />;
    case "Apple": return <AppleIcon />;
  }
}

function BackIcon() {
  return <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24"><path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function ArnBookAccount() {
  return (
    <Link className={styles.arnbook} href="/login">
      <span className={styles.bookIcon}><BookIcon /></span>
      <span>
        <strong>สมาชิก ArnBook ใช้บัญชีเดิมได้เลย</strong>
        <span className={styles.arnbookDescription}>ใช้บัญชี ArnBook เดิมเข้าสู่ระบบ ArnSpace ได้ทันที ไม่ต้องสมัครใหม่</span>
        <span className={styles.arnbookAction}>เข้าสู่ระบบด้วยบัญชีเดิม <ArrowIcon /></span>
      </span>
    </Link>
  );
}

export default function Registration({ initialMethod = "choose" }: { initialMethod?: RegistrationMethod }) {
  const router = useRouter();
  const [method, setMethod] = useState<RegistrationMethod>(initialMethod);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const choosing = method === "choose";
  const socialProvider = method !== "choose" && method !== "email" ? method : null;

  const changeMethod = () => {
    setShowPassword(false);
    if (socialProvider) {
      router.push("/register");
      return;
    }
    setMethod("choose");
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const chooseEmail = () => {
    setMethod("email");
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    router.push("/login?registered=success");
  };

  return (
    <UnbuiltPageGuard>
      <main className="ds-page-shell min-h-screen pt-[82px]">
        <TopMenu fixed initialLoggedIn={false} />
        <section className={styles.shell}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image alt="" className="object-cover object-center" fill priority sizes="100vw" src="/images/promo-discover-v2.webp" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,11,7,.18)_0%,rgba(4,11,7,.25)_38%,rgba(3,14,9,.72)_68%,rgba(3,14,9,.96)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,9,6,.78)_0%,transparent_48%,rgba(3,9,6,.18)_100%)]" />
        </div>

        <div className="relative z-10 hidden min-h-0 overflow-hidden lg:block">
          <div className="absolute bottom-10 left-12 max-w-[390px]">
            <p className="text-[11px] font-medium uppercase tracking-[.42em] text-[#42e58a]">ARN SPACE</p>
            <h1 className="mt-3 text-[38px] font-semibold leading-[1.12] tracking-tight text-[#fff9e8]">&#xe40;&#xe23;&#xe34;&#xe48;&#xe21;&#xe15;&#xe49;&#xe19;&#xe40;&#xe23;&#xe37;&#xe48;&#xe2d;&#xe07;&#xe23;&#xe32;&#xe27;<br />&#xe43;&#xe19;&#xe41;&#xe1a;&#xe1a;&#xe02;&#xe2d;&#xe07;&#xe04;&#xe38;&#xe13;</h1>
            <div className="mt-4 h-px w-20 bg-[#16dc78]" />
            <p className="mt-4 text-[15px] leading-7 text-white/80">&#xe2d;&#xe48;&#xe32;&#xe19; &#xe40;&#xe02;&#xe35;&#xe22;&#xe19; &#xe41;&#xe1a;&#xe48;&#xe07;&#xe1b;&#xe31;&#xe19;<br />&#xe41;&#xe25;&#xe30;&#xe40;&#xe1b;&#xe47;&#xe19;&#xe2a;&#xe48;&#xe27;&#xe19;&#xe2b;&#xe19;&#xe36;&#xe48;&#xe07;&#xe02;&#xe2d;&#xe07;&#xe0a;&#xe38;&#xe21;&#xe0a;&#xe19;&#xe17;&#xe35;&#xe48;&#xe40;&#xe02;&#xe49;&#xe32;&#xe43;&#xe08;&#xe04;&#xe38;&#xe13;</p>
            <div className="mt-4 space-y-2 text-[12px] text-white/75">
              <p>&#x2315; &nbsp; &#xe04;&#xe49;&#xe19;&#xe1e;&#xe1a;&#xe40;&#xe23;&#xe37;&#xe48;&#xe2d;&#xe07;&#xe23;&#xe32;&#xe27;&#xe17;&#xe35;&#xe48;&#xe43;&#xe0a;&#xe48;</p>
              <p>&#x270e; &nbsp; &#xe2a;&#xe23;&#xe49;&#xe32;&#xe07;&#xe42;&#xe25;&#xe01;&#xe02;&#xe2d;&#xe07;&#xe04;&#xe38;&#xe13;&#xe40;&#xe2d;&#xe07;</p>
              <p>&#x2667; &nbsp; &#xe40;&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe21;&#xe15;&#xe48;&#xe2d;&#xe01;&#xe31;&#xe1a;&#xe19;&#xe31;&#xe01;&#xe2d;&#xe48;&#xe32;&#xe19;&#xe17;&#xe35;&#xe48;&#xe21;&#xe35;&#xe04;&#xe27;&#xe32;&#xe21;&#xe2a;&#xe19;&#xe43;&#xe08;&#xe40;&#xe14;&#xe35;&#xe22;&#xe27;&#xe01;&#xe31;&#xe19;</p>
            </div>
          </div>
        </div>


          <div className={styles.cardColumn}>
            <section aria-labelledby="registration-title" className={`ds-card ${styles.card}`}>
              <div className={styles.cardContent}>
                {choosing ? (
                  <>
                    <header className={styles.intro}>
                      <h2 id="registration-title" ref={headingRef} tabIndex={-1}>สมัครสมาชิก</h2>
                      <p>เริ่มต้นเรื่องราวของคุณกับ ArnSpace</p>
                    </header>
                    <div className={styles.socialGrid}>
                      {registrationProviders.map((provider) => (
                        <Link className={`ds-button-secondary ${styles.social}`} href={`/register/social?provider=${provider}`} key={provider}>
                          <ProviderIcon provider={provider} /><span>สมัครด้วย {provider}</span>
                        </Link>
                      ))}
                    </div>
                    <div className={styles.divider}><span />หรือ<span /></div>
                    <button className={`ds-button-secondary ${styles.emailChoice}`} onClick={chooseEmail} type="button">
                      <span><MailIcon />สมัครด้วยอีเมล</span><ArrowIcon />
                    </button>
                  </>
                ) : (
                  <>
                    <header className={styles.formHeader}>
                      <h2 id="registration-title" ref={headingRef} tabIndex={-1}>
                        <span className={styles.methodIcon}>{socialProvider ? <ProviderIcon provider={socialProvider} /> : <MailIcon />}</span>
                        สมัครด้วย{socialProvider ? ` ${socialProvider}` : "อีเมล"}
                      </h2>
                      <button className={styles.back} onClick={changeMethod} type="button"><BackIcon /><span>เปลี่ยนวิธีสมัคร</span></button>
                    </header>
                    {socialProvider && <p className={styles.providerNote}>เพิ่มชื่อผู้ใช้งานและอีเมลสำหรับบัญชี ArnSpace ของคุณ</p>}
                    <form className={styles.form} onSubmit={handleSubmit}>
                      <label className={styles.field}>
                        <span>ชื่อผู้ใช้งาน (Username)</span>
                        <span className={`ds-input ${styles.input}`}><UserIcon /><input autoComplete="username" maxLength={40} name="username" onChange={(event) => setUsername(event.target.value)} placeholder="เช่น artartzy" required type="text" value={username} /></span>
                        <small>ชื่อนี้จะแสดงบนโปรไฟล์ที่ผู้อื่นเห็น</small>
                      </label>
                      <label className={styles.field}>
                        <span>อีเมล</span>
                        <span className={`ds-input ${styles.input}`}><MailIcon /><input autoComplete="email" name="email" onChange={(event) => setEmail(event.target.value)} placeholder="example@gmail.com" required type="email" value={email} /></span>
                        {socialProvider && <small>ใช้อีเมลเดียวกับบัญชี {socialProvider} ของคุณ</small>}
                      </label>
                      {!socialProvider && <label className={styles.field}>
                        <span>รหัสผ่าน</span>
                        <span className={`ds-input ${styles.input}`}><LockIcon /><input autoComplete="new-password" minLength={8} name="password" onChange={(event) => setPassword(event.target.value)} placeholder="อย่างน้อย 8 ตัวอักษร" required type={showPassword ? "text" : "password"} value={password} /><button aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"} aria-pressed={showPassword} className={styles.eye} onClick={() => setShowPassword((visible) => !visible)} type="button"><EyeIcon visible={showPassword} /></button></span>
                      </label>}
                      <label className={styles.terms}><input checked={accepted} name="terms" onChange={(event) => setAccepted(event.target.checked)} required type="checkbox" /><span>ฉันยอมรับ <Link href="/terms">ข้อกำหนดการใช้งาน</Link> และ <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link></span></label>
                      <button className={`ds-button-primary ${styles.submit}`} disabled={submitting} type="submit"><span>{submitting ? "กำลังสมัครสมาชิก…" : "สมัครสมาชิก"}</span><ArrowIcon /></button>
                    </form>
                  </>
                )}
                {choosing && <ArnBookAccount />}
                <footer className={styles.footer}>มีบัญชีอยู่แล้ว? <Link href="/login">เข้าสู่ระบบ</Link></footer>
              </div>
            </section>
          </div>
        </section>
      </main>
    </UnbuiltPageGuard>
  );
}
