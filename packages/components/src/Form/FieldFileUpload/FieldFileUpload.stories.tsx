import { ComponentStory } from '@storybook/react'

import { FieldFileUpload, FieldFileUploadProps } from './FieldFileUpload'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldFileUpload',
    component: FieldFileUpload,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldFileUploadProps) => <FieldFileUpload {...args} />

export const Default: ComponentStory<typeof FieldFileUpload> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    name: 'file-upload',
    onChange: e => console.log(e),
}

export const WithLabel: ComponentStory<typeof FieldFileUpload> = Template.bind(
    {}
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLabel.args = {
    name: 'file-upload',
    label: 'Form label',
}
