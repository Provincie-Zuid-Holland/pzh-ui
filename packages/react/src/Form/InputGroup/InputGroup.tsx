'use client'

import * as React from 'react'
import {
    Group,
    Input as InputPrimitive,
    type GroupProps,
    type InputProps as InputPrimitiveProps,
} from 'react-aria-components'

import { cva, type VariantProps } from 'class-variance-authority'

import { Button, buttonVariants } from '../../Button'
import { cn } from '../../utils'
import { inputControlVariants } from '../Input/Input.variants'

function InputGroup({
    className,
    size = 'l',
    ...props
}: GroupProps & {
    size?: 'l' | 'm'
}) {
    return (
        <Group
            data-slot="input-group"
            data-size={size}
            className={cn(
                inputControlVariants({ size }),

                'group/input-group relative flex items-center',

                // Block addons
                'has-[[data-slot=input-group-addon][data-align=block-start]]:h-auto',
                'has-[[data-slot=input-group-addon][data-align=block-start]]:flex-col',
                'has-[[data-slot=input-group-addon][data-align=block-end]]:h-auto',
                'has-[[data-slot=input-group-addon][data-align=block-end]]:flex-col',

                // Focus
                'has-[[data-slot=input-group-control]:focus-visible]:border-transparent',
                'has-[[data-slot=input-group-control]:focus-visible]:ring-2',
                'has-[[data-slot=input-group-control]:focus-visible]:ring-focus',

                // Disabled
                'has-[[data-slot=input-group-control]:disabled]:pointer-events-none',
                'has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed',
                'has-[[data-slot=input-group-control]:disabled]:bg-input-disabled',
                'has-[[data-slot=input-group-control]:disabled]:text-text-subtle',

                // Readonly
                'has-[[data-slot=input-group-control][readonly]]:bg-surface-muted',

                // Invalid
                'has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive',
                'has-[[data-slot=input-group-control][aria-invalid=true]]:rounded-b-none',

                className
            )}
            {...props}
        />
    )
}

const inputGroupAddonVariants = cva(
    'gap-2 flex h-auto shrink-0 cursor-text items-center text-text-muted select-none',
    {
        variants: {
            align: {
                'inline-start': 'order-first justify-center',
                'inline-end': 'order-last justify-center',
                'block-start': 'order-first w-full justify-start',
                'block-end': 'order-last w-full justify-start',
            },
        },
        defaultVariants: {
            align: 'inline-start',
        },
    }
)

function InputGroupAddon({
    className,
    align = 'inline-start',
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
    return (
        <div
            role="group"
            data-slot="input-group-addon"
            data-align={align}
            className={cn(
                inputGroupAddonVariants({ align }),

                'data-[align=inline-end]:has-[>button]:gap-0',

                // Large
                'group-data-[size=l]/input-group:data-[align=inline-start]:pl-4',
                'group-data-[size=l]/input-group:data-[align=inline-end]:pr-4',
                'group-data-[size=l]/input-group:data-[align=inline-end]:has-[>button]:pr-0',

                'group-data-[size=l]/input-group:data-[align=block-start]:px-4',
                'group-data-[size=l]/input-group:data-[align=block-start]:pt-2',
                'group-data-[size=l]/input-group:data-[align=block-end]:px-4',
                'group-data-[size=l]/input-group:data-[align=block-end]:pb-2',

                // Medium
                'group-data-[size=m]/input-group:data-[align=inline-start]:pl-2',
                'group-data-[size=m]/input-group:data-[align=inline-end]:pr-2',
                'group-data-[size=m]/input-group:data-[align=inline-end]:has-[>button]:pr-0',

                'group-data-[size=m]/input-group:data-[align=block-start]:px-2',
                'group-data-[size=m]/input-group:data-[align=block-start]:pt-2',
                'group-data-[size=m]/input-group:data-[align=block-end]:px-2',
                'group-data-[size=m]/input-group:data-[align=block-end]:pb-2',

                className
            )}
            onClick={event => {
                if ((event.target as HTMLElement).closest('button')) {
                    return
                }

                event.currentTarget.parentElement
                    ?.querySelector('input')
                    ?.focus()
            }}
            {...props}
        />
    )
}

function InputGroupButton({
    className,
    type = 'button',
    variant = 'secondary',
    size = 'l',
    ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> &
    VariantProps<typeof buttonVariants> & {
        type?: 'button' | 'submit' | 'reset'
    }) {
    return (
        <Button
            type={type}
            data-size={size}
            variant={variant}
            className={cn(
                buttonVariants({ size, variant }),

                'shrink-0 rounded-none',
                'border-r-0',

                'first:border-l',
                'last:rounded-r',

                className
            )}
            {...props}
        />
    )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            className={cn(
                'gap-2 flex items-center [&_svg]:pointer-events-none',
                className
            )}
            {...props}
        />
    )
}

function InputGroupInput({ className, ...props }: InputPrimitiveProps) {
    return (
        <InputPrimitive
            data-slot="input-group-control"
            className={cn(
                'min-w-0 h-full flex-1 bg-transparent outline-none',
                'placeholder:text-text-subtle',

                // Large
                'group-data-[size=l]/input-group:px-4',
                'group-data-[size=l]/input-group:py-2',
                'group-data-[size=l]/input-group:text-m',

                // Medium
                'group-data-[size=m]/input-group:px-2',
                'group-data-[size=m]/input-group:py-2',
                'group-data-[size=m]/input-group:text-s',

                // Inline addons reduce only the inner spacing
                'group-has-[[data-slot=input-group-addon][data-align=inline-start]]/input-group:pl-2',
                'group-has-[[data-slot=input-group-addon][data-align=inline-end]]/input-group:pr-2',

                // Block layout
                'group-has-[[data-slot=input-group-addon][data-align=block-start]]/input-group:h-auto',
                'group-has-[[data-slot=input-group-addon][data-align=block-start]]/input-group:w-full',
                'group-has-[[data-slot=input-group-addon][data-align=block-start]]/input-group:pt-1',
                'group-has-[[data-slot=input-group-addon][data-align=block-start]]/input-group:pb-2',

                'group-has-[[data-slot=input-group-addon][data-align=block-end]]/input-group:h-auto',
                'group-has-[[data-slot=input-group-addon][data-align=block-end]]/input-group:w-full',
                'group-has-[[data-slot=input-group-addon][data-align=block-end]]/input-group:pt-2',
                'group-has-[[data-slot=input-group-addon][data-align=block-end]]/input-group:pb-1',

                className
            )}
            {...props}
        />
    )
}

export {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
}
