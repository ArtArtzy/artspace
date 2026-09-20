"use client";

import type { UnbuiltPage } from "@/data/unbuilt-pages";

type UnbuiltPageModalProps = {
  page: UnbuiltPage;
  href: string;
  onClose: () => void;
};

export default function UnbuiltPageModal({ page, href, onClose }: UnbuiltPageModalProps) {
  return (
    <div aria-labelledby="unbuilt-page-dialog-title" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose} role="dialog">
      <div className="ds-card w-full max-w-[460px] p-5 text-arn-text" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start gap-3">
          <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#173d2a] text-xl text-[#43ee91]">!</div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold" id="unbuilt-page-dialog-title">หน้านี้ยังไม่ได้ทำ</h2>
            <p className="mt-1 text-sm leading-6 text-white/65">เรากำลังเตรียมหน้านี้อยู่ โปรดเก็บรหัสและ URL ไว้สำหรับติดตามงานต่อไปครับ</p>
          </div>
          <button aria-label="ปิดหน้าต่าง" className="ml-auto rounded-md px-2 py-1 text-xl leading-none text-white/50 transition hover:bg-white/10 hover:text-white" onClick={onClose} type="button">×</button>
        </div>

        <div className="mt-5 space-y-2 rounded-xl border border-white/10 bg-black/15 p-3 text-sm">
          <div className="flex items-start justify-between gap-4">
            <span className="text-white/50">สถานะ</span>
            <span className="font-medium text-[#ffd36a]">{page.status}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-white/50">รหัสหน้า</span>
            <code className="rounded bg-[#173d2a] px-2 py-0.5 text-[#78f6b4]">{page.code}</code>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-white/50">URL</span>
            <code className="break-all text-right text-xs text-white/80">{href}</code>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-white/50">ชื่อหน้า</span>
            <span className="text-right text-white/85">{page.name}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button className="rounded-lg bg-[#1be27e] px-4 py-2 text-sm font-semibold text-[#06140e] transition hover:bg-[#64f5aa]" onClick={onClose} type="button">รับทราบ</button>
        </div>
      </div>
    </div>
  );
}
