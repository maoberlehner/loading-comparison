const exec = require(`child_process`).exec;

module.exports = function executor(command, resolver = () => {}) {
  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) throw error;
      resolve(resolver());
    });
  });
};
