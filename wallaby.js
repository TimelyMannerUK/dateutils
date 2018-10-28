module.exports = function(w) {
  return {
    files: ['src/**/*.ts'],
    tests: ['./__tests__/*.test.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest',
    setup: function(wallaby) {
      var jestConfig = require('./package.json').jest;
      // for example:
      // jestConfig.globals = { "__DEV__": true };
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
