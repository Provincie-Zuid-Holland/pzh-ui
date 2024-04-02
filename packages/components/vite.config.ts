/// <reference types="vitest" />
import typescriptPlugin from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { PluginOption, defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const isExternal = id => !id.startsWith('.') && !path.isAbsolute(id)

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'classic',
            babel: {
                configFile: true,
            },
        }),
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
            output: {
                entryFileNames: '[name].js',
                preserveModules: true,
            },
        },
        lib: {
            entry: path.resolve(path.resolve(path.dirname('')), 'src/index.ts'),
            formats: ['es'],
        },
    },
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
})
