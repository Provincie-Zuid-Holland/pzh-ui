import { Meta, StoryObj } from '@storybook/react-vite'

import { Tooltip, TooltipProps } from './Tooltip'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tooltip',
    component: Tooltip,
} satisfies Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TooltipProps) => (
    <div className="font-bold">
        <Tooltip {...args} />
    </div>
)

export const Default = {
    render: Template,
    args: {
        children: <p className="inline-block font-bold">hover me</p>,
        label: 'Tooltip',
    },
} satisfies Story

export const WithHTML = {
    render: Template,
    args: {
        children: <p className="inline-block font-bold">Tooltip with HTML</p>,
        label: '<p>Some <strong>HTML</strong> here</p>',
    },
} satisfies Story

export const WithReactNode = {
    render: Template,
    args: {
        children: <p className="inline-block font-bold">Tooltip with HTML</p>,
        label: <p>Label</p>,
    },
} satisfies Story
