"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GenreIcon, selectableGenreLabels } from "@/components/CategoryFilter";
import {
  maxReaderDisplayNameLength,
  maxSelectedGenres,
  readReaderDisplayName,
  readStoredGenres,
  readerDisplayNameKey,
  readerSetupHiddenKey,
  readerSetupPendingKey,
  selectedGenresStorageKey,
} from "@/data/reader-preferences";

const minGenres = 3;

export default function HomeReaderSetup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [displayName, setDisplayName] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [hidePrompt, setHidePrompt] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    try {
      if (window.sessionStorage.getItem(readerSetupPendingKey) !== "true") return;
      if (window.localStorage.getItem(readerSetupHiddenKey) === "true") {
        window.sessionStorage.removeItem(readerSetupPendingKey);
        return;
      }
    } catch {
      return;
    }

    setDisplayName(readReaderDisplayName() ?? "");
    setGenres((readStoredGenres() ?? []).filter((genre) => selectableGenreLabels.includes(genre)).slice(0, maxSelectedGenres));
    dialog.showModal();
    return () => dialog.close();
  }, []);

  const name = displayName.trim();
  const canSave = name.length > 0 && genres.length >= minGenres && genres.length <= maxSelectedGenres;

  function toggleGenre(genre: string) {
    setGenres((current) => {
      if (current.includes(genre)) return current.filter((item) => item !== genre);
      return current.length < maxSelectedGenres ? [...current, genre] : current;
    });
  }

  function finish(hide: boolean) {
    if (hide) window.localStorage.setItem(readerSetupHiddenKey, "true");
    window.sessionStorage.removeItem(readerSetupPendingKey);
    dialogRef.current?.close();
  }

  function skip() {
    try {
      finish(hidePrompt);
    } catch {
      setError("บันทึกตัวเลือกนี้ไม่ได้ กรุณาลองอีกครั้ง");
    }
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;

    try {
      window.localStorage.setItem(selectedGenresStorageKey, JSON.stringify(genres));
      window.localStorage.setItem(readerDisplayNameKey, name);
      finish(true);
    } catch {
      setError("บันทึกการตั้งค่าไม่ได้ กรุณาลองอีกครั้ง");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="reader-setup-title"
      className="ds-card max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-xl overflow-hidden text-arn-text backdrop:bg-black/70"
      onCancel={(event) => {
        event.preventDefault();
        skip();
      }}
    >
      <form className="flex max-h-[calc(100dvh_-_2rem_-_2px)] flex-col" onSubmit={save}>
        <div className="space-y-ds-4 overflow-y-auto overscroll-contain p-ds-4 sm:p-ds-6">
          <h2 className="text-ds-h2" id="reader-setup-title">ตั้งค่าโปรไฟล์การอ่าน</h2>

          <div>
            <label className="mb-ds-2 block text-ds-body-sm font-medium" htmlFor="reader-setup-name">ชื่อที่แสดงบนเว็บไซต์</label>
            <input
              autoComplete="nickname"
              className="ds-input min-h-11 w-full px-ds-3 text-ds-body"
              id="reader-setup-name"
              maxLength={maxReaderDisplayNameLength}
              onChange={(event) => setDisplayName(event.target.value)}
              required
              type="text"
              value={displayName}
            />
          </div>

          <fieldset className="min-w-0" aria-describedby="reader-setup-genre-count">
            <legend className="text-ds-body-sm font-medium">หมวดเรื่องที่ชอบ</legend>
            <p className="mb-ds-2 text-ds-body-sm text-arn-muted" id="reader-setup-genre-count" role="status">
              เลือก {minGenres}–{maxSelectedGenres} หมวด · เลือกแล้ว {genres.length}/{maxSelectedGenres}
            </p>
            <div className="grid grid-cols-2 gap-ds-2 sm:grid-cols-3">
              {selectableGenreLabels.map((genre) => {
                const selected = genres.includes(genre);
                return (
                  <button
                    aria-pressed={selected}
                    className="ds-chip min-h-11 min-w-0 gap-ds-1 rounded-ds-sm px-ds-2 py-ds-1 text-left text-ds-body-sm enabled:hover:border-arn-accent aria-pressed:border-arn-accent aria-pressed:bg-arn-raised aria-pressed:text-arn-text disabled:opacity-50"
                    disabled={!selected && genres.length >= maxSelectedGenres}
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    type="button"
                  >
                    <span className="shrink-0"><GenreIcon label={genre} /></span>
                    <span className="min-w-0 flex-1 break-words">{genre}</span>
                    {selected && <FontAwesomeIcon aria-hidden="true" className="shrink-0 text-arn-accent" icon={faCheck} />}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="shrink-0 border-t border-arn-border p-ds-4 sm:px-ds-6">
          <label className="flex min-h-11 cursor-pointer items-center gap-ds-2 text-ds-body-sm text-arn-muted">
            <input checked={hidePrompt} className="ds-focus h-4 w-4 accent-arn-accent" onChange={(event) => setHidePrompt(event.target.checked)} type="checkbox" />
            ไม่แสดงอีกจนกว่าจะออกจากระบบ
          </label>
          {error && <p className="mb-ds-2 text-ds-body-sm text-arn-text" role="alert">{error}</p>}
          <div className="flex justify-end gap-ds-2">
            <button className="ds-button-secondary min-h-11 px-ds-4" onClick={skip} type="button">ข้าม</button>
            <button className="ds-button-primary min-h-11 px-ds-4 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-arn-accent disabled:hover:bg-arn-accent" disabled={!canSave} type="submit">บันทึก</button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
