import { ComponentStory } from '@storybook/react'

import { Feedback, FeedbackProps } from './Feedback'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Feedback',
    component: Feedback,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FeedbackProps) => <Feedback {...args} />

export const Default: ComponentStory<typeof Feedback> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    email: 'omgevingsbeleid@pzh.nl',
    website: 'obzh.nl',
}
