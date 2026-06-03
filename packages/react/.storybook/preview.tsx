import type { Preview } from '@storybook/react-vite'

import '../../css/src/tailwind.src.css'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview
