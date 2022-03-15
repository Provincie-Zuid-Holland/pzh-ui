import { faUser } from '@fortawesome/pro-solid-svg-icons'
import { ComponentStory } from '@storybook/react'

import { Button, ButtonProps } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'cta'],
            control: { type: 'select' },
        },
        size: {
            options: ['large', 'small'],
            control: { type: 'select' },
        },
    },
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ButtonProps) => <Button {...args} />

export const Primary: ComponentStory<typeof Button> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    variant: 'primary',
    label: 'Button',
}

export const Secondary: ComponentStory<typeof Button> = Template.bind({})
Secondary.args = {
    variant: 'secondary',
    label: 'Button',
}

export const CTA: ComponentStory<typeof Button> = Template.bind({})
CTA.args = {
    variant: 'cta',
    label: 'Button',
}

export const Disabled: ComponentStory<typeof Button> = Template.bind({})
Disabled.args = {
    label: 'Button',
    disabled: true,
}

export const WithIcon: ComponentStory<typeof Button> = Template.bind({})
WithIcon.args = {
    label: 'Button',
    icon: faUser,
}
