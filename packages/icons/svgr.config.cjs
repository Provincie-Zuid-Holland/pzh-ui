module.exports = {
    typescript: true,
    jsxRuntime: 'automatic',

    ref: true,
    dimensions: false,
    expandProps: 'end',
    prettier: false,

    svgProps: {
        fill: 'currentColor',
        width: '{size}',
        height: '{size}',
    },

    svgo: true,

    svgoConfig: {
        multipass: true,
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        removeViewBox: false,
                    },
                },
            },
        ],
    },

    template: require('./svgr-template.cjs'),
}