import { resolveStoryStatus, type StoryStatus } from "@/data/storyStatus";

type StoryMetadataProps = {
  title: string;
  episodes: string;
  views: string;
  likes: string;
  status?: StoryStatus;
};

function EyeIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M2.7 12s3.3-5.4 9.3-5.4 9.3 5.4 9.3 5.4-3.3 5.4-9.3 5.4S2.7 12 2.7 12Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

function HeartIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 20.2S3.8 15.5 3.8 9.6a4.1 4.1 0 0 1 7.2-2.7L12 8l1-1.1a4.1 4.1 0 0 1 7.2 2.7c0 5.9-8.2 10.6-8.2 10.6Z" /></svg>;
}

function CompletedIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="m4.5 12.5 4.8 4.6L19.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" /></svg>;
}

function OngoingIcon() {
  return <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />;
}

export default function StoryMetadata({ title, episodes, views, likes, status }: StoryMetadataProps) {
  const resolvedStatus = resolveStoryStatus({ title, episodes, status });
  const isCompleted = resolvedStatus === "completed";
  const statusLabel = isCompleted ? "จบแล้ว" : "กำลังเขียน";

  return (
    <div className="mt-1.5 space-y-1 text-[10px] text-white/55">
      <div className="flex items-center gap-1 whitespace-nowrap" title={`สถานะ: ${statusLabel} · ${episodes} ตอน`}>
        <span className={`inline-flex items-center gap-1 font-medium ${isCompleted ? "text-[#2ee77b]" : "text-[#2ee77b]"}`}>
          <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
            {isCompleted ? <CompletedIcon /> : <OngoingIcon />}
          </span>
          {statusLabel}
        </span>
        <span className="text-white/35">•</span>
        <span className="text-white/70">{episodes} ตอน</span>
      </div>
      <div className="flex items-center gap-3">
        <span aria-label={`จำนวนวิว ${views}`} className="inline-flex min-w-0 items-center gap-1" title={`จำนวนวิว: ${views}`}><EyeIcon />{views}</span>
        <span aria-label={`จำนวนไลก์ ${likes}`} className="inline-flex min-w-0 items-center gap-1" title={`จำนวนไลก์: ${likes}`}><HeartIcon />{likes}</span>
      </div>
    </div>
  );
}
