import { Meta, StoryObj } from '@storybook/react'

import { Plus } from '@pzh-ui/icons'

import { PillButton, PillButtonProps } from './PillButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/PillButton',
    component: PillButton,
} satisfies Meta<typeof PillButton>

type Story = StoryObj<typeof PillButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: PillButtonProps) => <PillButton {...args} />

export const Default = {
    render: Template,
    args: {
        children: 'Button',
    },
} satisfies Story

export const WithIcon = {
    render: Template,
    args: {
        children: 'Button',
        icon: Plus as any,
    },
} satisfies Story

export const IsDisabled = {
    render: Template,
    args: {
        children: 'Button',
        icon: Plus as any,
        isDisabled: true,
    },
} satisfies Story
