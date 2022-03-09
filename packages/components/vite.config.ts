import typescriptPlugin from '@rollup/plugin-typescript'

import { getClientConfiguration } from '../config/vite'

export default getClientConfiguration({
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
