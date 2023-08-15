import { ComponentStory } from '@storybook/react'

import { OLDModal, OLDModalProps } from './Modal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/OLDModal',
    component: OLDModal,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ ...args }: OLDModalProps) => <OLDModal {...args} />

export const Default: ComponentStory<typeof OLDModal> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    children: <p>Modal</p>,
    open: true,
    onClose: () => {},
    closeButton: true,
}
