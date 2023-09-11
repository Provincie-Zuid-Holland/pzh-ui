/// <reference types="vitest" />
import typescriptPlugin from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'classic',
            babel: {
                configFile: true,
            },
        }),
        visualizer(),
        tsconfigPaths(),
    ],
    build: {
        target: 'esnext',
        sourcemap: true,
        rollupOptions: {
            plugins: [
                typescriptPlugin({
                    exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
                }),
            ],
            output: {
                entryFileNames: '[name].[format].js',
                preserveModules: true,
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
    },
})
