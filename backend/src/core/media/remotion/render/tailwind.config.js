const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './render/**/*.{js,jsx,ts,tsx}',
    './src/core/media/remotion/render/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
