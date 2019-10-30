![logo](public/pouchie-bino.svg?raw=true "Logo")

# logaze

Watching laptops on Lenovo outlet - https://ackerleytng.github.io/logaze/

## Components/Architecture

This app has three parts

+ Frontend (this repo)
+ [Scraper](https://github.com/ackerleytng/logaze-scraper), written in clojure!
+ Result cache, hosted at [jsonbin.io](https://jsonbin.io/)

This lean architecture provides the user with quick data access by caching results at [jsonbin.io](https://jsonbin.io/), while running a scraper on a free heroku dyno that sleeps during periods of inactivity.

When a user accesses [logaze](https://ackerleytng.github.io/logaze/), the user sees cached results, retrieved immediately from [jsonbin.io](https://jsonbin.io/). This allows the user to quickly start looking through the data (the laptop options).

While that happens, the user's browser helps to check the recency of the cached results, and if necessary, triggers the scraper, hosted at https://logaze.herokuapp.com.

If enough people periodically look at [logaze](https://ackerleytng.github.io/logaze/), people should generally get rather recent results!

## Development

> Please let me know if you want to contribute!

To run the app in the development mode,

```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes

`logaze` has been set up with [`gh-pages`](https://github.com/tschaub/gh-pages), so to deploy, just do

```
yarn run deploy
```
