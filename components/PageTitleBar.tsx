type PageTitleBarVariant = "home" | "novel" | "fanfic" | "cartoon" | "community";

type PageTitleBarProps = {
  variant: PageTitleBarVariant;
};

type PageTitleBarContent = {
  title: string;
  description: string;
  icon: "home" | "book" | "sparkle" | "panel" | "community";
};

const pageTitleBarContent: Record<PageTitleBarVariant, PageTitleBarContent> = {
  home: {
    title: "สำหรับคุณ",
    description: "เรื่องราวและคอนเทนต์ที่คัดมาให้คุณ",
    icon: "home",
  },
  novel: {
    title: "นิยาย",
    description: "เรื่องราวต้นฉบับจากนักเขียนใน ArnSpace",
    icon: "book",
  },
  fanfic: {
    title: "แฟนฟิค",
    description: "เรื่องราวจากโลกที่คุณรัก ในมุมใหม่ของแฟน ๆ",
    icon: "sparkle",
  },
  cartoon: {
    title: "การ์ตูน",
    description: "เรื่องราวที่เล่าผ่านภาพ จากนักสร้างสรรค์ใน ArnSpace",
    icon: "panel",
  },
  community: {
    title: "ชุมชน",
    description: "พื้นที่พูดคุย แลกเปลี่ยน และเติบโตไปกับเรื่องราว",
    icon: "community",
  },
};

function PageTitleBarIcon({ icon, className }: { icon: PageTitleBarContent["icon"]; className: string }) {
  if (icon === "book") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="M4.5 5.5h5.2a2.3 2.3 0 0 1 2.3 2.3v11a2.3 2.3 0 0 0-2.3-2.3H4.5v-11ZM19.5 5.5h-5.2A2.3 2.3 0 0 0 12 7.8v11a2.3 2.3 0 0 1 2.3-2.3h5.2v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (icon === "sparkle") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "panel") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <rect height="15" rx="2" stroke="currentColor" strokeWidth="1.7" width="15" x="4.5" y="4.5" />
        <rect height="6" rx="1" stroke="currentColor" strokeWidth="1.5" width="6" x="9" y="9" />
        <path d="M7.5 7.5h.01M16.5 16.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      </svg>
    );
  }

  if (icon === "community") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="M4.5 5.5h15v10H9l-4.5 3.5v-13.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        <path d="M8 9.5h8M8 12.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="m3.5 10.5 8.5-7 8.5 7M5.5 9.5v10h13v-10M9.5 19.5v-5h5v5" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export default function PageTitleBar({ variant }: PageTitleBarProps) {
  const content = pageTitleBarContent[variant];

  return (
    <div className="ds-page-banner-shell mx-auto w-full max-w-[1400px] bg-arn-canvas px-2 pb-1 pt-2">
      <div className="ds-page-banner" data-page-accent={variant}>
        <PageTitleBarIcon className="h-5 w-5 shrink-0" icon={content.icon} />
        <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-3">
          <h1 className="ds-page-banner-title shrink-0 text-[17px] font-semibold leading-tight sm:text-[18px]">{content.title}</h1>
          <p className="mt-0.5 line-clamp-1 text-[12px] leading-5 text-arn-muted sm:mt-0 sm:truncate sm:text-[13px]">{content.description}</p>
        </div>
      </div>
    </div>
  );
}
