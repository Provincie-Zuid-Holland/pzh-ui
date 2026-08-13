import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from './Label'

const meta = {
    title: 'Componenten/Label',
    component: Label,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['l', 'm'],
        },
    },
    args: {
        children: 'Label',
        size: 'l',
    },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => <Label {...args} />,
}

export const Medium: Story = {
    args: {
        size: 'm',
    },
    render: args => <Label {...args} />,
}

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col items-start gap-4">
            <Label {...args} size="l">
                Large label
            </Label>

            <Label {...args} size="m">
                Medium label
            </Label>
        </div>
    ),
}

export const WithInput: Story = {
    render: args => (
        <div className="flex flex-col gap-2">
            <Label {...args} htmlFor="name">
                Naam
            </Label>

            <input
                id="name"
                type="text"
                className="border-pzh-gray-400 rounded border px-3 py-2"
            />
        </div>
    ),
}

export const CustomClassName: Story = {
    args: {
        className: 'text-pzh-green-500',
    },
    render: args => <Label {...args}>Aangepast label</Label>,
}
