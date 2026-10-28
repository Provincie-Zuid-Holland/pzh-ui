/** @type {import('prettier').Config} */
export default {
    // No prettier-plugin-tailwindcss: this package has no Tailwind classes to sort.
    plugins: ['@ianvs/prettier-plugin-sort-imports'],

    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    arrowParens: 'avoid',
    singleQuote: true,
    bracketSameLine: true,
    printWidth: 80,
    endOfLine: 'lf',

    importOrder: [
        '<BUILTIN_MODULES>',
        '',
        '^react$',
        '^react-dom$',
        '',
        '^@pzh-ui/(.*)$',
        '',
        '<THIRD_PARTY_MODULES>',
        '',
        '^@/(.*)$',
        '',
        '^\\.\\.',
        '^\\.',
    ],

    importOrderCaseSensitive: false,
}
