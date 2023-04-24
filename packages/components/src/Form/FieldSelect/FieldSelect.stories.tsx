import { MagnifyingGlass } from '@pzh-ui/icons'
import { ComponentStory } from '@storybook/react'

import { FieldSelect, FieldSelectProps } from './FieldSelect'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldSelect',
    component: FieldSelect,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldSelectProps) => <FieldSelect {...args} />

export const Default: ComponentStory<typeof FieldSelect> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'select',
    placeholder: 'Placeholder',
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
}

export const DisabledEmpty: ComponentStory<typeof FieldSelect> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledEmpty.args = {
    name: 'select',
    placeholder: 'Placeholder',
    disabled: true,
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
}

export const DisabledFilled: ComponentStory<typeof FieldSelect> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisabledFilled.args = {
    name: 'select',
    placeholder: 'Placeholder',
    disabled: true,
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
    defaultValue: {
        label: 'Option 2',
        value: 'option-2',
    },
}

export const WithLabel: ComponentStory<typeof FieldSelect> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    name: 'select',
    placeholder: 'Placeholder',
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
    label: 'Form label',
    description: 'Korte omschrijving voor onder het label',
}

export const IsMulti: ComponentStory<typeof FieldSelect> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IsMulti.args = {
    name: 'select',
    placeholder: 'Placeholder',
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
    defaultValue: {
        label: 'Option 1',
        value: 'option-1',
    },
    label: 'Form label',
    description: 'Korte omschrijving voor onder het label',
    isMulti: true,
    closeMenuOnSelect: false,
    hideSelectedOptions: false,
}

export const IsMultiGrouped: ComponentStory<typeof FieldSelect> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IsMultiGrouped.args = {
    name: 'select',
    placeholder: 'Placeholder',
    options: [
        {
            label: 'Group 1',
            options: [
                {
                    label: 'Option 1',
                    value: 'option-1',
                },
                {
                    label: 'Option 2',
                    value: 'option-2',
                },
                {
                    label: 'Option 3',
                    value: 'option-3',
                },
            ],
        },
        {
            label: 'Group 2',
            options: [
                {
                    label: 'Option 4',
                    value: 'option-4',
                },
                {
                    label: 'Option 5',
                    value: 'option-5',
                },
                {
                    label: 'Option 6',
                    value: 'option-6',
                },
            ],
        },
    ],
    defaultValue: {
        label: 'Option 1',
        value: 'option-1',
    },
    label: 'Form label',
    description: 'Korte omschrijving voor onder het label',
    isMulti: true,
    closeMenuOnSelect: false,
    hideSelectedOptions: false,
}

export const LayoutGrid: ComponentStory<typeof FieldSelect> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LayoutGrid.args = {
    name: 'select',
    placeholder: 'Placeholder',
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
    label: 'Form label',
    description: 'Korte omschrijving voor onder het label',
    layout: 'grid',
}

export const Clearable: ComponentStory<typeof FieldSelect> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Clearable.args = {
    name: 'select',
    placeholder: 'Placeholder',
    options: [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ],
    isClearable: true,
}

const filterColors = (inputValue: string) => {
    return [
        {
            label: 'Option 1',
            value: 'option-1',
        },
        {
            label: 'Option 2',
            value: 'option-2',
        },
        {
            label: 'Option 3',
            value: 'option-3',
        },
    ].filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
}

const loadOptions = (
    inputValue: string,
    callback: (options: { label: string; value: string }[]) => void
) => {
    setTimeout(() => {
        callback(filterColors(inputValue))
    }, 1000)
}

export const Async: ComponentStory<typeof FieldSelect> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Async.args = {
    name: 'select',
    placeholder: 'Placeholder',
    loadOptions,
    cacheOptions: true,
    isAsync: true,
    components: {
        DropdownIndicator: () => (
            <div className="mr-4">
                <MagnifyingGlass className="text-pzh-blue-dark" />
            </div>
        ),
    },
}
