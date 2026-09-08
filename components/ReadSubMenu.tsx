"use client";

export type ReadModeId = "novel" | "fanfic" | "cartoon";

type ReadSubMenuProps = {
  activeMode?: ReadModeId;
  fixed?: boolean;
};

const items: Array<{ id: ReadModeId; label: string }> = [
  { id: "novel", label: "นิยาย" },
  { id: "fanfic", label: "แฟนฟิค" },
  { id: "cartoon", label: "การ์ตูน" },
];

function ModeIcon({ mode }: { mode: ReadModeId }) {
  if (mode === "fanfic") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="m9.75 14.25 4.5-4.5m-7.5 7.5-1.5 1.5a3.18 3.18 0 0 1-4.5-4.5l3-3a3.18 3.18 0 0 1 4.5 0m3-3 1.5-1.5a3.18 3.18 0 0 1 4.5 4.5l-3 3a3.18 3.18 0 0 1-4.5 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (mode === "cartoon") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M6.75 5.75h10.5a2 2 0 0 1 2 2v7.25a2 2 0 0 1-2 2h-3.9l-1.35 2-1.35-2h-3.9a2 2 0 0 1-2-2V7.75a2 2 0 0 1 2-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        <path d="M9 10.25h.01M15 10.25h.01M9.5 14c1.45 1 3.55 1 5 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M4.75 5.75h5.5a2 2 0 0 1 2 2v10.5a2 2 0 0 0-2-2h-5.5v-10.5ZM19.25 5.75h-5.5a2 2 0 0 0-2 2v10.5a2 2 0 0 1 2-2h5.5v-10.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export default function ReadSubMenu({ activeMode, fixed = false }: ReadSubMenuProps) {
  return (
    <nav
      aria-label="เมนูการอ่าน"
      className={`${fixed ? "fixed inset-x-0 top-[82px] z-40" : ""} mx-auto flex h-[64px] w-full max-w-[1400px] items-center justify-center border-t border-[#0ed77e]/30 bg-[#0c0e0d]/85 px-10 text-white backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2">
        {items.map((item) => {
          const isActive = activeMode === item.id;

          return (
            <a
              aria-current={isActive ? "page" : undefined}
              className={`flex h-[36px] min-w-[118px] items-center justify-center gap-2 rounded-[8px] border px-5 text-[13px] font-medium transition ${
                isActive
                  ? "border-[#0ded8a] bg-[#06402d]/90 text-[#41f1a8] shadow-[0_0_12px_rgba(0,237,138,.35),inset_0_0_10px_rgba(0,237,138,.1)]"
                  : "border-white/[0.12] bg-[#0e1412] text-white/75 hover:border-[#0ded8a]/60 hover:text-white"
              }`}
              href={item.id === "novel" ? "/read" : `/read/${item.id}`}
              key={item.id}
            >
              <ModeIcon mode={item.id} />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
