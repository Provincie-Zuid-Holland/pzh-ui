import { Meta, StoryObj } from '@storybook/react-vite'

import { FieldRadioGroup, FieldRadioGroupProps } from './FieldRadioGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRadioGroup',
    component: FieldRadioGroup,
} satisfies Meta<typeof FieldRadioGroup>

type Story = StoryObj<typeof FieldRadioGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRadioGroupProps) => <FieldRadioGroup {...args} />

export const Default = {
    render: Template,
    args: {
        name: 'radiogroup',
        label: 'Dit is een vraag',
        options: [
            {
                label: 'Option 1',
                value: 'option-1',
            },
            {
                label: 'Option 2',
                value: 'option-2',
            },
        ],
        value: 'option-1',
    },
} satisfies Story

export const Horizontal = {
    render: Template,
    args: {
        name: 'radiogroup',
        label: 'Dit is een vraag',
        options: [
            {
                label: 'Option 1',
                value: 'option-1',
            },
            {
                label: 'Option 2',
                value: 'option-2',
            },
        ],
        value: 'option-1',
        optionLayout: 'horizontal',
    },
} satisfies Story

export const WithBorder = {
    render: Template,
    args: {
        name: 'radiogroup',
        label: 'Dit is een vraag',
        options: [
            {
                label: 'Option 1',
                value: 'option-1',
            },
            {
                label: 'Option 2',
                value: 'option-2',
            },
        ],
        value: 'option-1',
        optionLayout: 'horizontal',
        withBorder: true,
    },
} satisfies Story
