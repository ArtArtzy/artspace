"use client";

import { faCalendarDays, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import useCommunityEventActivity from "@/components/useCommunityEventActivity";
import useHomeAuth from "@/components/useHomeAuth";
import {
  communityEventHref,
  communityEvents,
  communityEventsHref,
  eventNumber,
  formatCommunityEventDate,
  formatCommunityEventDay,
  getNextCommunityEventMilestones,
  type CommunityEvent,
} from "@/data/communityEvents";

const milestones = getNextCommunityEventMilestones().slice(0, 5);

function JoinedEventCard({ event, progress }: { event: CommunityEvent; progress: number }) {
  const { goal } = event;
  const percent = goal ? Math.round(progress / goal.target * 100) : 0;

  return (
    <li className="rounded-ds-md border border-arn-border bg-arn-raised p-ds-3">
      <Link href={communityEventHref(event.slug)} className="flex items-center gap-ds-3 font-semibold text-arn-text hover:text-arn-accent">
        <Image src={event.image} alt="" width={54} height={44} className="aspect-[5/4] shrink-0 rounded-ds-sm object-cover" />
        <span>{event.title}</span>
      </Link>
      {goal && (
        <div className="mt-ds-3">
          <div className="flex flex-wrap justify-between gap-x-ds-2 text-arn-muted">
            <span>{eventNumber.format(progress)} / {eventNumber.format(goal.target)} {goal.unit}</span>
            <span className="font-medium text-arn-accent">{percent}%</span>
          </div>
          <progress max={goal.target} value={progress} aria-label={`ความคืบหน้า ${event.title}`} className="mt-ds-2 block h-2 w-full appearance-none overflow-hidden rounded-full bg-arn-soft [&::-moz-progress-bar]:bg-arn-accent [&::-webkit-progress-bar]:bg-arn-soft [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-arn-accent" />
        </div>
      )}
      <p className="mt-ds-3 flex items-center gap-ds-2 text-arn-muted"><FontAwesomeIcon icon={faCalendarDays} /> {goal ? "สิ้นสุด" : "วันที่จัด"} {formatCommunityEventDate(goal ? event.endsOn : event.startsOn)}</p>
    </li>
  );
}

export default function CommunityEventsSidebar() {
  const isLoggedIn = useHomeAuth();
  const activity = useCommunityEventActivity();
  const joinedEvents = communityEvents.filter(event => activity[event.slug]);

  return (
    <aside aria-label="ข้อมูลกิจกรรม" className="space-y-ds-4 text-sm">
      <section className="ds-card p-ds-4" aria-labelledby="my-community-events">
        <h2 id="my-community-events" className="flex items-center gap-ds-2 text-ds-h3">
          <FontAwesomeIcon icon={faUserGroup} className="text-arn-accent" /> กิจกรรมของฉัน
        </h2>
        {isLoggedIn ? (
          <ul className="mt-ds-3 space-y-ds-3">
            {joinedEvents.map(event => <JoinedEventCard key={event.slug} event={event} progress={activity[event.slug].progress} />)}
          </ul>
        ) : (
          <div className="mt-ds-3 rounded-ds-md border border-arn-border bg-arn-raised p-ds-4">
            <p className="text-ds-body text-arn-muted">เข้าสู่ระบบเพื่อดูกิจกรรมที่เข้าร่วมและความคืบหน้าของคุณ</p>
            <Link href={`/login?returnTo=${encodeURIComponent(communityEventsHref)}`} className="ds-button-primary mt-ds-3 inline-flex min-h-10 items-center px-ds-4 text-sm">เข้าสู่ระบบ</Link>
          </div>
        )}
      </section>

      <section className="ds-card p-ds-4" aria-labelledby="community-event-schedule">
        <h2 id="community-event-schedule" className="flex items-center gap-ds-2 text-ds-h3">
          <FontAwesomeIcon icon={faCalendarDays} className="text-arn-accent" /> กำหนดการถัดไป
        </h2>
        <ol className="mt-ds-3 border-l border-arn-border-strong">
          {milestones.map(({ event, day, time, label }) => {
            const displayDate = formatCommunityEventDay(day);
            return (
              <li key={event.slug} className="relative ml-ds-3 border-b border-arn-border last:border-b-0 before:absolute before:-left-[16px] before:top-[22px] before:size-[7px] before:rounded-full before:bg-arn-accent">
                <Link href={communityEventHref(event.slug)} className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-ds-3 py-ds-3 hover:text-arn-accent">
                  <time dateTime={day} className="grid justify-items-center rounded-ds-md border border-arn-border bg-arn-raised px-1 py-1.5 leading-tight text-arn-text">
                    <span className="text-ds-h3">{displayDate.day}</span>
                    <span className="text-arn-muted">{displayDate.month}</span>
                  </time>
                  <div className="space-y-1">
                    <p className="font-medium text-arn-accent">{label}</p>
                    <p className="font-semibold">{event.title}</p>
                    {time && <p className="text-arn-muted">{time}</p>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </aside>
  );
}
