import { ComponentStory } from '@storybook/react'

import { DNABar, DNABarProps } from './DNABar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/DNABar',
    component: DNABar,
    argTypes: {
        blocks: {
            options: [2, 5, 6],
            control: { type: 'radio' },
        },
    },
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: DNABarProps) => <DNABar {...args} />

export const Default: ComponentStory<typeof DNABar> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    blocks: 6,
}
