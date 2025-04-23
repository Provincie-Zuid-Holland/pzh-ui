import { Meta, StoryObj } from '@storybook/react'

import { fn } from '@storybook/test'
import { TabItem, Tabs, TabsProps } from './Tabs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tabs',
    component: Tabs,
} satisfies Meta<typeof Tabs>

type Story = StoryObj<typeof Tabs>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TabsProps) => (
    <Tabs {...args}>
        <TabItem title="Tab 1" key="1">
            Tab 1
        </TabItem>
        <TabItem title="Tab 2" key="2">
            Tab 2
        </TabItem>
        <TabItem title="Tab 3" key="3">
            Tab 3
        </TabItem>
    </Tabs>
)

export const Default: Story = {
    render: Template,
    args: {
        disabledKeys: ['3'],
        onSelectionChange: fn(),
    },
} satisfies Story

export const Filled: Story = {
    render: Template,
    args: {
        disabledKeys: ['3'],
        variant: 'filled',
        className: 'place-self-center',
        onSelectionChange: fn(),
    },
} satisfies Story
