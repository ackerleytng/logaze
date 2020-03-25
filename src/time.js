import { useState, useEffect } from 'react';
import moment from 'moment';

/**
 * Gets the current time from worldtimeapi, returns a moment instance
 *
 * Don't trust user's configured time to be right, hence query an api - we can
 * afford to be slightly off as long was we're approximately consistent
 */
export const getTime = () => {
  const utc = [ {url: 'http://worldclockapi.com/api/json/utc/now', propName: 'currentDateTime'}, 
                {url: 'https://worldtimeapi.org/api/timezone/Etc/UTC', propName: 'utc_datetime'}
                ];

  const fetchRetry = (urls, n) => fetch(urls[n].url)
  .catch(err => {
    if(n === 0) {
      throw err;
    }
    return fetchRetry(urls, n-1);
  });

  return fetchRetry(utc, utc.length-1)
    .then(response => {
      let propName = utc.find(({url}) => url === response.url).propName;
      return moment(response.json()[propName]);
    });
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
