import { ComponentStory } from '@storybook/react'

import { FieldRte, FieldRteProps } from './FieldRte'

const initialContent = `
<p>
this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
<ul>
<li>That’s a bullet list with one …</li>
<li>
    … or two list items.
</li>
</ul>
<ol>
<li>That’s a ordered list with one …</li>
<li>
    … or two list items.
</li>
</ol>
<p>
Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<p>
I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRte',
    component: FieldRte,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRteProps) => <FieldRte {...args} />

export const Default: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'field-rte',
    onBlur: console.log,
    initialContent,
    placeholder: 'Start met typen...',
    customMenuOptions: ['image', 'link'],
}

export const Disabled: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
    name: 'field-rte',
    disabled: true,
    initialContent,
}

export const WithLabel: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    name: 'field-rte',
    label: 'WYSIWYG',
    description: 'What you see is what you get',
    initialContent,
}

export const LayoutGrid: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LayoutGrid.args = {
    name: 'field-rte',
    label: 'WYSIWYG',
    description: 'What you see is what you get',
    layout: 'grid',
    initialContent,
}

export const WithError: ComponentStory<typeof FieldRte> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithError.args = {
    name: 'field-rte',
    label: 'WYSIWYG',
    description: 'What you see is what you get',
    initialContent,
    hasError: true,
}
