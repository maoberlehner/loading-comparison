function logResult({ chalk, Table, formatValues }, results, columnNames) {
  const head = [``].concat(columnNames.map(columnName => chalk.reset.bold(columnName)));
  const colAligns = head.map(() => `right`);
  const resultTable = new Table({
    head,
    colAligns,
  });
  const values = {
    serverResponseTime: [],
    firstPaint: [],
    domContentLoadedTime: [],
    domInteractiveTime: [],
    fullyLoaded: [],
    rumSpeedIndex: [],
  };
  results.reduce((previous, result) => {
    Object.keys(values).forEach((key) => {
      const dataObject = result[key] || result.pageTimings[key];
      previous[key].push(dataObject.median);
    });
    return previous;
  }, values);

  Object.keys(values).forEach((key) => {
    const row = {};
    row[chalk.reset.bold(key)] = formatValues(values[key]);
    resultTable.push(row);
  });
  // eslint-disable-next-line no-console
  console.log(resultTable.toString());
}

const chalk = require(`chalk`);
const Table = require(`cli-table`);
const formatValues = require(`./format-values`).default;
const logResultFactory = () => logResult.bind(null, { chalk, Table, formatValues });

exports.logResult = logResult;
exports.default = logResultFactory();
