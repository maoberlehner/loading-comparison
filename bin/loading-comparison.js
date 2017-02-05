#!/usr/bin/env node
const args = require(`args`);
const chalk = require(`chalk`);
const exec = require(`child_process`).exec;
const fs = require(`fs`);
const path = require(`path`);
const Table = require(`cli-table`);

const executorFactory = require(`../lib/executor`);
const browsertimeFactory = require(`../lib/browsertime`);
const formatValuesFactory = require(`../lib/format-values`);
const logResultFactory = require(`../lib/log-result`);

const executor = executorFactory({ exec });
const browsertime = browsertimeFactory({ fs, path, executor });
const formatValues = formatValuesFactory({ chalk, Math });
const logResult = logResultFactory({ chalk, Table, formatValues });

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
