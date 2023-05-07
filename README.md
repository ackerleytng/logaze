![logo](./src/images/pouchie-bino.svg)

# logaze

Watching laptops on Lenovo outlet - https://ackerleytng.github.io/logaze/

`logaze` presents a data-centric view of the laptops available on Lenovo outlet, so that you can filter and sort through them to get the laptop you want.

## Components/Architecture

This app has three parts

+ Frontend (this repo)
+ [Scraper](https://github.com/ackerleytng/logaze-scraper), written in clojure!
+ Result cache, hosted at [jsonblob.com](https://jsonblob.com/)

This lean architecture provides the user with quick data access by caching results at [jsonblob.com](https://jsonblob.com/), while running a scraper on a separate backend platform.

When a user accesses [logaze](https://ackerleytng.github.io/logaze/), the user sees cached results, retrieved immediately from [jsonblob.com](https://jsonblob.com/). This allows the user to quickly start looking through the data (the laptop options).

While that happens, the user's browser helps to check the recency of the cached results, and if necessary, triggers the scraper, which writes to [jsonblob.com](https://jsonblob.com/).

If enough people periodically look at [logaze](https://ackerleytng.github.io/logaze/), people should generally get rather recent results!

## Development

> Please let me know if you want to contribute! I'll be so happy to work with you!

To run the app in the development mode,

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes

`logaze` has been set up with [`gh-pages`](https://github.com/tschaub/gh-pages), so to deploy, do

```
npm run deploy
```
