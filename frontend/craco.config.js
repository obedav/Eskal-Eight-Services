const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ensure CSS is processed correctly
      return webpackConfig;
    },
  },
}
