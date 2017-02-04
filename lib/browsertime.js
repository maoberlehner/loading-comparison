const fs = require(`fs`);
const path = require(`path`);

const executor = require(`./executor`);

const browsertimeResultFile = require(`./configuration`).browsertimeResultFile;
const resultDirectory = require(`./configuration`).resultDirectory;

module.exports = function browsertime(url, options) {
  const browsertimePath = path.resolve(
    __dirname,
    `../node_modules/browsertime/bin/browsertime.js`
  );
  const browsertimeCommand = [
    browsertimePath,
    `-b ${options.browser}`,
    `-c ${options.connectivity}`,
    `-n ${options.iterations}`,
    `-o ${path.parse(browsertimeResultFile).name}`,
    `--skipHar`,
    `--resultDir ${resultDirectory}`,
    url,
  ].join(` `);

  const resolver = () => {
    const benchmarkFilePath = path.resolve(
      resultDirectory,
      browsertimeResultFile
    );
    const benchmarkFileContents = fs.readFileSync(benchmarkFilePath);
    return JSON.parse(benchmarkFileContents).statistics.timings;
  };

  return executor(browsertimeCommand, resolver);
};
