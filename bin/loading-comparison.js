#!/usr/bin/env node
const args = require(`args`);
const fs = require(`fs`);
const path = require(`path`);

const buildCommand = require(`../lib/build-command`).default;
const executeCommand = require(`../lib/execute-command`).default;
const logResult = require(`../lib/log-result`).default;

const browsertimeScript = require.resolve(`browsertime/bin/browsertime.js`);
const resultDirectory = path.resolve(__dirname, `../results`);
const resultFile = `browsertime.json`;
const resultFilePath = path.resolve(
  resultDirectory,
  resultFile
);

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

const cliArguments = args.parse(process.argv);
const urls = cliArguments.url.split(` `).filter(url => url.length);

const options = [
  browsertimeScript,
  {
    browser: cliArguments.browser,
    'connectivity.profile': cliArguments.connectivity,
    iterations: cliArguments.iterations,
    output: path.parse(resultFile).name,
    resultDir: resultDirectory,
    skipHar: ``,
  },
];

let previousPromise = Promise.resolve();
Promise.all(urls.map((url) => {
  previousPromise = previousPromise.then(() => {
    const command = buildCommand(options.concat([url]));
    return executeCommand(command, () => (
      JSON.parse(fs.readFileSync(resultFilePath)).statistics.timings
    ));
  });
  return previousPromise;
})).then(results => logResult(results, urls));
