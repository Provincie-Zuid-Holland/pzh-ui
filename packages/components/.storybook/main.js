module.exports = {
    stories: [
        './stories/Introduction.stories.mdx',
        './stories/*.stories.mdx',
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-jest',
    ],
    framework: '@storybook/react',
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // https://github.com/polkadot-js/extension/issues/621#issuecomment-759341776
        // framer-motion uses the .mjs notation and we need to include it so that webpack will
        // transpile it for us correctly (enables using a CJS module inside an ESM).
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        })
        // Return the altered config
        return config
    },
}
