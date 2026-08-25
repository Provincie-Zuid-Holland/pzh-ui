import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldError } from '../Field'
import { NumberInput } from './NumberInput'

const meta = {
    title: 'Componenten/Form/NumberInput',
    component: NumberInput,
    parameters: {
        layout: 'centered',
    },
    args: {
        defaultValue: 10,
        minValue: 0,
        maxValue: 100,
        step: 1,
        isDisabled: false,
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['l', 'm'],
        },
        minValue: {
            control: 'number',
        },
        maxValue: {
            control: 'number',
        },
        step: {
            control: 'number',
        },
        isDisabled: {
            control: 'boolean',
        },
    },
    decorators: [
        Story => (
            <div className="w-[min(300px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NumberInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => <NumberInput {...args} />,
}

export const Small: Story = {
    args: {
        size: 'm',
    },
    render: args => <NumberInput {...args} />,
}

export const Disabled: Story = {
    args: {
        defaultValue: 25,
        isDisabled: true,
    },
    render: args => <NumberInput {...args} />,
}

export const ReadOnly: Story = {
    args: {
        defaultValue: 25,
        isReadOnly: true,
    },
    render: args => <NumberInput {...args} />,
}

export const Invalid: Story = {
    args: {
        defaultValue: 150,
        maxValue: 100,
        isInvalid: true,
    },
    render: args => (
        <>
            <NumberInput {...args} />
            <FieldError errors={[{ message: 'Dit veld is onjuist.' }]} />
        </>
    ),
}

export const Decimal: Story = {
    args: {
        defaultValue: 12.5,
        step: 0.5,
    },
    render: args => <NumberInput {...args} />,
}

export const Currency: Story = {
    args: {
        defaultValue: 1250,
        formatOptions: {
            style: 'currency',
            currency: 'EUR',
        },
    },
    render: args => <NumberInput {...args} />,
}

export const Percentage: Story = {
    args: {
        defaultValue: 25,
        step: 5,
        formatOptions: {
            style: 'percent',
        },
    },
    render: args => <NumberInput {...args} />,
}

export const Sizes: Story = {
    render: () => (
        <div className="gap-4 flex flex-col">
            <NumberInput defaultValue={10} size="l" />

            <NumberInput defaultValue={10} size="m" />
        </div>
    ),
}

export const Examples: Story = {
    render: () => (
        <div className="gap-4 flex flex-col">
            <NumberInput defaultValue={10} minValue={0} maxValue={100} />

            <NumberInput defaultValue={12.5} step={0.5} />

            <NumberInput
                defaultValue={1250}
                formatOptions={{
                    style: 'currency',
                    currency: 'EUR',
                }}
            />

            <NumberInput
                defaultValue={25}
                formatOptions={{
                    style: 'percent',
                }}
            />
        </div>
    ),
}
