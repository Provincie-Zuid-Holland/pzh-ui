import { Meta, StoryObj } from '@storybook/react'
import { Form, Formik } from 'formik'

import { FormikCheckboxGroup } from '../../Formik'
import {
    FieldCheckboxGroup,
    FieldCheckboxGroupProps,
} from './FieldCheckboxGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldCheckboxGroup',
    component: FieldCheckboxGroup,
} satisfies Meta<typeof FieldCheckboxGroup>

type Story = StoryObj<typeof FieldCheckboxGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldCheckboxGroupProps) => (
    <FieldCheckboxGroup {...args} />
)

const Test = (args: FieldCheckboxGroupProps) => (
    <Formik initialValues={{}} onSubmit={console.log}>
        <Form>
            <FormikCheckboxGroup {...args} />
        </Form>
    </Formik>
)

export const Default = {
    render: Template,
    args: {
        name: 'option',
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
    },
} satisfies Story

export const WithBorder = {
    render: Template,
    args: {
        name: 'radiogroup',
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
        optionLayout: 'horizontal',
        withBorder: true,
    },
} satisfies Story

export const WithLabel = {
    render: Test,
    args: {
        name: 'option',
        options: [
            {
                label: 'Option 1',
                value: 'option-1',
            },
        ],
        label: 'Form label',
        description: 'Korte omschrijving voor onder het label',
        required: true,
    },
} satisfies Story
