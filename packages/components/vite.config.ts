import typescriptPlugin from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { getClientConfiguration } from '../config/vite'

export default getClientConfiguration({
    plugins: [
        react({
            jsxRuntime: 'classic',
            babel: {
                configFile: true,
            },
        }),
        visualizer(),
    ],
    build: {
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
})
