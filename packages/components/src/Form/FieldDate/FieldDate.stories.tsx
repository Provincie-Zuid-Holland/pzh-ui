import { ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { FieldDate, FieldDateProps } from './FieldDate'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldDate',
    component: FieldDate,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldDateProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null)

    return (
        <FieldDate
            {...args}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
        />
    )
}

export const Default: ComponentStory<typeof FieldDate> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'select',
    placeholderText: 'Datum',
}

export const Disabled: ComponentStory<typeof FieldDate> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
    name: 'select',
    placeholderText: 'Datum',
    disabled: true,
}

export const WithLabel: ComponentStory<typeof FieldDate> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    name: 'select',
    placeholderText: 'Datum',
    label: 'Datum',
    required: true,
}
