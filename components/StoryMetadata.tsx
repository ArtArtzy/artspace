import { resolveStoryStatus, type StoryStatus } from "@/data/storyStatus";

type StoryMetadataProps = {
  title: string;
  episodes: string;
  views: string;
  likes: string;
  status?: StoryStatus;
  showStatus?: boolean;
};

function EyeIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M2.7 12s3.3-5.4 9.3-5.4 9.3 5.4 9.3 5.4-3.3 5.4-9.3 5.4S2.7 12 2.7 12Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

function HeartIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 20.2S3.8 15.5 3.8 9.6a4.1 4.1 0 0 1 7.2-2.7L12 8l1-1.1a4.1 4.1 0 0 1 7.2 2.7c0 5.9-8.2 10.6-8.2 10.6Z" /></svg>;
}

function EpisodesIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24"><rect x="6" y="3" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M3 7v12a2 2 0 0 0 2 2h11M10 8h6M10 12h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

function CompletedIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="m4.5 12.5 4.8 4.6L19.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" /></svg>;
}

function OngoingIcon() {
  return <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />;
}

export default function StoryMetadata({ title, episodes, views, likes, status, showStatus = true }: StoryMetadataProps) {
  const resolvedStatus = resolveStoryStatus({ title, episodes, status });
  const isCompleted = resolvedStatus === "completed";
  const statusLabel = isCompleted ? "จบแล้ว" : "กำลังเขียน";

  return (
    <div data-story-metadata className="mt-1.5 space-y-1 text-[10px] text-white/55">
      {showStatus && (
        <div className="flex items-center gap-1 whitespace-nowrap" title={`สถานะ: ${statusLabel} · ${episodes} ตอน`}>
          <span className="inline-flex items-center gap-1 font-medium text-[#2ee77b]">
            <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center">
              {isCompleted ? <CompletedIcon /> : <OngoingIcon />}
            </span>
            {statusLabel}
          </span>
          <span className="text-white/35">•</span>
          <span className="text-white/70">{episodes} ตอน</span>
        </div>
      )}
      <div data-story-counts className="flex items-center gap-3">
        {!showStatus && <span aria-label={`จำนวนตอน ${episodes} ตอน`} className="inline-flex min-w-0 items-center gap-1" title={`จำนวนตอน: ${episodes} ตอน`}><EpisodesIcon />{episodes}</span>}
        <span aria-label={`จำนวนวิว ${views}`} className="inline-flex min-w-0 items-center gap-1" title={`จำนวนวิว: ${views}`}><EyeIcon />{views}</span>
        <span aria-label={`จำนวนไลก์ ${likes}`} className="inline-flex min-w-0 items-center gap-1" title={`จำนวนไลก์: ${likes}`}><HeartIcon />{likes}</span>
      </div>
    </div>
  );
}
