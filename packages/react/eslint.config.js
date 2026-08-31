import storybook from 'eslint-plugin-storybook'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
    globalIgnores([
        'dist/**',
        'storybook-static/**',
        'coverage/**',
        'analyse.html',
    ]),

    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [...tseslint.configs.recommendedTypeChecked],

        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },

        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    enableAutofixRemoval: {
                        imports: true,
                    },
                },
            ],
        },
    },

    {
        files: ['vite.config.ts', '.storybook/**/*.{ts,tsx}', 'setupTests.ts'],
        extends: [
            ...tseslint.configs.recommended,
            tseslint.configs.disableTypeChecked,
        ],
    },

    storybook.configs['flat/recommended']
)
