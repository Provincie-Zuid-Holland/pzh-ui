import '@pzh-ui/css/src/tailwind.css'

import { withTests } from '@storybook/addon-jest'

import results from '../.jest-test-results.json'
import theme from './theme'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    docs: {
        theme,
    },
}

export const decorators = [
    withTests({
        results,
    }),
]
