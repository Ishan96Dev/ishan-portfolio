import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'out', '.next']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Allow unused vars that start with uppercase OR are named `motion` / `err`
      // (`motion` is used as a JSX namespace — `motion.div`, `motion.a`, etc. —
      // which ESLint's static analysis does not recognise as a "use").
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]|^motion$|^err$',
        argsIgnorePattern: '^_',
      }],
    },
  },
])

