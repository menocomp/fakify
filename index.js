const fakify = (moduleRelativePath, stubs) => {
  if (require.cache[require.resolve(moduleRelativePath)]) {
    delete require.cache[require.resolve(moduleRelativePath)];
  }

  Object.keys(stubs).forEach(dependencyRelativePath => {
    require.cache[require.resolve(dependencyRelativePath)] = {
      exports: stubs[dependencyRelativePath]
    };
  });

  return require(moduleRelativePath);
};

module.exports = fakify;