import type { Meta, StoryObj } from '@storybook/react-vite'

import { cn } from '../utils'
import { Toggle, type ToggleProps } from './Toggle'

const meta = {
    title: 'Componenten/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
    args: {
        'aria-label': 'Instelling inschakelen',
    },
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const On: Story = {
    args: {
        defaultSelected: true,
    },
}

export const Disabled: Story = {
    args: {
        isDisabled: true,
    },
    render: args => (
        <div className="gap-6 flex items-center">
            <Toggle {...args} aria-label="Uitgeschakelde toggle uit" />
            <Toggle
                {...args}
                aria-label="Uitgeschakelde toggle aan"
                isSelected
            />
        </div>
    ),
}

type VisualState = 'default' | 'hover' | 'active' | 'focus' | 'disabled'

const visualStateClasses: Record<VisualState, string> = {
    default: '',
    hover: 'bg-text-subtle data-selected:bg-success',
    active: 'bg-success-foreground data-selected:bg-success-foreground',
    focus: 'ring-3 ring-focus',
    disabled: '',
}

function StateToggle({
    isSelected,
    state,
}: Pick<ToggleProps, 'isSelected'> & { state: VisualState }) {
    return (
        <Toggle
            aria-label={`${isSelected ? 'Aan' : 'Uit'} – ${state}`}
            isSelected={isSelected}
            isDisabled={state === 'disabled'}
            className={cn(visualStateClasses[state])}
        />
    )
}

export const AllStates: Story = {
    render: () => (
        <div className="gap-x-16 gap-y-8 p-6 grid grid-cols-[auto_auto_auto] items-center">
            <span aria-hidden="true" />
            <span className="text-heading-m font-bold text-center">Off</span>
            <span className="text-heading-m font-bold text-center">On</span>

            {(
                [
                    ['Default', 'default'],
                    ['Hover', 'hover'],
                    ['Active', 'active'],
                    ['Focus', 'focus'],
                    ['Disabled', 'disabled'],
                ] as const
            ).map(([label, state]) => (
                <div key={state} className="contents">
                    <span className="text-heading-m font-bold">{label}</span>
                    <StateToggle state={state} isSelected={false} />
                    <StateToggle state={state} isSelected />
                </div>
            ))}
        </div>
    ),
}
