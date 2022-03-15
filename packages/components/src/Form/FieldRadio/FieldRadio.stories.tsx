import { ComponentStory } from '@storybook/react'

import { FieldRadio, FieldRadioProps } from './FieldRadio'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRadio',
    component: FieldRadio,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRadioProps) => <FieldRadio {...args} />

export const Default: ComponentStory<typeof FieldRadio> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    id: 'option-1',
    label: 'Option 1',
    name: 'option-1',
}

export const Disabled: ComponentStory<typeof FieldRadio> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
    id: 'option-1',
    label: 'Option 1',
    name: 'option-1',
    disabled: true,
}
