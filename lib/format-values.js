function formatValues({ Math, chalk }, values) {
  const minValue = Math.min(...values);
  return values.map((value) => {
    if (value === minValue) return chalk.bold.green(value);
    return value;
  });
}

const chalk = require(`chalk`);
const formatValuesFactory = () => formatValues.bind(null, { Math, chalk });

exports.formatValues = formatValues;
exports.default = formatValuesFactory();
