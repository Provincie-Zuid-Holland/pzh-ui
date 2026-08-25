import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox, type CheckboxProps } from './Checkbox'

const meta = {
    title: 'Componenten/Form/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: 'Checkbox',
        size: 'm',
    },
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['m', 'l'],
        },
    },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>
type PreviewCheckboxProps = CheckboxProps & {
    'data-focus-visible'?: true
    'data-hovered'?: true
    'data-pressed'?: true
}

const values = [
    { label: 'Unchecked', props: {} },
    { label: 'Checked', props: { isSelected: true } },
    { label: 'Indeterminate', props: { isIndeterminate: true } },
] satisfies Array<{ label: string; props: PreviewCheckboxProps }>

const interactions = [
    { label: 'Default', props: {} },
    { label: 'Hover', props: { 'data-hovered': true } },
    { label: 'Active', props: { 'data-pressed': true } },
    { label: 'Focus', props: { 'data-focus-visible': true } },
    { label: 'Disabled', props: { isDisabled: true } },
    { label: 'Error', props: { isInvalid: true } },
] satisfies Array<{ label: string; props: PreviewCheckboxProps }>

export const Simple: Story = {}

export const Bordered: Story = {
    args: {
        withBorder: true,
    },
}

export const Sizes: Story = {
    render: () => (
        <div className="gap-6 flex flex-col items-start">
            <Checkbox size="m">Checkbox M</Checkbox>
            <Checkbox size="l">Checkbox L</Checkbox>
            <Checkbox size="m" withBorder>
                Checkbox M bordered
            </Checkbox>
            <Checkbox size="l" withBorder>
                Checkbox L bordered
            </Checkbox>
        </div>
    ),
}

export const AllStates: Story = {
    render: () => (
        <div className="w-5xl max-w-[calc(100vw-4rem)]">
            <div className="mb-8">
                <h2 className="text-l font-bold">Checkbox states</h2>
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

                        <div className="gap-5 grid grid-cols-3">
                            {values.map(value => {
                                const props = {
                                    ...value.props,
                                    ...interaction.props,
                                }

                                return (
                                    <div
                                        key={value.label}
                                        className="min-w-0 gap-4 flex flex-col items-start">
                                        <span className="text-s text-text-subtle">
                                            {value.label}
                                        </span>
                                        <Checkbox {...props}>Simple</Checkbox>
                                        <Checkbox withBorder {...props}>
                                            Bordered
                                        </Checkbox>
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
