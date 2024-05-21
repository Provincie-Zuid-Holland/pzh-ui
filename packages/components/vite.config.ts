/// <reference types="vitest" />
import { fileURLToPath } from 'node:url'
import { extname, isAbsolute, relative, resolve } from 'path'

import typescriptPlugin from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption, defineConfig } from 'vite'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import tsconfigPaths from 'vite-tsconfig-paths'

const isExternal = id => !id.startsWith('.') && !isAbsolute(id)

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'classic',
            babel: {
                configFile: true,
            },
        }),
        libInjectCss(),
        visualizer({
            template: 'treemap', // or sunburst
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html', // will be saved in project's root
        }) as PluginOption,
        tsconfigPaths(),
    ],
    build: {
        target: 'esnext',
        sourcemap: true,
        emptyOutDir: true,
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
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
            },
        },
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
    },
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        coverage: {
            exclude: ['node_modules/', 'src/*.stories.tsx'],
        },
    },
})
