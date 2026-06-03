/// <reference types="vitest" />

import { extname, isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vitest/config'

const isExternal = (id: string) => !id.startsWith('.') && !isAbsolute(id)

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
        target: 'esnext',
        sourcemap: true,
        emptyOutDir: true,
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: isExternal,
            input: Object.fromEntries(
                glob
                    .sync('src/**/*.{ts,tsx}', {
                        ignore: ['**/*.test.tsx', '**/*.stories.tsx'],
                    })
                    .map(file => [
                        relative(
                            'src',
                            file.slice(0, file.length - extname(file).length)
                        ),
                        fileURLToPath(new URL(file, import.meta.url)),
                    ])
            ),
            output: {
                entryFileNames: '[name].js',
                assetFileNames: 'assets/[name][extname]',
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        },
    },

    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
})
