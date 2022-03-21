const path = require('path')
const injectCss = require('./injectCss').default

const isExternal = id => !id.startsWith('.') && !path.isAbsolute(id)

module.exports = {
    plugins: [injectCss()],
    esbuild: {
        minify: true,
    },
    build: {
        target: 'esnext',
        lib: {
            entry: path.resolve(path.resolve(path.dirname('')), 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: isExternal,
        },
    },
}
