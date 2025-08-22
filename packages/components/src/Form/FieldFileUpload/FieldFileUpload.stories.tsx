import { Meta, StoryObj } from '@storybook/react-vite'

import { FieldFileUpload, FieldFileUploadProps } from './FieldFileUpload'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldFileUpload',
    component: FieldFileUpload,
} satisfies Meta<typeof FieldFileUpload>

type Story = StoryObj<typeof FieldFileUpload>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldFileUploadProps) => <FieldFileUpload {...args} />

export const Default = {
    render: Template,
    args: {
        name: 'file-upload',
        onChange: e => console.log(e),
        maxFiles: 1,
        preview: true,
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
        name: 'file-upload',
        label: 'Form label',
        maxFiles: 1,
        preview: true,
        required: true,
    },
} satisfies Story

export const LayoutGrid = {
    render: Template,
    args: {
        name: 'file-upload',
        label: 'Form label',
        layout: 'grid',
    },
} satisfies Story

export const WithoutDescription = {
    render: Template,
    args: {
        name: 'file-upload',
        label: 'Form label',
        hideDescription: true,
        hideIcon: true,
        className: 'py-24',
        accept: {
            '*': [],
        },
    },
} satisfies Story
