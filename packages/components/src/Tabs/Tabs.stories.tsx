import { ComponentStory } from '@storybook/react'

import { Tabs, TabItem, TabsProps } from './Tabs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tabs',
    component: Tabs,
}

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

export const Default: ComponentStory<typeof Tabs> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    disabledKeys: ['3'],
}
