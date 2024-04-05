import { Meta, StoryObj } from '@storybook/react'

import { BreadcrumbItem, Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>

type Story = StoryObj<typeof Breadcrumbs>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />

export const Default = {
    render: Template,
    args: {
        children: (
            <>
                <BreadcrumbItem href="/item-1">Item 1</BreadcrumbItem>
                <BreadcrumbItem href="/item-2">Item 2</BreadcrumbItem>
                <BreadcrumbItem asChild>
                    <span>Item 3</span>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrent>Item 4</BreadcrumbItem>
            </>
        ),
    },
} satisfies Story
