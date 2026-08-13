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

    tseslint.configs.recommended,

    {
        files: ['src/**/*.{ts,tsx}', 'setupTests.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    storybook.configs['flat/recommended']
)
