import { faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { communityEventHref, eventNumber, formatCommunityEventDate, type CommunityEvent } from "@/data/communityEvents";

export default function CommunityPastEventCard({ event, showDescription = false }: { event: CommunityEvent; showDescription?: boolean }) {
  return (
    <Link href={communityEventHref(event.slug)} className="ds-card group block h-full overflow-hidden hover:border-arn-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-arn-accent">
      <div className="relative aspect-[2/1]">
        <Image
          src={event.image}
          alt=""
          fill
          sizes={showDescription ? "(min-width: 1400px) 440px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 33vw, 100vw"}
          className="object-cover"
        />
        <span className="absolute left-ds-3 top-ds-3 inline-flex items-center gap-ds-2 rounded-full bg-arn-canvas px-2.5 py-0.5 text-arn-text">
          <FontAwesomeIcon icon={faBookOpen} className="size-3.5 shrink-0" /> สรุปกิจกรรม
        </span>
      </div>
      <div className="space-y-ds-2 p-ds-3 text-arn-muted">
        {showDescription && <p className="text-arn-accent">{event.type} · {event.mode}</p>}
        <p className={`font-semibold text-arn-text group-hover:text-arn-accent ${showDescription ? "text-ds-h3" : ""}`}>{event.title}</p>
        {showDescription && <p className="text-ds-body">{event.description}</p>}
        <div className={showDescription ? "flex flex-wrap items-center gap-x-ds-4 gap-y-ds-2 pt-ds-1" : "space-y-1.5"}>
          <time dateTime={event.endsOn} className="block">{formatCommunityEventDate(event.endsOn)}</time>
          <p className="flex items-center gap-ds-2">
            <FontAwesomeIcon icon={faUsers} className="size-3.5 shrink-0" />
            <span>{eventNumber.format(event.participants)} คนเข้าร่วม</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
