'use client'

import * as React from 'react'
import {
    DialogTrigger,
    Heading,
    Popover as PopoverPrimitive,
    type DialogTriggerProps,
    type PopoverProps as PopoverPrimitiveProps,
} from 'react-aria-components'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

const popoverVariants = cva(
    [
        'z-50',
        'flex flex-col',
        'min-h-0',
        'overflow-hidden',
        'rounded',
        'bg-surface',
        'text-foreground',
        'shadow-popover',
        'outline-none',
    ],
    {
        variants: {
            size: {
                s: 'w-36 text-xs',
                m: 'w-40 text-s',
            },
        },
        defaultVariants: {
            size: 'm',
        },
    }
)

export type PopoverProps = Omit<PopoverPrimitiveProps, 'className'> &
    VariantProps<typeof popoverVariants> & {
        className?: string
    }

function PopoverTrigger({ children, ...props }: DialogTriggerProps) {
    return (
        <DialogTrigger data-slot="popover-trigger" {...props}>
            {children}
        </DialogTrigger>
    )
}

function Popover({
    className,
    size,
    placement = 'bottom',
    offset = 0,
    crossOffset = 0,
    ...props
}: PopoverProps) {
    return (
        <PopoverPrimitive
            data-slot="popover-content"
            placement={placement}
            offset={offset}
            crossOffset={crossOffset}
            className={cn(popoverVariants({ size }), className)}
            {...props}
        />
    )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="popover-header"
            className={cn('gap-1 flex flex-col', className)}
            {...props}
        />
    )
}

function PopoverTitle({
    className,
    ...props
}: React.ComponentProps<typeof Heading>) {
    return (
        <Heading
            data-slot="popover-title"
            className={cn('font-bold', className)}
            {...props}
        />
    )
}

function PopoverDescription({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="popover-description"
            className={cn('text-muted-foreground', className)}
            {...props}
        />
    )
}

export {
    Popover,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    popoverVariants,
}
