'use client'

import * as React from 'react'
import {
    Focusable,
    OverlayArrow,
    Tooltip as TooltipPrimitive,
    TooltipTrigger as TooltipTriggerPrimitive,
} from 'react-aria-components'

import { cn } from '../utils'

export type TooltipTriggerProps = React.ComponentProps<
    typeof TooltipTriggerPrimitive
>

function TooltipTrigger({
    delay = 0,
    children,
    ...props
}: TooltipTriggerProps) {
    const [trigger, tooltip] = React.Children.toArray(children)

    return (
        <TooltipTriggerPrimitive
            data-slot="tooltip-trigger"
            delay={delay}
            {...props}>
            <Focusable>
                {trigger as React.ComponentProps<typeof Focusable>['children']}
            </Focusable>
            {tooltip}
        </TooltipTriggerPrimitive>
    )
}

export type TooltipProps = Omit<
    React.ComponentProps<typeof TooltipPrimitive>,
    'children' | 'className'
> & {
    className?: string
    children?: React.ReactNode
}

function Tooltip({
    className,
    placement = 'top',
    offset = 4,
    crossOffset = 0,
    children,
    ...props
}: TooltipProps) {
    return (
        <TooltipPrimitive
            data-slot="tooltip-content"
            placement={placement}
            offset={offset}
            crossOffset={crossOffset}
            className={cn(
                'max-w-xs gap-1.5 rounded-md px-4 py-2 text-s has-data-[slot=kbd]:pr-1.5 data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:rounded-sm shadow-sm z-50 inline-flex w-fit origin-(--trigger-anchor-point) items-center bg-foreground text-background **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50',
                className
            )}
            {...props}>
            {children}
            <OverlayArrow
                data-slot="tooltip-arrow"
                className="size-2.5 rounded-xs z-50 translate-y-[calc(-50%-2px)] rotate-45 bg-foreground fill-foreground"
                style={({ placement, defaultStyle }) => ({
                    ...defaultStyle,
                    rotate: '0deg',
                    translate: '0 0',
                    transform:
                        placement === 'bottom'
                            ? 'translate(-50%, calc(50% + 2px)) rotate(45deg)'
                            : placement === 'top'
                              ? 'translate(-50%, calc(-50% - 2px)) rotate(45deg)'
                              : placement === 'left'
                                ? 'translate(calc(-50% - 2px), -50%) rotate(45deg)'
                                : 'translate(calc(50% + 2px), -50%) rotate(45deg)',
                })}
            />
        </TooltipPrimitive>
    )
}

export { Tooltip, TooltipTrigger }
