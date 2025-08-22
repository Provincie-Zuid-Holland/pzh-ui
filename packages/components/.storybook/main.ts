import type { StorybookConfig } from '@storybook/react-vite'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
    stories: [
        './stories/Introduction.mdx',
        './stories/*.mdx',
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],

    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-jest'),
        getAbsolutePath('storybook-addon-remix-react-router'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-docs'),
    ],

    core: {},

    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop: any) => {
                if (prop.parent && /node_modules/.test(prop.parent.fileName)) {
                    return !(
                        prop.parent.name === 'AnchorHTMLAttributes' ||
                        prop.parent.name === 'AriaAttributes' ||
                        prop.parent.name === 'ButtonHTMLAttributes' ||
                        prop.parent.name === 'DOMAttributes' ||
                        prop.parent.name === 'FormHTMLAttributes' ||
                        prop.parent.name === 'HTMLAttributes' ||
                        prop.parent.name === 'ImgHTMLAttributes' ||
                        prop.parent.name === 'InputHTMLAttributes'
                    )
                }
                return true
            },
        },
    },

    async viteFinal(config) {
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                path: require.resolve('path-browserify'),
            },
        }

        return config
    },

    features: {
        measure: false,
        outline: false,
    },
}

export default config

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')))
}
