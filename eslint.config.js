/**** */
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import nodePlugin from 'eslint-plugin-n';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals'; // ✅ Додаємо цей імпорт

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 🛑 ІГНОРУВАННЯ
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', 'out/**', 'public/**'],
  },

  // Базовий рекомендований набір
  js.configs.recommended,

  // ✅ FRONTEND (React)
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      // ✅ Замість довгого списку використовуємо пресети
      globals: {
        ...globals.browser,
        ...globals.es2020,
        process: 'readonly', // Залишаємо для env змінних у Vite/Webpack
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

  // ✅ BACKEND (Node.js)
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
        ...globals.node, // ✅ Додає require, module, process автоматично
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
    },
  },

  // ⭐ ROOT FILES (Конфіги в корені)
  {
    files: ['*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],
    },
  },
];
