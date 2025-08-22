/// <reference types="vitest" />
import { fileURLToPath } from 'node:url'
import { extname, isAbsolute, relative, resolve } from 'path'

import typescriptPlugin from '@rollup/plugin-typescript'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, PluginOption } from 'vite'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import tsconfigPaths from 'vite-tsconfig-paths'

// Consider marking external dependencies for Rollup explicitly
const isExternal = (id: string) => !id.startsWith('.') && !isAbsolute(id)

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        libInjectCss(),
        tsconfigPaths(),
        visualizer({
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html',
        }) as PluginOption,
    ],
    build: {
        target: 'esnext',
        sourcemap: true,
        emptyOutDir: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: isExternal,
            plugins: [
                typescriptPlugin({
                    exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
                }) as PluginOption,
            ],
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
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
})
