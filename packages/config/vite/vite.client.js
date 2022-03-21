const path = require('path')

const isExternal = id => !id.startsWith('.') && !path.isAbsolute(id)

module.exports = {
    esbuild: {
        minify: true,
    },
    build: {
        target: 'esnext',
        lib: {
            entry: path.resolve(path.resolve(path.dirname('')), 'src/index.ts'),
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: isExternal,
        },
    },
}
