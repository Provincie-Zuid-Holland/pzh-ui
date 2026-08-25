import type * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

const badgeVariants = cva(
    [
        'group/badge',
        'h-6 gap-1 inline-flex w-fit shrink-0 items-center justify-center',
        'rounded px-2 overflow-hidden border',
        'text-xs font-bold whitespace-nowrap',
        'transition-colors',

        // Focus
        'outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-focus',

        // Icons
        'has-data-[icon=inline-end]:pr-1.5',
        'has-data-[icon=inline-start]:pl-1.5',
        '[&>svg]:pointer-events-none',
        '[&>svg]:shrink-0',
    ],
    {
        variants: {
            variant: {
                primary: '',
                success: '',
                warning: '',
                destructive: '',
                neutral: '',
            },

            appearance: {
                solid: '',
                outline: '',
                inverted: '',
            },

            uppercase: {
                true: 'uppercase',
                false: '',
            },
        },

        compoundVariants: [
            // Primary
            {
                variant: 'primary',
                appearance: 'solid',
                className:
                    'border-badge-primary bg-badge-primary text-badge-primary-foreground',
            },
            {
                variant: 'primary',
                appearance: 'outline',
                className:
                    'border-badge-primary bg-badge-primary-subtle text-badge-primary-subtle-foreground',
            },
            {
                variant: 'primary',
                appearance: 'inverted',
                className:
                    'border-badge-primary-inverted bg-badge-primary-inverted text-badge-primary-inverted-foreground',
            },

            // Success
            {
                variant: 'success',
                appearance: 'solid',
                className:
                    'border-badge-success bg-badge-success text-badge-success-foreground',
            },
            {
                variant: 'success',
                appearance: 'outline',
                className:
                    'border-badge-success bg-badge-success-subtle text-badge-success-subtle-foreground',
            },
            {
                variant: 'success',
                appearance: 'inverted',
                className:
                    'border-badge-success-inverted bg-badge-success-inverted text-badge-success-inverted-foreground',
            },

            // Warning
            {
                variant: 'warning',
                appearance: 'solid',
                className:
                    'border-badge-warning bg-badge-warning text-badge-warning-foreground',
            },
            {
                variant: 'warning',
                appearance: 'outline',
                className:
                    'border-badge-warning bg-badge-warning-subtle text-badge-warning-subtle-foreground',
            },
            {
                variant: 'warning',
                appearance: 'inverted',
                className:
                    'border-badge-warning-inverted bg-badge-warning-inverted text-badge-warning-inverted-foreground',
            },

            // Destructive
            {
                variant: 'destructive',
                appearance: 'solid',
                className:
                    'border-badge-destructive bg-badge-destructive text-badge-destructive-foreground',
            },
            {
                variant: 'destructive',
                appearance: 'outline',
                className:
                    'border-badge-destructive bg-badge-destructive-subtle text-badge-destructive-subtle-foreground',
            },
            {
                variant: 'destructive',
                appearance: 'inverted',
                className:
                    'border-badge-destructive-inverted bg-badge-destructive-inverted text-badge-destructive-inverted-foreground',
            },

            // Neutral
            {
                variant: 'neutral',
                appearance: 'solid',
                className:
                    'border-badge-neutral bg-badge-neutral text-badge-neutral-foreground',
            },
            {
                variant: 'neutral',
                appearance: 'outline',
                className:
                    'border-badge-neutral bg-badge-neutral-subtle text-badge-neutral-subtle-foreground',
            },
            {
                variant: 'neutral',
                appearance: 'inverted',
                className:
                    'border-badge-neutral-inverted bg-badge-neutral-inverted text-badge-neutral-inverted-foreground',
            },
        ],

        defaultVariants: {
            variant: 'success',
            appearance: 'solid',
            uppercase: true,
        },
    }
)

type BadgeRenderProps = React.HTMLAttributes<HTMLElement> & {
    'data-slot'?: string
    'data-variant'?: string
    'data-appearance'?: string
}

export type BadgeProps = React.ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & {
        render?: (props: BadgeRenderProps) => React.ReactNode
    }

function Badge({
    className,
    variant = 'success',
    appearance = 'solid',
    uppercase = true,
    render,
    ...props
}: BadgeProps) {
    const classNames = cn(
        badgeVariants({
            variant,
            appearance,
            uppercase,
        }),
        className
    )

    const renderProps: BadgeRenderProps = {
        'data-slot': 'badge',
        'data-variant': variant ?? undefined,
        'data-appearance': appearance ?? undefined,
        className: classNames,
        ...props,
    }

    if (render) {
        return render(renderProps)
    }

    return <span {...renderProps} />
}

export { Badge, badgeVariants }
