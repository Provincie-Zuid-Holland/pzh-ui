import type * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import {
    inputControlVariants,
    inputPaddingVariants,
} from '../Form/Input/Input.variants'
import { Separator } from '../Separator'
import { cn } from '../utils'

export const buttonGroupVariants = cva(
    "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
    {
        variants: {
            orientation: {
                horizontal:
                    '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r! **:data-slot:rounded-r-none [&_[data-slot]~[data-slot]]:rounded-l-none [&_[data-slot]~[data-slot]]:border-l-0',
                vertical:
                    '[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b! flex-col **:data-slot:rounded-b-none [&_[data-slot]~[data-slot]]:rounded-t-none [&_[data-slot]~[data-slot]]:border-t-0',
            },
        },
        defaultVariants: {
            orientation: 'horizontal',
        },
    }
)

export type ButtonGroupProps = React.ComponentProps<'div'> &
    VariantProps<typeof buttonGroupVariants>

function ButtonGroup({
    className,
    orientation = 'horizontal',
    ...props
}: ButtonGroupProps) {
    return (
        <div
            role="group"
            data-slot="button-group"
            data-orientation={orientation}
            className={cn(buttonGroupVariants({ orientation }), className)}
            {...props}
        />
    )
}

type ButtonGroupTextRenderProps = React.HTMLAttributes<HTMLElement> & {
    'data-slot': 'button-group-text'
    'data-size': 'l' | 'm'
}

export type ButtonGroupTextProps = React.ComponentProps<'div'> &
    VariantProps<typeof inputControlVariants> & {
        render?: (props: ButtonGroupTextRenderProps) => React.ReactNode
    }

function ButtonGroupText({
    className,
    render,
    size = 'l',
    ...props
}: ButtonGroupTextProps) {
    const resolvedSize = size ?? 'l'

    const classNames = cn(
        inputControlVariants({ size: resolvedSize }),
        inputPaddingVariants({ size: resolvedSize }),

        "gap-2 [&_svg:not([class*='size-'])]:size-4 flex w-auto shrink-0 items-center [&_svg]:pointer-events-none",
        className
    )

    if (render) {
        const renderProps = {
            'data-slot': 'button-group-text' as const,
            'data-size': resolvedSize,
            className: classNames,
            ...props,
        }

        return render(renderProps)
    }

    return (
        <div
            data-slot="button-group-text"
            data-size={resolvedSize}
            className={classNames}
            {...props}
        />
    )
}

export type ButtonGroupSeparatorProps = React.ComponentProps<typeof Separator>

function ButtonGroupSeparator({
    className,
    orientation = 'vertical',
    ...props
}: ButtonGroupSeparatorProps) {
    return (
        <Separator
            data-slot="button-group-separator"
            orientation={orientation}
            className={cn(
                'relative self-stretch bg-border data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto',
                className
            )}
            {...props}
        />
    )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
