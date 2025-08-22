import { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'
import { Pagination, PaginationProps } from './Pagination'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Pagination',
    component: Pagination,
} satisfies Meta<typeof Pagination>

type Story = StoryObj<typeof Pagination>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: PaginationProps) => {
    const [page, setPage] = useState(1)
    return <Pagination {...args} current={page} onPageChange={setPage} />
}

export const Default = {
    render: Template,
    args: {
        total: 228,
        limit: 10,
    },
} satisfies Story
