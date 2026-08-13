'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import {
    Button as ButtonPrimitive,
    Link as LinkPrimitive,
    type ButtonProps as ButtonPrimitiveProps,
    type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components'

import { Spinner } from '@pzh-ui/icons'
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
        'inline-flex gap-2 shrink-0 items-center justify-center',
        'rounded border border-transparent',
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
                    'border-primary',
                    'bg-primary',
                    'text-primary-foreground',

                    'hover:bg-background',
                    'hover:text-primary',

                    'active:border-primary-active',
                    'active:bg-primary-active',
                    'active:text-primary-foreground',

                    'focus-visible:bg-background',
                    'focus-visible:text-primary',
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
                    'border-primary',
                    'bg-secondary',
                    'text-secondary-foreground',

                    'hover:bg-secondary',
                    'hover:text-success',

                    'active:border-success',
                    'active:bg-success',
                    'active:text-text-inverse',

                    'focus-visible:bg-secondary',
                    'focus-visible:text-success',
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
                    'border-success',
                    'bg-success',
                    'text-text-inverse',

                    'hover:bg-success-foreground',
                    'hover:text-text-inverse',

                    'active:bg-foreground',
                    'active:text-text-inverse',

                    'focus-visible:border-success-foreground',
                    'focus-visible:bg-success-foreground',
                    'focus-visible:text-text-inverse',
                ],

                /**
                 * Diapositive
                 *
                 * Intended for a dark background.
                 */
                diapositive: [
                    'border-background',
                    'bg-background',
                    'text-primary',

                    'hover:bg-background',
                    'hover:text-success',

                    'active:bg-background',
                    'active:text-foreground',

                    'focus-visible:bg-background',
                    'focus-visible:text-success',
                ],

                /**
                 * Caution / destructive
                 */
                caution: [
                    'border-destructive',
                    'bg-destructive',
                    'text-text-inverse',

                    'hover:bg-background',
                    'hover:text-destructive',

                    'active:border-destructive-foreground',
                    'active:bg-destructive-foreground',
                    'active:text-text-inverse',

                    'focus-visible:bg-background',
                    'focus-visible:text-destructive',
                ],

                /**
                 * Link style
                 */
                link: [
                    'px-0',
                    'font-normal',
                    'underline underline-offset-2',
                    'text-link',

                    'hover:text-success',

                    'focus-visible:text-success',

                    'disabled:bg-transparent',
                ],

                /**
                 * No visual styling.
                 */
                default: '',
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
            data-testid="button"
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
            data-testid="link-button"
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
