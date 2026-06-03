import storybook from 'eslint-plugin-storybook'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    },
    {
        files: ['**/*.stories.@(ts|tsx)', '.storybook/**/*.@(ts|tsx)'],
        plugins: {
            storybook,
        },
        rules: {
            ...storybook.configs.recommended.rules,
        },
    }
)
