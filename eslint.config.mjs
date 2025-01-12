import love from 'eslint-config-love';
import prettier from 'eslint-config-prettier';
import typescriptEslintParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
      'build',
      '.prettierrc',
      '.eslintrc',
      'vite-env.d.ts',
      'eslint.config.mjs'
    ],
  },
  {
    languageOptions: {
      parser: typescriptEslintParser,
      globals: {
        browser: true,
        node: true,
      },
    },
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    // Specify plugins only if they are not already included in imported configs
    plugins: {
      'prettier': eslintPluginPrettier,
      'import': eslintPluginImport,
      // No need to specify @typescript-eslint here if it's already included in love
    },
    rules: {
      'no-console': 'off',
      'linebreak-style': 'off',
      'no-plusplus': 'off',
      '@typescript-eslint/no-unused-vars': 'warn', // Example rule
    },
  },
  // Include shared configuration directly in the array
  love,
  prettier,
];