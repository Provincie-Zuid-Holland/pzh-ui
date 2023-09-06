module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    variants: {
        pointerEvents: ['responsive', 'hover'],
        display: ['responsive', 'hover', 'group-hover'],
        textDecoration: ['responsive', 'hover', 'focus', 'group-hover'],
        roundedFull: ['responsive', 'focus'],
        margin: ['responsive', 'group-hover'],
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
        borderWidth: ['hover'],
        borderOpacity: ['hover'],
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/custom-forms'),
        require('@tailwindcss/typography'),
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1440px',
        },
        fontSize: {
            s: ['1rem', '1.5rem'],
            m: ['1.25rem', '1.875rem'],
            l: ['1.5rem', '1.875rem'],
        },
        colors: {
            black: '#000000',
            white: '#FFF',
            'pzh-form': '#F4F4F7',
            /** Add custom PZH colors */
            'pzh-red': {
                DEFAULT: '#d11f3d',
                light: '#eb7085',
                dark: '#97162c',
            },
            'pzh-yellow': {
                DEFAULT: '#efcc36',
                light: '#f1db7e',
                dark: '#c6a410',
            },
            'pzh-blue': {
                DEFAULT: '#281f6b',
                light: '#7badde',
                dark: '#16113b',
                'super-light': '#ececf3', // Custom
            },
            'pzh-pink': {
                DEFAULT: '#aa0067',
                light: '#d76aac',
                dark: '#750047',
            },
            'pzh-orange': {
                DEFAULT: '#ff6b02',
                light: '#fba66a',
                dark: '#b24a00',
            },
            'pzh-apple-green': {
                DEFAULT: '#76bc21',
                light: '#add57d',
                dark: '#629623',
            },
            'pzh-green': {
                DEFAULT: '#00804d',
                light: '#61b375',
                dark: '#004d2e',
            },
            'pzh-purple': {
                DEFAULT: '#503d90',
                light: '#9b99cc',
                dark: '#32265a',
            },
            'pzh-gray': {
                800: '#222222',
                700: '#464646',
                600: '#5C5C5C',
                500: '#838383',
                400: '#BFBFBF',
                300: '#D5D5D5',
                200: '#E6E6E6',
                100: '#F8F8F8',
            },
            'pzh-cool-gray': {
                DEFAULT: '#838383',
                light: '#bfbfbf',
                dark: '#5c5c5c',
            },
            'pzh-warm-gray': {
                DEFAULT: '#847062',
                light: '#beb1a7',
                dark: '#584b41',
            },
            'pzh-badge': {
                green: '#50A658',
                red: '#CB3B36',
                orange: '#F9B53C',
            },
            'pzh-white': {
                DEFAULT: '#FFFFFF',
            },
            'pzh-ui': {
                white: '#FFFFFF',
                'light-blue': '#E5EFF8',
            },
        },
        extend: {
            opacity: {
                35: '0.35',
                55: '0.55',
            },
            boxShadow: {
                card: '0px 18px 60px rgba(0, 0, 0, 0.07), 0px 4.02054px 13.4018px rgba(0, 0, 0, 0.0417275), 0px 1.19702px 3.99006px rgba(0, 0, 0, 0.0282725)',
            },
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
}
