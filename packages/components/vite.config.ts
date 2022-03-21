import typescriptPlugin from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { visualizer } from 'rollup-plugin-visualizer'

import { getClientConfiguration } from '../config/vite'

export default getClientConfiguration({
    plugins: [visualizer()],
    build: {
        lib: {
            name: 'Components',
            fileName: format => `components.${format}.js`,
        },
        rollupOptions: {
            plugins: [
                babel({ babelHelpers: 'bundled' }),
                typescriptPlugin({
                    exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
                }),
            ],
        },
    },
})
