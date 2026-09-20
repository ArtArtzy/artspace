"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "@/components/TopMenu";

const providers = {
  LINE: { icon: "/images/auth/line.webp", label: "LINE", pillClass: "bg-[#08c95f] text-white" },
  Google: { icon: "/images/auth/google.webp", label: "Google", pillClass: "bg-white text-[#242424]" },
  Facebook: { icon: "/images/auth/facebook.webp", label: "Facebook", pillClass: "bg-[#0867dd] text-white" },
  Apple: { icon: "/images/auth/apple.webp", label: "Apple", pillClass: "bg-[#050505] text-white" },
} as const;

type ProviderName = keyof typeof providers;

function SocialIcon({ src }: { src: string }) {
  return <Image alt="" aria-hidden="true" className="h-7 w-7 object-contain" height={28} src={src} width={28} />;
}

function UserIcon() {
  return <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function MailIcon() {
  return <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"><rect height="14" rx="2" stroke="currentColor" strokeWidth="1.6" width="18" x="3" y="5" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function BackIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="m14 5-7 7 7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function DecorativeLeaves() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[150px] w-[145px] text-[#0b8c61]/[0.2]" fill="none" viewBox="0 0 145 150">
      <path d="M140 0c-11 25-32 35-58 49-28 16-42 34-51 63M117 18c-4 21 3 34 20 44M94 28c-13 14-14 29-6 44M70 48c-16 8-22 22-17 38" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
      <path d="M118 19c13 1 22 8 27 19-12 2-21-5-27-19ZM95 29c13 3 19 10 22 21-12 0-19-7-22-21ZM70 49c14 2 20 10 23 20-12 1-19-5-23-20ZM45 77c-11 0-20 6-25 16 11 3 20-3 25-16Z" fill="currentColor" />
    </svg>
  );
}

export default function SocialRegisterPage() {
  const router = useRouter();
  const [provider, setProvider] = useState<ProviderName>("Google");

  useEffect(() => {
    const queryProvider = new URLSearchParams(window.location.search).get("provider");
    if (queryProvider && queryProvider in providers) setProvider(queryProvider as ProviderName);
  }, []);

  const selectedProvider = providers[provider];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login?registered=success");
  };

  return (
    <main className="ds-page-shell h-screen overflow-hidden pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} />
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
          </div>
        </div>

        <div className="relative z-10 flex min-h-0 items-center justify-center overflow-hidden px-5 py-2 sm:px-10 sm:py-4 lg:px-12">
          <form className="ds-card relative h-[632px] w-full max-w-[440px] overflow-hidden px-7 py-4 sm:px-9 sm:py-4" onSubmit={handleSubmit}>
            <DecorativeLeaves />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0a7954] px-3 py-1.5 text-[10px] font-medium text-white/90">&#xe02;&#xe31;&#xe49;&#xe19;&#xe15;&#xe2d;&#xe19; 2 &#xe08;&#xe32;&#xe01; 2</span>
                <span aria-hidden="true" className="relative block h-3 w-20"><span className="absolute left-1.5 right-1.5 top-1.5 h-px bg-[#17df90]" /><span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-[#13e994] shadow-[0_0_10px_rgba(19,233,148,.55)]" /><span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-[#13e994] shadow-[0_0_10px_rgba(19,233,148,.55)]" /></span>
              </div>

              <div className="mt-5">
                <h2 className="text-[30px] font-semibold leading-none tracking-tight text-[#fffdf2]">&#xe40;&#xe1e;&#xe34;&#xe48;&#xe21;&#xe02;&#xe49;&#xe2d;&#xe21;&#xe39;&#xe25;&#xe40;&#xe1e;&#xe37;&#xe48;&#xe2d;&#xe40;&#xe23;&#xe34;&#xe48;&#xe21;&#xe43;&#xe0a;&#xe49;&#xe07;&#xe32;&#xe19;</h2>
                <p className="mt-2 text-[15px] leading-5 text-white/75">&#xe2d;&#xe35;&#xe01;&#xe40;&#xe1e;&#xe35;&#xe22;&#xe07;&#xe40;&#xe25;&#xe47;&#xe01;&#xe19;&#xe49;&#xe2d;&#xe22; &#xe01;&#xe47;&#xe1e;&#xe23;&#xe49;&#xe2d;&#xe21;&#xe40;&#xe1b;&#xe47;&#xe19;&#xe2a;&#xe48;&#xe27;&#xe19;&#xe2b;&#xe19;&#xe36;&#xe48;&#xe07;&#xe02;&#xe2d;&#xe07; ArnSpace</p>
              </div>

              <div className="ds-input mt-5 flex h-14 items-center justify-between px-3 text-[12px] text-white/75">
                <span>&#xe40;&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe21;&#xe15;&#xe48;&#xe2d;&#xe41;&#xe25;&#xe49;&#xe27;&#xe14;&#xe49;&#xe27;&#xe22;</span>
                <span className={`flex h-10 items-center gap-2 rounded-full px-3 text-[12px] font-semibold ${selectedProvider.pillClass}`}><SocialIcon src={selectedProvider.icon} />{selectedProvider.label}<span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#08d982] text-[14px] font-bold text-[#03120b]">&#x2713;</span></span>
              </div>

              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="block text-[12px] font-medium leading-4 text-white/85">&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe17;&#xe35;&#xe48;&#xe41;&#xe2a;&#xe14;&#xe07;</span>
                  <span className="mt-1 flex h-11 items-center gap-3 rounded-[8px] border border-[#216554] bg-[#09271e] px-3 text-white/65 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><UserIcon /><input aria-label="&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe17;&#xe35;&#xe48;&#xe41;&#xe2a;&#xe14;&#xe07;" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="&#xe40;&#xe0a;&#xe48;&#xe19; &#xe19;&#xe32;&#xe21;&#xe1b;&#xe32;&#xe01;&#xe01;&#xe32; &#xe2b;&#xe23;&#xe37;&#xe2d;&#xe0a;&#xe37;&#xe48;&#xe2d;&#xe40;&#xe25;&#xe48;&#xe19;" required type="text" /></span>
                </label>
                <label className="block">
                  <span className="block text-[12px] font-medium leading-4 text-white/85">&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;</span>
                  <span className="ds-input mt-1 flex h-11 items-center gap-3 px-3 text-white/65 focus-within:text-[#36e98a]"><MailIcon /><input aria-label="&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;" autoComplete="email" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/40" placeholder="example@gmail.com" required type="email" /><span className="flex shrink-0 items-center gap-1 rounded-full bg-[#19372d] px-2 py-1 text-[10px] text-white/75"><span aria-hidden="true">&#x1f512;</span>&#xe21;&#xe32;&#xe08;&#xe32;&#xe01; {selectedProvider.label}</span></span>
                </label>
              </div>

              <label className="mt-4 flex items-start gap-2 text-[10px] leading-4 text-white/75"><input className="mt-0.5 h-4 w-4 shrink-0 accent-[#15d875]" required type="checkbox" /><span>&#xe09;&#xe31;&#xe19;&#xe22;&#xe2d;&#xe21;&#xe23;&#xe31;&#xe1a; <a className="font-medium text-[#20e987] hover:text-white" href="/community">&#xe02;&#xe49;&#xe2d;&#xe01;&#xe33;&#xe2b;&#xe19;&#xe14;&#xe01;&#xe32;&#xe23;&#xe43;&#xe0a;&#xe49;&#xe07;&#xe32;&#xe19;</a> &#xe41;&#xe25;&#xe30; <a className="font-medium text-[#20e987] hover:text-white" href="/community">&#xe19;&#xe42;&#xe22;&#xe1a;&#xe32;&#xe22;&#xe04;&#xe27;&#xe32;&#xe21;&#xe40;&#xe1b;&#xe47;&#xe19;&#xe2a;&#xe48;&#xe27;&#xe19;&#xe15;&#xe31;&#xe27;</a> <span className="whitespace-nowrap">&#xe02;&#xe2d;&#xe07; ArnSpace</span></span></label>
              <button className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-[8px] bg-[#08e394] text-[14px] font-semibold text-[#03120b] transition hover:bg-[#35eba0]" type="submit">&#xe2a;&#xe23;&#xe49;&#xe32;&#xe07;&#xe1a;&#xe31;&#xe0d;&#xe0a;&#xe35;&#xe41;&#xe25;&#xe30;&#xe40;&#xe23;&#xe34;&#xe48;&#xe21;&#xe15;&#xe49;&#xe19;&#xe43;&#xe0a;&#xe49;&#xe07;&#xe32;&#xe19; <ArrowIcon /></button>

              <div className="my-5 flex items-center gap-3 text-[12px] text-white/65"><span className="h-px flex-1 bg-white/[0.18]" /><a className="flex items-center gap-1 hover:text-white" href="/register"><BackIcon />&#xe22;&#xe49;&#xe2d;&#xe19;&#xe01;&#xe25;&#xe31;&#xe1a;</a><span className="h-px flex-1 bg-white/[0.18]" /></div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
