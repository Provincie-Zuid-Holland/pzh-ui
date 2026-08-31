import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './Accordion'

const meta = {
    title: 'Componenten/Accordion',
    component: Accordion,
    parameters: { layout: 'centered' },
    argTypes: {
        size: { control: 'select', options: ['l', 'm'] },
        variant: { control: 'select', options: ['underline', 'outline'] },
    },
    args: { size: 'l', variant: 'underline' },
    decorators: [
        Story => (
            <div className="w-[min(650px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <Accordion {...args}>
            <AccordionItem id="one">
                <AccordionTrigger>Accordion title</AccordionTrigger>
                <AccordionContent>
                    <p>
                        Accordion content can contain text, links, and other
                        supporting information.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="two">
                <AccordionTrigger>Another accordion title</AccordionTrigger>
                <AccordionContent>
                    <p>Content for the second accordion item.</p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem id="three" isDisabled>
                <AccordionTrigger>Disabled accordion title</AccordionTrigger>
                <AccordionContent>
                    <p>This content cannot be opened.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
}

export const Underline: Story = {
    args: { variant: 'underline' },
    render: Default.render,
}

export const Outline: Story = {
    args: { variant: 'outline' },
    render: Default.render,
}

export const Medium: Story = {
    args: { size: 'm' },
    render: Default.render,
}
