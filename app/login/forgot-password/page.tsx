"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import TopMenu from "@/components/TopMenu";

function MailIcon() {
  return <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24"><rect height="14" rx="2" stroke="currentColor" strokeWidth="1.6" width="18" x="3" y="5" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function BackIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="m14 5-7 7 7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function ResetIcon() {
  return <svg aria-hidden="true" className="h-12 w-12 text-[#16e994]" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" stroke="currentColor" strokeOpacity=".28" /><path d="M13 18v-4.5a7 7 0 0 1 14 0V18M10 17.5h20v14H10z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /><circle cx="20" cy="24" fill="currentColor" r="1.6" /></svg>;
}

function DecorativeLeaves() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[250px] w-[220px] text-[#0b8c61]/[0.18]" fill="none" viewBox="0 0 220 250">
      <path d="M214 0c-16 42-50 53-88 70-44 20-67 53-79 104M177 30c-5 29 5 46 30 60M143 47c-18 22-18 43-7 64M105 74c-23 11-32 32-25 56M69 111c-18 0-31 12-39 30M187 94c-6 20-1 38 15 52" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M179 32c19 2 33 13 41 30-18 2-31-8-41-30ZM144 48c18 4 28 15 32 31-17 0-28-10-32-31ZM105 76c19 3 29 14 33 29-17 2-28-8-33-29ZM70 113c16 4 24 15 25 29-15-1-24-11-25-29ZM43 142c-16 0-29 9-37 23 16 4 29-5 37-23Z" fill="currentColor" />
    </svg>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="h-screen overflow-hidden bg-[#07100c] pt-[82px] text-white">
      <TopMenu fixed initialLoggedIn={false} />
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
          <form className="relative h-[632px] w-full max-w-[440px] rounded-[14px] border border-[#214738] bg-[#0d1914]/95 px-7 py-4 shadow-[0_20px_70px_rgba(0,0,0,.4)] sm:px-9 sm:py-4" onSubmit={handleSubmit}>
            <DecorativeLeaves />
            <div className="relative z-10 flex h-full flex-col">
              <div className="text-center">
                <div className="mb-4 flex justify-center"><ResetIcon /></div>
                <h2 className="text-[30px] font-semibold leading-none tracking-tight text-[#fffdf2]">&#xe25;&#xe37;&#xe21;&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;?</h2>
                <p className="mt-3 text-[14px] leading-6 text-white/70">&#xe01;&#xe23;&#xe2d;&#xe01;&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;&#xe17;&#xe35;&#xe48;&#xe43;&#xe0a;&#xe49;&#xe2a;&#xe21;&#xe31;&#xe04;&#xe23;<br />&#xe41;&#xe25;&#xe49;&#xe27;&#xe40;&#xe23;&#xe32;&#xe08;&#xe30;&#xe2a;&#xe48;&#xe07;&#xe25;&#xe34;&#xe07;&#xe01;&#xe4c;&#xe2a;&#xe33;&#xe2b;&#xe23;&#xe31;&#xe1a;&#xe15;&#xe31;&#xe49;&#xe07;&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19;&#xe43;&#xe2b;&#xe21;&#xe48;&#xe43;&#xe2b;&#xe49;&#xe04;&#xe38;&#xe13;</p>
              </div>

              <div className="mt-7">
                  <span className="mt-2 flex h-11 items-center gap-3 rounded-[8px] border border-[#2c594b] bg-[#0c291f] px-3 text-white/75 transition focus-within:border-[#20dc7a] focus-within:text-[#36e98a]"><MailIcon /><input aria-label="&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;" autoComplete="email" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/40" placeholder="&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;" required type="email" /></span>
                <button className="mt-5 flex h-11 w-full items-center justify-center gap-3 rounded-[8px] bg-[#08dc88] text-[14px] font-semibold text-[#03120b] transition hover:bg-[#35eba0]" type="submit">&#xe2a;&#xe48;&#xe07;&#xe25;&#xe34;&#xe07;&#xe01;&#xe4c;&#xe23;&#xe35;&#xe40;&#xe0b;&#xe47;&#xe15;&#xe23;&#xe2b;&#xe31;&#xe2a;&#xe1c;&#xe48;&#xe32;&#xe19; <ArrowIcon /></button>
              </div>

              {sent && <p aria-live="polite" className="mt-4 text-center text-[11px] text-[#39ed92]">&#xe2a;&#xe48;&#xe07;&#xe25;&#xe34;&#xe07;&#xe01;&#xe4c;&#xe23;&#xe35;&#xe40;&#xe0b;&#xe47;&#xe15;&#xe44;&#xe1b;&#xe22;&#xe31;&#xe07;&#xe2d;&#xe35;&#xe40;&#xe21;&#xe25;&#xe02;&#xe2d;&#xe07;&#xe04;&#xe38;&#xe13;&#xe41;&#xe25;&#xe49;&#xe27;</p>}

              <div className="mt-auto pb-2">
                <div className="my-5 flex items-center gap-3 text-[12px] text-white/65"><span className="h-px flex-1 bg-white/[0.18]" /><a className="flex items-center gap-1 hover:text-white" href="/login"><BackIcon />&#xe01;&#xe25;&#xe31;&#xe1a;&#xe44;&#xe1b;&#xe40;&#xe02;&#xe49;&#xe32;&#xe2a;&#xe39;&#xe48;&#xe23;&#xe30;&#xe1a;&#xe1a;</a><span className="h-px flex-1 bg-white/[0.18]" /></div>
                <p className="text-center text-[11px] text-white/55">&#xe2b;&#xe32;&#xe01;&#xe22;&#xe31;&#xe07;&#xe40;&#xe02;&#xe49;&#xe32;&#xe43;&#xe0a;&#xe49;&#xe07;&#xe32;&#xe19;&#xe44;&#xe21;&#xe48;&#xe44;&#xe14;&#xe49; <a className="font-medium text-[#2ee77b] hover:text-white" href="/community">&#xe15;&#xe34;&#xe14;&#xe15;&#xe48;&#xe2d;&#xe40;&#xe23;&#xe32;</a></p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
