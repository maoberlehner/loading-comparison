function executeCommand({ exec }, command, callback = () => {}) {
  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) throw error;
      resolve(callback());
    });
  });
}

const exec = require(`child_process`).exec;
const executeCommandFactory = () => executeCommand.bind(null, { exec });

exports.executeCommand = executeCommand;
exports.default = executeCommandFactory();
