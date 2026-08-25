import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
    build: {
        target: 'es2022',
        emptyOutDir: true,
        sourcemap: true,

        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },

        rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].js',
            },
        },
    },
})