import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vitest/config'

import packageJson from './package.json' with { type: 'json' }

const externalPackages = new Set([
    ...Object.keys(packageJson.dependencies),
    ...Object.keys(packageJson.peerDependencies),
])

const isExternal = (id: string) =>
    [...externalPackages].some(
        packageName => id === packageName || id.startsWith(`${packageName}/`)
    )

export default defineConfig({
    plugins: [
        react(),
        visualizer({
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html',
        }),
    ],

    resolve: {
        tsconfigPaths: true,
    },

    build: {
        target: 'es2022',
        sourcemap: true,
        emptyOutDir: true,

        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index',
        },

        rollupOptions: {
            external: isExternal,
            output: {
                banner: "'use client';",
                entryFileNames: 'index.js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name][extname]',
            },
        },
    },

    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
})
