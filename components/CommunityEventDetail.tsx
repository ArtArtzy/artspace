import { faArrowLeft, faCalendarDays, faChevronDown, faLocationDot, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import CommunityEventJoinAction from "@/components/CommunityEventJoinAction";
import CommunityEventStatusBadge from "@/components/CommunityEventStatusBadge";
import TopMenu from "@/components/TopMenu";
import type { CommunityEventDetails } from "@/data/communityEventDetails";
import {
  canJoinCommunityEvent,
  communityEventsHref,
  eventNumber,
  formatCommunityEventDate,
  formatCommunityEventPeriod,
  getCommunityEventStatus,
  pastCommunityEventsHref,
  type CommunityEvent,
} from "@/data/communityEvents";

const contentCard = "ds-card space-y-ds-3 p-ds-5 md:p-ds-6";

function EventFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="text-arn-muted">{label}</dt>
      <dd className="font-medium text-arn-text">{children}</dd>
    </div>
  );
}

export default function CommunityEventDetail({ event, details }: { event: CommunityEvent; details: CommunityEventDetails }) {
  const status = getCommunityEventStatus(event);
  const isPast = status === "ended";
  const { agenda, questions } = details;

  return (
    <div className="ds-page-shell min-h-screen pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      <main className="mx-auto max-w-[1400px] px-ds-4 pb-ds-12 pt-ds-4 text-sm md:px-ds-6">
        <Link href={isPast ? pastCommunityEventsHref : communityEventsHref} className="mb-ds-4 inline-flex min-h-11 items-center gap-ds-2 font-medium text-arn-accent hover:underline">
          <FontAwesomeIcon icon={faArrowLeft} className="size-3.5 shrink-0" /> {isPast ? "กลับไปที่กิจกรรมที่ผ่านมา" : "กลับไปที่กิจกรรมชุมชน"}
        </Link>

        <header className="ds-card mb-ds-5 grid overflow-hidden md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="relative aspect-[2/1] md:order-2 md:aspect-auto md:min-h-64">
            <Image src={event.image} alt="" fill sizes="(min-width: 1400px) 576px, (min-width: 768px) 44vw, 100vw" className="object-cover" preload />
          </div>
          <div className="flex flex-col justify-center gap-ds-4 p-ds-5 md:p-ds-8 lg:p-ds-10">
            <div className="flex flex-wrap items-center gap-x-ds-3 gap-y-ds-2 text-arn-muted">
              <CommunityEventStatusBadge status={status} />
              <span>{event.type} · {event.mode}</span>
            </div>
            <h1 className="text-ds-h2 md:text-ds-h1">{event.title}</h1>
            <p className="max-w-prose text-ds-body text-arn-muted">{event.description}</p>
            <ul className="flex flex-wrap gap-x-ds-5 gap-y-ds-2 text-arn-muted">
              <li className="flex flex-wrap items-center gap-ds-2">
                <FontAwesomeIcon icon={faCalendarDays} className="size-3.5 shrink-0 text-arn-accent" />
                {formatCommunityEventPeriod(event)} {event.time && <span>· {event.time}</span>}
              </li>
              {event.place && <li className="flex items-center gap-ds-2"><FontAwesomeIcon icon={faLocationDot} className="size-3.5 shrink-0 text-arn-accent" /> {event.place}</li>}
              {event.participants > 0 && <li className="flex items-center gap-ds-2"><FontAwesomeIcon icon={faUsers} className="size-3.5 shrink-0 text-arn-accent" /> {eventNumber.format(event.participants)} คนเข้าร่วม</li>}
            </ul>
          </div>
        </header>

        <div className="grid items-start gap-ds-5 xl:grid-cols-[minmax(0,1fr)_330px]">
          <aside aria-labelledby="event-facts-heading" className="ds-card space-y-ds-4 p-ds-5 xl:sticky xl:top-[102px] xl:col-start-2 xl:row-start-1">
            <h2 id="event-facts-heading" className="text-ds-h3">{isPast ? "ข้อมูลกิจกรรม" : "ข้อมูลการเข้าร่วม"}</h2>
            <dl className="grid gap-ds-4 sm:grid-cols-2 xl:grid-cols-1">
              <EventFact label="ผู้จัดกิจกรรม">{details.organizer}</EventFact>
              <EventFact label="เหมาะสำหรับ">{details.audience}</EventFact>
              <EventFact label="รูปแบบ">{[event.mode, event.place].filter(Boolean).join(" · ")}</EventFact>
              {event.registration && (
                <EventFact label="ช่วงรับสมัคร">{formatCommunityEventDate(event.registration.opensOn, true)} – {formatCommunityEventDate(event.registration.closesOn)}</EventFact>
              )}
              {event.goal && <EventFact label="เป้าหมายกิจกรรม">{eventNumber.format(event.goal.target)} {event.goal.unit}</EventFact>}
              {!isPast && <EventFact label="ค่าเข้าร่วม">ฟรี</EventFact>}
            </dl>
            {canJoinCommunityEvent(event) && <CommunityEventJoinAction slug={event.slug} />}
            {status === "upcoming" && <p className="rounded-ds-md border border-arn-border bg-arn-raised px-ds-3 py-ds-2 text-arn-muted">ยังไม่เปิดรับสมัคร</p>}
            <p className="border-t border-arn-border pt-ds-3 text-arn-muted">ข้อมูลและกำหนดการเป็นตัวอย่างสำหรับเว็บไซต์ต้นแบบ</p>
          </aside>

          <article aria-label="รายละเอียดกิจกรรม" className="min-w-0 space-y-ds-4 xl:col-start-1 xl:row-start-1">
            <section className={contentCard}>
              <h2 className="text-ds-h3">{isPast ? "สรุปกิจกรรม" : "เกี่ยวกับกิจกรรม"}</h2>
              <p className="text-ds-body text-arn-muted">{details.overview}</p>
            </section>

            {details.sections.map(section => (
              <section key={section.title} className={contentCard}>
                <h2 className="text-ds-h3">{section.title}</h2>
                {section.text && <p className="text-ds-body text-arn-muted">{section.text}</p>}
                {section.points && (
                  <ul className="list-disc space-y-ds-2 pl-ds-5 text-ds-body text-arn-muted marker:text-arn-accent">
                    {section.points.map(point => <li key={point}>{point}</li>)}
                  </ul>
                )}
              </section>
            ))}

            {agenda && (
              <section className={contentCard}>
                <h2 className="text-ds-h3">{agenda.title}</h2>
                <ol className="divide-y divide-arn-border">
                  {agenda.entries.map(entry => (
                    <li key={entry.when} className="grid gap-ds-2 py-ds-3 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-ds-4">
                      <p className="font-medium text-arn-accent">{entry.when}</p>
                      <div>
                        <h3 className="font-semibold text-arn-text">{entry.title}</h3>
                        <p className="mt-1 text-ds-body text-arn-muted">{entry.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {questions && (
              <section className={contentCard}>
                <h2 className="text-ds-h3">คำถามที่พบบ่อย</h2>
                <div className="divide-y divide-arn-border">
                  {questions.map(({ question, answer }) => (
                    <details key={question} className="group">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-ds-4 py-ds-2 font-medium marker:hidden hover:text-arn-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-arn-accent [&::-webkit-details-marker]:hidden">
                        {question}
                        <FontAwesomeIcon icon={faChevronDown} className="size-3.5 shrink-0 text-arn-accent group-open:rotate-180" />
                      </summary>
                      <p className="pb-ds-3 text-ds-body text-arn-muted">{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}
