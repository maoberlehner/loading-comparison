#!/usr/bin/env node
const args = require(`args`);
const path = require(`path`);

const browsertime = require(`../lib/browsertime`).default;
const logResult = require(`../lib/log-result`).default;

const resultDirectory = path.resolve(__dirname, `../results`);
const resultFile = `browsertime.json`;

args
  .option(
    `browser`,
    `Specify browser. Possible values: "chrome", "firefox".`,
    `chrome`
  )
  .option(
    `connectivity`,
    `The connectivity profile. Possible values: "3g", "3gfast", "3gslow", "3gem", "2g", "cable", "native", "custom".`,
    `cable`
  )
  .option(
    [`n`, `iterations`],
    `Number of times to test the url (restarting the browser between each test).`,
    3
  )
  .option(
    `url`,
    `One or more (space separated) urls (e.g. -u "https://www.wikipedia.org https://github.com/").`,
    `https://www.wikipedia.org`
  );
const options = args.parse(process.argv);
const urls = options.url.split(` `).filter(url => url.length);

let previousPromise = Promise.resolve();
Promise.all(urls.map((url) => {
  previousPromise = previousPromise.then(
    () => browsertime(url, options, resultDirectory, resultFile)
  );
  return previousPromise;
})).then(results => logResult(results, urls));
