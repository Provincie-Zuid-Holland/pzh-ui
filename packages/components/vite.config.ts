import typescriptPlugin from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { visualizer } from 'rollup-plugin-visualizer'

import { getClientConfiguration } from '../config/vite'

export default getClientConfiguration({
    plugins: [visualizer()],
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
})
