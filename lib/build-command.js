function buildCommand(options) {
  const commandParts = [];
  options.forEach((option) => {
    if (typeof option === `string`) {
      commandParts.push(option);
    } else {
      commandParts.push(...Object.keys(option).map(x => `--${x} ${option[x]}`.trim()));
    }
  });
  return commandParts.join(` `);
}

const buildCommandFactory = () => buildCommand.bind(null);

exports.buildCommand = buildCommand;
exports.default = buildCommandFactory();
