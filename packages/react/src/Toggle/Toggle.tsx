'use client'

import {
    SwitchField,
    SwitchButton as TogglePrimitive,
    type SwitchFieldProps as TogglePrimitiveProps,
} from 'react-aria-components'

import { cva } from 'class-variance-authority'

import { cn } from '../utils'

const toggleVariants = cva([
    'group/toggle h-5 w-8 p-0.5 relative inline-flex shrink-0 items-center rounded-full',
    'cursor-pointer touch-none bg-text-disabled outline-none select-none',
    'transition-[background-color,box-shadow] duration-150',

    'data-hovered:bg-text-subtle',

    'data-selected:bg-success-border',
    'data-selected:data-hovered:bg-success',

    'data-pressed:bg-success-foreground',
    'data-selected:data-pressed:bg-success-foreground',

    'data-focus-visible:ring-2 data-focus-visible:ring-focus',

    'data-disabled:pointer-events-none data-disabled:cursor-not-allowed',
    'data-disabled:bg-text-disabled',
    'data-selected:data-disabled:bg-text-disabled',
])

const toggleThumbVariants = cva([
    'size-4 block shrink-0 rounded-full bg-surface',
    'translate-x-0 ease-out transition-transform duration-200',
    'group-data-[selected]/toggle:translate-x-3',
    'group-data-[disabled]/toggle:bg-surface-disabled',
])

export type ToggleProps = Omit<
    TogglePrimitiveProps,
    'children' | 'className'
> & {
    className?: string
}

function Toggle({ className, ...props }: ToggleProps) {
    return (
        <SwitchField className="contents" {...props}>
            <TogglePrimitive
                data-slot="toggle"
                className={cn(toggleVariants(), className)}>
                <span
                    aria-hidden="true"
                    data-slot="toggle-thumb"
                    className={toggleThumbVariants()}
                />
            </TogglePrimitive>
        </SwitchField>
    )
}

export { Toggle, toggleThumbVariants, toggleVariants }
