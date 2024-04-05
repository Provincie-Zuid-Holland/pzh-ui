import { Meta, StoryObj } from '@storybook/react'

import { ListLink, ListLinkProps } from './ListLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/ListLink',
    component: ListLink,
} satisfies Meta<typeof ListLink>

type Story = StoryObj<typeof ListLink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ListLinkProps) => <ListLink {...args} />

export const Default = {
    render: Template,
    args: {
        asChild: true,
        children: <a href="/to-page">ListLink text</a>,
    },
} satisfies Story
