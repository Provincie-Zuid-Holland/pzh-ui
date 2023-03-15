import { ComponentStory } from '@storybook/react'

import {
    FieldRteDeprecated,
    FieldRteDeprecatedProps,
} from './FieldRteDeprecated'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRteDeprecated',
    component: FieldRteDeprecated,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRteDeprecatedProps) => (
    <FieldRteDeprecated {...args} />
)

export const Default: ComponentStory<typeof FieldRteDeprecated> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'field-rte',
    onBlur: console.log,
    value: '<p>InitialValue</p><ul><li>List<ul><li>List 1</li><li>List 2</li></ul></li></ul><p>Hier nog meer content.</p>',
}

export const Disabled: ComponentStory<typeof FieldRteDeprecated> =
    Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
    name: 'field-rte',
    onBlur: console.log,
    value: '<p>InitialValue</p><ul><li>List<ul><li>List 1</li><li>List 2</li></ul></li></ul>',
    disabled: true,
}

export const WithLabel: ComponentStory<typeof FieldRteDeprecated> =
    Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    name: 'field-rte',
    onBlur: console.log,
    value: 'InitialValue',
    label: 'WYSIWYG',
    description: 'What you see is what you get',
}

export const LayoutGrid: ComponentStory<typeof FieldRteDeprecated> =
    Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LayoutGrid.args = {
    name: 'field-rte',
    onBlur: console.log,
    value: 'InitialValue',
    label: 'WYSIWYG',
    description: 'What you see is what you get',
    layout: 'grid',
}
