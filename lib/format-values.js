const chalk = require(`chalk`);

module.exports = function formatValues(values) {
  const minValue = Math.min(...values);
  return values.map((value) => {
    if (value === minValue) return chalk.bold.green(value);
    return value;
  });
};
