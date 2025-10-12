import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores(['.babelrc.js', '**/generated/*.ts', 'lib/*', 'src/LookupCss.css', '.storybook/react-jsx-*']),
    {
        extends: compat.extends(
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
            'prettier',
            'plugin:storybook/recommended',
        ),

        plugins: {
            react,
            'react-hooks': fixupPluginRules(reactHooks),
            '@typescript-eslint': typescriptEslint,
            prettier,
            sonarjs,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 12,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                pragma: 'React',
                version: 'detect',
            },
        },

        rules: {
            eqeqeq: [2, 'smart'],
            'react/jsx-sort-props': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'prettier/prettier': 'error',
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            'linebreak-style': ['error', 'windows'],

            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                },
            ],

            semi: ['error', 'always'],
        },
    },
]);
