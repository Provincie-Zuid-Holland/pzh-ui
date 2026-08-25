import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tag } from './Tag'

const meta = {
    title: 'Componenten/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: 'Tag',
        variant: 'primary',
        size: 'm',
        onRemove: () => undefined,
    },
    argTypes: {
        variant: {
            control: 'inline-radio',
            options: ['primary', 'secondary', 'diapositive'],
        },
        size: {
            control: 'inline-radio',
            options: ['l', 'm', 's'],
        },
    },
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
}

export const Diapositive: Story = {
    args: {
        variant: 'diapositive',
    },
    decorators: [
        Story => (
            <div className="p-6 bg-foreground">
                <Story />
            </div>
        ),
    ],
}

export const Sizes: Story = {
    render: args => (
        <div className="gap-4 flex items-center">
            <Tag {...args} size="l">
                Large
            </Tag>

            <Tag {...args} size="m">
                Medium
            </Tag>

            <Tag {...args} size="s">
                Small
            </Tag>
        </div>
    ),
}

export const WithoutRemove: Story = {
    args: {
        onRemove: undefined,
    },
}

export const Variants: Story = {
    render: args => (
        <div className="gap-6 flex flex-col">
            <div className="gap-3 flex flex-wrap items-center">
                <Tag {...args} variant="primary">
                    Primary
                </Tag>

                <Tag {...args} variant="secondary">
                    Secondary
                </Tag>
            </div>

            <div className="p-4 bg-foreground">
                <Tag {...args} variant="diapositive">
                    Diapositive
                </Tag>
            </div>
        </div>
    ),
}

export const AllSizes: Story = {
    parameters: {
        layout: 'padded',
    },
    render: args => (
        <div className="gap-6 flex flex-col">
            {(['l', 'm', 's'] as const).map(size => (
                <div key={size} className="gap-4 flex items-center">
                    <span className="text-s w-20 font-bold text-foreground">
                        {size}
                    </span>

                    <Tag {...args} variant="primary" size={size}>
                        Primary
                    </Tag>

                    <Tag {...args} variant="secondary" size={size}>
                        Secondary
                    </Tag>

                    <div className="p-2 bg-foreground">
                        <Tag {...args} variant="diapositive" size={size}>
                            Diapositive
                        </Tag>
                    </div>
                </div>
            ))}
        </div>
    ),
}

export const Overview: Story = {
    parameters: {
        layout: 'padded',
    },
    render: args => (
        <div className="gap-x-8 gap-y-4 md:grid-cols-[140px_repeat(3,1fr)] grid">
            <div />

            <span className="text-s font-bold text-foreground">Primary</span>

            <span className="text-s font-bold text-foreground">Secondary</span>

            <span className="text-s font-bold text-foreground">
                Diapositive
            </span>

            {(['l', 'm', 's'] as const).map(size => (
                <React.Fragment key={size}>
                    <span className="text-s font-bold flex items-center text-foreground">
                        {size}
                    </span>

                    <div className="flex items-center">
                        <Tag {...args} variant="primary" size={size}>
                            Tag
                        </Tag>
                    </div>

                    <div className="flex items-center">
                        <Tag {...args} variant="secondary" size={size}>
                            Tag
                        </Tag>
                    </div>

                    <div className="p-2 flex items-center bg-foreground">
                        <Tag {...args} variant="diapositive" size={size}>
                            Tag
                        </Tag>
                    </div>
                </React.Fragment>
            ))}
        </div>
    ),
}
