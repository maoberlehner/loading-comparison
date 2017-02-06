function formatValues({ Math, chalk }, values) {
  const minValue = Math.min(...values);
  return values.map((value) => {
    if (value === minValue) return chalk.bold.green(value);
    return value;
  });
}

module.exports = function formatValuesFactory(dependencies) {
  return formatValues.bind(null, dependencies);
};
