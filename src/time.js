import { useState, useEffect } from "react";
import moment from "moment";

/**
 * Gets the current time from the server using the date header, returns a
 * moment instance in utc mode
 *
 * Don't trust user's configured time to be right, hence query the server - we
 * can afford to be slightly off as long was we're approximately consistent
 *
 * Fall back to user's configured time if none of the APIs can be reached
 */
export const getTime = async () => {
  const response = await fetch("/logaze/", { method: "HEAD" });
  const dateString = response.headers.get("Date");
  return moment.utc(dateString);
};

const scrapeTimeStorageAddr =
  "https://jsonblob.com/api/jsonBlob/8adcab2c-63b1-11ea-ad21-457f7983555e";

/**
 * Sets the last scrape time at storage, returns a moment instance
 */
export const getLastScrapeTime = () =>
  fetch(scrapeTimeStorageAddr)
    .then((response) => response.json())
    .then((data) => moment(data.lastScraped));

/**
 * Sets the last scrape time at storage, where m is a moment instance
 */
export const setLastScrapeTime = (m) => {
  const data = { lastScraped: m.format() };
  fetch(scrapeTimeStorageAddr, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export const useScrapeTime = () => {
  const [time, setTime] = useState(moment.invalid());

  useEffect(() => {
    getLastScrapeTime().then(setTime);
  }, []);

  return time;
};
