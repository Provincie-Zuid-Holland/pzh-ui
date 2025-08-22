import { Eye } from '@pzh-ui/icons'
import { Meta, StoryObj } from '@storybook/react-vite'

import { Button, ButtonProps } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Button',
    component: Button,
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ButtonProps) => <Button {...args} />

export const Primary = {
    render: Template,
    args: {
        variant: 'primary',
        children: 'Button',
    },
} satisfies Story

export const Secondary = {
    render: Template,
    args: {
        variant: 'secondary',
        children: 'Button',
    },
} satisfies Story

export const CTA = {
    render: Template,
    args: {
        variant: 'cta',
        children: 'Button',
    },
} satisfies Story

export const Disabled = {
    render: Template,
    args: {
        isDisabled: true,
        children: 'Button',
    },
} satisfies Story

export const WithIcon = {
    render: Template,
    args: {
        children: 'Button',
        icon: Eye as any,
    },
} satisfies Story

export const Link = {
    render: Template,
    args: {
        children: 'Button',
        variant: 'link',
    },
} satisfies Story
