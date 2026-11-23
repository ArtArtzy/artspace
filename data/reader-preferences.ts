export const readerSetupPendingKey = "arnspace-reader-setup-pending";
export const readerSetupHiddenKey = "arnspace-reader-setup-hidden";
export const readerDisplayNameKey = "arnspace-reader-display-name";
export const selectedGenresStorageKey = "arnspace-selected-genres";
export const maxReaderDisplayNameLength = 60;
export const maxSelectedGenres = 10;

export function readStoredGenres(): string[] | null {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(selectedGenresStorageKey) ?? "null");
    return Array.isArray(value)
      ? [...new Set(value.filter((genre): genre is string => typeof genre === "string"))]
      : null;
  } catch {
    return null;
  }
}

export function readReaderDisplayName() {
  try {
    return window.localStorage.getItem(readerDisplayNameKey)?.trim().slice(0, maxReaderDisplayNameLength) || null;
  } catch {
    return null;
  }
}
