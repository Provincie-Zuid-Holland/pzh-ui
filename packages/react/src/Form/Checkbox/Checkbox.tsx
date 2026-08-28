'use client'

import type { ReactNode } from 'react'
import {
    CheckboxField as CheckboxFieldPrimitive,
    CheckboxButton as CheckboxPrimitive,
    composeRenderProps,
    type CheckboxFieldProps as CheckboxPrimitiveProps,
} from 'react-aria-components'

import { Check, Minus } from '@pzh-ui/icons'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'

const checkboxVariants = cva(
    [
        'group/checkbox relative inline-flex w-fit items-center align-middle',
        'leading-snug text-foreground',
        'cursor-pointer outline-none select-none',
        'transition-[background-color,color,border-color,box-shadow] duration-150',
        'data-disabled:pointer-events-none data-disabled:cursor-not-allowed',
        'data-disabled:text-text-subtle',
    ],
    {
        variants: {
            withBorder: {
                true: [
                    'rounded border border-border bg-background',

                    'data-selected:border-success',
                    'data-indeterminate:border-success',

                    'data-hovered:border-success data-hovered:bg-surface-subtle',

                    'data-pressed:border-input-border data-pressed:bg-input-hover',
                    'data-selected:data-pressed:border-input-border',
                    'data-indeterminate:data-pressed:border-input-border',

                    'data-focus-visible:border-focus data-focus-visible:bg-surface-subtle',
                    'data-focus-visible:ring-2 data-focus-visible:ring-focus',
                    'data-selected:data-focus-visible:border-focus',
                    'data-indeterminate:data-focus-visible:border-focus',

                    'data-disabled:border-border data-disabled:bg-surface-muted',
                    'data-selected:data-disabled:border-border',
                    'data-indeterminate:data-disabled:border-border',

                    'data-invalid:border-destructive data-invalid:bg-background',
                    'data-invalid:data-selected:border-destructive',
                    'data-invalid:data-indeterminate:border-destructive',
                    'data-invalid:data-hovered:border-success data-invalid:data-hovered:bg-surface-subtle',
                    'data-invalid:data-focus-visible:border-focus data-invalid:data-focus-visible:bg-surface-subtle',
                ],
                false: '',
            },
            size: {
                m: 'gap-2 text-s',
                l: 'gap-3 text-m',
            },
        },
        compoundVariants: [
            {
                withBorder: true,
                size: 'm',
                className: 'h-8 px-2',
            },
            {
                withBorder: true,
                size: 'l',
                className: 'h-10 px-4',
            },
        ],
        defaultVariants: {
            withBorder: false,
            size: 'l',
        },
    }
)

const checkboxIndicatorVariants = cva(
    [
        'rounded-sm grid shrink-0 place-items-center border leading-none',
        'border-input-border bg-input text-text-inverse',
        'transition-[background-color,border-color,box-shadow] duration-150',

        'group-data-[selected]/checkbox:border-success',
        'group-data-[selected]/checkbox:bg-success',
        'group-data-[indeterminate]/checkbox:border-success',
        'group-data-[indeterminate]/checkbox:bg-success',

        'group-data-[hovered]/checkbox:border-success',
        'group-data-[hovered]/checkbox:bg-success',
        'group-data-[selected]/checkbox:group-data-[hovered]/checkbox:border-input-border',
        'group-data-[selected]/checkbox:group-data-[hovered]/checkbox:bg-input-hover',
        'group-data-[selected]/checkbox:group-data-[hovered]/checkbox:text-foreground',
        'group-data-[indeterminate]/checkbox:group-data-[hovered]/checkbox:border-input-border',
        'group-data-[indeterminate]/checkbox:group-data-[hovered]/checkbox:bg-input-hover',
        'group-data-[indeterminate]/checkbox:group-data-[hovered]/checkbox:text-foreground',

        'group-data-[pressed]/checkbox:border-success-foreground',
        'group-data-[pressed]/checkbox:bg-success-foreground',
        'group-data-[pressed]/checkbox:text-text-inverse',
        'group-data-[selected]/checkbox:group-data-[pressed]/checkbox:border-success-foreground',
        'group-data-[selected]/checkbox:group-data-[pressed]/checkbox:bg-success-foreground',
        'group-data-[selected]/checkbox:group-data-[pressed]/checkbox:text-text-inverse',
        'group-data-[indeterminate]/checkbox:group-data-[pressed]/checkbox:border-success-foreground',
        'group-data-[indeterminate]/checkbox:group-data-[pressed]/checkbox:bg-success-foreground',
        'group-data-[indeterminate]/checkbox:group-data-[pressed]/checkbox:text-text-inverse',

        'group-data-[focus-visible]/checkbox:border-input-border',
        'group-data-[focus-visible]/checkbox:bg-input',
        'group-data-[focus-visible]/checkbox:text-foreground',
        'group-data-[selected]/checkbox:group-data-[focus-visible]/checkbox:bg-transparent',
        'group-data-[indeterminate]/checkbox:group-data-[focus-visible]/checkbox:bg-transparent',

        'group-data-[disabled]/checkbox:border-text-disabled',
        'group-data-[disabled]/checkbox:bg-input-disabled',
        'group-data-[disabled]/checkbox:text-text-inverse',
        'group-data-[selected]/checkbox:group-data-[disabled]/checkbox:border-border',
        'group-data-[selected]/checkbox:group-data-[disabled]/checkbox:bg-text-disabled',
        'group-data-[indeterminate]/checkbox:group-data-[disabled]/checkbox:border-border',
        'group-data-[indeterminate]/checkbox:group-data-[disabled]/checkbox:bg-text-disabled',

        'group-data-[invalid]/checkbox:border-destructive',
        'group-data-[invalid]/checkbox:bg-input',
        'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:border-destructive',
        'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:bg-destructive',
        'group-data-[indeterminate]/checkbox:group-data-[invalid]/checkbox:border-destructive',
        'group-data-[indeterminate]/checkbox:group-data-[invalid]/checkbox:bg-destructive',
        'group-data-[invalid]/checkbox:text-text-inverse',

        'group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:border-success',
        'group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:bg-success',
        'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:border-input-border',
        'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:bg-input-hover',
        'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:text-foreground',
        'group-data-[indeterminate]/checkbox:group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:border-input-border',
        'group-data-[indeterminate]/checkbox:group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:bg-input-hover',
        'group-data-[indeterminate]/checkbox:group-data-[invalid]/checkbox:group-data-[hovered]/checkbox:text-foreground',

        'group-data-[invalid]/checkbox:group-data-[focus-visible]/checkbox:border-input-border',
        'group-data-[invalid]/checkbox:group-data-[focus-visible]/checkbox:bg-input',
        'group-data-[invalid]/checkbox:group-data-[focus-visible]/checkbox:text-foreground',
        'group-data-[selected]/checkbox:group-data-[invalid]/checkbox:group-data-[focus-visible]/checkbox:bg-transparent',
        'group-data-[indeterminate]/checkbox:group-data-[invalid]/checkbox:group-data-[focus-visible]/checkbox:bg-transparent',
    ],
    {
        variants: {
            withBorder: {
                true: '',
                false: [
                    'group-data-[focus-visible]/checkbox:ring-2',
                    'group-data-[focus-visible]/checkbox:ring-focus',
                ],
            },
            size: {
                m: 'size-4',
                l: 'size-5',
            },
        },
        defaultVariants: {
            withBorder: false,
            size: 'l',
        },
    }
)

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>

export type CheckboxProps = Omit<
    CheckboxPrimitiveProps,
    'children' | 'className'
> &
    CheckboxVariantProps & {
        className?: string
        children?: ReactNode
    }

function Checkbox({
    className,
    children,
    size = 'l',
    withBorder = false,
    ...props
}: CheckboxProps) {
    const iconSize = size === 'm' ? 10 : 12

    return (
        <CheckboxFieldPrimitive className="contents" {...props}>
            <CheckboxPrimitive
                data-slot="checkbox"
                className={cn(
                    checkboxVariants({ size, withBorder }),
                    className
                )}>
                {composeRenderProps(
                    children,
                    (children, { isIndeterminate, isSelected }) => (
                        <>
                            <span
                                aria-hidden="true"
                                data-slot="checkbox-indicator"
                                className={checkboxIndicatorVariants({
                                    size,
                                    withBorder,
                                })}>
                                {isIndeterminate ? (
                                    <Minus
                                        size={iconSize}
                                        data-slot="checkbox-indeterminate-icon"
                                        className="pointer-events-none m-auto block shrink-0"
                                    />
                                ) : (
                                    isSelected && (
                                        <Check
                                            size={iconSize}
                                            data-slot="checkbox-check-icon"
                                            className="pointer-events-none m-auto block shrink-0"
                                        />
                                    )
                                )}
                            </span>

                            {children}
                        </>
                    )
                )}
            </CheckboxPrimitive>
        </CheckboxFieldPrimitive>
    )
}

export { Checkbox, checkboxVariants }
