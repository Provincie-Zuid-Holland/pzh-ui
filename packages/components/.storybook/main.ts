import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: [
        './stories/Introduction.stories.mdx',
        './stories/*.stories.mdx',
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        {
            name: '@storybook/addon-essentials',
            options: {
                measure: false,
                outline: false,
            },
        },
        '@storybook/addon-links',
        '@storybook/addon-interactions',
        '@storybook/addon-storysource',
        '@storybook/addon-jest',
        'storybook-addon-react-router-v6',
        '@storybook/addon-a11y',
    ],
    core: {
        builder: '@storybook/builder-vite',
    },
    framework: '@storybook/react-vite',
    features: {
        storyStoreV7: true,
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: prop =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
    docs: {
        autodocs: true,
    },
    async viteFinal(config, { configType }) {
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                path: require.resolve('path-browserify'),
            },
        }

        return config
    },
}

export default config
