import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    RadioGroup,
    RadioGroupItem,
    type RadioGroupItemProps,
} from './RadioGroup'

const meta = {
    title: 'Componenten/Form/RadioGroup',
    component: RadioGroup,
    parameters: { layout: 'centered' },
    args: {
        'aria-label': 'Radio button options',
        defaultValue: 'one',
    },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>
type PreviewItemProps = Partial<RadioGroupItemProps> & {
    'data-focus-visible'?: true
    'data-hovered'?: true
    'data-pressed'?: true
}

const values = [
    { label: 'Unchecked', selected: false },
    { label: 'Checked', selected: true },
]

const interactions = [
    { label: 'Default', itemProps: {}, groupProps: {} },
    {
        label: 'Hover',
        itemProps: { 'data-hovered': true },
        groupProps: {},
    },
    {
        label: 'Active',
        itemProps: { 'data-pressed': true },
        groupProps: {},
    },
    {
        label: 'Focus',
        itemProps: { 'data-focus-visible': true },
        groupProps: {},
    },
    {
        label: 'Disabled',
        itemProps: { isDisabled: true },
        groupProps: {},
    },
    { label: 'Error', itemProps: {}, groupProps: { isInvalid: true } },
] satisfies Array<{
    label: string
    itemProps: PreviewItemProps
    groupProps: { isInvalid?: boolean }
}>

export const Simple: Story = {
    render: args => (
        <RadioGroup {...args}>
            <RadioGroupItem value="one">First option</RadioGroupItem>
            <RadioGroupItem value="two">Second option</RadioGroupItem>
        </RadioGroup>
    ),
}

export const Bordered: Story = {
    render: args => (
        <RadioGroup {...args}>
            <RadioGroupItem value="one" withBorder>
                First option
            </RadioGroupItem>
            <RadioGroupItem value="two" withBorder>
                Second option
            </RadioGroupItem>
        </RadioGroup>
    ),
}

export const Sizes: Story = {
    render: () => (
        <div className="gap-6 flex flex-col">
            <RadioGroup aria-label="Medium options" defaultValue="m-one">
                <RadioGroupItem value="m-one" size="m">
                    Radio button M
                </RadioGroupItem>
                <RadioGroupItem value="m-two" size="m" withBorder>
                    Radio button M bordered
                </RadioGroupItem>
            </RadioGroup>
            <RadioGroup aria-label="Large options" defaultValue="l-one">
                <RadioGroupItem value="l-one" size="l">
                    Radio button L
                </RadioGroupItem>
                <RadioGroupItem value="l-two" size="l" withBorder>
                    Radio button L bordered
                </RadioGroupItem>
            </RadioGroup>
        </div>
    ),
}

export const AllStates: Story = {
    render: () => (
        <div className="w-[48rem] max-w-[calc(100vw-4rem)]">
            <div className="mb-8">
                <h2 className="text-l font-bold">Radio button states</h2>
                <p className="mt-1 text-s text-text-subtle">
                    Simple and bordered variants across every interaction state.
                </p>
            </div>
            <div className="gap-6 lg:grid-cols-2 grid grid-cols-1">
                {interactions.map(interaction => (
                    <section
                        key={interaction.label}
                        className="rounded-lg p-5 border border-border bg-surface-subtle">
                        <h3 className="mb-5 font-bold">{interaction.label}</h3>
                        <div className="gap-5 grid grid-cols-2">
                            {values.map(value => {
                                const selectedValue = value.selected
                                    ? 'option'
                                    : undefined

                                return (
                                    <div
                                        key={value.label}
                                        className="gap-4 flex flex-col items-start">
                                        <span className="text-s text-text-subtle">
                                            {value.label}
                                        </span>
                                        <RadioGroup
                                            aria-label={`${interaction.label} ${value.label} simple`}
                                            {...interaction.groupProps}
                                            value={selectedValue}>
                                            <RadioGroupItem
                                                value="option"
                                                {...interaction.itemProps}>
                                                Simple
                                            </RadioGroupItem>
                                        </RadioGroup>
                                        <RadioGroup
                                            aria-label={`${interaction.label} ${value.label} bordered`}
                                            {...interaction.groupProps}
                                            value={selectedValue}>
                                            <RadioGroupItem
                                                value="option"
                                                withBorder
                                                {...interaction.itemProps}>
                                                Bordered
                                            </RadioGroupItem>
                                        </RadioGroup>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    ),
}
