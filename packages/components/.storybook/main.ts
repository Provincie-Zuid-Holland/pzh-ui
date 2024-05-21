import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: [
        './stories/Introduction.mdx',
        './stories/*.mdx',
        '../src/**/*.mdx',
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
        '@storybook/addon-mdx-gfm',
    ],
    core: {},
    framework: {
        name: '@storybook/react-vite',
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
