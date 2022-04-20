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
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
        },
        colors: {
            black: '#000000',
            white: '#FFF',
            'pzh-form': '#F4F4F7',
            gray: {
                50: '#f9fafb',
                100: '#f7fafc',
                200: '#edf2f7',
                300: '#e2e8f0',
                400: '#cbd5e0',
                500: '#a0aec0',
                600: '#718096',
                700: '#4a5568',
                800: '#2d3748',
                900: '#1a202c',
            },
            red: {
                100: '#fff5f5',
                200: '#fed7d7',
                300: '#feb2b2',
                400: '#fc8181',
                500: '#f56565',
                600: '#e53e3e',
                700: '#c53030',
                800: '#9b2c2c',
                900: '#742a2a',
            },
            orange: {
                100: '#fffaf0',
                200: '#feebc8',
                300: '#fbd38d',
                400: '#f6ad55',
                500: '#ed8936',
                600: '#dd6b20',
                700: '#c05621',
                800: '#9c4221',
                900: '#7b341e',
            },
            yellow: {
                100: '#fffff0',
                200: '#fefcbf',
                300: '#faf089',
                400: '#f6e05e',
                500: '#ecc94b',
                600: '#d69e2e',
                700: '#b7791f',
                800: '#975a16',
                900: '#744210',
            },
            green: {
                100: '#f0fff4',
                200: '#c6f6d5',
                300: '#9ae6b4',
                400: '#68d391',
                500: '#48bb78',
                600: '#38a169',
                700: '#2f855a',
                800: '#276749',
                900: '#22543d',
            },
            teal: {
                100: '#e6fffa',
                200: '#b2f5ea',
                300: '#81e6d9',
                400: '#4fd1c5',
                500: '#38b2ac',
                600: '#319795',
                700: '#2c7a7b',
                800: '#285e61',
                900: '#234e52',
            },
            blue: {
                100: '#ebf8ff',
                200: '#bee3f8',
                300: '#90cdf4',
                400: '#63b3ed',
                500: '#4299e1',
                600: '#3182ce',
                700: '#2b6cb0',
                800: '#2c5282',
                900: '#2a4365',
            },
            indigo: {
                100: '#ebf4ff',
                200: '#c3dafe',
                300: '#a3bffa',
                400: '#7f9cf5',
                500: '#667eea',
                600: '#5a67d8',
                700: '#4c51bf',
                800: '#434190',
                900: '#3c366b',
            },
            purple: {
                100: '#faf5ff',
                200: '#e9d8fd',
                300: '#d6bcfa',
                400: '#b794f4',
                500: '#9f7aea',
                600: '#805ad5',
                700: '#6b46c1',
                800: '#553c9a',
                900: '#44337a',
            },
            pink: {
                100: '#fff5f7',
                200: '#fed7e2',
                300: '#fbb6ce',
                400: '#f687b3',
                500: '#ed64a6',
                600: '#d53f8c',
                700: '#b83280',
                800: '#97266d',
                900: '#702459',
            },
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
                DEFAULT: '#EBEBEB',
                light: '#F5F5F5',
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
        },
        extend: {
            opacity: {
                35: '0.35',
                55: '0.55',
            },
        },
    },
}
