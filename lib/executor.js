function executor({ exec }, command, resolver = () => {}) {
  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) throw error;
      resolve(resolver());
    });
  });
}

const exec = require(`child_process`).exec;
const executorFactory = () => executor.bind(null, { exec });

exports.executor = executor;
exports.default = executorFactory();
