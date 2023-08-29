module.exports = {
    plugins: [
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss',
    ],
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    arrowParens: 'avoid',
    singleQuote: true,
    bracketSameLine: true,
    importOrder: [
        '<THIRD_PARTY_MODULES>',
        '^@pzh-ui/(.*)$',
        '^@/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}
