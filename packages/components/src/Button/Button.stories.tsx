import { Eye } from '@pzh-ui/icons'
import { ComponentStory } from '@storybook/react'

import { Button, ButtonProps } from './Button'
import { ElementType } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'cta', 'link', 'default'],
            control: { type: 'select' },
        },
        size: {
            options: ['large', 'small'],
            control: { type: 'select' },
        },
    },
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ButtonProps<ElementType>) => (
    <Router>
        <Button {...args} />
    </Router>
)

export const Primary: ComponentStory<typeof Button> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    as: 'a',
    variant: 'primary',
    children: 'Button',
    href: '/test',
}

export const Secondary: ComponentStory<typeof Button> = Template.bind({})
Secondary.args = {
    variant: 'secondary',
    children: 'Button',
}

export const CTA: ComponentStory<typeof Button> = Template.bind({})
CTA.args = {
    variant: 'cta',
    children: 'Button',
}

export const Disabled: ComponentStory<typeof Button> = Template.bind({})
Disabled.args = {
    children: 'Button',
    isDisabled: true,
}

export const WithIcon: ComponentStory<typeof Button> = Template.bind({})
WithIcon.args = {
    children: 'Button',
    icon: Eye,
}

export const Link: ComponentStory<typeof Button> = Template.bind({})
Link.args = {
    children: 'Button',
    variant: 'link',
}
