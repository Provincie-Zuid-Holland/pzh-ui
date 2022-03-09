const path = require('path')

module.exports = {
    build: {
        lib: {
            entry: path.resolve(path.resolve(path.dirname('')), 'src/index.ts'),
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                },
            },
        },
    },
}
