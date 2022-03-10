import { ComponentStory } from '@storybook/react'

import { Tag, TagProps } from './Tag'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tag',
    component: Tag,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: TagProps) => <Tag {...args} />

export const Default: ComponentStory<typeof Tag> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    text: 'Wegenbouw',
    onClick: null,
}

export const Clickable: ComponentStory<typeof Tag> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Clickable.args = {
    text: 'Wegenbouw',
    onClick: () => alert('Clicked'),
}
