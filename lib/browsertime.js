function browsertime({ fs, path, executor }, url, options, resultDirectory, resultFile) {
  const browsertimePath = path.resolve(
    __dirname,
    `../node_modules/browsertime/bin/browsertime.js`
  );
  const browsertimeCommand = [
    browsertimePath,
    `-b ${options.browser}`,
    `-c ${options.connectivity}`,
    `-n ${options.iterations}`,
    `-o ${path.parse(resultFile).name}`,
    `--skipHar`,
    `--resultDir ${resultDirectory}`,
    url,
  ].join(` `);

  const resolver = () => {
    const benchmarkFilePath = path.resolve(
      resultDirectory,
      resultFile
    );
    const benchmarkFileContents = fs.readFileSync(benchmarkFilePath);
    return JSON.parse(benchmarkFileContents).statistics.timings;
  };

  return executor(browsertimeCommand, resolver);
}

const fs = require(`fs`);
const path = require(`path`);
const executor = require(`./executor`).default;
const browsertimeFactory = () => browsertime.bind(null, { fs, path, executor });

exports.browsertime = browsertime;
exports.default = browsertimeFactory();
