const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './render/**/*.{js,jsx,ts,tsx}',
    path.join(
      './src/core/media/remotion/render',
      'render/**/*.{js,jsx,ts,tsx}'
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
