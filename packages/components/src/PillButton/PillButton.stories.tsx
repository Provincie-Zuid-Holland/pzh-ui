import { ComponentStory } from '@storybook/react'

import { PillButton, PillButtonProps } from './PillButton'
import { ElementType } from 'react'
import { Plus } from '@pzh-ui/icons'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/PillButton',
    component: PillButton,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: PillButtonProps<ElementType>) => <PillButton {...args} />

export const Default: ComponentStory<typeof PillButton> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    children: 'Button',
}

export const WithIcon: ComponentStory<typeof PillButton> = Template.bind({})
WithIcon.args = {
    children: 'Button',
    icon: Plus,
}

export const IsDisabled: ComponentStory<typeof PillButton> = Template.bind({})
IsDisabled.args = {
    children: 'Button',
    icon: Plus,
    isDisabled: true
}
