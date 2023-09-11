import { Meta, StoryObj } from '@storybook/react'

import { Pagination, PaginationProps } from './Pagination'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Pagination',
    component: Pagination,
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: PaginationProps) => <Pagination {...args} />

export const Default = {
    render: Template,
    args: {
        onChange: console.log,
        total: 228,
        limit: 10,
    },
} satisfies Story
