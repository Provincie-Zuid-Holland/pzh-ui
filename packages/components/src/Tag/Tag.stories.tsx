import { Meta, StoryObj } from '@storybook/react'

import { Tag, TagProps } from './Tag'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tag',
    component: Tag,
} satisfies Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TagProps) => <Tag {...args} />

export const Default = {
    render: Template,
    args: {
        text: 'Wegenbouw',
        onClick: null,
    },
} satisfies Story

export const Clickable = {
    render: Template,
    args: {
        text: 'Wegenbouw',
        onClick: () => alert('Clicked'),
    },
} satisfies Story
