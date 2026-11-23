import { communityEventStatusLabels, type CommunityEventStatus } from "@/data/communityEvents";

const styles: Record<CommunityEventStatus, string> = {
  open: "border-arn-accent text-arn-accent",
  ongoing: "border-transparent bg-arn-accent text-arn-accent-ink",
  upcoming: "border-[var(--arn-status-info)] text-[var(--arn-status-info)]",
  ended: "border-arn-border-strong bg-arn-soft text-arn-muted",
};

export default function CommunityEventStatusBadge({ status }: { status: CommunityEventStatus }) {
  return <span className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-sm font-medium ${styles[status]}`}>{communityEventStatusLabels[status]}</span>;
}
