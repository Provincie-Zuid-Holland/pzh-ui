'use client'

import { createContext, useContext, type ReactNode } from 'react'
import {
    DisclosurePanel as AccordionContentPrimitive,
    Heading as AccordionHeaderPrimitive,
    Disclosure as AccordionItemPrimitive,
    DisclosureGroup as AccordionPrimitive,
    Button as AccordionTriggerPrimitive,
    type ButtonProps,
    type DisclosureGroupProps,
    type DisclosurePanelProps,
    type DisclosureProps,
} from 'react-aria-components'

import { ChevronDown } from '@pzh-ui/icons'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

const accordionVariants = cva('flex w-full flex-col', {
    variants: {
        variant: {
            underline: 'gap-0',
            outline: 'gap-4',
        },
    },
    defaultVariants: { variant: 'underline' },
})

const accordionItemVariants = cva(
    [
        'group/accordion-item bg-background',
        'has-[button:focus-visible]:relative has-[button:focus-visible]:z-10',
    ],
    {
        variants: {
            variant: {
                underline: 'border-b border-border',
                outline: [
                    'rounded-lg overflow-hidden border border-border',
                    'has-[button:focus-visible]:border-focus',
                    'has-[button:focus-visible]:ring-2',
                    'has-[button:focus-visible]:ring-focus',
                ],
            },
        },
        defaultVariants: { variant: 'underline' },
    }
)

const accordionTriggerVariants = cva(
    [
        'group/accordion-trigger gap-4 relative flex w-full items-center justify-between',
        'font-sans font-normal cursor-pointer text-left text-foreground outline-none select-none',
        'transition-[background-color,color,box-shadow] duration-150',
        'hover:bg-surface-subtle',
        'data-pressed:bg-input-hover data-pressed:text-foreground',
        'disabled:pointer-events-none disabled:cursor-not-allowed',
        'disabled:bg-surface-disabled disabled:text-text-subtle',
        'aria-expanded:text-success',
    ],
    {
        variants: {
            size: {
                l: 'min-h-12 text-m',
                m: 'min-h-10 text-s',
            },
            variant: {
                underline: [
                    'p-2',
                    'focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset',
                ],
                outline: 'px-4 py-2',
            },
        },
        defaultVariants: { size: 'l', variant: 'underline' },
    }
)

const accordionContentVariants = cva(
    '[&_p:not(:last-child)]:mb-4 pb-4 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-success',
    {
        variants: {
            size: {
                l: 'text-m',
                m: 'text-s',
            },
            variant: {
                underline: 'px-2',
                outline: 'px-4',
            },
        },
        defaultVariants: { size: 'l', variant: 'underline' },
    }
)

type AccordionVariantProps = VariantProps<typeof accordionTriggerVariants>

type AccordionContextValue = Required<
    Pick<AccordionVariantProps, 'size' | 'variant'>
>

const AccordionContext = createContext<AccordionContextValue>({
    size: 'l',
    variant: 'underline',
})

export type AccordionProps = Omit<DisclosureGroupProps, 'className'> &
    AccordionVariantProps & { className?: string }

export type AccordionItemProps = Omit<DisclosureProps, 'className'> & {
    className?: string
}

export type AccordionTriggerProps = Omit<
    ButtonProps,
    'children' | 'className'
> & {
    children: ReactNode
    className?: string
}

export type AccordionContentProps = Omit<DisclosurePanelProps, 'className'> & {
    className?: string
}

function Accordion({
    className,
    size = 'l',
    variant = 'underline',
    ...props
}: AccordionProps) {
    return (
        <AccordionContext.Provider value={{ size, variant }}>
            <AccordionPrimitive
                data-slot="accordion"
                data-size={size}
                data-variant={variant}
                className={cn(accordionVariants({ variant }), className)}
                {...props}
            />
        </AccordionContext.Provider>
    )
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
    const { variant } = useContext(AccordionContext)

    return (
        <AccordionItemPrimitive
            data-slot="accordion-item"
            className={cn(accordionItemVariants({ variant }), className)}
            {...props}
        />
    )
}

function AccordionTrigger({
    className,
    children,
    ...props
}: AccordionTriggerProps) {
    const { size, variant } = useContext(AccordionContext)

    return (
        <AccordionHeaderPrimitive className="flex">
            <AccordionTriggerPrimitive
                slot="trigger"
                data-slot="accordion-trigger"
                className={cn(
                    accordionTriggerVariants({ size, variant }),
                    className
                )}
                {...props}>
                <span>{children}</span>
                <ChevronDown
                    aria-hidden="true"
                    data-slot="accordion-trigger-icon"
                    className="size-4 pointer-events-none shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180"
                />
            </AccordionTriggerPrimitive>
        </AccordionHeaderPrimitive>
    )
}

function AccordionContent({
    className,
    children,
    ...props
}: AccordionContentProps) {
    const { size, variant } = useContext(AccordionContext)

    return (
        <AccordionContentPrimitive
            data-slot="accordion-content"
            className="data-entering:h-0 data-exiting:h-0 h-(--disclosure-panel-height) overflow-clip transition-[height] duration-200"
            {...props}>
            <div
                className={cn(
                    accordionContentVariants({ size, variant }),
                    className
                )}>
                {children}
            </div>
        </AccordionContentPrimitive>
    )
}

export {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    accordionContentVariants,
    accordionItemVariants,
    accordionTriggerVariants,
    accordionVariants,
}
