module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Separate import groups with newline by section
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
    //     'newlines-between': 'always',
    //   },
    // ],
    'no-console': 1, // Warning to reduce console logs used throughout app
    'react/prop-types': 0, // Not using prop-types because we have TypeScript
    'newline-before-return': 1,
    'no-useless-return': 1,
    'prefer-const': 1,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
