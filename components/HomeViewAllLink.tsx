import Link from "next/link";

export default function HomeViewAllLink({ href, title }: { href: string; title: string }) {
  return (
    <Link aria-label={`ดูทั้งหมดในหมวด ${title}`} className="inline-flex min-h-11 shrink-0 items-center gap-ds-2 rounded-ds-sm text-sm font-medium leading-normal text-arn-accent-strong transition-colors hover:text-arn-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={href}>
      ดูทั้งหมด <span aria-hidden="true">→</span>
    </Link>
  );
}
