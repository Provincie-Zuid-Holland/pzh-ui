// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vitest/config'

import packageJson from './package.json' with { type: 'json' }

// Guarded: this package has no runtime dependencies, and `yarn install` strips
// an empty "dependencies" block from package.json, so the key is not always there.
const externalPackages = new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
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
                // Rollup drops per-module directives when it bundles. Every module
                // in this library is a client component, so one directive on the
                // bundle is exactly right.
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
