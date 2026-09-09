// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { dirname } from 'path'
import { fileURLToPath } from 'url'

import type { StorybookConfig } from '@storybook/react-vite'

/**
 * Resolves the absolute path of a package, which is needed in a monorepo.
 */
function getAbsolutePath(value: string) {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
    stories: [
        './stories/Introduction.mdx',
        './stories/*.mdx',
        './stories/*.stories.@(ts|tsx)',
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],

    // addon-a11y runs axe in a real browser, so it evaluates the colour-contrast
    // rule that axe disables under jsdom in the test suite.
    addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],

    framework: getAbsolutePath('@storybook/react-vite'),

    typescript: {
        // types.ts carries a TSDoc comment on every public prop, so the prop
        // tables and control descriptions are generated rather than written out.
        reactDocgen: 'react-docgen-typescript',
    },
}

export default config
