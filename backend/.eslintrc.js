const OFF = 0;
const WARNING = 1;
const ERROR = 2;

/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // '@remotion',
    'plugin:tailwindcss-jsx/recommended',
  ],
  settings: {
    tailwindConfigPath: './src/core/media/remotion/render/tailwind.config.js',
  },
  ignorePatterns: ['.eslintrc.js', 'tile-stencil'], // https://stackoverflow.com/questions/63002127/parsing-error-parseroptions-project-has-been-set-for-typescript-eslint-parser
  rules: {
    'no-console': WARNING,
    'no-var': ERROR,
    '@typescript-eslint/no-empty-function': WARNING,
    'prefer-const': WARNING,
    'no-undef': OFF,
    '@typescript-eslint/no-var-requires': WARNING,
    '@typescript-eslint/ban-ts-comment': WARNING,
  },
};
