const rewireEslint = require('react-app-rewire-eslint');

const overrideOptions = (options) => {
  options.eslintPath = require.resolve('eslint')
};

module.exports = function override(config, env) {
  config = rewireEslint(config, env, overrideOptions)
  return config
};