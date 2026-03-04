import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import nodePlugin from 'eslint-plugin-n';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // -------------------------------------------------------------
  // 🛑 ІГНОРУВАННЯ (замість .eslintignore)
  // -------------------------------------------------------------
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', 'out/**', 'public/**'],
  },

  // Базовий рекомендований набір для JavaScript
  js.configs.recommended,

  // -------------------------------------------------------------
  // ✅ FRONTEND (React)
  // -------------------------------------------------------------
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        IntersectionObserver: 'readonly',
        fetch: 'readonly',
        location: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        URLSearchParams: 'readonly',
        console: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      'prettier/prettier': 'error',
      'react/prop-types': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // Перевірка циклів
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // -------------------------------------------------------------
  // ✅ BACKEND (Node.js)
  // -------------------------------------------------------------
  {
    files: [
      'server/**/*.{js,cjs,mjs}',
      'api/**/*.{js,cjs,mjs}',
      'routes/**/*.{js,cjs,mjs}',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      n: nodePlugin,
      import: importPlugin,
    },
    rules: {
      ...nodePlugin.configs.recommended.rules,

      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // -------------------------------------------------------------
  // ⭐ ROOT FILES
  // -------------------------------------------------------------
  {
    files: ['*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
