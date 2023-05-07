import { useState, useEffect, useCallback } from "react";

/**
 * Gets the current time from the server using the date header
 *
 * Don't trust user's configured time to be right, hence query the server - we
 * can afford to be slightly off as long was we're approximately consistent
 *
 * Fall back to user's configured time if none of the APIs can be reached
 */
export const getTime = async (): Promise<Date> => {
  const response = await fetch("/logaze/", { method: "HEAD" });
  const dateString = response.headers.get("Date");
  return dateString ? new Date(dateString) : new Date();
};

const scrapeTimeStorageAddr =
  "https://jsonblob.com/api/jsonBlob/1104253402283786240";

/**
 * Gets the last scrape time at storage, if not found, return Unix epoch.
 */
export const getLastScrapeTime = async (): Promise<Date> => {
  const raw = await fetch(scrapeTimeStorageAddr);
  const response = await raw.json();
  const lastScraped = response["lastScraped"] ?? 0;
  return new Date(lastScraped);
}

/**
 * Sets the last scrape time at storage
 */
export const setLastScrapeTime = (m: Date): void => {
  const data = { lastScraped: m.toUTCString() };
  fetch(scrapeTimeStorageAddr, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const useScrapeTime = (): Date | null => {
  const [time, setTime] = useState<Date | null>(null);

  const getAndSetTime = useCallback(async () => {
    setTime(await getLastScrapeTime());
  }, [setTime]);

  useEffect(() => { getAndSetTime(); }, [getAndSetTime]);

  return time;
};
