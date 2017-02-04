function executor({ exec }, command, resolver = () => {}) {
  return new Promise((resolve) => {
    exec(command, (error) => {
      if (error) throw error;
      resolve(resolver());
    });
  });
}

module.exports = function executorFactory(dependencies) {
  return executor.bind(null, dependencies);
};
