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
}
