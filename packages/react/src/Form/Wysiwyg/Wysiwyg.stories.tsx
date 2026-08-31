import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldError, FieldLabel } from '../Field'
import { Wysiwyg } from './Wysiwyg'

const initialContent = `<h3>The heading of a big subsection can be H3</h3><h4>Whereas the heading of a section within that subsection can be H4</h4><h5>Smaller sections within the section that has H4 headings have H3</h5><p>You can use text to fill the sections you’ve made with content. <b>Some content needs some extra emphasis on it</b> whereas some terms like <i>terminology</i> require a little less emphasis. To get <u>your point across</u> you can use underline, but it might look like a <a href="#">link</a>. <s>This final sentence has been removed from the paragraph.</s></p><p>The content is left aligned, which is the most common in our work.</p><p>The new regulations apply to the following cities:</p><ul><li>The Hague</li><li>Rotterdam</li><li>Leiden</li></ul><p>The following steps need to be taken:</p><ol><li>Reduce</li><li>Reuse</li><li>Recycle</li></ol>`

const meta = {
    title: 'Componenten/Form/Wysiwyg',
    component: Wysiwyg,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div className="w-[min(800px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
    args: {
        placeholder: 'Begin met typen...',
    },
} satisfies Meta<typeof Wysiwyg>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <Field className="flex-col">
            <FieldLabel required>Beschrijving</FieldLabel>

            <FieldDescription>
                Geef een beschrijving van het beleid.
            </FieldDescription>

            <Wysiwyg {...args} />
        </Field>
    ),
}

export const WithContent: Story = {
    args: {
        value: initialContent,
        toolbar: [
            'heading',
            'bold',
            'italic',
            'underline',
            'strike',
            'bulletList',
            'orderedList',
            'link',
        ],
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />
        </Field>
    ),
}

export const Disabled: Story = {
    args: {
        disabled: true,
        value: `<p>Deze editor is uitgeschakeld en kan niet worden aangepast.</p>`,
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />
        </Field>
    ),
}

export const Invalid: Story = {
    args: {
        invalid: true,
        value: '<p>Deze inhoud bevat een fout.</p>',
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel required>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />

            <FieldError>Vul een geldige beschrijving in.</FieldError>
        </Field>
    ),
}

export const AllMenuOptions: Story = {
    args: {
        toolbar: [
            'heading',
            'bold',
            'italic',
            'underline',
            'strike',
            'alignLeft',
            'alignCenter',
            'alignRight',
            'alignJustify',
            'table',
            'bulletList',
            'orderedList',
            'subscript',
            'superscript',
            'link',
            'image',
        ],
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel required>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />
        </Field>
    ),
}
