import { ComponentStory } from '@storybook/react'

import { Hyperlink, HyperlinkProps } from './Hyperlink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Hyperlink',
    component: Hyperlink,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: HyperlinkProps) => <Hyperlink {...args} />

export const Default: ComponentStory<typeof Hyperlink> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    text: 'Hyperlink text',
    to: '/to-page',
}
