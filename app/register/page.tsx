"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";

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
  return <SocialIcon src="/images/auth/apple.webp" />;
}


function LineIcon() {
  return <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-bold tracking-[-.1em] text-[#08ae36]">LINE</span>;
}

function SocialIcon({ src }: { src: string }) {
  return <Image alt="" aria-hidden="true" className="h-7 w-7 object-contain" height={28} src={src} width={28} />;
}

function RegisterLeaves() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[150px] w-[145px] text-[#0b8c61]/[0.2]" fill="none" viewBox="0 0 145 150">
      <path d="M140 0c-11 25-32 35-58 49-28 16-42 34-51 63M117 18c-4 21 3 34 20 44M94 28c-13 14-14 29-6 44M70 48c-16 8-22 22-17 38" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
      <path d="M118 19c13 1 22 8 27 19-12 2-21-5-27-19ZM95 29c13 3 19 10 22 21-12 0-19-7-22-21ZM70 49c14 2 20 10 23 20-12 1-19-5-23-20ZM45 77c-11 0-20 6-25 16 11 3 20-3 25-16Z" fill="currentColor" />
    </svg>
  );
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

  const handleSocialRegister = (provider: string) => {
    router.push(`/register/social?provider=${encodeURIComponent(provider)}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mockRegister();
  };

  return (
    <UnbuiltPageGuard>
      <main className="ds-page-shell h-screen overflow-hidden pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} />
      {registrationNotice && <div aria-live="polite" className="fixed right-6 top-[102px] z-[60] flex items-center gap-3 rounded-[9px] border border-[#22df7d]/40 bg-[#10281b]/95 px-4 py-3 text-[13px] font-medium text-[#72f5a9] shadow-[0_12px_35px_rgba(0,0,0,.45)]" role="status"><span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[#17cf70] text-[12px] font-bold text-[#06100a]">&#x2713;</span>&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe2a;&#xe21;&#xe32;&#xe0a;&#xe34;&#xe01;&#xe2a;&#xe33;&#xe40;&#xe23;&#xe47;&#xe08;</div>}
      <section className="relative mx-auto grid h-[calc(100vh-82px)] min-h-0 w-full max-w-[1400px] grid-cols-1 overflow-hidden lg:grid-cols-[1.08fr_.92fr]">
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

        <div className="relative z-10 flex min-h-0 items-center justify-center overflow-hidden px-5 py-2 sm:px-10 sm:py-4 lg:px-12">

          <form className="ds-card relative h-[632px] w-full max-w-[440px] overflow-hidden px-7 py-4 sm:px-9 sm:py-4" onSubmit={handleSubmit}>
            <RegisterLeaves />
            <div className="relative z-10">
              <div>
                <h2 className="text-center text-[32px] font-semibold leading-none tracking-tight text-[#fffdf2]">&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe2a;&#xe21;&#xe32;&#xe0a;&#xe34;&#xe01;</h2>
                <p className="mt-2 text-center text-[16px] leading-5 text-white/90">&#xe22;&#xe34;&#xe19;&#xe14;&#xe35;&#xe15;&#xe49;&#xe2d;&#xe19;&#xe23;&#xe31;&#xe1a;&#xe2a;&#xe39;&#xe48; ArnSpace</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button className="flex h-10 items-center justify-center gap-2 rounded-[7px] border border-[#38f58e]/60 bg-[#08c95f] text-[12px] font-semibold text-white transition hover:bg-[#16df70]" onClick={() => handleSocialRegister("LINE")} type="button"><SocialIcon src="/images/auth/line.webp" />&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe14;&#xe49;&#xe27;&#xe22; LINE</button>
                <button className="flex h-10 items-center justify-center gap-2 rounded-[7px] border border-[#d8d8d8] bg-white text-[12px] font-semibold text-[#242424] transition hover:bg-white/85" onClick={() => handleSocialRegister("Google")} type="button"><SocialIcon src="/images/auth/google.webp" />&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe14;&#xe49;&#xe27;&#xe22; Google</button>
                <button className="flex h-10 items-center justify-center gap-2 rounded-[7px] border border-[#5da0ff]/70 bg-[#0867dd] text-[12px] font-semibold text-white transition hover:bg-[#1b79eb]" onClick={() => handleSocialRegister("Facebook")} type="button"><SocialIcon src="/images/auth/facebook.webp" />&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe14;&#xe49;&#xe27;&#xe22; Facebook</button>
                <button className="flex h-10 items-center justify-center gap-2 rounded-[7px] border border-white/40 bg-[#050505] text-[12px] font-semibold text-white transition hover:bg-white/[0.08]" onClick={() => handleSocialRegister("Apple")} type="button"><AppleIcon />&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe14;&#xe49;&#xe27;&#xe22; Apple</button>
              </div>

              <div className="my-3 flex items-center gap-3 text-[10px] text-white/55"><span className="h-px flex-1 bg-white/[0.18]" />&#xe2b;&#xe23;&#xe37;&#xe2d;&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe14;&#xe49;&#xe27;&#xe22;&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;<span className="h-px flex-1 bg-white/[0.18]" /></div>

              <div className="space-y-2.5">
                <label className="block">
                  <span className="block text-[12px] font-medium leading-4 text-white/85">&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe17;&#xe35;&#xe48;&#xe41;&#xe2a;&#xe14;&#xe07;</span>
                  <span className="mt-1 flex h-10 items-center gap-3 rounded-[8px] border border-[#216554] bg-[#09271e] px-3 text-white/65 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><UserIcon /><input aria-label="&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe17;&#xe35;&#xe48;&#xe41;&#xe2a;&#xe14;&#xe07;" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="&#xe40;&#xe0a;&#xe48;&#xe19; &#xe19;&#xe32;&#xe21;&#xe1b;&#xe32;&#xe01;&#xe01;&#xe32; &#xe2b;&#xe23;&#xe37;&#xe2d;&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe40;&#xe25;&#xe48;&#xe19;" required type="text" /></span>
                </label>
                <label className="block">
                  <span className="block text-[12px] font-medium leading-4 text-white/85">&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;</span>
                  <span className="mt-1 flex h-10 items-center gap-3 rounded-[8px] border border-[#216554] bg-[#09271e] px-3 text-white/65 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><MailIcon /><input aria-label="&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;" autoComplete="email" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="example@gmail.com" required type="email" /></span>
                </label>
                <label className="block">
                  <span className="block text-[12px] font-medium leading-4 text-white/85">&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;</span>
                  <span className="mt-1 flex h-10 items-center gap-3 rounded-[8px] border border-[#216554] bg-[#09271e] px-3 text-white/65 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><LockIcon /><input aria-label="&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;" autoComplete="new-password" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="&#xe2d;&#xe22;&#xe48;&#xe32;&#xe07;&#xe19;&#xe49;&#xe2d;&#xe22; 8 &#xe15;&#xe31;&#xe27;&#xe2d;&#xe31;&#xe01;&#xe29;&#xe23;" required type={showPassword ? "text" : "password"} /><button aria-label={showPassword ? "\u0e0b\u0e48\u0e2d\u0e19\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19" : "\u0e41\u0e2a\u0e14\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19"} className="transition hover:text-white" onClick={() => setShowPassword((visible) => !visible)} type="button"><EyeIcon visible={showPassword} /></button></span>
                </label>
                <label className="block">
                  <span className="block text-[12px] font-medium leading-4 text-white/85">&#xe22;&#xe37;&#xe19;&#xe22;&#xe31;&#xe19;&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;</span>
                  <span className="mt-1 flex h-10 items-center gap-3 rounded-[8px] border border-[#216554] bg-[#09271e] px-3 text-white/65 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><LockIcon /><input aria-label="&#xe22;&#xe37;&#xe19;&#xe22;&#xe31;&#xe19;&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;" autoComplete="new-password" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="&#xe01;&#xe23;&#xe2d;&#xe01;&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;&#xe2d;&#xe35;&#xe01;&#xe04;&#xe23;&#xe31;&#xe49;&#xe07;" required type={showConfirmPassword ? "text" : "password"} /><button aria-label={showConfirmPassword ? "\u0e0b\u0e48\u0e2d\u0e19\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19" : "\u0e41\u0e2a\u0e14\u0e07\u0e23\u0e2b\u0e31\u0e2a\u0e1c\u0e48\u0e32\u0e19"} className="transition hover:text-white" onClick={() => setShowConfirmPassword((visible) => !visible)} type="button"><EyeIcon visible={showConfirmPassword} /></button></span>
                </label>
              </div>

              <label className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-white/75"><input className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#15d875]" required type="checkbox" /><span>&#xe09;&#xe31;&#xe19;&#xe22;&#xe2d;&#xe21;&#xe23;&#xe31;&#xe1a; <a className="font-medium text-[#20e987] hover:text-white" href="/terms">&#xe02;&#xe49;&#xe2d;&#xe01;&#xe33;&#xe2b;&#xe19;&#xe14;&#xe01;&#xe32;&#xe23;&#xe43;&#xe0a;&#xe49;&#xe07;&#xe32;&#xe19;</a> &#xe41;&#xe25;&#xe30; <a className="font-medium text-[#20e987] hover:text-white" href="/privacy">&#xe19;&#xe42;&#xe22;&#xe1a;&#xe32;&#xe22;&#xe04;&#xe27;&#xe32;&#xe21;&#xe40;&#xe1b;&#xe47;&#xe19;&#xe2a;&#xe48;&#xe27;&#xe19;&#xe15;&#xe31;&#xe27;</a> <span className="whitespace-nowrap">&#xe02;&#xe2d;&#xe07; ArnSpace</span></span></label>
              <button className="mt-3 flex h-11 w-full items-center justify-center gap-3 rounded-[8px] bg-[#08e394] text-[14px] font-semibold text-[#03120b] transition hover:bg-[#35eba0]" onClick={mockRegister} type="submit">&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;&#xe2a;&#xe21;&#xe32;&#xe0a;&#xe34;&#xe01; <ArrowIcon /></button>
              <p className="mt-4 text-center text-[11px] text-white/60">&#xe21;&#xe35;&#xe1a;&#xe31;&#xe0d;&#xe0a;&#xe35;&#xe2d;&#xe22;&#xe39;&#xe48;&#xe41;&#xe25;&#xe49;&#xe27;? <a className="font-semibold text-[#20e987] hover:text-white" href="/login">&#xe40;&#xe02;&#xe49;&#xe32;&#xe2a;&#xe39;&#xe48;&#xe23;&#xe30;&#xe1a;&#xe1a;</a></p>
            </div>
          </form>
        </div>
      </section>
      </main>
    </UnbuiltPageGuard>
  );
}
