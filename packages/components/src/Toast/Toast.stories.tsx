import { ComponentStory } from '@storybook/react'

import { ToastContainer, ToastContainerProps, toastNotification } from './Toast'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Toast',
    component: ToastContainer,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ToastContainerProps) => {
    const notify = () => toastNotification('Wow so easy !')

    return (
        <>
            <button onClick={notify}>Show toast!</button>
            <ToastContainer {...args} />
        </>
    )
}

export const Default: ComponentStory<typeof ToastContainer> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
