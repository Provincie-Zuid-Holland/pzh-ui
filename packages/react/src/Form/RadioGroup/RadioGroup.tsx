'use client'

import type { ReactNode } from 'react'
import {
    composeRenderProps,
    RadioField as RadioFieldPrimitive,
    RadioGroup as RadioGroupPrimitive,
    RadioButton as RadioPrimitive,
    type RadioGroupProps as RadioGroupPrimitiveProps,
    type RadioFieldProps as RadioPrimitiveProps,
} from 'react-aria-components'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'

const radioGroupItemVariants = cva(
    [
        'group/radio-group-item gap-2 relative inline-flex w-fit items-center align-middle',
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

                    'data-hovered:border-success data-hovered:bg-surface-subtle',
                    'data-selected:data-hovered:border-success data-selected:data-hovered:bg-background',

                    'data-pressed:border-input-border data-pressed:bg-input-hover',
                    'data-selected:data-pressed:border-input-border',

                    'data-focus-visible:border-focus data-focus-visible:bg-surface-subtle',
                    'data-focus-visible:ring-2 data-focus-visible:ring-focus',
                    'data-selected:data-focus-visible:border-focus',

                    'data-disabled:border-border data-disabled:bg-surface-muted',
                    'data-selected:data-disabled:border-border',

                    'data-invalid:border-destructive data-invalid:bg-background',
                    'data-invalid:data-selected:border-destructive',
                    'data-invalid:data-hovered:border-success data-invalid:data-hovered:bg-surface-subtle',
                    'data-invalid:data-selected:data-hovered:border-destructive data-invalid:data-selected:data-hovered:bg-background',
                    'data-invalid:data-focus-visible:border-focus data-invalid:data-focus-visible:bg-surface-subtle',
                ],
                false: '',
            },
            size: {
                m: 'text-s',
                l: 'text-m',
            },
        },
        compoundVariants: [
            { withBorder: true, size: 'm', className: 'h-8 px-2' },
            { withBorder: true, size: 'l', className: 'h-10 px-4' },
        ],
        defaultVariants: {
            withBorder: false,
            size: 'l',
        },
    }
)

const radioGroupIndicatorVariants = cva(
    [
        'grid shrink-0 place-items-center rounded-full border leading-none',
        'border-input-border bg-input text-text-inverse',
        'transition-[background-color,border-color,box-shadow] duration-150',

        'group-data-[selected]/radio-group-item:border-success',
        'group-data-[selected]/radio-group-item:bg-success',

        'group-data-[hovered]/radio-group-item:border-success',
        'group-data-[hovered]/radio-group-item:bg-success',

        'group-data-[pressed]/radio-group-item:border-success-foreground',
        'group-data-[pressed]/radio-group-item:bg-success-foreground',
        'group-data-[pressed]/radio-group-item:text-text-inverse',
        'group-data-[selected]/radio-group-item:group-data-[pressed]/radio-group-item:border-success-foreground',
        'group-data-[selected]/radio-group-item:group-data-[pressed]/radio-group-item:bg-success-foreground',
        'group-data-[selected]/radio-group-item:group-data-[pressed]/radio-group-item:text-text-inverse',

        'group-data-[focus-visible]/radio-group-item:border-input-border',
        'group-data-[focus-visible]/radio-group-item:bg-input',
        'group-data-[focus-visible]/radio-group-item:text-foreground',
        'group-data-[selected]/radio-group-item:group-data-[focus-visible]/radio-group-item:bg-transparent',

        'group-data-[disabled]/radio-group-item:border-text-disabled',
        'group-data-[disabled]/radio-group-item:bg-input-disabled',
        'group-data-[disabled]/radio-group-item:text-text-inverse',
        'group-data-[selected]/radio-group-item:group-data-[disabled]/radio-group-item:border-border',
        'group-data-[selected]/radio-group-item:group-data-[disabled]/radio-group-item:bg-text-disabled',

        'group-data-[invalid]/radio-group-item:border-destructive',
        'group-data-[invalid]/radio-group-item:bg-input',
        'group-data-[selected]/radio-group-item:group-data-[invalid]/radio-group-item:border-destructive',
        'group-data-[selected]/radio-group-item:group-data-[invalid]/radio-group-item:bg-destructive',
        'group-data-[invalid]/radio-group-item:text-text-inverse',

        'group-data-[invalid]/radio-group-item:group-data-[hovered]/radio-group-item:border-success',
        'group-data-[invalid]/radio-group-item:group-data-[hovered]/radio-group-item:bg-success',
        'group-data-[selected]/radio-group-item:group-data-[invalid]/radio-group-item:group-data-[hovered]/radio-group-item:border-destructive',
        'group-data-[selected]/radio-group-item:group-data-[invalid]/radio-group-item:group-data-[hovered]/radio-group-item:bg-destructive',
        'group-data-[selected]/radio-group-item:group-data-[invalid]/radio-group-item:group-data-[hovered]/radio-group-item:text-text-inverse',

        'group-data-[invalid]/radio-group-item:group-data-[focus-visible]/radio-group-item:border-input-border',
        'group-data-[invalid]/radio-group-item:group-data-[focus-visible]/radio-group-item:bg-input',
        'group-data-[invalid]/radio-group-item:group-data-[focus-visible]/radio-group-item:text-foreground',
        'group-data-[selected]/radio-group-item:group-data-[invalid]/radio-group-item:group-data-[focus-visible]/radio-group-item:bg-transparent',
    ],
    {
        variants: {
            withBorder: {
                true: '',
                false: [
                    'group-data-[focus-visible]/radio-group-item:ring-2',
                    'group-data-[focus-visible]/radio-group-item:ring-focus',
                ],
            },
            size: {
                m: 'size-4',
                l: 'size-[18px]',
            },
        },
        defaultVariants: {
            withBorder: false,
            size: 'l',
        },
    }
)

type RadioGroupItemVariantProps = VariantProps<typeof radioGroupItemVariants>

export type RadioGroupProps = Omit<RadioGroupPrimitiveProps, 'className'> & {
    className?: string
}

export type RadioGroupItemProps = Omit<
    RadioPrimitiveProps,
    'children' | 'className'
> &
    RadioGroupItemVariantProps & {
        children?: ReactNode
        className?: string
    }

function RadioGroup({ className, ...props }: RadioGroupProps) {
    return (
        <RadioGroupPrimitive
            data-slot="radio-group"
            className={cn('gap-2 grid w-full', className)}
            {...props}
        />
    )
}

function RadioGroupItem({
    children,
    className,
    size = 'l',
    withBorder = false,
    ...props
}: RadioGroupItemProps) {
    return (
        <RadioFieldPrimitive className="contents" {...props}>
            <RadioPrimitive
                data-slot="radio-group-item"
                className={cn(
                    radioGroupItemVariants({ size, withBorder }),
                    className
                )}>
                {composeRenderProps(children, (children, { isSelected }) => (
                    <>
                        <span
                            aria-hidden="true"
                            data-slot="radio-group-indicator"
                            className={radioGroupIndicatorVariants({
                                size,
                                withBorder,
                            })}>
                            {isSelected && (
                                <span
                                    data-slot="radio-group-dot"
                                    className="size-2 shrink-0 rounded-full bg-current"
                                />
                            )}
                        </span>

                        {children}
                    </>
                ))}
            </RadioPrimitive>
        </RadioFieldPrimitive>
    )
}

export {
    RadioGroup,
    RadioGroupItem,
    radioGroupIndicatorVariants,
    radioGroupItemVariants,
}
