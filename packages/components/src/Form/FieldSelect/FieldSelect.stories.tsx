import { Meta, StoryObj } from '@storybook/react'

import { MagnifyingGlass } from '@pzh-ui/icons'

import { FieldSelect, FieldSelectProps } from './FieldSelect'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldSelect',
    component: FieldSelect,
} satisfies Meta<typeof FieldSelect>

type Story = StoryObj<typeof FieldSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldSelectProps) => <FieldSelect {...args} />

export const Default = {
    render: Template,
    args: {
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
    },
} satisfies Story

export const DisabledEmpty = {
    render: Template,
    args: {
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
    },
} satisfies Story

export const DisabledFilled = {
    render: Template,
    args: {
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
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
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
    },
} satisfies Story

export const IsMulti = {
    render: Template,
    args: {
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
        isSearchable: true,
        controlShouldRenderValue: false,
    },
} satisfies Story

export const IsMultiGrouped = {
    render: Template,
    args: {
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
    },
} satisfies Story

export const LayoutGrid = {
    render: Template,
    args: {
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
    },
} satisfies Story

export const Clearable = {
    render: Template,
    args: {
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
    },
} satisfies Story

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

export const Async = {
    render: Template,
    args: {
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
    },
} satisfies Story
