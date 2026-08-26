import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './Separator'

const meta = {
    title: 'Componenten/Separator',
    component: Separator,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
    args: {
        orientation: 'horizontal',
    },
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <div className="w-80">
            <div className="space-y-1">
                <h2 className="text-heading-s">Zuid-Holland</h2>
                <p className="text-s text-text-muted">
                    Informatie over de provincie.
                </p>
            </div>

            <Separator {...args} className="my-4" />

            <p className="text-s">
                Ontdek beleid, projecten en dienstverlening.
            </p>
        </div>
    ),
}

export const Horizontal: Story = {
    render: args => (
        <div className="w-80 space-y-4">
            <span>Onderwerpen</span>
            <Separator {...args} orientation="horizontal" />
            <span>Contact</span>
        </div>
    ),
}

export const Vertical: Story = {
    render: args => (
        <div className="h-6 gap-4 flex items-center">
            <span>Overzicht</span>
            <Separator {...args} orientation="vertical" />
            <span>Nieuws</span>
            <Separator {...args} orientation="vertical" />
            <span>Contact</span>
        </div>
    ),
}

export const Orientations: Story = {
    render: args => (
        <div className="w-96 space-y-8">
            <div className="space-y-3">
                <span className="text-s font-bold">Horizontaal</span>
                <Separator {...args} orientation="horizontal" />
            </div>

            <div className="space-y-3">
                <span className="text-s font-bold">Verticaal</span>
                <div className="h-12 gap-4 flex items-center">
                    <span>Links</span>
                    <Separator {...args} orientation="vertical" />
                    <span>Rechts</span>
                </div>
            </div>
        </div>
    ),
}
