// eslint.config.mjs
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import next from '@next/eslint-plugin-next'

export default tseslint.config(
  // Ignore build and vendor dirs
  { ignores: ['.next/**', 'node_modules/**', 'dist/**'] },

  // Base + TypeScript rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Project rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // set to false so we don't need a TS project during CI
        project: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@next/next': next,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // Relax noisy Next rules for now
      '@next/next/no-img-element': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  }
)
