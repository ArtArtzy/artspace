type StoryMetadataProps = {
  episodes: string;
  views: string;
  likes: string;
};

function EyeIcon() {
  return <svg aria-hidden="true" className="h-3 w-3 shrink-0 2xl:h-4 2xl:w-4" fill="none" viewBox="0 0 24 24"><path d="M2.7 12s3.3-5.4 9.3-5.4 9.3 5.4 9.3 5.4-3.3 5.4-9.3 5.4S2.7 12 2.7 12Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

function HeartIcon() {
  return <svg aria-hidden="true" className="h-3 w-3 shrink-0 2xl:h-4 2xl:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 20.2S3.8 15.5 3.8 9.6a4.1 4.1 0 0 1 7.2-2.7L12 8l1-1.1a4.1 4.1 0 0 1 7.2 2.7c0 5.9-8.2 10.6-8.2 10.6Z" /></svg>;
}

function EpisodesIcon() {
  return <svg aria-hidden="true" className="h-3 w-3 shrink-0 2xl:h-4 2xl:w-4" fill="none" viewBox="0 0 24 24"><rect x="6" y="3" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M3 7v12a2 2 0 0 0 2 2h11M10 8h6M10 12h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

export default function StoryMetadata({ episodes, views, likes }: StoryMetadataProps) {
  return (
    <div data-story-metadata className="mt-1.5 text-ds-body-sm text-arn-muted">
      <div data-story-counts className="flex flex-wrap items-center gap-x-ds-2 gap-y-ds-1">
        <span aria-label={`จำนวนตอน ${episodes} ตอน`} className="inline-flex items-center gap-ds-1 whitespace-nowrap" title={`จำนวนตอน: ${episodes} ตอน`}><EpisodesIcon />{episodes}</span>
        <span aria-label={`จำนวนวิว ${views}`} className="inline-flex items-center gap-ds-1 whitespace-nowrap" title={`จำนวนวิว: ${views}`}><EyeIcon />{views}</span>
        <span aria-label={`จำนวนไลก์ ${likes}`} className="inline-flex items-center gap-ds-1 whitespace-nowrap" title={`จำนวนไลก์: ${likes}`}><HeartIcon />{likes}</span>
      </div>
    </div>
  );
}
