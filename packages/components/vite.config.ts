import typescriptPlugin from '@rollup/plugin-typescript'
import { visualizer } from 'rollup-plugin-visualizer'

import { getClientConfiguration } from '../config/vite'

export default getClientConfiguration({
    plugins: [visualizer()],
    build: {
        rollupOptions: {
            plugins: [
                typescriptPlugin({
                    exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
                }),
            ],
        },
    },
})
