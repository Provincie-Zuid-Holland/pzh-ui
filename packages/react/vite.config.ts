/// <reference types="vitest" />

import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vitest/config'

const externalPackages = ['react', 'react-dom', '@pzh-ui/icons']

const isExternal = (id: string) =>
    externalPackages.some(
        packageName => id === packageName || id.startsWith(`${packageName}/`)
    )

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        visualizer({
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html',
        }) as PluginOption,
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
