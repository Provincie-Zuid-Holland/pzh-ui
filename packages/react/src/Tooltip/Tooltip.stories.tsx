import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Tooltip, TooltipTrigger } from './Tooltip'

const meta = {
    title: 'Componenten/Tooltip',
    component: Tooltip,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <TooltipTrigger>
            <Button variant="secondary">Meer informatie</Button>
            <Tooltip>Dit is aanvullende informatie.</Tooltip>
        </TooltipTrigger>
    ),
}

export const Placements: Story = {
    render: () => (
        <div className="gap-8 p-12 grid grid-cols-2">
            {(['top', 'right', 'bottom', 'left'] as const).map(placement => (
                <TooltipTrigger key={placement} delay={0}>
                    <Button variant="secondary">{placement}</Button>
                    <Tooltip placement={placement}>Tooltip content</Tooltip>
                </TooltipTrigger>
            ))}
        </div>
    ),
}

export const LongContent: Story = {
    render: () => (
        <TooltipTrigger>
            <Button variant="secondary">Toon uitleg</Button>
            <Tooltip>
                Een tooltip kan langere aanvullende informatie bevatten en heeft
                daarom een maximale breedte.
            </Tooltip>
        </TooltipTrigger>
    ),
}
