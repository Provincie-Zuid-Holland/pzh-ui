import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldError } from '../Field'
import { Textarea } from './Textarea'

const meta = {
    title: 'Componenten/Form/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    args: {
        placeholder: 'Vul een waarde in',
        disabled: false,
    },
    argTypes: {
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
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => <Textarea {...args} />,
}

export const WithValue: Story = {
    args: {
        defaultValue: 'Provincie Zuid-Holland',
    },
    render: args => <Textarea {...args} />,
}

export const Disabled: Story = {
    args: {
        defaultValue: 'Deze waarde kan niet worden aangepast',
        disabled: true,
    },
    render: args => <Textarea {...args} />,
}

export const ReadOnly: Story = {
    args: {
        defaultValue: 'Deze waarde kan niet worden aangepast',
        readOnly: true,
    },
    render: args => <Textarea {...args} />,
}

export const Invalid: Story = {
    args: {
        defaultValue: 'Deze waarde is incorrect',
        'aria-invalid': true,
    },
    render: args => (
        <>
            <Textarea {...args} />
            <FieldError errors={[{ message: 'Dit veld is onjuist.' }]} />
        </>
    ),
}

export const Sizes: Story = {
    render: args => (
        <div className="gap-4 flex items-center">
            <Textarea size="l" {...args} />

            <Textarea size="m" {...args} />
        </div>
    ),
}
