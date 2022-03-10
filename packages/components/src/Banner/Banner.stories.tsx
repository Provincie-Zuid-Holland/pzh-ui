import { ComponentStory } from '@storybook/react'

import { Banner, BannerProps } from './Banner'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Banner',
    component: Banner,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: BannerProps) => <Banner {...args} />

export const Default: ComponentStory<typeof Banner> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    text: 'Let op! De Monitor Leefomgeving van Provincie Zuid-Holland is momenteel nog in ontwikkeling.',
    isActive: true,
    color: 'blue',
}
