import typescriptPlugin from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

import { getClientConfiguration } from '../config/vite'

export default getClientConfiguration({
    plugins: [
        react({
            jsxRuntime: 'classic',
        }),
        visualizer(),
    ],
    build: {
        rollupOptions: {
            preserveModules: true,
            plugins: [
                babel({ babelHelpers: 'bundled' }),
                typescriptPlugin({
                    exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
                }),
            ],
        },
    },
    resolve: {
        alias: [
            {
                find: /^~.+/,
                replacement: val => {
                    return val.replace(/^~/, '')
                },
            },
        ],
    },
})
