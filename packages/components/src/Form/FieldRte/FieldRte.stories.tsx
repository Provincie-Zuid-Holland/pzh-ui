import { Meta, StoryObj } from '@storybook/react-vite'

import { FieldRte, FieldRteProps } from './FieldRte'

const initialContent = `<h3>The heading of a big subsection can be H3</h3><h4>Whereas the heading of a section within that subsection can be H4</h4><h5>Smaller sections within the section that has H4 headings have H3</h5><p>You can use text to fill the sections you’ve made with content. <strong>Some content needs some extra emphasis on it</strong> whereas some terms like <i>terminology</i> require a little less emphasis. To get <u>your point across</u> you can use underline, but it might look like a <a href="#">link</a>. <s>This final sentence has been removed from the paragraph.</s></p><p>The content is left aligned, which is the most common in our work.</p><p>The new regulations apply to the following cities:</p><ul><li>The Hague</li><li>Rotterdam</li><li>Leiden</li></ul><p>The following steps need to be taken:</p><ol><li>Reduce</li><li>Reuse</li><li>Recycle</li></ol>`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRte',
    component: FieldRte,
} satisfies Meta<typeof FieldRte>

type Story = StoryObj<typeof FieldRte>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRteProps) => <FieldRte {...args} />

export const Default = {
    render: Template,
    args: {
        name: 'field-rte',
        onBlur: console.log,
        initialContent,
        placeholder: 'Start met typen...',
        customMenuOptions: [
            'heading',
            'subscript',
            'superscript',
            'image',
            'link',
            'table',
        ],
    },
} satisfies Story

export const Disabled = {
    render: Template,
    args: {
        name: 'field-rte',
        disabled: true,
        initialContent,
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
        name: 'field-rte',
        label: 'WYSIWYG',
        description: 'What you see is what you get',
        initialContent,
    },
} satisfies Story

export const LayoutGrid = {
    render: Template,
    args: {
        name: 'field-rte',
        label: 'WYSIWYG',
        description: 'What you see is what you get',
        layout: 'grid',
        initialContent,
    },
} satisfies Story

export const WithError = {
    render: Template,
    args: {
        name: 'field-rte',
        label: 'WYSIWYG',
        description: 'What you see is what you get',
        initialContent,
        hasError: true,
    },
} satisfies Story
