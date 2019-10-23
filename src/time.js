import { useState, useEffect } from 'react';
import moment from 'moment';

/**
 * Gets the current time from worldtimeapi, returns a moment instance
 *
 * Don't trust user's configured time to be right, hence query an api - we can
 * afford to be slightly off as long was we're approximately consistent
 */
export const getTime = () => {
  const utc = 'https://worldtimeapi.org/api/timezone/Etc/UTC';
  return fetch(utc).then(response => moment(response.json().utc_datetime));
}

const scrapeTimeBinId = '5db0487cdc9e973e1f74ad2b';
const scrapeTimeJsonBinAddr = `https://api.jsonbin.io/b/${scrapeTimeBinId}`;

/**
 * Sets the last scrape time at jsonbin, returns a moment instance
 */
export const getLastScrapeTime = () =>
  fetch(scrapeTimeJsonBinAddr + '/latest')
  .then(response => response.json())
  .then(data => moment(data.lastScraped));

/**
 * Sets the last scrape time at jsonbin, where m is a moment instance
 */
export const setLastScrapeTime = (m) => {
  const data = {lastScraped: m.format()}
  fetch(scrapeTimeJsonBinAddr, {
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
