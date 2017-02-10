function executeCommand({ exec }, command, resolver = () => {}) {
  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) throw error;
      resolve(resolver());
    });
  });
}

const exec = require(`child_process`).exec;
const executeCommandFactory = () => executeCommand.bind(null, { exec });

exports.executeCommand = executeCommand;
exports.default = executeCommandFactory();
