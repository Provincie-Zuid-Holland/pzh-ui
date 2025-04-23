import type { Config } from 'tailwindcss'

export default {
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        li: {
                            p: {
                                margin: 0,
                            },
                            '&>ol': {
                                margin: 0,
                            },
                            '&>ul': {
                                margin: 0,
                            },
                        },
                    },
                },
            },
        },
    },
} satisfies Config
