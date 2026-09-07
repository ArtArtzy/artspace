"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "@/components/TopMenu";

function UserIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><rect height="14" rx="2" stroke="currentColor" strokeWidth="1.6" width="18" x="3" y="5" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function LockIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><rect height="10" rx="2" stroke="currentColor" strokeWidth="1.6" width="15" x="4.5" y="10" /><path d="M8 10V7.8a4 4 0 0 1 8 0V10M12 14v2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function CalendarIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><rect height="16" rx="2" stroke="currentColor" strokeWidth="1.6" width="17" x="3.5" y="5" /><path d="M7 3.5v3M17 3.5v3M3.5 9h17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M2.8 12s3.25-5.2 9.2-5.2 9.2 5.2 9.2 5.2-3.25 5.2-9.2 5.2S2.8 12 2.8 12Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" /></svg> : <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="m3.5 3.5 17 17M9.8 6.9A9.8 9.8 0 0 1 12 6.7c5.95 0 9.2 5.3 9.2 5.3a17 17 0 0 1-3.05 3.45M6.2 8.55C3.95 10.05 2.8 12 2.8 12S6.05 17.3 12 17.3c.9 0 1.73-.13 2.5-.35" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function GoogleIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24"><path d="M21.35 12.27c0-.77-.07-1.51-.22-2.22H12v4.2h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.37Z" fill="#4285F4" /><path d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.7Z" fill="#34A853" /><path d="M6.53 13.78A5.85 5.85 0 0 1 6.22 12c0-.62.11-1.22.31-1.78V7.69H3.29A9.74 9.74 0 0 0 2.25 12c0 1.56.37 3.04 1.04 4.31l3.24-2.53Z" fill="#FBBC05" /><path d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.28 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.71 5.39l3.24 2.53C7.3 7.91 9.46 6.19 12 6.19Z" fill="#EA4335" /></svg>;
}

function FacebookIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" fill="#1877F2" r="10" /><path d="M13.5 20v-6.2h2.1l.4-2.4h-2.5V9.8c0-.7.34-1.2 1.25-1.2h1.35V6.45c-.24-.03-1.06-.1-2.02-.1-2 0-3.37 1.22-3.37 3.47v1.58H8.45v2.4h2.26V20h2.79Z" fill="white" /></svg>;
}

function AppleIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.7.8-3.5 2-1.5 2.5-.4 6.1 1.1 8.1.7 1 1.6 2.1 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 2-.9 2.7-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.2-2.8Z" /><path d="M15 6.6c.6-.8 1-1.9.9-2.9-.9 0-2 .6-2.7 1.3-.6.7-1.1 1.7-.9 2.7 1 0 2-.5 2.7-1.1Z" /></svg>;
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationNotice, setRegistrationNotice] = useState(false);

  const mockRegister = () => {
    if (registrationNotice) return;
    setRegistrationNotice(true);
    window.setTimeout(() => router.push("/login?registered=success"), 900);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mockRegister();
  };

  return (
    <main className="h-screen overflow-hidden bg-[#07100c] pt-[82px] text-white">
      <TopMenu fixed initialLoggedIn={false} />
      {registrationNotice && <div aria-live="polite" className="fixed right-6 top-[102px] z-[60] flex items-center gap-3 rounded-[9px] border border-[#22df7d]/40 bg-[#10281b]/95 px-4 py-3 text-[13px] font-medium text-[#72f5a9] shadow-[0_12px_35px_rgba(0,0,0,.45)]" role="status"><span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#17cf70] text-[12px] font-bold text-[#06100a]">✓</span>สมัครสมาชิกสำเร็จ</div>}
      <section className="mx-auto grid h-[calc(100vh-82px)] min-h-0 w-full max-w-[1400px] grid-cols-1 lg:grid-cols-[1.08fr_.92fr]">
        <div className="relative hidden min-h-0 overflow-hidden lg:block">
          <Image alt="พื้นที่สำหรับสร้างเรื่องราว" className="object-cover object-center" fill priority sizes="55vw" src="/images/promo-discover-v2.webp" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,11,7,.2)_0%,rgba(4,11,7,.16)_45%,rgba(4,11,7,.8)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,9,6,.86)_0%,transparent_48%,rgba(3,9,6,.16)_100%)]" />
          <div className="absolute bottom-10 left-12 max-w-[390px]">
            <p className="text-[11px] font-medium uppercase tracking-[.42em] text-[#42e58a]">ARN SPACE</p>
            <h1 className="mt-3 text-[38px] font-semibold leading-[1.12] tracking-tight text-[#fff9e8]">เริ่มต้นเรื่องราว<br />ในแบบของคุณ</h1>
            <div className="mt-4 h-px w-20 bg-[#16dc78]" />
            <p className="mt-4 text-[15px] leading-7 text-white/80">อ่าน เขียน แบ่งปัน<br />และเป็นส่วนหนึ่งของชุมชนที่เข้าใจคุณ</p>
            <div className="mt-4 space-y-2 text-[12px] text-white/75">
              <p>⌕ &nbsp; ค้นพบเรื่องราวที่ใช่</p>
              <p>✎ &nbsp; สร้างโลกของคุณเอง</p>
              <p>♧ &nbsp; เชื่อมต่อกับนักอ่านที่มีความสนใจเดียวกัน</p>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-hidden px-5 py-2 sm:px-10 sm:py-4 lg:px-12">
          <form className="w-full max-w-[440px] rounded-[14px] border border-[#214738] bg-[#0d1914]/95 px-7 py-3 shadow-[0_18px_55px_rgba(0,0,0,.3)] sm:px-9 sm:py-4" onSubmit={handleSubmit}>
            <div className="text-center">
              <h2 className="text-[27px] font-semibold tracking-tight">สมัครสมาชิก</h2>
              <p className="mt-1 text-[12px] leading-5 text-white/55">เริ่มต้นเส้นทางการอ่านและการเขียนของคุณกับ ArnSpace<br />สร้างบัญชีใหม่ ใช้งานฟรี ไม่มีค่าใช้จ่าย</p>
            </div>

            <div className="mt-3 space-y-2">
              <label className="flex h-9 items-center gap-3 rounded-[8px] border border-[#214037] bg-[#12201a] px-3 text-white/45 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><UserIcon /><input aria-label="ชื่อผู้ใช้" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="ชื่อผู้ใช้" required type="text" /></label>
              <p className="-mt-1 px-1 text-[9px] text-white/35">ใช้สำหรับแสดงต่อสาธารณะ (3–20 ตัวอักษร)</p>
              <label className="flex h-9 items-center gap-3 rounded-[8px] border border-[#214037] bg-[#12201a] px-3 text-white/45 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><MailIcon /><input aria-label="อีเมล" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="อีเมล" required type="email" /></label>
              <p className="-mt-1 px-1 text-[9px] text-white/35">ใช้สำหรับเข้าสู่ระบบและรับการแจ้งเตือน</p>
              <label className="flex h-9 items-center gap-3 rounded-[8px] border border-[#214037] bg-[#12201a] px-3 text-white/45 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><LockIcon /><input aria-label="รหัสผ่าน" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="รหัสผ่าน" required type={showPassword ? "text" : "password"} /><button aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"} className="transition hover:text-white" onClick={() => setShowPassword((visible) => !visible)} type="button"><EyeIcon visible={showPassword} /></button></label>
              <p className="-mt-1 px-1 text-[9px] text-white/35">อย่างน้อย 8 ตัวอักษร (ตัวพิมพ์, ตัวเลข หรือสัญลักษณ์)</p>
              <label className="flex h-9 items-center gap-3 rounded-[8px] border border-[#214037] bg-[#12201a] px-3 text-white/45 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><LockIcon /><input aria-label="ยืนยันรหัสผ่าน" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="ยืนยันรหัสผ่าน" required type={showConfirmPassword ? "text" : "password"} /><button aria-label={showConfirmPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"} className="transition hover:text-white" onClick={() => setShowConfirmPassword((visible) => !visible)} type="button"><EyeIcon visible={showConfirmPassword} /></button></label>
              <label className="flex h-9 items-center gap-3 rounded-[8px] border border-[#214037] bg-[#12201a] px-3 text-white/45 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><CalendarIcon /><input aria-label="วัน เดือน ปีเกิด" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="วัน/เดือน/ปีเกิด" required type="text" /></label>
              <p className="-mt-1 px-1 text-[9px] text-white/35">เพื่อประสบการณ์ที่เหมาะสมกับคุณ</p>
            </div>

            <label className="mt-3 flex items-start gap-2 text-[10px] leading-5 text-white/55"><input className="mt-1 h-3.5 w-3.5 accent-[#15d875]" required type="checkbox" /><span>ฉันยอมรับ <a className="text-[#2ee77b] hover:text-white" href="/community">ข้อกำหนดการใช้งาน</a> และ <a className="text-[#2ee77b] hover:text-white" href="/community">นโยบายความเป็นส่วนตัว</a> ของ ArnSpace</span></label>
            <button className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-[8px] bg-[#10c96a] text-[13px] font-semibold text-[#06100a] transition hover:bg-[#34ea88]" onClick={mockRegister} type="submit">สมัครสมาชิก <ArrowIcon /></button>

            <div className="my-3 flex items-center gap-3 text-[10px] text-white/35"><span className="h-px flex-1 bg-white/[0.1]" />หรือสมัครด้วย<span className="h-px flex-1 bg-white/[0.1]" /></div>
            <div className="grid grid-cols-3 gap-2">
              <button className="flex h-8 items-center justify-center gap-2 rounded-[7px] border border-white/20 bg-white text-[11px] font-semibold text-[#242424] transition hover:bg-white/85" onClick={mockRegister} type="button"><GoogleIcon />Google</button>
              <button className="flex h-8 items-center justify-center gap-2 rounded-[7px] border border-white/20 bg-[#183257] text-[11px] font-semibold text-white transition hover:bg-[#244878]" onClick={mockRegister} type="button"><FacebookIcon />Facebook</button>
              <button className="flex h-8 items-center justify-center gap-2 rounded-[7px] border border-white/35 bg-transparent text-[11px] font-semibold text-white transition hover:bg-white/[0.08]" onClick={mockRegister} type="button"><AppleIcon />Apple</button>
            </div>

            <p className="mt-3 text-center text-[11px] text-white/50">มีบัญชีอยู่แล้ว? <a className="font-semibold text-[#2ee77b] hover:text-white" href="/login">เข้าสู่ระบบ</a></p>
          </form>
        </div>
      </section>
    </main>
  );
}
