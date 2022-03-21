const path = require('path')
const injectCss = require('./injectCss').default

const isExternal = id => !id.startsWith('.') && !path.isAbsolute(id)

module.exports = {
    esbuild: {
        minify: true,
    },
    plugins: [injectCss()],
    build: {
        target: 'esnext',
        lib: {
            entry: path.resolve(path.resolve(path.dirname('')), 'src/index.ts'),
        },
        rollupOptions: {
            external: isExternal,
        },
    },
}
