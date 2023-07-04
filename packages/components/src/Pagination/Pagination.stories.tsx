import { ComponentStory } from '@storybook/react'

import { Pagination, PaginationProps } from './Pagination'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Pagination',
    component: Pagination,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: PaginationProps) => <Pagination {...args} />

export const Default: ComponentStory<typeof Pagination> = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    onChange: console.log,
    total: 300,
}
