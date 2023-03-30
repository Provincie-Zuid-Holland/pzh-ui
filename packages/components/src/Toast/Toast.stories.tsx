import { ComponentStory } from '@storybook/react'
import { TypeOptions } from 'react-toastify'

import { ToastContainer, ToastContainerProps, toastNotification } from './Toast'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Toast',
    component: ToastContainer,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ToastContainerProps) => {
    const notify = (message: string, type?: TypeOptions) =>
        toastNotification(message, { type })

    return (
        <>
            <button
                onClick={() => notify('Success toast!', 'success')}
                className="block">
                Success
            </button>

            <button
                onClick={() => notify('Error toast!', 'error')}
                className="block mt-4">
                Error
            </button>

            <button
                onClick={() => notify('Warning toast!', 'warning')}
                className="block mt-4">
                Warning
            </button>

            <button
                onClick={() => notify('Info toast!', 'info')}
                className="block mt-4">
                Info
            </button>

            <button
                onClick={() =>
                    notify(
                        'Toast with quite some content. How does it handle?',
                        'info'
                    )
                }
                className="block mt-4">
                Large
            </button>
            <ToastContainer {...args} />
        </>
    )
}

export const Default: ComponentStory<typeof ToastContainer> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
