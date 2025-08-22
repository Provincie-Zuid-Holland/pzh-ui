import { Meta, StoryObj } from '@storybook/react-vite'
import { TypeOptions } from 'react-toastify'

import { ToastContainer, ToastContainerProps, toastNotification } from './Toast'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Toast',
    component: ToastContainer,
} satisfies Meta<typeof ToastContainer>

type Story = StoryObj<typeof ToastContainer>

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
                className="mt-4 block">
                Error
            </button>

            <button
                onClick={() => notify('Warning toast!', 'warning')}
                className="mt-4 block">
                Warning
            </button>

            <button
                onClick={() => notify('Info toast!', 'info')}
                className="mt-4 block">
                Info
            </button>

            <button
                onClick={() =>
                    notify(
                        'Toast with quite some content. How does it handle?',
                        'info'
                    )
                }
                className="mt-4 block">
                Large
            </button>
            <ToastContainer {...args} />
        </>
    )
}

export const Default = {
    render: Template,
    args: {},
} satisfies Story
