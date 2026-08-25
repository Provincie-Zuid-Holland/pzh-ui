import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldError } from '../Field'
import { Input } from './Input'

const meta = {
    title: 'Componenten/Form/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Vul een waarde in',
        type: 'text',
        disabled: false,
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url'],
        },
        size: {
            control: 'select',
            options: ['l', 'm'],
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
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => <Input {...args} />,
}

export const WithValue: Story = {
    args: {
        defaultValue: 'Provincie Zuid-Holland',
    },
    render: args => <Input {...args} />,
}

export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'naam@voorbeeld.nl',
    },
    render: args => <Input {...args} />,
}

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Wachtwoord',
    },
    render: args => <Input {...args} />,
}

export const Disabled: Story = {
    args: {
        defaultValue: 'Deze waarde kan niet worden aangepast',
        disabled: true,
    },
    render: args => <Input {...args} />,
}

export const ReadOnly: Story = {
    args: {
        defaultValue: 'Deze waarde kan niet worden aangepast',
        readOnly: true,
    },
    render: args => <Input {...args} />,
}

export const Invalid: Story = {
    args: {
        defaultValue: 'Deze waarde is incorrect',
        'aria-invalid': true,
    },
    render: args => (
        <>
            <Input {...args} />
            <FieldError errors={[{ message: 'Dit veld is onjuist.' }]} />
        </>
    ),
}

export const Sizes: Story = {
    render: args => (
        <div className="gap-4 flex items-center">
            <Input size="l" {...args} />

            <Input size="m" {...args} />
        </div>
    ),
}
