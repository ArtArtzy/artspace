"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import { communityRooms, communitySectionHref } from "@/data/communityRooms";

const aboutGroup = {
  title: "เกี่ยวกับเรา",
  links: ["ARN SPACE", "วิสัยทัศน์", "ร่วมงานกับเรา"],
};

const linkGroups: { title: string; links: string[]; visibility?: string }[] = [
  { ...aboutGroup, visibility: "max-xl:hidden" },
  {
    title: "สำรวจเรื่องอ่าน",
    links: ["นิยาย", "แฟนฟิค", "การ์ตูน"],
  },
  {
    title: "สำหรับนักเขียน",
    links: ["เริ่มต้นเขียน", "คู่มือการใช้งาน", "กฎและข้อตกลง"],
  },
  {
    title: "ชุมชน",
    links: [communityRooms.general.label, "กิจกรรม"],
  },
  { ...aboutGroup, visibility: "xl:hidden" },
  {
    title: "ช่วยเหลือ",
    links: ["ศูนย์ช่วยเหลือ", "ติดต่อเรา", "นโยบายความเป็นส่วนตัว", "เงื่อนไขการใช้งาน"],
  },
];

const footerHrefs: Record<string, string> = {
  "ARN SPACE": "/about",
  "วิสัยทัศน์": "/vision",
  "ร่วมงานกับเรา": "/careers",
  "นิยาย": "/read",
  "แฟนฟิค": "/read/fanfic",
  "การ์ตูน": "/read/cartoon",
  "เริ่มต้นเขียน": "/write",
  "คู่มือการใช้งาน": "/help/guide",
  "กฎและข้อตกลง": "/rules",
  [communityRooms.general.label]: communitySectionHref("general"),
  "กิจกรรม": communitySectionHref("events"),
  "ประกาศ": "/community",
  "ศูนย์ช่วยเหลือ": "/help",
  "ติดต่อเรา": "/contact",
  "นโยบายความเป็นส่วนตัว": "/privacy",
  "เงื่อนไขการใช้งาน": "/terms",
};

function CompactSocialIcon({ type }: { type: (typeof socials)[number]["slug"] }) {
  if (type === "x") return <FontAwesomeIcon aria-hidden="true" className="h-4 w-4 xl:hidden" icon={faTwitter} />;

  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px] xl:hidden" fill="none" viewBox="0 0 24 24">
      {type === "line" && <path d="M20 11.5a8 8 0 0 1-8 8c-1.3 0-2.5-.3-3.6-.9L4 20l1.4-4.4A8 8 0 1 1 20 11.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />}
      {type === "facebook" && <path d="M13.5 21v-8h3l.5-3h-3.5V8c0-1 .5-1.5 1.5-1.5h2V3.3L14.4 3c-2.7 0-4.3 1.6-4.3 4.5V10H7v3h3.1v8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />}
      {type === "instagram" && <><rect height="14" rx="4" stroke="currentColor" strokeWidth="1.7" width="14" x="5" y="5" /><circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" /><circle cx="16.7" cy="7.5" fill="currentColor" r="0.8" /></>}
      {type === "youtube" && <><path d="M4.5 8.2a2 2 0 0 1 1.8-1.7c3.8-.4 7.6-.4 11.4 0a2 2 0 0 1 1.8 1.7 30 30 0 0 1 0 7.6 2 2 0 0 1-1.8 1.7c-3.8.4-7.6.4-11.4 0a2 2 0 0 1-1.8-1.7 30 30 0 0 1 0-7.6Z" stroke="currentColor" strokeWidth="1.7" /><path d="m10.5 9.7 4.5 2.3-4.5 2.3V9.7Z" fill="currentColor" /></>}
      {type === "tiktok" && <path d="M13.5 15.5a3.5 3.5 0 1 1-3.5-3.5m3.5 3.5V3.5c1 2.5 2.8 4 5.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />}
    </svg>
  );
}

function BrandSocialIcon({ type }: { type: "chat" | "x" | "facebook" | "instagram" | "youtube" | "tiktok" }) {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24">
      {type === "chat" && <><path d="M12 3.5c5.25 0 9.5 3.35 9.5 7.5s-4.25 7.5-9.5 7.5c-.86 0-1.7-.09-2.49-.28L5.3 20.5l.58-3.1C3.5 16.06 2.5 13.7 2.5 11c0-4.15 4.25-7.5 9.5-7.5Z" fill="#06c755" /><text fill="#07100b" fontSize="4.5" fontWeight="700" textAnchor="middle" x="12" y="12.5">LINE</text></>}
      {type === "x" && <path d="M5 4h3.15l3.36 4.5L15.3 4H19l-5.72 6.87L19.5 20h-3.16l-3.77-5.05L8.3 20H4.6l5.92-7.23L5 4Z" fill="currentColor" />}
      {type === "facebook" && <><circle cx="12" cy="12" fill="#1877f2" r="9.5" /><path d="M13.45 20v-6.85h2.3l.35-2.68h-2.65V8.76c0-.78.22-1.3 1.34-1.3h1.43V5.05c-.25-.03-1.1-.1-2.08-.1-2.06 0-3.47 1.26-3.47 3.57v1.95H8.35v2.68h2.32V20h2.78Z" fill="white" /></>}
      {type === "instagram" && <><defs><linearGradient id="footer-instagram-gradient" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stopColor="#ffdc80" /><stop offset=".45" stopColor="#e1306c" /><stop offset="1" stopColor="#833ab4" /></linearGradient></defs><rect fill="url(#footer-instagram-gradient)" height="19" rx="5" width="19" x="2.5" y="2.5" /><circle cx="12" cy="12" fill="none" r="4.1" stroke="white" strokeWidth="1.8" /><circle cx="17" cy="7" fill="white" r="1.1" /></>}
      {type === "youtube" && <><path d="M21.1 7.3a2.5 2.5 0 0 0-1.76-1.77C17.8 5.1 12 5.1 12 5.1s-5.8 0-7.34.43A2.5 2.5 0 0 0 2.9 7.3 26 26 0 0 0 2.5 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.76 1.77c1.54.43 7.34.43 7.34.43s5.8 0 7.34-.43a2.5 2.5 0 0 0 1.76-1.77 26 26 0 0 0 .4-4.7 26 26 0 0 0-.4-4.7Z" fill="#ff0033" /><path d="m10 9 5.2 3-5.2 3V9Z" fill="white" /></>}
      {type === "tiktok" && <><path d="M14.2 4h2.7c.2 1.7 1.2 3.1 2.8 3.8v2.7a8.3 8.3 0 0 1-2.8-1V15a5 5 0 1 1-5-5c.35 0 .7.04 1.03.1v2.75a2.35 2.35 0 1 0 1.27 2.08V4Z" fill="#25f4ee" /><path d="M16 4h1.4c.25 1.52 1.1 2.58 2.3 3.16v1.63a7.5 7.5 0 0 1-2.3-.87V15a5 5 0 0 1-5 5 5 5 0 0 1-4.7-6.7 5 5 0 0 0 7.8 3.54V4H16Z" fill="#fe2c55" opacity=".75" /></>}
    </svg>
  );
}

const socials = [
  { label: "LINE", slug: "line", image: "/images/sc1.svg" },
  { label: "X", slug: "x", image: "/images/sc2.svg" },
  { label: "Facebook", slug: "facebook", image: "/images/sc3.svg" },
  { label: "Instagram", slug: "instagram", image: "/images/sc4.svg" },
  { label: "YouTube", slug: "youtube", image: "/images/sc5.svg" },
  { label: "TikTok", slug: "tiktok", image: "/images/sc6.svg" },
] as const;

export default function Footer({ responsive = false }: { responsive?: boolean } = {}) {
  const groupIdPrefix = useId();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  return (
    <UnbuiltPageGuard>
      <footer className="border-t border-arn-border-strong bg-arn-surface text-arn-text">
      <div data-home-footer-grid className="mx-auto grid max-w-[1400px] grid-cols-1 px-ds-3 pb-ds-6 pt-ds-1 md:grid-cols-3 md:gap-x-ds-3 md:gap-y-ds-3 md:pb-ds-2 xl:grid-cols-[166px_repeat(5,minmax(0,1fr))] xl:gap-x-ds-6 xl:gap-y-ds-4 xl:px-ds-2 xl:py-ds-6">
        <div className="-ml-ds-2 flex min-w-0 items-start max-xl:col-span-full xl:ml-0">
          <Image
            alt="ARN SPACE — Read Write Belong"
            className="h-auto w-[200px] max-w-full md:w-[154px] xl:w-[166px]"
            height={80}
            sizes="(min-width: 1280px) 166px, (min-width: 768px) 154px, 200px"
            src="/images/arnspace-logo.webp"
            width={238}
          />
        </div>

        {linkGroups.map((group, index) => {
          const isExpanded = expandedGroup === group.title;
          const groupId = `${groupIdPrefix}-group-${index}`;

          return (
            <div className={`min-w-0 max-md:border-b max-md:border-arn-border ${group.visibility ?? ""}`} key={group.visibility ?? group.title}>
              <h2 className="text-ds-body-sm font-semibold text-arn-text xl:mb-ds-1 xl:text-ds-body xl:font-semibold">
                <span className="max-md:hidden">{group.title}</span>
                <button
                  aria-controls={groupId}
                  aria-expanded={isExpanded}
                  className="flex min-h-[68px] w-full items-center justify-between gap-ds-1 px-ds-1 text-left hover:text-arn-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-arn-accent md:hidden"
                  onClick={() => setExpandedGroup((current) => current === group.title ? null : group.title)}
                  type="button"
                >
                  {group.title}
                  <svg aria-hidden="true" className={`h-4 w-4 shrink-0 text-arn-muted ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </h2>
              <nav aria-label={group.title} className={`max-md:px-ds-1 max-md:pb-ds-3 ${isExpanded ? "" : "max-md:hidden"}`} id={groupId}>
                {group.links.map((link) => (
                  <a className={`flex min-h-11 items-center text-ds-body-sm text-arn-muted transition hover:text-arn-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-arn-accent md:max-xl:min-h-6 md:max-xl:text-ds-caption md:max-xl:leading-relaxed xl:min-h-0 ${responsive ? "" : "xl:block xl:overflow-hidden xl:text-ellipsis"}`} href={footerHrefs[link] ?? "/about"} key={link}>
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          );
        })}

        <div data-home-footer-social className="col-span-full flex min-w-0 flex-col items-center max-md:pt-ds-8 md:max-xl:border-t md:max-xl:border-arn-border md:max-xl:pt-ds-2">
          <p className="text-ds-caption font-semibold md:hidden">ติดตาม ARN SPACE</p>
          <div className={`flex items-center justify-center max-xl:text-arn-text xl:gap-ds-4 xl:text-white/80 ${responsive ? "flex-wrap" : ""}`}>
            {socials.map((social) => (
              <a aria-label={social.label} className={`transition focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-arn-accent max-xl:grid max-xl:h-11 max-xl:w-11 max-xl:place-items-center md:max-xl:w-ds-8 ${responsive ? "xl:grid xl:place-items-center" : ""}`} href={`/social/${social.slug}`} key={social.label}>
                <CompactSocialIcon type={social.slug} />
                <Image alt="" className="hidden h-[18px] w-[18px] object-contain transition-transform hover:scale-110 xl:block" height={18} src={social.image} unoptimized width={18} />
              </a>
            ))}
          </div>
          <p className="mt-ds-2 text-center text-ds-caption text-arn-muted max-md:w-full max-md:border-t max-md:border-arn-border max-md:pt-ds-4 xl:text-ds-meta xl:text-arn-subtle">© 2026 ARN SPACE. All rights reserved.</p>
        </div>
      </div>
      </footer>
    </UnbuiltPageGuard>
  );
}
