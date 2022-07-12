import { ComponentStory } from '@storybook/react'

import { Notification, NotificationProps } from './Notification'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Notification',
    component: Notification,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: NotificationProps) => <Notification {...args} />

export const Info: ComponentStory<typeof Notification> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Info.args = {
    children: 'Dit is een toelichting.',
    variant: 'info',
}

export const Alert: ComponentStory<typeof Notification> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Alert.args = {
    children: 'Dit is een melding.',
    variant: 'alert',
}
