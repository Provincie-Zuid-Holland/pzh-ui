'use client'

import type * as React from 'react'
import {
    Button as ButtonPrimitive,
    Link as LinkPrimitive,
    type ButtonProps as ButtonPrimitiveProps,
    type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components'

import { Spinner } from '@pzh-ui/icons'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

type ButtonVariantProps = VariantProps<typeof buttonVariants>

export type ButtonProps = Omit<ButtonPrimitiveProps, 'className'> &
    React.RefAttributes<HTMLButtonElement> &
    ButtonVariantProps & {
        className?: string
        children?: React.ReactNode
    }

export type LinkButtonProps = Omit<LinkPrimitiveProps, 'className'> &
    ButtonVariantProps & {
        className?: string
    }

export const buttonVariants = cva(
    [
        'group/button',
        'px-4 py-2',
        'gap-2 inline-flex shrink-0 items-center justify-center',
        'rounded border',
        'bg-clip-padding',
        'font-bold leading-none whitespace-nowrap',
        'outline-none select-none',
        'transition-all',
        'cursor-pointer',

        // Press animation
        'active:not-aria-[haspopup]:translate-y-px',

        // Focus
        'focus-visible:ring-2 focus-visible:ring-focus',
        'focus-visible:border-transparent',

        // Disabled
        'disabled:pointer-events-none',
        'disabled:cursor-not-allowed',
        'disabled:border-transparent',
        'disabled:bg-surface-disabled',
        'disabled:text-text-muted',

        // Pending
        'data-[pending]:cursor-wait',

        // Icons
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
    ],
    {
        variants: {
            variant: {
                /**
                 * Primary
                 *
                 * Default: primary
                 * Hover: outlined primary
                 * Active: dark primary
                 * Focus: outlined primary
                 */
                primary: [
                    'data-[pending]:border-transparent',
                    'data-[pending]:bg-primary-active',
                    'data-[pending]:text-primary-foreground',

                    'border-primary',
                    'bg-primary',
                    'text-primary-foreground',

                    'not-data-[pending]:hover:bg-background',
                    'not-data-[pending]:hover:text-primary',

                    'not-data-[pending]:active:border-primary-active',
                    'not-data-[pending]:active:bg-primary-active',
                    'not-data-[pending]:active:text-primary-foreground',

                    'not-data-[pending]:focus-visible:bg-background',
                    'not-data-[pending]:focus-visible:text-primary',
                ],

                /**
                 * Secondary
                 *
                 * Default: primary outline
                 * Hover: success text
                 * Active: success
                 * Focus: success text
                 */
                secondary: [
                    'data-[pending]:border-transparent',
                    'data-[pending]:bg-success',
                    'data-[pending]:text-text-inverse',

                    'border-primary',
                    'bg-secondary',
                    'text-secondary-foreground',

                    'not-data-[pending]:hover:bg-secondary',
                    'not-data-[pending]:hover:text-success',

                    'not-data-[pending]:active:border-success',
                    'not-data-[pending]:active:bg-success',
                    'not-data-[pending]:active:text-text-inverse',

                    'not-data-[pending]:focus-visible:text-success',
                ],

                /**
                 * Call to action
                 *
                 * Default: success
                 * Hover: dark success
                 * Active: dark primary
                 * Focus: dark success
                 */
                cta: [
                    'data-[pending]:border-transparent',
                    'data-[pending]:bg-primary-active',
                    'data-[pending]:text-text-inverse',

                    'border-success',
                    'bg-success',
                    'text-text-inverse',

                    'not-data-[pending]:hover:bg-success-foreground',
                    'not-data-[pending]:hover:text-text-inverse',

                    'not-data-[pending]:active:bg-foreground',
                    'not-data-[pending]:active:text-text-inverse',

                    'not-data-[pending]:focus-visible:border-success-foreground',
                    'not-data-[pending]:focus-visible:bg-success-foreground',
                    'not-data-[pending]:focus-visible:text-text-inverse',
                ],

                /**
                 * Diapositive
                 *
                 * Intended for a dark background.
                 */
                diapositive: [
                    'data-[pending]:border-transparent',
                    'data-[pending]:bg-surface-subtle',
                    'data-[pending]:text-foreground',

                    'border-background',
                    'bg-background',
                    'text-primary',

                    'not-data-[pending]:hover:bg-background',
                    'not-data-[pending]:hover:text-success',

                    'not-data-[pending]:active:bg-background',
                    'not-data-[pending]:active:text-foreground',

                    'not-data-[pending]:focus-visible:bg-background',
                    'not-data-[pending]:focus-visible:text-success',
                ],

                /**
                 * Caution / destructive
                 */
                caution: [
                    'data-[pending]:border-transparent',
                    'data-[pending]:bg-destructive-foreground',
                    'data-[pending]:text-text-inverse',

                    'border-destructive',
                    'bg-secondary',
                    'text-destructive',

                    'not-data-[pending]:hover:border-destructive-foreground',
                    'not-data-[pending]:hover:text-destructive-foreground',

                    'not-data-[pending]:active:border-destructive-foreground',
                    'not-data-[pending]:active:bg-destructive-foreground',
                    'not-data-[pending]:active:text-text-inverse',

                    'not-data-[pending]:focus-visible:text-destructive-foreground',
                ],

                /**
                 * Transparent
                 */
                transparent: [
                    'border-transparent',
                    'bg-transparent',
                    'text-primary',

                    'not-data-[pending]:hover:bg-surface-muted',
                    'not-data-[pending]:hover:text-success',

                    'not-data-[pending]:active:bg-surface-subtle',
                    'not-data-[pending]:active:text-foreground',

                    'not-data-[pending]:focus-visible:bg-surface-muted',
                    'not-data-[pending]:focus-visible:text-success',

                    'disabled:bg-transparent',

                    'data-[pending]:bg-surface-subtle',
                    'data-[pending]:text-foreground',
                ],

                /**
                 * Link style
                 */
                link: [
                    'border-transparent',
                    'px-0',
                    'font-normal',
                    'underline decoration-1 underline-offset-2',
                    'text-link',

                    'not-data-[pending]:hover:text-success',

                    'not-data-[pending]:focus-visible:text-success',

                    'disabled:bg-transparent',
                ],

                /**
                 * No visual styling.
                 */
                default: 'border-transparent',
            },

            size: {
                l: 'h-12',
                m: 'h-10 text-s',
                s: 'h-8 text-xs',
            },
        },

        defaultVariants: {
            variant: 'primary',
            size: 'l',
        },
    }
)

function Button({
    className,
    variant = 'primary',
    size = 'l',
    isPending,
    children,
    ...props
}: ButtonProps) {
    return (
        <ButtonPrimitive
            {...props}
            isPending={isPending}
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(
                buttonVariants({
                    variant,
                    size,
                }),
                className
            )}>
            {isPending && (
                <Spinner aria-hidden="true" className="animate-spin" />
            )}

            {children}
        </ButtonPrimitive>
    )
}

function LinkButton({
    className,
    variant = 'primary',
    size = 'l',
    ...props
}: LinkButtonProps) {
    return (
        <LinkPrimitive
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(
                buttonVariants({
                    variant,
                    size,
                }),
                className
            )}
            {...props}
        />
    )
}

export { Button, LinkButton }
