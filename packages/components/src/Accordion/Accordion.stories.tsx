import { Meta, StoryObj } from '@storybook/react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionProps,
    AccordionTrigger,
} from './Accordion'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Accordion',
    component: Accordion,
} satisfies Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: AccordionProps) => (
    <Accordion {...args}>
        <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

export const Default = {
    render: Template,
    args: {
        collapsible: true,
    },
} satisfies Story

export const Multiple = {
    render: Template,
    args: {
        type: 'multiple',
    },
} satisfies Story
