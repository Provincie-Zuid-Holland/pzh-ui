import { AngleDown } from '@pzh-ui/icons'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as React from 'react'

import { cn } from '../utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn('border-pzh-gray-200 border-b', className)}
        {...props}
    />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
        hideIcon?: boolean
    }
>(({ className, children, hideIcon, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'text-pzh-blue-500 flex flex-1 items-center justify-between py-4 font-bold transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
                className
            )}
            {...props}>
            {children}
            {!hideIcon && (
                <AngleDown
                    className="h-4 w-4 shrink-0 transition-transform duration-200"
                    color="text-pzh-blue-900"
                />
            )}
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden pb-4 pt-0 text-sm transition-all',
            className
        )}
        {...props}>
        {children}
    </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
