import '../../css/src/tailwind.src.css'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },

    docs: {
        codePanel: true
    }
}
export const tags = ['autodocs'];
