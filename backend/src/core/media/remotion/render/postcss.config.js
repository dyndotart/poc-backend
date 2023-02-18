const path = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      // Not can't do it relative with '__dirname' as it is bundled in @remotion/cli
      // and thus the '__dirname' would resolve into that npm package
      config: path.join(
        './src/core/media/remotion/render',
        'tailwind.config.js'
      ),
    },
    autoprefixer: {},
    'postcss-preset-env': {},
  },
};
