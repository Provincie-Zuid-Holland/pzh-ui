module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' }, modules: false }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: [
        [
            'import',
            {
                libraryName: 'react-use',
                libraryDirectory: 'lib',
                camel2DashComponentName: false,
            },
        ],
    ],
}
