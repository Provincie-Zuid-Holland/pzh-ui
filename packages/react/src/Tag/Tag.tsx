'use client'

import type * as React from 'react'
import { Button } from 'react-aria-components'

import { XmarkLarge } from '@pzh-ui/icons'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

const tagVariants = cva(
    [
        'group/tag',
        'inline-flex w-fit shrink-0 items-center',
        'rounded border',
        'font-bold leading-none whitespace-nowrap',
        'transition-colors',

        // Focus when remove button receives focus
        'has-[button:focus-visible]:border-focus',
        'has-[button:focus-visible]:ring-2',
        'has-[button:focus-visible]:ring-focus',
    ],
    {
        variants: {
            variant: {
                primary: [
                    // Default
                    'border-primary',
                    'bg-primary',
                    'text-primary-foreground',

                    // Hover
                    'hover:bg-background',
                    'hover:text-primary',

                    // Active
                    'active:border-foreground',
                    'active:bg-foreground',
                    'active:text-primary-foreground',

                    // Focus
                    'has-[button:focus-visible]:bg-background',
                    'has-[button:focus-visible]:text-primary',
                ],

                secondary: [
                    // Default
                    'border-primary',
                    'bg-background',
                    'text-primary',

                    // Hover
                    'hover:border-success',
                    'hover:text-success',

                    // Active
                    'active:border-success',
                    'active:bg-success',
                    'active:text-text-inverse',

                    // Focus
                    'has-[button:focus-visible]:bg-background',
                    'has-[button:focus-visible]:text-success',
                ],

                diapositive: [
                    // Default
                    'border-background',
                    'bg-background',
                    'text-primary',

                    // Hover
                    'hover:border-background',
                    'hover:bg-background',
                    'hover:text-success',

                    // Active
                    'active:border-background',
                    'active:bg-background',
                    'active:text-primary',

                    // Focus
                    'has-[button:focus-visible]:bg-background',
                    'has-[button:focus-visible]:text-success',
                ],
            },

            size: {
                l: 'h-10 gap-3 px-4 text-m',
                m: 'h-8 gap-2 px-2 text-s',
                s: 'h-6 gap-2 px-2 text-xs',
            },
        },

        defaultVariants: {
            variant: 'primary',
            size: 'm',
        },
    }
)

export type TagProps = Omit<React.ComponentProps<'span'>, 'children'> &
    VariantProps<typeof tagVariants> & {
        children: React.ReactNode
        onRemove?: () => void
        removeLabel?: string
    }

function Tag({
    className,
    variant = 'primary',
    size = 'm',
    children,
    onRemove,
    removeLabel = 'Verwijderen',
    ...props
}: TagProps) {
    return (
        <span
            data-slot="tag"
            data-variant={variant}
            data-size={size}
            className={cn(tagVariants({ variant, size }), className)}
            {...props}>
            <span data-slot="tag-label">{children}</span>

            {onRemove && (
                <Button
                    type="button"
                    data-slot="tag-remove"
                    aria-label={removeLabel}
                    onPress={onRemove}
                    className={cn(
                        'inline-flex shrink-0 cursor-pointer items-center justify-center',
                        'text-current outline-none',

                        // Remove button size
                        'group-data-[size=l]/tag:size-6',
                        'group-data-[size=m]/tag:size-5',
                        'group-data-[size=s]/tag:size-4',

                        // Icon size
                        '[&>svg]:pointer-events-none',
                        '[&>svg]:shrink-0',
                        'group-data-[size=l]/tag:[&>svg]:size-3.5',
                        'group-data-[size=m]/tag:[&>svg]:size-3',
                        'group-data-[size=s]/tag:[&>svg]:size-2.5'
                    )}>
                    <XmarkLarge aria-hidden="true" />
                </Button>
            )}
        </span>
    )
}

export { Tag, tagVariants }
