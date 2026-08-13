import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldError } from '../Field'
import { PasswordInput } from './PasswordInput'

const meta = {
    title: 'Componenten/Form/PasswordInput',
    component: PasswordInput,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Voer een wachtwoord in',
        showToggle: true,
        disabled: false,
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['l', 'm'],
        },
        showToggle: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
    decorators: [
        Story => (
            <div className="w-[min(400px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PasswordInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => <PasswordInput {...args} />,
}

export const WithValue: Story = {
    args: {
        defaultValue: 'SuperSecret123!',
    },
    render: args => <PasswordInput {...args} />,
}

export const WithoutToggle: Story = {
    args: {
        defaultValue: 'SuperSecret123!',
        showToggle: false,
    },
    render: args => <PasswordInput {...args} />,
}

export const Disabled: Story = {
    args: {
        defaultValue: 'SuperSecret123!',
        disabled: true,
    },
    render: args => <PasswordInput {...args} />,
}

export const ReadOnly: Story = {
    args: {
        defaultValue: 'SuperSecret123!',
        readOnly: true,
    },
    render: args => <PasswordInput {...args} />,
}

export const Invalid: Story = {
    args: {
        defaultValue: 'SuperSecret123!',
        'aria-invalid': true,
    },
    render: args => (
        <>
            <PasswordInput {...args} />
            <FieldError
                errors={[
                    { message: 'Het wachtwoord voldoet niet aan de eisen.' },
                ]}
            />
        </>
    ),
}

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            <PasswordInput size="l" {...args} />

            <PasswordInput size="m" {...args} />
        </div>
    ),
}

export const Examples: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <PasswordInput placeholder="Nieuw wachtwoord" />

            <PasswordInput defaultValue="SuperSecret123!" />

            <PasswordInput defaultValue="SuperSecret123!" disabled />
        </div>
    ),
}
