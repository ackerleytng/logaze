import { useState, useEffect } from 'react';
import moment from 'moment';

/**
 * Gets the current time from online apis, returns a moment instance in utc mode
 *
 * Don't trust user's configured time to be right, hence query an api - we can
 * afford to be slightly off as long was we're approximately consistent
 *
 * Fall back to user's configured time if none of the APIs can be reached
 */
export const getTime = () => {
  // In order of priority: first try the topmost API, then the next
  const apis = [
    { url: 'https://worldtimeapi.org/api/timezone/Etc/UTC', propName: 'utc_datetime' },
    { url: 'http://worldclockapi.com/api/json/utc/now', propName: 'currentDateTime' },
  ];

  const fetchRetry = (n = 0) => fetch(apis[n].url)
        .then(r => [r, n])
        .catch(err => {
          if (n === apis.length) {
            throw err;
          }
          return fetchRetry(n + 1);
        });

  return fetchRetry()
    .then(([response, n]) => moment.utc(response.json()[apis[n]]))
    .catch(err => moment.utc());
}

const scrapeTimeStorageAddr = 'https://jsonblob.com/api/jsonBlob/8adcab2c-63b1-11ea-ad21-457f7983555e';

/**
 * Sets the last scrape time at storage, returns a moment instance
 */
export const getLastScrapeTime = () =>
  fetch(scrapeTimeStorageAddr)
  .then(response => response.json())
  .then(data => moment(data.lastScraped));

/**
 * Sets the last scrape time at storage, where m is a moment instance
 */
export const setLastScrapeTime = (m) => {
  const data = {lastScraped: m.format()}
  fetch(scrapeTimeStorageAddr, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
}

export const useScrapeTime = () => {
  const [time, setTime] = useState(moment.invalid());

  useEffect(() => {
    getLastScrapeTime().then(setTime);
  }, []);

  return time;
};
