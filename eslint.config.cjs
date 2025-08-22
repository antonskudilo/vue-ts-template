const { defineConfig } = require('eslint/config');

const globals = require('globals');
const parser = require('vue-eslint-parser');
const vue = require('eslint-plugin-vue');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },

      parser: parser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ),

    plugins: {
      vue,
      '@typescript-eslint': typescriptEslint
    },

    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]);
