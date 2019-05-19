const path = require("path");
const callsite = require("callsite");

const fakify = (moduleRelativePath, stubs) => {
  const stack = callsite();
  const requester = stack[1].getFileName();

  const dirName = `${path.dirname(requester)}/`;

  if (require.cache[require.resolve(dirName + moduleRelativePath)]) {
    delete require.cache[require.resolve(dirName + moduleRelativePath)];
  }

  Object.keys(stubs).forEach(dependencyRelativePath => {
    require.cache[require.resolve(dirName + dependencyRelativePath)] = {
      exports: stubs[dependencyRelativePath]
    };
  });

  return require(dirName + moduleRelativePath);
};

module.exports = fakify;
