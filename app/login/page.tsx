"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import styles from './Login.module.css';

const authStorageKey = "arnspace-authenticated";

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <rect height="14" rx="2" stroke="currentColor" strokeWidth="1.6" width="18" x="3" y="5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <rect height="10" rx="2" stroke="currentColor" strokeWidth="1.6" width="15" x="4.5" y="10" />
      <path d="M8 10V7.8a4 4 0 0 1 8 0V10M12 14v2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path d="M2.8 12s3.25-5.2 9.2-5.2 9.2 5.2 9.2 5.2-3.25 5.2-9.2 5.2S2.8 12 2.8 12Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path d="m3.5 3.5 17 17M9.8 6.9A9.8 9.8 0 0 1 12 6.7c5.95 0 9.2 5.3 9.2 5.3a17 17 0 0 1-3.05 3.45M6.2 8.55C3.95 10.05 2.8 12 2.8 12S6.05 17.3 12 17.3c.9 0 1.73-.13 2.5-.35" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
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

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationNotice, setRegistrationNotice] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("registered") !== "success") return;
    setRegistrationNotice(true);
    const timer = window.setTimeout(() => setRegistrationNotice(false), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  const mockLogin = () => {
    window.localStorage.setItem(authStorageKey, "true");
    router.push("/");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mockLogin();
  };

  return (
    <UnbuiltPageGuard>
      <main className="login-page ds-page-shell h-screen overflow-hidden pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} />

      {registrationNotice && (
        <div aria-live="polite" className="fixed right-6 top-[102px] z-50 flex items-center gap-3 rounded-[9px] border border-[#22df7d]/40 bg-[#10281b]/95 px-4 py-3 text-[13px] font-medium text-[#72f5a9] shadow-[0_12px_35px_rgba(0,0,0,.45)]" role="status">
          <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#17cf70] text-[12px] font-bold text-[#06100a]">&#x2713;</span>
          &#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe2a;&#xe21;&#xe32;&#xe0a;&#xe34;&#xe01;&#xe2a;&#xe33;&#xe40;&#xe23;&#xe47;&#xe08;
        </div>
      )}

      <section className="relative mx-auto grid h-[calc(100vh-82px)] min-h-0 w-full max-w-[1400px] grid-cols-1 overflow-hidden lg:grid-cols-[1.08fr_.92fr]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Image alt="" className="object-cover object-center" fill priority sizes="100vw" src="/images/promo-discover-v2.webp" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,11,7,.18)_0%,rgba(4,11,7,.25)_38%,rgba(3,14,9,.72)_68%,rgba(3,14,9,.96)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,9,6,.78)_0%,transparent_48%,rgba(3,9,6,.18)_100%)]" />
        </div>

        <div className="relative z-10 hidden min-h-0 overflow-hidden lg:block">

          <div className="absolute bottom-10 left-10 max-w-[320px] xl:left-14">
            <p className="text-[11px] font-medium uppercase tracking-[.45em] text-[#10dd83]">ARN SPACE</p>
            <h1 className="mt-3 text-[33px] font-semibold leading-[1.17] tracking-tight text-[#fffbed] xl:text-[38px]">&#xe40;&#xe23;&#xe37;&#xe48;&#xe2d;&#xe07;&#xe23;&#xe32;&#xe27;&#xe14;&#xe35; &#xe46;<br />&#xe23;&#xe2d;&#xe43;&#xe2b;&#xe49;&#xe04;&#xe38;&#xe13;&#xe04;&#xe49;&#xe19;&#xe1e;&#xe1a;</h1>
            <p className="mt-4 text-[14px] leading-7 text-white/80">&#xe2b;&#xe19;&#xe31;&#xe07;&#xe2a;&#xe37;&#xe2d; &#xe1c;&#xe39;&#xe49;&#xe04;&#xe19; &#xe41;&#xe25;&#xe30;&#xe41;&#xe23;&#xe07;&#xe1a;&#xe31;&#xe19;&#xe14;&#xe32;&#xe25;&#xe43;&#xe08;<br />&#xe04;&#xe37;&#xe2d;&#xe08;&#xe38;&#xe14;&#xe40;&#xe23;&#xe34;&#xe48;&#xe21;&#xe15;&#xe49;&#xe19;&#xe02;&#xe2d;&#xe07;&#xe2a;&#xe34;&#xe48;&#xe07;&#xe17;&#xe35;&#xe48;&#xe14;&#xe35;&#xe01;&#xe27;&#xe48;&#xe32;&#xe40;&#xe2a;&#xe21;&#xe2d;</p>
            <div className="mt-6 h-px w-[78px] bg-[#14dd82]" />
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[.33em] text-white/80">A COMMUNITY FOR<br />A BRIGHTER TOMORROW</p>
          </div>
        </div>

        <div className="relative z-10 flex min-h-0 items-center justify-center overflow-hidden px-5 py-2 sm:px-10 sm:py-4 lg:px-12">
          <form className={`ds-card ${styles.form}`} onSubmit={handleSubmit}>
            <div className="text-center">
              <h2 className={styles.title}>เข้าสู่ระบบ</h2>
              <p className={styles.intro}>ยินดีต้อนรับกลับสู่ ArnSpace<br />ใช้บัญชีของคุณเพื่อเข้าสู่โลกแห่งเรื่องราว</p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="space-y-1">
                <label className="ds-input flex h-9 items-center gap-3 px-3 text-white/75 focus-within:text-[#36e98a]">
                  <MailIcon />
                  <input aria-label="ชื่อผู้ใช้งาน" autoComplete="username" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="ชื่อผู้ใช้งาน" required type="text" />
                </label>
                <p className="px-1 text-[11px] leading-4 text-white/55">สามารถใช้บัญชี ArnSpace หรือ ArnBook เพื่อเข้าสู่ระบบได้</p>
              </div>
              <label className="ds-input flex h-9 items-center gap-3 px-3 text-white/75 focus-within:text-[#36e98a]">
                <LockIcon />
                <input aria-label="&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;" autoComplete="current-password" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;" required type={showPassword ? "text" : "password"} />
                <button aria-label={showPassword ? "\u0e0b\u0e48\u0e2d\u0e19\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19" : "\u0e41\u0e2a\u0e14\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19"} className="transition hover:text-white" onClick={() => setShowPassword((visible) => !visible)} type="button"><EyeIcon visible={showPassword} /></button>
              </label>
            </div>

            <div className="mt-2 text-right"><a className="text-[11px] font-medium text-[#20e383] transition hover:text-white" href="/login/forgot-password">&#xe25;&#xe37;&#xe21;&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;?</a></div>
            <button className={`ds-button-primary ${styles.submit}`} type="submit">เข้าสู่ระบบ <ArrowIcon /></button>

            <div className={styles.divider}><span />หรือเข้าสู่ระบบด้วย<span /></div>
            <div className="grid grid-cols-2 gap-2">
              <button className={styles.social} onClick={mockLogin} type="button"><LineIcon />LINE</button>
              <button className={styles.social} onClick={mockLogin} type="button"><GoogleIcon />Google</button>
              <button className={styles.social} onClick={mockLogin} type="button"><FacebookIcon />Facebook</button>
              <button className={styles.social} onClick={mockLogin} type="button"><AppleIcon />Apple</button>
            </div>

            <p className={styles.register}>ยังไม่มีบัญชีใช่ไหม? <a href="/register">สมัครสมาชิก</a></p>
          </form>
        </div>
      </section>
      </main>
    </UnbuiltPageGuard>
  );
}
