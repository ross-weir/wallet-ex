module.exports = {
  hooks: {
    'pre-commit': 'lint-staged --config lint-staged.config.js',
  },
};
