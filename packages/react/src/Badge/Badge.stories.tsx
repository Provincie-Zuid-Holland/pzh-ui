import React from 'react'

import { Check } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
    title: 'Componenten/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: 'Badge',
        variant: 'success',
        appearance: 'solid',
        uppercase: true,
    },
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'primary',
                'success',
                'warning',
                'destructive',
                'neutral',
            ],
        },
        appearance: {
            control: 'inline-radio',
            options: ['solid', 'outline', 'inverted'],
        },
        uppercase: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
    render: args => (
        <div className="gap-3 flex flex-wrap items-center">
            <Badge {...args} variant="primary">
                Primary
            </Badge>

            <Badge {...args} variant="success">
                Success
            </Badge>

            <Badge {...args} variant="warning">
                Warning
            </Badge>

            <Badge {...args} variant="destructive">
                Destructive
            </Badge>

            <Badge {...args} variant="neutral">
                Neutral
            </Badge>
        </div>
    ),
}

export const Solid: Story = {
    args: {
        appearance: 'solid',
    },
    render: args => (
        <div className="gap-3 flex flex-wrap items-center">
            {(
                [
                    'primary',
                    'success',
                    'warning',
                    'destructive',
                    'neutral',
                ] as const
            ).map(variant => (
                <Badge key={variant} {...args} variant={variant}>
                    {variant}
                </Badge>
            ))}
        </div>
    ),
}

export const Outline: Story = {
    args: {
        appearance: 'outline',
    },
    render: args => (
        <div className="gap-3 flex flex-wrap items-center">
            {(
                [
                    'primary',
                    'success',
                    'warning',
                    'destructive',
                    'neutral',
                ] as const
            ).map(variant => (
                <Badge key={variant} {...args} variant={variant}>
                    {variant}
                </Badge>
            ))}
        </div>
    ),
}

export const Inverted: Story = {
    args: {
        appearance: 'inverted',
    },
    render: args => (
        <div className="gap-3 p-6 flex flex-wrap items-center bg-foreground">
            {(
                [
                    'primary',
                    'success',
                    'warning',
                    'destructive',
                    'neutral',
                ] as const
            ).map(variant => (
                <Badge key={variant} {...args} variant={variant}>
                    {variant}
                </Badge>
            ))}
        </div>
    ),
}

export const WithIcon: Story = {
    render: args => (
        <Badge {...args}>
            <Check data-icon="inline-start" aria-hidden="true" />
            Badge
        </Badge>
    ),
}

export const AllVariants: Story = {
    parameters: {
        layout: 'padded',
    },
    render: args => {
        const variants = [
            'primary',
            'success',
            'warning',
            'destructive',
            'neutral',
        ] as const

        return (
            <div className="gap-x-8 gap-y-4 md:grid-cols-[auto_auto_auto_auto] grid">
                <div />

                <span className="text-s font-bold text-foreground">Solid</span>

                <span className="text-s font-bold text-foreground">
                    Outline
                </span>

                <span className="text-s font-bold text-foreground">
                    Inverted
                </span>

                {variants.map(variant => (
                    <React.Fragment key={variant}>
                        <span className="text-s font-bold flex items-center text-foreground">
                            {variant}
                        </span>

                        <div className="flex items-center">
                            <Badge
                                {...args}
                                variant={variant}
                                appearance="solid">
                                Badge
                            </Badge>
                        </div>

                        <div className="flex items-center">
                            <Badge
                                {...args}
                                variant={variant}
                                appearance="outline">
                                Badge
                            </Badge>
                        </div>

                        <div className="p-2 flex items-center bg-foreground">
                            <Badge
                                {...args}
                                variant={variant}
                                appearance="inverted">
                                Badge
                            </Badge>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        )
    },
}

export const Lowercase: Story = {
    args: {
        uppercase: false,
        children: 'Badge label',
    },
}
